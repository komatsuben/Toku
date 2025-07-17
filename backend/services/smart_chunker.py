import fitz
import re
import json
from typing import List

MAX_PAGES_PER_CHUNK = 25  # safety cap

def clean_text(text: str) -> str:
    lines = text.splitlines()
    cleaned_lines = [line.strip() for line in lines if line.strip()]
    return " ".join(cleaned_lines)

def extract_heading_pages(doc, min_gap=2):
    heading_pattern = re.compile(
        r"^\s*(chapter|section|part)?\s*\d+[\.:]?\s+[\w\"'.:,-]{3,}", re.IGNORECASE
    )

    candidate_pages = []
    last_page = -min_gap

    for i in range(len(doc)):
        text = doc[i].get_text("text").strip()
        for line in text.splitlines():
            if heading_pattern.match(line.strip()):
                if i - last_page >= min_gap:
                    candidate_pages.append(i)
                    last_page = i
                break
    return candidate_pages

def hard_split(doc, chunk_size=10, overlap=1):
    chunks = []
    i = 0
    idx = 0

    while i < len(doc):
        start = max(i - overlap, 0)
        end = min(i + chunk_size, len(doc))
        content = "".join([doc[p].get_text() for p in range(start, end)])
        content = clean_text(content)

        chunks.append({
            "id": idx,
            "title": f"Chunk {idx+1} (Pages {start+1}-{end})",
            "content": content
        })
        i += chunk_size
        idx += 1

    return chunks

def smart_chunker_from_doc(doc, debug=False):
    heading_pages = extract_heading_pages(doc)
    if debug:
        print(f"📚 Found {len(heading_pages)} heading pages.")

    if len(heading_pages) >= 3:  # good enough for semantic chunking
        chunks = []
        for i, page_num in enumerate(heading_pages):
            start = page_num
            end = heading_pages[i + 1] if i + 1 < len(heading_pages) else len(doc)
            end = min(end, start + MAX_PAGES_PER_CHUNK, len(doc))  # apply cap

            content = "".join([doc[p].get_text() for p in range(start, end)])
            content = clean_text(content)

            chunks.append({
                "id": i,
                "title": f"Section starting page {start + 1}",
                "content": content
            })
        if debug:
            print(f"✅ Used heading-based chunking.")
        return chunks

    # Fallback
    chunks = hard_split(doc)
    if debug:
        print(f"⚠️ Falling back to hard split: {len(chunks)} chunks.")
    return chunks

def smart_chunker(pdf_path: str, debug=False):
    doc = fitz.open(pdf_path)
    return smart_chunker_from_doc(doc, debug=debug)

if __name__ == "__main__":
    chunks = smart_chunker("test.pdf", debug=True)
    with open("smart_chunks.json", "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)
