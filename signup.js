const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("password-toggle");

passwordToggle.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");

function validatePassword() {
  if (password.value !== confirm_password.value) {
    confirm_password.setCustomValidity("Passwords do not match");
  } else {
    confirm_password.setCustomValidity("");
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".register-form form");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const formData = new FormData(form);

    // Convert FormData to JSON object
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    // Make POST request to Django backend
    axios
      .post("http://127.0.0.1:8000/auth/users/", jsonData)
      .then(function (response) {
        console.log("Data sent successfully");
        // Handle success response, maybe redirect user or show a success message
        form.reset(); // Reset the form to its initial state
      })
      .catch(function (error) {
        console.error("Error sending data:", error);
        // Handle error response, maybe show an error message to the user
      });
  });
});
