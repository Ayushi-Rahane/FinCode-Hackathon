from flask import Blueprint, request, jsonify
import google.generativeai as genai
import os
import json
import traceback

chat_bp = Blueprint("chat", __name__)

SYSTEM_PROMPT = """You are Credalytix Copilot — a friendly, expert AI financial advisor embedded inside a business credit assessment platform called Credalytix.

Your role:
• Answer questions about the user's OWN financial data (provided below as JSON context).
• Provide actionable advice on improving credit scores, managing cash flow, optimizing loans, and reducing risk.
• Be concise (2-4 sentences unless the user asks for detail).
• Use specific numbers from their data when possible (e.g. "Your liquidity score is 72/100").
• Never invent data that isn't in the context. If you don't have the info, say so politely.
• Format important numbers in bold using **bold** markdown.
• Be encouraging and professional.

The user's financial analysis data is:
```json
{context}
```

If the context is empty or missing, let the user know they need to upload their bank statement first to get personalised answers.
"""


@chat_bp.route("", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()
    context = data.get("context", {})

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        # Re-read API key on each request (so .env changes take effect without restart)
        from dotenv import load_dotenv
        load_dotenv(override=True)
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

        system_instruction = SYSTEM_PROMPT.replace("{context}", json.dumps(context, indent=2))
        prompt = f"{system_instruction}\n\nUser question: {user_message}"

        # Try models in order — gemini-2.5-flash works for this project
        models_to_try = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"]
        last_error = None

        for model_name in models_to_try:
            try:
                model = genai.GenerativeModel(model_name)
                response = model.generate_content(prompt)
                return jsonify({"reply": response.text})
            except Exception as model_err:
                last_error = model_err
                print(f"Model {model_name} failed: {model_err}")
                continue

        raise last_error
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Failed to get AI response: {str(e)}"}), 500
