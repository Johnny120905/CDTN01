import os
import glob
import re

docs_dir = os.path.join(os.path.abspath("."), "docs")
md_files = glob.glob(os.path.join(docs_dir, "*.md"))

replacements = [
    (r"CDTN01/Test\.md", r"CDTN01/docs/test.md"),
    (r"CDTN01/test\.md", r"CDTN01/docs/test.md"),
    (r"CDTN01/thaydoithietke\.md", r"CDTN01/docs/thaydoithietke.md"),
    (r"CDTN01/thay-doi-thiet-ke\.md", r"CDTN01/docs/thaydoithietke.md"),
    (r"CDTN01/thietke\.md", r"CDTN01/docs/thietke.md"),
    (r"CDTN01/BT2\.md", r"CDTN01/docs/BT2.md"),
    (r"docs/docs/", r"docs/"), # In case of double docs
]

for fpath in md_files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    orig = content
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
    
    if content != orig:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed links in {os.path.basename(fpath)}")
    else:
        print(f"Links already consistent in {os.path.basename(fpath)}")
