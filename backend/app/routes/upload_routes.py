from flask import Blueprint, request, jsonify

upload_bp = Blueprint("upload", __name__)

@upload_bp.route("/", methods=["POST"])
def upload_file():
    # TODO: implement file upload & validation
    return jsonify({"message": "Upload endpoint ready"}), 200
