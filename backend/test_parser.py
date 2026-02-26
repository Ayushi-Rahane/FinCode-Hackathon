import traceback
from app.services.pdf_parser import parse_hdfc_statement

try:
    data = parse_hdfc_statement('tests/sample_hdfc_statement.pdf')
    print(f"Success. Parsed {len(data)} transactions.")
except Exception as e:
    print(traceback.format_exc())
