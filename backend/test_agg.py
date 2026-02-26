import os
from app.services.pdf_parser import parse_hdfc_statement
from app.services.financial_aggregator import aggregate_financials

pdf_files = [x for x in os.listdir('tmp_uploads') if x.endswith('.pdf')]
if pdf_files:
    data = parse_hdfc_statement(os.path.join('tmp_uploads', pdf_files[0]))
    print(f"Extracted {len(data)} txs")
    metrics = aggregate_financials(data)
    print("Metrics computed cleanly")
    print(metrics['monthly_data'])
else:
    print("No pdf in tmp_uploads")
