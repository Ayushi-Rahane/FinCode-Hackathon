from app.services.pdf_parser import parse_hdfc_statement
data = parse_hdfc_statement('uploads/Acct Statement_7661_26022026_20.45.08.pdf')
print("Len", len(data))
