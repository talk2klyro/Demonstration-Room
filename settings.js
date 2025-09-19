let settings = {};

// Load settings from JSON
fetch('settings.json')
  .then(res => res.json())
  .then(data => {
    settings = data;
    populateSettings();
  })
  .catch(err => console.error("Error fetching settings:", err));

function populateSettings() {
  document.getElementById('name').value = settings.name || '';
  document.getElementById('email').value = settings.email || '';
  document.getElementById('notifications').checked = settings.notifications || false;
  document.getElementById('dark_mode').checked = settings.dark_mode || false;
  document.getElementById('poll_anonymous').checked = settings.poll_anonymous || true;
}

// Save settings (simulate, front-end only)
document.getElementById('settingsForm').addEventListener('submit', e => {
  e.preventDefault();
  settings.name = document.getElementById('name').value;
  settings.email = document.getElementById('email').value;
  settings.notifications = document.getElementById('notifications').checked;
  settings.dark_mode = document.getElementById('dark_mode').checked;
  settings.poll_anonymous = document.getElementById('poll_anonymous').checked;

  console.log("Settings saved:", settings);
  alert("Your settings have been saved ✅");
});
