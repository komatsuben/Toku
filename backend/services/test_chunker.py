from toc_chunker import chunk_by_toc
chapters = chunk_by_toc("test.pdf")

print(chapters)

# for ch in chapters:
#     print(ch["title"], len(ch["content"]))
