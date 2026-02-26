import re

with open("debug_pdf_extraction.txt", "r") as f:
    lines = f.readlines()

in_table = False
date_regex = re.compile(r"^(\d{2}/\d{2}/\d{2})")
current_tx = None
transactions = []

for line in lines:
    line = line.strip()
    if not line: continue
    
    if any(ignore in line for ignore in ["Account No", "IFSC", "GSTIN", "Address", "Generated On"]):
        continue
        
    if "Date Narration Chq./Ref.No." in line or ("Narration" in line and "ValueDt" in line):
        in_table = True
        continue
        
    if "STATEMENT SUMMARY" in line or "Statement of account" in line.capitalize() or "Opening Balance" in line:
        pass

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
        number_matches = re.findall(r"[\d\,]+\.\d{2}", rest_of_line)
        
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

if current_tx and current_tx.get("amount", 0) != 0:
    transactions.append(current_tx)

print(f"Extracted {len(transactions)} transactions locally from dump.")
for tx in transactions[:3]:
    print(tx)
