import os
import tempfile
from pathlib import Path
from typing import Tuple

def write_temp_bytes(data: bytes, suffix: str) -> Tuple[str, str]:
    fd, path = tempfile.mkstemp(suffix=suffix)
    os.close(fd)
    with open(path, "wb") as f:
        f.write(data)
    return path, str(Path(path).name)

def cleanup_file(path: str):
    try:
        os.remove(path)
    except Exception:
        pass
