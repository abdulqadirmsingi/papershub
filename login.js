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

// login.js

// Assuming you have an API endpoint for login (e.g., /api/login)
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Make a POST request to your login API endpoint
    const response = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Assuming your API returns a token
      const { token } = await response.json();

      // Store the token (e.g., in localStorage or a cookie)
      localStorage.setItem("authToken", token);

      // Redirect to resources.html
      window.location.href = "/resources.html";
    } else if (response.status === 404) {
      // Account not found
      errorMessage.textContent =
        "Account does not exist. Please check your credentials.";
    } else {
      // Handle login failure (show error message, etc.)
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});
