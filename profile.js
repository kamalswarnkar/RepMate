// profile.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".profile-form");
  const inputs = form.querySelectorAll("input, select, textarea");
  const saveBtn = document.querySelector(".btn-primary");
  const logoutBtn = document.querySelector(".btn-logout");
  const goalBtn = document.querySelector(".goal .btn-primary");
  const profilePic = document.querySelector(".profile-image-box img");
  const uploadInput = document.querySelector("#profile-upload");

  // ⭐️ Get current user email
  const currentEmail = localStorage.getItem("repMateUserEmail");

  // ⭐️ Load that user's profile
  let storedProfile = JSON.parse(localStorage.getItem(`repMateUserProfile_${currentEmail}`)) || {};

  // Prefill form fields
  const fields = [...inputs];
  fields.forEach((input, idx) => {
    if (input.type !== "file" && input.tagName !== "BUTTON") {
      input.value = storedProfile[input.name || idx] || "";
    }
  });

  // Prefill profile image
  if (storedProfile.avatar) {
    profilePic.src = storedProfile.avatar;
  }

  // Auto-save on input change
  inputs.forEach(input => {
    input.addEventListener("change", () => {
      fields.forEach((input, idx) => {
        storedProfile[input.name || idx] = input.value;
      });

      // ⭐️ Save under user-specific key
      localStorage.setItem(`repMateUserProfile_${currentEmail}`, JSON.stringify(storedProfile));
    });
  });

  // Avatar upload
  uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      profilePic.src = reader.result;
      storedProfile.avatar = reader.result;

      // ⭐️ Save under user-specific key
      localStorage.setItem(`repMateUserProfile_${currentEmail}`, JSON.stringify(storedProfile));
    };
    reader.readAsDataURL(file);
  });

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Changes saved!");
  });

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("repMateUserLoggedIn");
    localStorage.removeItem("repMateUserEmail");
    alert("You've been logged out!");
    window.location.href = "login.html";
  });

  goalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "goal-selection.html";
  });
});
