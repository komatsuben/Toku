from toc_chunker import chunk_by_toc

chunks = chunk_by_toc("test.pdf", debug=True)
print(f"✅ Extracted {len(chunks)} chapters.")
