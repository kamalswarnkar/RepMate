// profile.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".profile-form");
  const inputs = form.querySelectorAll("input, select, textarea");
  const saveBtn = document.querySelector(".btn-primary");
  const logoutBtn = document.querySelector(".btn-logout");
  const goalBtn = document.querySelector(".goal .btn-primary");
  const profilePic = document.querySelector(".profile-image-box img");
  const uploadInput = document.querySelector("#profile-upload");

  const currentEmail = localStorage.getItem("repMateUserEmail");
  if (!currentEmail) {
    alert("User not logged in. Redirecting to login.");
    window.location.href = "login.html";
    return;
  }

  let storedProfile =
    JSON.parse(localStorage.getItem(`repMateUserProfile_${currentEmail}`)) || {};

  const fields = [...inputs];

  // Pre-fill form
  fields.forEach((input, idx) => {
    if (input.type !== "file" && input.tagName !== "BUTTON") {
      input.value = storedProfile[input.name || idx] || "";
    }
  });

  // Load profile image
  if (storedProfile.avatar) {
    profilePic.src = storedProfile.avatar;
  }

  // Save updates on input change
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      fields.forEach((input, idx) => {
        storedProfile[input.name || idx] = input.value;
      });

      localStorage.setItem(
        `repMateUserProfile_${currentEmail}`,
        JSON.stringify(storedProfile)
      );
    });
  });

  // Profile image upload
  uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      profilePic.src = reader.result;
      storedProfile.avatar = reader.result;

      localStorage.setItem(
        `repMateUserProfile_${currentEmail}`,
        JSON.stringify(storedProfile)
      );
    };
    reader.readAsDataURL(file);
  });

  // Save button handler
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fields.forEach((input, idx) => {
      storedProfile[input.name || idx] = input.value;
    });
    localStorage.setItem(
      `repMateUserProfile_${currentEmail}`,
      JSON.stringify(storedProfile)
    );
    alert("Changes saved!");
  });

  // Logout button handler
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Clear only the current user's data
    localStorage.removeItem("repMateUserLoggedIn");
    localStorage.removeItem("repMateUserEmail");
    localStorage.removeItem(`repMateUserProfile_${currentEmail}`);
    localStorage.removeItem("repMateUserProfile"); // Extra safety

    alert("You've been logged out!");
    window.location.href = "login.html";
  });

  // Goal button validation
  goalBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const requiredFields = [
      "username",
      "email",
      "age",
      "gender",
      "height",
      "weight",
      "fitness",
      "diet",
      "medical",
    ];

    const isProfileComplete = requiredFields.every((field) => {
      return storedProfile[field] && storedProfile[field].trim() !== "";
    });

    if (!isProfileComplete) {
      alert("Please complete your profile before selecting goals.");
      return;
    }

    localStorage.setItem("repMateUserProfile", JSON.stringify(storedProfile));
    window.location.href = "goal-selection.html";
  });
});
