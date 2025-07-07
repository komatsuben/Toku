import re

def chunk_into_chapters(text: str):
    # Simple chapter regex
    chapters = re.split(r'(Chapter \d+[\:\.\-\s]+)', text)
    
    results = []
    i = 1
    while i < len(chapters):
        title = chapters[i].strip()
        content = chapters[i+1].strip() if i+1 < len(chapters) else ""
        results.append({ "id": len(results)+1, "title": title, "content": content })
        i += 2

    return results
