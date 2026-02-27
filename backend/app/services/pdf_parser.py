import re
from datetime import datetime
import pandas as pd
import pdfplumber


def parse_hdfc_statement(file_path):
    """
    Multi-bank PDF statement parser.
    Supports: HDFC, Suryoday, and generic bank statements.
    """
    with pdfplumber.open(file_path) as pdf:
        text_content = ""
        all_tables = []
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                text_content += text + "\n"
            # Also try table extraction for Suryoday
            tables = page.extract_tables()
            if tables:
                all_tables.extend(tables)

        if not text_content.strip():
            raise ValueError("Scanned PDFs are not supported. Please upload a digitally generated bank statement.")

    # Detect bank type
    bank_type = detect_bank(text_content)

    if bank_type == "suryoday":
        # Try table extraction first (more reliable), fall back to text parsing
        result = parse_suryoday_tables(all_tables)
        if len(result) < 3:
            result = parse_suryoday_text(text_content)
        return result
    else:
        return parse_hdfc(text_content)


def detect_bank(text):
    """Detect which bank the statement belongs to."""
    text_lower = text.lower()
    if "suryoday" in text_lower:
        return "suryoday"
    elif "hdfc" in text_lower:
        return "hdfc"
    else:
        return "generic"


def safe_float(val):
    """Safely convert a string to float, handling commas and empty strings."""
    if not val or not str(val).strip():
        return 0.0
    try:
        return float(str(val).replace(',', '').replace(' ', ''))
    except (ValueError, TypeError):
        return 0.0


def parse_suryoday_tables(all_tables):
    """Parse Suryoday statements using pdfplumber table extraction."""
    transactions = []

    for table in all_tables:
        if not table or len(table) < 2:
            continue

        # Find header row
        header_idx = -1
        for i, row in enumerate(table):
            row_text = " ".join(str(c) for c in row if c)
            if "Tran Date" in row_text and "Balance" in row_text:
                header_idx = i
                break

        if header_idx < 0:
            continue

        # Parse data rows after header
        for row in table[header_idx + 1:]:
            if not row or len(row) < 5:
                continue

            # Clean up row values
            cells = [str(c).strip() if c else "" for c in row]

            # First cell should be a date (DD-MM-YYYY)
            date_str = cells[0].strip()
            if not re.match(r"\d{2}-\d{2}-\d{4}", date_str):
                continue

            # Skip metadata rows
            if any(kw in " ".join(cells) for kw in ["ACCOUNT SUMMARY", "Opening Balance", "Page No"]):
                continue

            # Find the columns - Suryoday has: TranDate | EffDate | ChequeNo | Description | Debit | Credit | Balance
            # But column count may vary based on extraction
            description = ""
            debit = 0.0
            credit = 0.0
            balance = 0.0

            if len(cells) >= 7:
                description = cells[3]
                debit = safe_float(cells[4])
                credit = safe_float(cells[5])
                balance = safe_float(cells[6])
            elif len(cells) >= 6:
                description = cells[2] if cells[2] and not re.match(r"^[\d,.]+$", cells[2]) else cells[3]
                debit = safe_float(cells[-3])
                credit = safe_float(cells[-2])
                balance = safe_float(cells[-1])
            elif len(cells) >= 5:
                description = cells[2]
                # Last cell is balance, figure out debit/credit
                balance = safe_float(cells[-1])
                amt = safe_float(cells[-2])
                if amt > 0:
                    debit = amt  # Will resolve via balance diff

            # Determine signed amount
            signed_amount = 0.0
            if credit > 0 and debit == 0:
                signed_amount = credit
            elif debit > 0 and credit == 0:
                signed_amount = -debit
            elif credit > 0 and debit > 0:
                # Both present - shouldn't happen in one row, use balance to resolve
                signed_amount = credit - debit

            try:
                dt_obj = datetime.strptime(date_str, "%d-%m-%Y")
                date_formatted = dt_obj.strftime("%Y-%m-%d")
            except ValueError:
                date_formatted = date_str

            transactions.append({
                "date": date_formatted,
                "narration": description,
                "amount": round(signed_amount, 2),
                "balance": balance
            })

    # If balance-based resolution is needed (when we couldn't tell debit from credit)
    for i in range(1, len(transactions)):
        if transactions[i]["amount"] == 0 and transactions[i]["balance"] != 0:
            diff = transactions[i]["balance"] - transactions[i - 1]["balance"]
            transactions[i]["amount"] = round(diff, 2)

    return transactions


