// Fetch courses from JSON and render
fetch('courses.json')
  .then(response => response.json())
  .then(courses => {
    const grid = document.getElementById('coursesGrid');
    courses.forEach(course => {
      const card = document.createElement('div');
      card.classList.add('hub-card'); // reuse hub-card CSS

      card.innerHTML = `
        <img src="${course.thumbnail}" alt="${course.title}">
        <h3>${course.title}</h3>
        <p>Tutor: ${course.tutor}</p>
        <p>Lessons: ${course.lessons}</p>
        <p>Price: ₦${course.price}</p>
        <button class="btn" onclick="viewCourse(${course.id})">View Course</button>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => console.error("Error fetching courses:", err));

function viewCourse(courseId) {
  alert(`Redirecting to course ID: ${courseId}`);
  // Later, link to lesson.html with courseId as query param
}
