from flask import Flask, request, jsonify
from flask_cors import CORS
from services import smart_chunker
from utils.prompts import summarize_chapters  # ✅ Ensure this import is present
import os
import traceback

app = Flask(__name__)
CORS(app)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.route("/api/chunk", methods=["POST"])
def chunk_pdf():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    save_path = os.path.join(UPLOAD_DIR, file.filename)
    file.save(save_path)

    try:
        chunks = smart_chunker(save_path, debug=True)
        return jsonify(chunks)
    except Exception as e:
        print("[❌ CHUNK ERROR]", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(save_path):
            os.remove(save_path)

@app.route("/api/summarize", methods=["POST"])
def summarize_pdf():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    save_path = os.path.join(UPLOAD_DIR, file.filename)
    file.save(save_path)

    try:
        print(f"📥 Uploaded: {file.filename}")
        chunks = smart_chunker(save_path, debug=True)
        print(f"📑 Chunked into {len(chunks)} sections. Sending to GROQ...")

        summaries = summarize_chapters(chunks)
        print(f"🧠 Summarization complete. Returning {len(summaries)} summaries.")

        return jsonify({
            "status": "ok",
            "summary": summaries
        })
    except Exception as e:
        print("[❌ SUMMARIZE ERROR]", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(save_path):
            os.remove(save_path)
