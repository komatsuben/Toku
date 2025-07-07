from flask import Blueprint, request, jsonify
from services.pdf_reader import extract_text_from_pdf
from services.chunker import chunk_into_chapters
from services.summarizer import summarize_chapters

summarize_bp = Blueprint("summarize", __name__)

@summarize_bp.route("/summarize", methods=["POST"])
def summarize_pdf():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    raw_text = extract_text_from_pdf(file)
    chapters = chunk_into_chapters(raw_text)
    summarized = summarize_chapters(chapters)

    return jsonify({ "chapters": summarized })
