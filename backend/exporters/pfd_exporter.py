from weasyprint import HTML
from typing import Tuple
from ..config import OUTPUT_DIR
import os
from ..utils import write_temp_bytes

def html_to_pdf_bytes(html: str) -> bytes:
    # WeasyPrint can write to bytes
    pdf = HTML(string=html).write_pdf()
    return pdf

def export_pdf_from_markdown(markdown_html: str, filename_hint: str = "export") -> Tuple[bytes, str]:
    pdf_bytes = html_to_pdf_bytes(markdown_html)
    _, fname = write_temp_bytes(pdf_bytes, suffix=".pdf")
    return pdf_bytes, fname
