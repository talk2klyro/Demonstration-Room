let quizzes = [];

fetch('quizzes.json')
  .then(res => res.json())
  .then(data => {
    quizzes = data;
    renderQuiz();
  })
  .catch(err => console.error("Error fetching quizzes:", err));

function renderQuiz() {
  const form = document.getElementById('quizForm');
  form.innerHTML = '';
  
  quizzes.forEach((q, idx) => {
    const container = document.createElement('div');
    container.classList.add('quiz-card');
    
    let optionsHtml = '';
    q.options.forEach(option => {
      optionsHtml += `
        <label>
          <input type="radio" name="q${idx}" value="${option}" required> ${option}
        </label><br>
      `;
    });

    container.innerHTML = `
      <h3>Q${idx + 1}: ${q.question}</h3>
      ${optionsHtml}
    `;
    
    form.appendChild(container);
  });
}

document.getElementById('submitQuiz').addEventListener('click', () => {
  let score = 0;
  quizzes.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    if (selected && selected.value === q.answer) score++;
  });

  document.getElementById('quizResult').textContent = `You scored ${score} / ${quizzes.length}`;
});
