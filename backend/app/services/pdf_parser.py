import re
from datetime import datetime
import pandas as pd
import pdfplumber

def parse_hdfc_statement(file_path):
    """
    Parses an HDFC Bank Statement PDF according to the strict stage pipeline.
    """
    transactions = []
    
    # Validation Stage 2: PDF Parsing with pdfplumber
    with pdfplumber.open(file_path) as pdf:
        text_content = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                text_content += text + "\n"
        
        if not text_content.strip():
            raise ValueError("Scanned PDFs are not supported. Please upload a digitally generated bank statement.")
            
    # DEBUG: Dump text content to file so we can read it to fix regex
    with open("debug_pdf_extraction.txt", "w") as f:
        f.write(text_content)
            
    # Parsing Stage 3: Section Detection & Row Extraction Logic
    lines = text_content.split('\n')
    
    in_table = False
    date_regex = re.compile(r"^(\d{2}/\d{2}/\d{2})")
    current_tx = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Ignore Metadata
        if any(ignore in line for ignore in ["Account No", "IFSC", "GSTIN", "Address", "Generated On"]):
            continue
            
        # Detect Start of Table
        if "Date Narration Chq./Ref.No." in line or ("Narration" in line and "ValueDt" in line):
            in_table = True
            continue
            
        # Detect End of Table
        if "STATEMENT SUMMARY" in line or "Statement of account" in line.capitalize() or "Opening Balance" in line:
            # We don't want to stop at "Statement of account" if it's the header, but HDFC has 
            # "Statement of account" at the top of every page. 
            pass

        if "STATEMENT SUMMARY" in line or "HDFC BANK LIMITED" in line or "*Closing balance" in line:
            in_table = False
            if current_tx and current_tx.get("amount", 0) != 0:
                transactions.append(current_tx)
                current_tx = None
            continue
            
        if not in_table:
            continue
            
        # Also skip column headers that might appear on next pages
        if "Date" in line and "Narration" in line and "Chq." in line:
            continue
            
        # Try matching a transaction row start
        match = date_regex.match(line)
        if match:
            if current_tx and current_tx.get("amount", 0) != 0:
                transactions.append(current_tx)
            
            date_str = match.group(1)
            rest_of_line = line[len(date_str):].strip()
            
            # Find decimal numbers. HDFC has amounts like 50.00, 992.99
            number_matches = re.findall(r"[\d\,]+\.\d{2}", rest_of_line)
            
            balance = 0.0
            amount = 0.0
            
            if len(number_matches) >= 2:
                balance_raw = number_matches[-1]
                balance = float(balance_raw.replace(',', ''))
                
                amount_raw = number_matches[-2]
                amount = float(amount_raw.replace(',', ''))
            
            # Narration extraction
            # HDFC format: Date | Narration | Chq/Ref | Value Dt | Withdrawal | Deposit | Balance
            # The value date is also a date format like DD/MM/YY. Let's find it to cut off Narration.
            value_date_match = re.search(r"\s(\d{2}/\d{2}/\d{2})\s", rest_of_line)
            
            if value_date_match:
                narration_end_idx = rest_of_line.find(value_date_match.group(1))
            elif len(number_matches) >= 2:
                narration_end_idx = rest_of_line.rfind(number_matches[-2])
            else:
                narration_end_idx = len(rest_of_line)
                
            narration = rest_of_line[:narration_end_idx].strip()
            # Also clean up any lingering Chq/Ref no (long digit string)
            narration = re.sub(r"\d{10,}\s*$", "", narration).strip()
            
            current_tx = {
                "date": date_str,
                "narration": narration,
                "amount": amount,
                "balance": balance,
                "raw_text": line
            }
        else:
            # Multi-line narration
            if current_tx:
                current_tx["narration"] += " " + line

    if current_tx:
        transactions.append(current_tx)

    # 4. Data Structuring & 5. Data Cleaning Stage
    structured_data = []
    
    for i, tx in enumerate(transactions):
        try:
            dt_obj = datetime.strptime(tx["date"], "%d/%m/%y")
        except ValueError:
            dt_obj = tx["date"]
            
        amount = tx["amount"]
        signed_amount = 0.0
        
        if i == 0:
            # Heuristic for first tx
            if "  " + str(amount) + " " in tx["raw_text"]:
                signed_amount = -amount # Withdrawal usually has space before deposit column
            else:
                signed_amount = amount
        else:
            prev_balance = transactions[i-1]["balance"]
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
