import os

def update_files():
    app_js_path = os.path.join("src", "static", "app.js")
    with open(app_js_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update live stock guide badge
    content = content.replace("Nhập từ khóa hoặc bấm Tra cứu", "Nhập từ khóa hoặc bấm Enter")

    # 2. Reset ticketIdInput initial value to empty string
    content = content.replace('placeholder="Ví dụ: TK-1092, TK-2026-8892" value="TK-1092"', 'placeholder="Ví dụ: TK-1092, TK-2026-8892" value=""')

    # 3. Add function handleSmartSearchKeyDown if not defined as function
    if "function handleSmartSearchKeyDown" not in content:
        target = "function handleSmartPartSearch(event) {"
        replacement = """function handleSmartSearchKeyDown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    executeSmartLookup();
  } else if (event.key === "Escape") {
    const dropdown = document.getElementById("partSuggestionsDropdown");
    if (dropdown) dropdown.classList.add("hidden");
  }
}

function handleSmartPartSearch(event) {"""
        content = content.replace(target, replacement, 1)

    # Write to all 3 paths
    paths = [
        os.path.join("src", "static", "app.js"),
        os.path.join("backend", "src", "static", "app.js"),
        os.path.join("frontend", "public", "app.js")
    ]

    for p in paths:
        if os.path.exists(p):
            with open(p, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated {p}")

if __name__ == "__main__":
    update_files()
