from backend.formatter import format_text_to_markdown

def test_title_underline_to_h1():
    raw = "My Title\n-----\nThis is content."
    md = format_text_to_markdown(raw)
    assert md.startswith("# My Title")
    assert "This is content." in md

def test_todo_to_checklist():
    raw = "TODO: Finish tests\nSome text."
    md = format_text_to_markdown(raw)
    assert "- [ ] Finish tests" in md
