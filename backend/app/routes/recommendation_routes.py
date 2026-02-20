from flask import Blueprint, jsonify

recommendation_bp = Blueprint("recommendation", __name__)

@recommendation_bp.route("/loans", methods=["GET"])
def get_loan_recommendations():
    # TODO: implement loan optimization logic
    return jsonify({"message": "Recommendation endpoint ready"}), 200
