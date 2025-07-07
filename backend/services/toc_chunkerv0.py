import fitz
import re

def is_probable_toc(text: str) -> bool:
    """
    Returns True if the text contains lines that likely indicate the start of a ToC section.
    """
    toc_keywords = ["table of contents", "contents", "content", "toc", "chapter"]
    lines = text.lower().splitlines()

    return any(
        any(keyword in line for keyword in toc_keywords)
        for line in lines
        if len(line.strip()) < 80  # avoid false positives in long body paragraphs
    )

def looks_like_real_title(title: str) -> bool:
    title = title.strip()

    if not title: return False
    if len(title) < 10: return False  # shorter than typical headings
    if title.count(" ") < 2: return False  # less than 3 words
    if re.search(r"\b(isbn|copyright|library|edition|printed|permission)\b", title.lower()):
        return False
    if re.fullmatch(r"[A-Z\s]+", title): return False  # All caps = likely author/publisher
    if re.fullmatch(r"[^\w]*", title): return False  # only punctuation/symbols
    if sum(c.isdigit() for c in title) > len(title) * 0.4: return False  # too numeric
    if len(title) > 150: return False
    return True


def extract_toc_entries(text: str, max_page: int):
    pattern = re.compile(
    r"""
    ^\s*
    (?P<title>[A-Za-z0-9:,.'”\"()\-–— \u2014]+?)       # Clean characters only
    [.\u2026\s]*                                       # Dots/spaces before number
    (?P<page>\d{1,4})\s*$                              # Page at end of line
    """,
    re.MULTILINE | re.VERBOSE,
)


    entries = []

    for match in pattern.finditer(text):
        title = match.group("title").strip(" .:\u2026")
        try:
            page = int(match.group("page"))
            if 1 <= page <= max_page and looks_like_real_title(title):
                entries.append({"title": title, "page": page})
        except ValueError:
            continue
            
    return entries

def chunk_by_toc(pdf_path: str, debug=False):
    doc = fitz.open(pdf_path)

    toc_text = ""
    for i in range(min(10, len(doc))):
        toc_text += doc[i].get_text()

    if not is_probable_toc(toc_text):
        print("❌ No ToC found. Falling back to smart chunking.")
        return None

    print("✅ ToC likely found. Extracting chapters...")
    toc = extract_toc_entries(toc_text, max_page=len(doc))

    if debug:
        print("--- TOC ENTRIES ---")
        for t in toc:
            print(f"{t['title']} → Page {t['page']}")

    if not toc:
        print("⚠️ ToC pattern found, but no valid entries extracted.")
        return None

    chunks = []
    for i in range(len(toc)):
        start = toc[i]["page"] - 1
        end = min(toc[i + 1]["page"] - 1, len(doc)) if i + 1 < len(toc) else len(doc)
        start = min(start, len(doc) - 1)  # Also clamp start just in case

        content = "".join([doc[p].get_text() for p in range(start, end)])
        chunks.append({
            "id": i,
            "title": toc[i]["title"],
            "content": content
        })

    if debug:
        import json
        with open("debug_chunk_output.json", "w", encoding="utf-8") as f:
            json.dump(chunks, f, ensure_ascii=False, indent=2)

    return chunks
