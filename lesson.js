let lessonsData = [];
let currentLessonId = null;

// Fetch lessons from JSON
fetch('lessons.json')
  .then(res => res.json())
  .then(data => {
    lessonsData = data;
    renderLessons();
    // Load first lesson by default
    if (lessonsData.length > 0) loadLesson(lessonsData[0].id);
  })
  .catch(err => console.error("Error fetching lessons:", err));

// Render list of lessons
function renderLessons() {
  const list = document.getElementById('lessonsList');
  list.innerHTML = '';
  lessonsData.forEach(lesson => {
    const btn = document.createElement('button');
    btn.classList.add('btn-outline');
    btn.textContent = lesson.title;
    btn.onclick = () => loadLesson(lesson.id);
    list.appendChild(btn);
  });
}

// Load selected lesson
function loadLesson(id) {
  currentLessonId = id;
  const lesson = lessonsData.find(l => l.id === id);
  if (!lesson) return;

  document.getElementById('lessonVideo').src = lesson.video_url;
  document.getElementById('lessonTitle').textContent = lesson.title;
  document.getElementById('lessonNotes').textContent = lesson.notes;
  document.getElementById('lessonDuration').textContent = lesson.duration;
}
