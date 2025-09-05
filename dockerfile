FROM python:3.11-slim

# Install dependencies needed by WeasyPrint (cairo/pango/gdk-pixbuf)
RUN apt-get update && apt-get install -y \
    build-essential libcairo2 libpango-1.0-0 libgdk-pixbuf2.0-0 libffi-dev libxml2 libxslt1.1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY backend/ /app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
