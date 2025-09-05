from ebooklib import epub
from typing import Tuple
from ..utils import write_temp_bytes
import uuid

def create_epub_from_html(html: str, title: str = "Exported eBook") -> Tuple[bytes, str]:
    book = epub.EpubBook()
    book.set_identifier(str(uuid.uuid4()))
    book.set_title(title)
    book.set_language('en')

    # Add a simple chapter
    c1 = epub.EpubHtml(title='Content', file_name='chap_1.xhtml', lang='en')
    c1.content = html
    book.add_item(c1)

    # basic spine & toc
    book.toc = (epub.Link('chap_1.xhtml', 'Content', 'chap1'),)
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())

    book.spine = ['nav', c1]

    epub_bytes = epub.write_epub('-', book, {} )  # write to stdout-like not supported; use workaround
    # Actually ebooklib doesn't return bytes; we create file then read it:
    import tempfile, os
    fd, path = tempfile.mkstemp(suffix='.epub')
    os.close(fd)
    epub.write_epub(path, book)
    with open(path, 'rb') as f:
        data = f.read()
    os.remove(path)
    _, fname = write_temp_bytes(data, suffix=".epub")
    return data, fname
