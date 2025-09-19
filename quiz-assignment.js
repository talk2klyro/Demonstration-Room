let tasks = [];

fetch('assignmentlet tasks = [];

fetch('assignments.json')
  .then(res => res.json())
  .then(data => {
    tasks = data;
    renderTasks();
  })
  .catch(err => console.error("Error fetching assignments:", err));

function renderTasks() {
  const list = document.getElementById('tasksList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.classList.add('hub-card');

    const dueDate = new Date(task.due_date);
    const now = new Date();
    const status = dueDate >= now ? 'Pending ⏳' : 'Overdue ⚠️';

    card.innerHTML = `
      <h3>${task.title}</h3>
      <p><strong>Type:</strong> ${task.type} | <strong>Due Date:</strong> ${task.due_date}</p>
      <p><strong>Status:</strong> ${status}</p>
      <a href="${task.link}" target="_blank" class="btn-outline">Start / View</a>
    `;

    list.appendChild(card);
  });
}
