from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.database.db import get_db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Missing JSON payload"}), 400

        # Basic required fields validation
        required_fields = ["name", "email", "password", "businessName", "industry", "yearsInOperation", "loanAmount", "loanTenure"]
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Get database instance
        db = get_db()
        users_collection = db.users

        # Check if email already exists
        if users_collection.find_one({"email": data["email"]}):
            return jsonify({"error": "User with this email already exists"}), 409

        # Create new user document
        new_user = {
            "name": data["name"],
            "email": data["email"],
            "password": generate_password_hash(data["password"], method="pbkdf2:sha256"), # Hash the password
            "businessName": data["businessName"],
            "industry": data["industry"],
            "yearsInOperation": int(data["yearsInOperation"]),
            "loanAmount": float(data["loanAmount"]) if data["loanAmount"] else 0.0,
            "loanTenure": int(data["loanTenure"]) if data["loanTenure"] else 0,
        }

        # Insert into database
        result = users_collection.insert_one(new_user)

        return jsonify({
            "message": "User registered successfully",
            "userId": str(result.inserted_id)
        }), 201

    except Exception as e:
        print(f"Registration Error: {e}")
        return jsonify({"error": "An internal error occurred during registration"}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        if not data or not data.get("email") or not data.get("password"):
            return jsonify({"error": "Missing email or password"}), 400

        # Get database instance
        db = get_db()
        users_collection = db.users

        # Find user
        user = users_collection.find_one({"email": data["email"]})
        if not user or not check_password_hash(user["password"], data["password"]):
            return jsonify({"error": "Invalid email or password"}), 401

        # Return user details without password
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": str(user["_id"]),
                "name": user.get("name"),
                "email": user.get("email"),
                "businessName": user.get("businessName"),
                "industry": user.get("industry")
            }
        }), 200

    except Exception as e:
        print(f"Login Error: {e}")
        return jsonify({"error": "An internal error occurred during login"}), 500
