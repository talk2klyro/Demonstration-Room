import re
from markdown import markdown
from typing import Tuple

# Heuristics-based formatter. Not perfect, but practical scaffold.
def format_text_to_markdown(raw: str) -> str:
    text = raw.strip()

    # Normalize Windows line endings
    text = text.replace("\r\n", "\n")

    # 1) Simple title detection: If first line is short and next line is empty or dashed -> H1
    lines = text.split("\n")
    if len(lines) >= 2 and re.match(r'^[\-\=]{3,}$', lines[1].strip()):
        # Convert "Title\n-----" -> "# Title"
        title = lines[0].strip()
        rest = "\n".join(lines[2:]).strip()
        text = f"# {title}\n\n{rest}"

    # 2) Convert lines that start with "##" or "###" left as-is; handle plain lines that look like "Subtitle:" -> H2
    def subtitle_to_h2(m):
        return f"## {m.group(1).strip()}"
    text = re.sub(r'^\s*([A-Za-z0-9 ].{1,60}):\s*$', subtitle_to_h2, text, flags=re.MULTILINE)

    # 3) Lists detection: lines starting with "- " or "* " or numbered "1. "
    # Ensure consistent bullets for hyphen lists
    text = re.sub(r'^\s*\*\s+', '- ', text, flags=re.MULTILINE)

    # 4) Action plans detection: lines starting with "TODO:", "Action:", or "Action Plan"
    # Convert " - Action: do X" -> "- [ ] do X"
    text = re.sub(r'(?im)^\s*(?:todo|action):\s*(.+)$', r'- [ ] \1', text, flags=re.MULTILINE)

    # 5) Detect inline "Check: Task" -> checklist too
    text = re.sub(r'(?im)^\s*check:\s*(.+)$', r'- [ ] \1', text, flags=re.MULTILINE)

    # 6) Table detection: simple pipe-free tables (rows with tabs or multiple spaces >=3)
    # Convert lines with " | " left as-is; else detect rows that contain "  " repeated
    def convert_space_table(txt):
        lines = txt.split("\n")
        out = []
        table_block = []
        for ln in lines:
            if re.search(r'\s{3,}', ln):  # likely columns separated by multiple spaces
                table_block.append(ln.strip())
            else:
                if table_block:
                    # build markdown table
                    cols = [re.split(r'\s{3,}', r) for r in table_block]
                    # use first row as header
                    header = cols[0]
                    header_line = "| " + " | ".join([c.strip() for c in header]) + " |"
                    sep = "| " + " | ".join(['---'] * len(header)) + " |"
                    out.append(header_line)
                    out.append(sep)
                    for r in cols[1:]:
                        out.append("| " + " | ".join([c.strip() for c in r]) + " |")
                    table_block = []
                out.append(ln)
        # flush remaining
        if table_block:
            cols = [re.split(r'\s{3,}', r) for r in table_block]
            header = cols[0]
            header_line = "| " + " | ".join([c.strip() for c in header]) + " |"
            sep = "| " + " | ".join(['---'] * len(header)) + " |"
            out.append(header_line)
            out.append(sep)
            for r in cols[1:]:
                out.append("| " + " | ".join([c.strip() for c in r]) + " |")
        return "\n".join(out)

    text = convert_space_table(text)

    # 7) Make sure code blocks are fenced (triple backticks) — if user used indent 4 spaces, convert to fence
    text = re.sub(r'(?:\n(?: {4}.*\n?)+)', lambda m: "\n```\n" + "\n".join([ln[4:] for ln in m.group(0).splitlines()]) + "\n```\n", text)

    # Trim excessive blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text

# Also helper to produce HTML (for PDF/ePub)
def markdown_to_html(md: str) -> str:
    # markdown extension for tables, fenced code
    html = markdown(md, extensions=['fenced_code', 'tables', 'nl2br'])
    # minimal HTML wrapper
    return f"""<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 20px; line-height:1.6; color: #111;}}
h1,h2,h3 {{ color: #0b3d91; }}
code {{ background:#f7f7f7; padding:2px 4px; border-radius:4px; }}
pre {{ background:#f2f2f2; padding:10px; border-radius:6px; overflow:auto; }}
table {{ border-collapse: collapse; width: 100%; }}
table th, table td {{ border: 1px solid #ddd; padding: 8px; }}
</style>
</head>
<body>
{html}
</body>
</html>
"""
