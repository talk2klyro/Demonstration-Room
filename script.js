// Toggle password visibility
document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = icon.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
      icon.textContent = "🙈";
    } else {
      input.type = "password";
      icon.textContent = "👁️";
    }
  });
});

// Dummy handlers (replace with Clerk SDK calls)
function loginWithGoogle() {
  console.log("Login with Google (Clerk integration here)");
}
function loginWithOtp() {
  console.log("Login with Email OTP (Clerk integration here)");
}
function signupWithGoogle() {
  console.log("Signup with Google (Clerk integration here)");
}
function signupWithOtp() {
  console.log("Signup with Email OTP (Clerk integration here)");
}

// Example form submission
document.getElementById("loginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  console.log("Login form submitted");
  // Redirect after login success
  window.location.href = "dashboard.html";
});

document.getElementById("signupForm")?.addEventListener("submit", e => {
  e.preventDefault();
  console.log("Signup form submitted");
  window.location.href = "dashboard.html";
});
