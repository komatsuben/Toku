import fitz
import re
import json
from difflib import SequenceMatcher

# --- Helpers ---

def detect_metadata_pages(doc, max_check=5):
    blacklist_keywords = [
        "isbn", "copyright", "library", "printed", "edition",
        "publication", "publisher", "u.s.a", "all rights reserved"
    ]
    metadata_pages = set()

    for i in range(min(max_check, len(doc))):
        text = doc[i].get_text().lower()
        if any(k in text for k in blacklist_keywords):
            metadata_pages.add(i)
            continue

        word_count = len(text.split())
        digit_count = sum(c.isdigit() for c in text)
        if word_count < 30 or digit_count > len(text) * 0.3:
            metadata_pages.add(i)

    return metadata_pages


def is_probable_toc(text: str) -> bool:
    toc_keywords = ["table of contents", "contents", "content", "toc", "chapter"]
    lines = text.lower().splitlines()
    return any(
        any(keyword in line for keyword in toc_keywords)
        for line in lines if len(line.strip()) < 80
    )

def score_title_confidence(title: str) -> float:
    score = 1.0
    title = title.strip()

    if not title:
        return 0.0
    if len(title) < 10:
        score -= 0.3
    if title.count(" ") < 2:
        score -= 0.2
    if re.search(r"\b(isbn|copyright|library|edition|printed|permission|publication)\b", title.lower()):
        score -= 0.4
    if re.fullmatch(r"[A-Z\s]+", title):
        score -= 0.3
    if re.fullmatch(r"[^\w]*", title):
        score -= 0.4
    if sum(c.isdigit() for c in title) > len(title) * 0.4:
        score -= 0.2
    if len(title) > 150:
        score -= 0.2
    if re.match(r"^[\d\W\s]+$", title):
        score -= 0.5

    return max(score, 0.0)

def fuzzy_match_title_on_page(doc, title: str, page_num: int, metadata_pages=None) -> bool:
    if metadata_pages and page_num - 1 in metadata_pages:
        print(f"⛔ Skipped fuzzy match: Page {page_num} is metadata.")
        return False

    if page_num < 1 or page_num > len(doc):
        return False

    page_text = doc[page_num - 1].get_text().lower()
    title = title.lower()

    # Try full title match first
    similarity = SequenceMatcher(None, title, page_text).ratio()
    if similarity > 0.3:
        return True

    # Fallback: word overlap
    match_count = sum(1 for word in title.split() if word in page_text)
    return match_count / max(1, len(title.split())) > 0.5

# --- Main ToC Extraction ---

def extract_toc_entries(text: str, max_page: int, doc=None, metadata_pages=None):
    pattern = re.compile(
        r"""
        ^\s*
        (?P<title>[A-Za-z0-9:,.'”\"()\-–— \u2014]+?)
        [.\u2026\s]*
        (?P<page>\d{1,4})\s*$
        """,
        re.MULTILINE | re.VERBOSE,
    )

    entries = []
    last_page = 0  # Start from 0 to enforce strictly increasing page order

    for match in pattern.finditer(text):
        title = match.group("title").strip(" .:\u2026")
        try:
            page = int(match.group("page"))
            if not (1 <= page <= max_page):
                continue

            if page <= last_page:
                print(f"⛔ Skipped (non-increasing page): '{title}' on page {page}")
                continue

            confidence = score_title_confidence(title)

            if confidence < 0.5:
                print(f"⛔ Skipped (low confidence {confidence:.2f}): '{title}'")
                continue

            # ✅ High-confidence entries accepted directly
            if confidence > 0.85:
                print(f"✅ Force accepted (confidence {confidence:.2f}): '{title}' on page {page}")
                entries.append({"title": title, "page": page})
                last_page = page
                continue

            # ❌ Fuzzy match fallback
            if doc and fuzzy_match_title_on_page(doc, title, page, metadata_pages):
                entries.append({"title": title, "page": page})
                last_page = page
            else:
                print(f"⛔ Skipped (fuzzy mismatch): '{title}' on page {page}")
        except ValueError:
            continue

    return entries


# --- Chunking Function ---

def chunk_by_toc(pdf_path: str, debug=False):
    doc = fitz.open(pdf_path)
    metadata_pages = detect_metadata_pages(doc)

    # Build toc_text by skipping metadata pages
    toc_text = ""
    scanned = 0
    for i in range(len(doc)):
        if i in metadata_pages:
            continue
        toc_text += doc[i].get_text()
        scanned += 1
        if scanned >= 10:
            break

    if not is_probable_toc(toc_text):
        print("❌ No ToC found. Falling back to smart chunking.")
        return None

    print("✅ ToC likely found. Extracting chapters...")
    toc = extract_toc_entries(
        toc_text,
        max_page=len(doc),
        doc=doc,
        metadata_pages=metadata_pages
    )

    if debug:
        print(f"--- TOC ENTRIES ({len(toc)}) ---")
        for t in toc:
            print(f"{t['title']} → Page {t['page']}")

    if not toc:
        print("⚠️ ToC pattern found, but no valid entries extracted.")
        return None

    chunks = []
    for i in range(len(toc)):
        start = toc[i]["page"] - 1
        end = min(toc[i + 1]["page"] - 1, len(doc)) if i + 1 < len(toc) else len(doc)
        start = min(start, len(doc) - 1)

        content = "".join([doc[p].get_text() for p in range(start, end)])
        chunks.append({
            "id": i,
            "title": toc[i]["title"],
            "content": content
        })

    if debug:
        with open("debug_chunk_output.json", "w", encoding="utf-8") as f:
            json.dump(chunks, f, ensure_ascii=False, indent=2)

    return chunks
