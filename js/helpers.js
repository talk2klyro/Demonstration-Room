// Snackbar notification
function showSnackbar(message) {
  const snackbar = document.getElementById('snackbar');
  snackbar.textContent = message;
  snackbar.classList.add('show');
  setTimeout(() => snackbar.classList.remove('show'), 3000);
}

// Floating Action Button animation (using GSAP if loaded)
if(window.gsap) {
  const fabs = document.querySelectorAll('.fab');
  fabs.forEach(fab => {
    gsap.from(fab, { scale: 0.8, duration: 0.5, ease: "back.out(1.7)" });
  });
}
