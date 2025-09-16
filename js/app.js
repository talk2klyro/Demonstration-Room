document.addEventListener('DOMContentLoaded', () => {

  // ===== Load resources.json =====
  fetch('data/resources.json')
    .then(res => res.json())
    .then(data => {
      // Academics Hub
      const pastQsContainer = document.getElementById('pastQs');
      data.academics.pastQuestions.forEach(item => {
        const div = document.createElement('div');
        div.className = 'resource-card';
        div.innerHTML = `${item.title} <button onclick="downloadResource('${item.file}')">Download</button>`;
        pastQsContainer.appendChild(div);
      });

      const notesContainer = document.getElementById('notes');
      data.academics.notes.forEach(item => {
        const div = document.createElement('div');
        div.className = 'resource-card';
        div.innerHTML = `${item.title} <button onclick="downloadResource('${item.file}')">Download</button>`;
        notesContainer.appendChild(div);
      });

      const tutorsContainer = document.getElementById('tutors');
      data.academics.tutors.forEach(tutor => {
        const div = document.createElement('div');
        div.className = 'resource-card';
        div.innerHTML = `${tutor.name} - ${tutor.subject} <button>Contact</button>`;
        tutorsContainer.appendChild(div);
      });

      const studyGroupsContainer = document.getElementById('studyGroups');
      data.academics.studyGroups.forEach(group => {
        const div = document.createElement('div');
        div.className = 'resource-card';
        div.innerHTML = `${group.name} - Members: ${group.members}`;
        studyGroupsContainer.appendChild(div);
      });

      // Marketplace
      const marketplaceContainer = document.querySelector('.marketplace');
      data.marketplace.forEach(shop => {
        const div = document.createElement('div');
        div.className = 'marketplace-card';
        div.innerHTML = `<h4>${shop.name}</h4><p>${shop.description} - ${shop.price}</p><button>Chat</button>`;
        marketplaceContainer.appendChild(div);
      });
    })
    .catch(err => console.error('Failed to load resources.json:', err));

  // ===== Tabs =====
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      tabContents.forEach(tc => tc.style.display='none');
      const target = document.getElementById(tab.dataset.tab);
      if(target) target.style.display='block';
    });
  });

  // ===== Snackbars =====
  function showSnackbar(message){
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.style.visibility = "visible";
    gsap.fromTo(snackbar, {y:50, opacity:0}, {y:0, opacity:1, duration:0.5});
    setTimeout(() => {
      gsap.to(snackbar, {y:50, opacity:0, duration:0.5, onComplete: ()=> snackbar.style.visibility="hidden"});
    }, 3000);
  }
  window.showSnackbar = showSnackbar; // make global

  // ===== Download Simulation =====
  window.downloadResource = function(file){
    showSnackbar(`Downloading ${file}...`);
  }

  // ===== Drag-and-Drop =====
  const homeFeed = document.getElementById('homeFeed');
  if(homeFeed){ Sortable.create(homeFeed, {animation:150, ghostClass:'dragging'}); }

  const circlesModule = document.getElementById('circlesModule');
  if(circlesModule){
    const postsTab = document.getElementById('posts');
    if(postsTab){ Sortable.create(postsTab, {animation:150, ghostClass:'dragging'}); }
  }

  // ===== FAB Animations =====
  const fabs = document.querySelectorAll('.fab, .fab-upload');
  fabs.forEach(fab => gsap.from(fab, {scale:0.8, duration:0.5, ease:"back.out(1.7)"}));

  // ===== Badge System =====
  window.awardBadge = function(name){
    const container = document.querySelector('.badge-container');
    if(container){
      const span = document.createElement('span');
      span.classList.add('badge');
      span.textContent = name;
      container.appendChild(span);
      showSnackbar(`Badge earned: ${name}`);
    }
  }

  // ===== Modal Handling =====
  const modal = document.getElementById('uploadModal');
  if(modal){
    const fabButton = document.querySelector('.fab');
    const closeBtn = modal.querySelector('.close');
    const uploadBtn = modal.querySelector('#uploadBtn');
    fabButton.addEventListener('click', ()=> modal.style.display='flex');
    closeBtn.addEventListener('click', ()=> modal.style.display='none');
    window.addEventListener('click', e => { if(e.target === modal) modal.style.display='none'; });
    uploadBtn.addEventListener('click', ()=>{
      const fileInput = document.getElementById('fileInput');
      if(fileInput.files.length > 0){
        showSnackbar(`${fileInput.files[0].name} uploaded!`);
        modal.style.display='none';
        fileInput.value = '';
        awardBadge('📁 Contributor');
      } else { showSnackbar('Please select a file!'); }
    });
  }

  // ===== Register Service Worker =====
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('js/sw.js')
      .then(()=> console.log('Service Worker Registered'))
      .catch(err=> console.log('SW registration failed:', err));
  }

});