def parse_suryoday_text(text_content):
    """Parse Suryoday Small Finance Bank PDF using text extraction as fallback."""
    transactions = []
    lines = text_content.split('\n')

    in_table = False
    date_regex = re.compile(r"^(\d{2}-\d{2}-\d{4})\s+(\d{2}-\d{2}-\d{4})")
    current_tx = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Skip page headers / footers
        if any(kw in line for kw in ["CIF ID", "IFSC", "MICR", "CKYC", "Nominee", "YOUR BRANCH",
                                      "Copyright", "Page No", "2/28/", "Account Open",
                                      "Account Type", "Account Number", "Clear Balance",
                                      "Hold/Lien", "Currency", "SAVING BANK",
                                      "ACCOUNT SUMMARY", "Opening Balance",
                                      "Disclaimers", "Please note", "Cheque\n",
                                      "NEFT", "RTGS", "Withhold", "WDL", "CLG",
                                      "STATEMENT OF ACCOUNT", "SHIRDI",
                                      "SHOP NO", "OPP SAI", "GATE\n", "MAHARASHTRA 423109"]):
            continue

        # Detect start of transaction table
        if "Tran Date" in line and ("Effective" in line or "Balance" in line):
            in_table = True
            continue

        # Detect end 
        if "ACCOUNT SUMMARY" in line:
            in_table = False
            if current_tx:
                transactions.append(current_tx)
                current_tx = None
            continue

        if not in_table:
            continue

        # Skip column header repeats
        if "Cheque" in line and "Number" in line:
            continue
        if "Tran Date" in line:
            continue

        # Try matching a transaction row (two dates at start)
        match = date_regex.match(line)
        if match:
            # Save previous transaction
            if current_tx:
                transactions.append(current_tx)

            date_str = match.group(1)
            rest_of_line = line[match.end():].strip()

            # Find all decimal numbers in rest of line
            number_matches = re.findall(r"[\d,]+\.\d{2}", rest_of_line)

            balance = 0.0
            amount = 0.0

            if len(number_matches) >= 2:
                balance = safe_float(number_matches[-1])
                amount = safe_float(number_matches[-2])
            elif len(number_matches) == 1:
                balance = safe_float(number_matches[0])

            # Remove numbers from narration
            narration = rest_of_line
            for num in number_matches:
                narration = narration.replace(num, "")
            narration = narration.strip()

            current_tx = {
                "date": date_str,
                "narration": narration,
                "amount": amount,
                "balance": balance,
            }
        else:
            # Multi-line narration continuation — but skip pure number lines
            if current_tx and not re.match(r"^[\d,]+\.\d{2}$", line.strip()):
                current_tx["narration"] += " " + line

    if current_tx:
        transactions.append(current_tx)

    # Resolve signed amounts using balance differences
    structured_data = []
    for i, tx in enumerate(transactions):
        try:
            dt_obj = datetime.strptime(tx["date"], "%d-%m-%Y")
            date_formatted = dt_obj.strftime("%Y-%m-%d")
        except ValueError:
            date_formatted = tx["date"]

        signed_amount = 0.0
        amount = tx["amount"]

        if i == 0:
            # Can't use balance diff for first tx; check narration
            if "UPI/CR" in tx["narration"] or "CR/" in tx["narration"]:
                signed_amount = amount
            else:
                signed_amount = -amount if amount > 0 else 0
        else:
            prev_balance = transactions[i - 1]["balance"]
            diff = tx["balance"] - prev_balance

            if abs(diff) < 0.01:
                signed_amount = 0.0
            elif diff > 0:
                signed_amount = abs(amount) if amount > 0 else diff
            else:
                signed_amount = -abs(amount) if amount > 0 else diff

        structured_data.append({
            "date": date_formatted,
            "narration": tx["narration"],
            "amount": round(signed_amount, 2),
            "balance": tx["balance"]
        })

    return structured_data


def parse_hdfc(text_content):
    """Parse HDFC Bank PDF statements (original parser)."""
    transactions = []
    lines = text_content.split('\n')

    in_table = False
    date_regex = re.compile(r"^(\d{2}/\d{2}/\d{2})")
    current_tx = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        if any(ignore in line for ignore in ["Account No", "IFSC", "GSTIN", "Address", "Generated On"]):
            continue

        if "Date Narration Chq./Ref.No." in line or ("Narration" in line and "ValueDt" in line):
            in_table = True
            continue

        if "STATEMENT SUMMARY" in line or "HDFC BANK LIMITED" in line or "*Closing balance" in line:
            in_table = False
            if current_tx and current_tx.get("amount", 0) != 0:
                transactions.append(current_tx)
                current_tx = None
            continue

        if not in_table:
            continue

        if "Date" in line and "Narration" in line and "Chq." in line:
            continue

        match = date_regex.match(line)
        if match:
            if current_tx and current_tx.get("amount", 0) != 0:
                transactions.append(current_tx)

            date_str = match.group(1)
            rest_of_line = line[len(date_str):].strip()

            number_matches = re.findall(r"[\d,]+\.\d{2}", rest_of_line)

            balance = 0.0
            amount = 0.0

            if len(number_matches) >= 2:
                balance = float(number_matches[-1].replace(',', ''))
                amount = float(number_matches[-2].replace(',', ''))

            value_date_match = re.search(r"\s(\d{2}/\d{2}/\d{2})\s", rest_of_line)

            if value_date_match:
                narration_end_idx = rest_of_line.find(value_date_match.group(1))
            elif len(number_matches) >= 2:
                narration_end_idx = rest_of_line.rfind(number_matches[-2])
            else:
                narration_end_idx = len(rest_of_line)

            narration = rest_of_line[:narration_end_idx].strip()
            narration = re.sub(r"\d{10,}\s*$", "", narration).strip()

            current_tx = {
                "date": date_str,
                "narration": narration,
                "amount": amount,
                "balance": balance,
                "raw_text": line
            }
        else:
            if current_tx:
                current_tx["narration"] += " " + line

    if current_tx:
        transactions.append(current_tx)

    # Data Structuring
    structured_data = []
    for i, tx in enumerate(transactions):
        try:
            dt_obj = datetime.strptime(tx["date"], "%d/%m/%y")
        except ValueError:
            dt_obj = tx["date"]

        amount = tx["amount"]
        signed_amount = 0.0

        if i == 0:
            if "  " + str(amount) + " " in tx["raw_text"]:
                signed_amount = -amount
            else:
                signed_amount = amount
        else:
            prev_balance = transactions[i - 1]["balance"]
            diff = tx["balance"] - prev_balance

            if diff < -0.01:
                signed_amount = -amount
            elif diff > 0.01:
                signed_amount = amount
            else:
                signed_amount = 0.0

        structured_data.append({
            "date": dt_obj.strftime("%Y-%m-%d") if isinstance(dt_obj, datetime) else dt_obj,
            "narration": tx["narration"],
            "amount": signed_amount,
            "balance": tx["balance"]
        })

    return structured_data
