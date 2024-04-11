document
  .getElementById("forgot-password-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/password_reset/",
        { email }
      );
      document.getElementById("message").innerText =
        "Password reset email sent. Check your inbox.";
      document.getElementById("message").style.display = "block";
    } catch (error) {
      document.getElementById("message").innerText = "Error sending email.";
      document.getElementById("message").style.display = "block";
    }
  });
