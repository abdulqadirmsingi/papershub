const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("password-toggle");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");
const confirm_password_toggle = document.getElementById(
  "confirm-password-toggle"
);

passwordToggle.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

confirm_password_toggle.addEventListener("click", function () {
  if (confirm_password.type === "password") {
    confirm_password.type = "text";
  } else {
    confirm_password.type = "password";
  }
});


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

    const existingErrors = form.querySelectorAll(".error-message");
    existingErrors.forEach((error) => error.remove());

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
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Account Made Succesfully!";
        errorMessage.classList.add("error-message");
        errorMessage.style.color = "green";
        errorMessage.style.paddingBottom = "20px";
        form.insertBefore(errorMessage, form.firstChild);
        // Handle success response, maybe redirect user or show a success message
        form.reset();
        setTimeout(() => {
          const successMessage = document.querySelector(".success-message");
          if (successMessage) {
            successMessage.remove();
          }
        }, 5000); 
      })

      .catch(function (error) {
        console.error("Error sending data:", error);
        // Handle error response, maybe show an error message to the user
        if (error.response.status === 400 && error.response.data.email) {
          const errorMessage = document.createElement("div");
          errorMessage.textContent =
            "Email is already taken. Please use a different email.";
          errorMessage.classList.add("error-message");
          errorMessage.style.color = "red"; 
          errorMessage.style.paddingBottom = "20px";
          form.insertBefore(errorMessage, form.firstChild); 
        } else if (
          error.response.status === 400 &&
          error.response.data.phone_number
        ) {
          const errorMessage = document.createElement("div");
          errorMessage.textContent =
            "Phone number does not match the required format or already exists.";
          errorMessage.classList.add("error-message");
          errorMessage.style.color = "red";
          errorMessage.style.paddingBottom = "20px";
          form.insertBefore(errorMessage, form.firstChild);
        } else if (
          error.response.status === 400 &&
          error.response.data.password
        ) {
          const errorMessage = document.createElement("div");
          errorMessage.textContent = error.response.data.password.join(" ");
          errorMessage.classList.add("error-message");
          errorMessage.style.color = "red";
          errorMessage.style.paddingBottom = "20px";
          form.insertBefore(errorMessage, form.firstChild);
        } else {
          // Handle other error responses, maybe show a general error message to the user
          const errorMessage = document.createElement("div");
          errorMessage.textContent = "Please enter the right credentials!";
          errorMessage.classList.add("error-message");
          errorMessage.style.color = "red";
          errorMessage.style.paddingBottom = "10px";
          form.insertBefore(errorMessage, form.firstChild);
        }
      });
  });
});
