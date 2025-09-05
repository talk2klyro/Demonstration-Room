from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel
from .formatter import format_text_to_markdown, markdown_to_html
from .exporters.pdf_exporter import export_pdf_from_markdown
from .exporters.epub_exporter import create_epub_from_html
from .exporters.docx_exporter import html_to_docx_bytes
from starlette.middleware.cors import CORSMiddleware
import io

app = FastAPI(title="AI Text Formatter Portal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RawPayload(BaseModel):
    text: str
    filename: str | None = "export"

@app.post("/format")
async def format_text(payload: RawPayload):
    md = format_text_to_markdown(payload.text)
    html = markdown_to_html(md)
    return {"markdown": md, "html": html}

@app.post("/export/pdf")
async def export_pdf(payload: RawPayload):
    md = format_text_to_markdown(payload.text)
    html = markdown_to_html(md)
    pdf_bytes, fname = export_pdf_from_markdown(html, payload.filename or "export")
    return StreamingResponse(io.BytesIO(pdf_bytes), media_type="application/pdf", headers={
        "Content-Disposition": f'attachment; filename="{payload.filename or "export"}.pdf"'
    })

@app.post("/export/epub")
async def export_epub(payload: RawPayload):
    md = format_text_to_markdown(payload.text)
    html = markdown_to_html(md)
    epub_bytes, fname = create_epub_from_html(html, title=payload.filename or "ebook")
    return StreamingResponse(io.BytesIO(epub_bytes), media_type="application/epub+zip", headers={
        "Content-Disposition": f'attachment; filename="{payload.filename or "export"}.epub"'
    })

@app.post("/export/docx")
async def export_docx(payload: RawPayload):
    md = format_text_to_markdown(payload.text)
    html = markdown_to_html(md)
    docx_bytes, fname = html_to_docx_bytes(html)
    return StreamingResponse(io.BytesIO(docx_bytes), media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document", headers={
        "Content-Disposition": f'attachment; filename="{payload.filename or "export"}.docx"'
    })
