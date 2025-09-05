from backend.formatter import format_text_to_markdown, markdown_to_html
from backend.exporters.pdf_exporter import html_to_pdf_bytes
from backend.exporters.docx_exporter import html_to_docx_bytes
from backend.exporters.epub_exporter import create_epub_from_html

def test_pdf_creation():
    md = format_text_to_markdown("Title\n----\nHello world")
    html = markdown_to_html(md)
    pdf = html_to_pdf_bytes(html)
    assert isinstance(pdf, (bytes, bytearray))
    assert len(pdf) > 100

def test_docx_creation():
    md = format_text_to_markdown("Heading\n----\n- one\n- two")
    html = markdown_to_html(md)
    docx_bytes, _ = html_to_docx_bytes(html)
    assert isinstance(docx_bytes, (bytes, bytearray))
    assert len(docx_bytes) > 100

def test_epub_creation():
    md = format_text_to_markdown("Hello\n\nThis is a test")
    html = markdown_to_html(md)
    epub_bytes, _ = create_epub_from_html(html)
    assert isinstance(epub_bytes, (bytes, bytearray))
    assert len(epub_bytes) > 100
