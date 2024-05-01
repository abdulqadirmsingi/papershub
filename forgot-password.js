document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forgot-password-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const data = JSON.stringify({ email }); 

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/users/reset_password/",
        data, 
        {
          headers: {
            "Content-Type": "application/json", // Set the content type header
          },
          Credential: "include",
        }
      );

      // Handle the response (e.g., show a success message to the user)
      console.log(response.data); // Assuming your backend returns a response with relevant information
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error("Error:", error.response.data);
    }
  });
});
