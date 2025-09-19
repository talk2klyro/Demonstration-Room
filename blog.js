let blogs = [];

fetch('blog.json')
  .then(res => res.json())
  .then(data => {
    blogs = data;
    renderBlogs();
  })
  .catch(err => console.error("Error fetching blog posts:", err));

function renderBlogs() {
  const list = document.getElementById('blogList');
  list.innerHTML = '';

  blogs.forEach(blog => {
    const card = document.createElement('div');
    card.classList.add('hub-card');

    card.innerHTML = `
      <h3>${blog.title}</h3>
      <p><strong>Author:</strong> ${blog.author} | <strong>Date:</strong> ${blog.date}</p>
      <p>${blog.summary}</p>
      <a href="${blog.link}" target="_blank" class="btn-outline">Read Full Article</a>
    `;

    list.appendChild(card);
  });
}
