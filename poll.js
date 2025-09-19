let problems = [];

// Fetch existing problems from polls.json
fetch('polls.json')
  .then(res => res.json())
  .then(data => {
    problems = data;
    renderProblems();
  })
  .catch(err => console.error("Error fetching problems:", err));

// Form submission
document.getElementById('problemForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('problemTitle').value;
  const description = document.getElementById('problemDescription').value;
  const anonymous = document.getElementById('anonymousToggle').checked;

  const newProblem = {
    id: problems.length + 1,
    title: anonymous ? `${title} (Anonymous)` : title,
    description,
    upvotes: 0,
    solution: ""
  };

  problems.push(newProblem);
  renderProblems();
  e.target.reset();
});

// Render problems dynamically
function renderProblems() {
  const list = document.getElementById('problemList');
  list.innerHTML = '';

  problems
    .sort((a, b) => b.upvotes - a.upvotes) // Sort by popularity
    .forEach(problem => {
      const card = document.createElement('div');
      card.classList.add('hub-card');
      card.innerHTML = `
        <h4>${problem.title}</h4>
        <p>${problem.description}</p>
        <p>Upvotes: <span id="upvotes-${problem.id}">${problem.upvotes}</span></p>
        <button class="btn-outline" onclick="upvote(${problem.id})">👍 Upvote</button>
        ${problem.solution ? `<p>Solution: <a href="${problem.solution}" target="_blank">View Template</a></p>` : ''}
      `;
      list.appendChild(card);
    });
}

// Upvote function
function upvote(id) {
  const problem = problems.find(p => p.id === id);
  if (!problem) return;
  problem.upvotes += 1;
  renderProblems();
}
