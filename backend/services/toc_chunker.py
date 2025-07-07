import fitz
import re

def is_probable_toc(text: str) -> bool:
    """
    Returns True if the text contains common ToC headers or chapter patterns.
    """
    toc_keywords = re.compile(
        r"(table of contents|^contents$|^content$|^chapter\s+[\divxlc]+|^part\s+\w+|^section\s+\d+)",
        re.IGNORECASE | re.MULTILINE
    )
    return bool(toc_keywords.search(text))


def chunk_by_toc(pdf_path: str):
    doc = fitz.open(pdf_path)

    # Step 1: Scan first 10 pages to find ToC
    toc_text = ""
    for i in range(min(10, len(doc))):
        toc_text += doc[i].get_text()

    if not is_probable_toc(toc_text):
        print("❌ No ToC found. Falling back to smart chunking.")
        return None

    print("✅ ToC likely found. Extracting chapters...")
    toc = extract_toc_entries(toc_text)
    print(toc)

    if not toc:
        print("⚠️ ToC pattern found, but no valid entries extracted.")
        return None

    # Step 2: Extract chunks based on ToC
    chunks = []
    for i in range(len(toc)):
        start = toc[i]["page"] - 1
        end = toc[i + 1]["page"] - 1 if i + 1 < len(toc) else len(doc)

        content = ""
        for page in doc[start:end]:
            content += page.get_text()

        chunks.append({
            "id": i,
            "title": toc[i]["title"],
            "content": content
        })

    return chunks
