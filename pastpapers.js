document.addEventListener("DOMContentLoaded", function () {
  // Select the papers to be blurred
  var blurredPapers = document.querySelectorAll(".blurred");

  // Disable download buttons and remove link functionality for blurred papers
  blurredPapers.forEach(function (paper) {
    var downloadButton = paper.querySelector(".download-button");
    var paperLink = paper.querySelector("a");
    if (downloadButton && paperLink) {
      downloadButton.disabled = true;
      paperLink.removeAttribute("href");
      downloadButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default button behavior
      });
    }
  });
});

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
