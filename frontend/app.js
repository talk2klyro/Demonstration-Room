const editor = document.getElementById("editor");
const preview = document.getElementById("previewArea");
const formatBtn = document.getElementById("formatBtn");
const pdfBtn = document.getElementById("pdfBtn");
const epubBtn = document.getElementById("epubBtn");
const docxBtn = document.getElementById("docxBtn");
const filename = document.getElementById("filename");

const API_BASE = "http://localhost:8000";

function showPreview(html) {
  preview.innerHTML = html;
}

formatBtn.addEventListener("click", async () => {
  const text = editor.value;
  const payload = { text, filename: filename.value || "export" };
  const res = await fetch(`${API_BASE}/format`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  // preview HTML
  showPreview(data.html);
});

async function downloadExport(path, ext) {
  const text = editor.value;
  const payload = { text, filename: filename.value || "export" };
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    alert("Export failed.");
    return;
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = (filename.value || "export") + ext;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

pdfBtn.addEventListener("click", () => downloadExport("/export/pdf", ".pdf"));
epubBtn.addEventListener("click", () => downloadExport("/export/epub", ".epub"));
docxBtn.addEventListener("click", () => downloadExport("/export/docx", ".docx"));

// live preview basic: render markdown locally while typing
editor.addEventListener("input", () => {
  try {
    preview.innerHTML = marked.parse(editor.value || "");
  } catch (e) {
    preview.textContent = editor.value;
  }
});
