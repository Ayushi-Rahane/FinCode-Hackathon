import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app.services.pdf_parser import parse_hdfc_statement
from app.services.financial_aggregator import aggregate_financials
from app.services.ai_advisor import generate_ai_narrative

upload_bp = Blueprint("upload", __name__)

ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route("/", methods=["POST"])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
        
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    if not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file format. Please upload a PDF."}), 400
        
    try:
        # Secure filename
        filename = secure_filename(file.filename)
        # Create temp dir if it doesn't exist
        temp_dir = os.path.join(os.getcwd(), 'tmp_uploads')
        os.makedirs(temp_dir, exist_ok=True)
        
        file_path = os.path.join(temp_dir, filename)
        file.save(file_path)
        
        # 1. Parse PDF extracting the structured transaction list
        structured_data = parse_hdfc_statement(file_path)
        
        # 2. Aggregate into Financial Metrics
        metrics = aggregate_financials(structured_data)
        
        # 2.5 Generate AI Narrative
        metrics["ai_insight"] = generate_ai_narrative(metrics)
        
        # 3. Cleanup temp file
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return jsonify({
            "message": "File Validated & Analyzed",
            "data": metrics
        }), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        import traceback
        error_msg = traceback.format_exc()
        print(f"Error extracting PDF: {error_msg}")
        return jsonify({"error": f"Could not parse bank statement. Server Trace: {str(e)}"}), 500
