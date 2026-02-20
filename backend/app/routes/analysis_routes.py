from flask import Blueprint, jsonify

analysis_bp = Blueprint("analysis", __name__)

@analysis_bp.route("/score", methods=["GET"])
def get_score():
    # TODO: implement score analysis
    return jsonify({"message": "Analysis endpoint ready"}), 200
