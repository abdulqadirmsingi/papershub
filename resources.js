const getCookie = (name) => {
  const cookieName = `${name}=`;
  const cookieArray = document.cookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};

const accessToken = getCookie("accessToken");
const refreshToken = getCookie("refreshToken");

if (!accessToken || !refreshToken) {
  window.location.href = "/login.html";
}


document.addEventListener("DOMContentLoaded", function () {
  function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        // Get the user token from the cookie
        const userToken = getCookie("accessToken");  // Replace 'YOUR_AUTH_COOKIE_NAME' with your actual cookie name

        if (!userToken) {
            console.error('User token not found in cookie.');
            return;
        }

  fetch("http://127.0.0.1:8000/auth/users/me/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      const userHeading = document.getElementById("user-info-heading");
      const coursePlaceholder = document.getElementById("course-placeholder");

      userHeading.textContent = `Bsc in ${data.degree_program} - YEAR ${data.year}`;
      coursePlaceholder.textContent = data.program;

      // You can also add additional information if needed
      const userInfo = document.createElement("h1");
      userInfo.textContent = `Welcome ${data.first_name} ${data.last_name}!`;
      const parentElement = document.querySelector(".about-content");
      const firstChild = parentElement.firstChild;
      parentElement.insertBefore(userInfo, firstChild);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
});