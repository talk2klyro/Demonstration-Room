let certificates = [];

fetch('certificates.json')
  .then(res => res.json())
  .then(data => {
    certificates = data;
    renderCertificates();
  })
  .catch(err => console.error("Error fetching certificates:", err));

function renderCertificates() {
  const list = document.getElementById('certificateList');
  list.innerHTML = '';

  certificates.forEach(cert => {
    const card = document.createElement('div');
    card.classList.add('hub-card');

    card.innerHTML = `
      <h3>${cert.course}</h3>
      <p><strong>Student:</strong> ${cert.student}</p>
      <p><strong>Completion Date:</strong> ${cert.date}</p>
      <a href="${cert.certificate_link}" target="_blank" class="btn-outline">View / Download Certificate</a>
    `;

    list.appendChild(card);
  });
}
