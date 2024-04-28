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
  try {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    const userToken = getCookie("accessToken");
    if (!userToken) {
      console.error("User token not found in cookie.");
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

        userHeading.textContent = `Bsc in ${data.degree_program} - Year ${data.year}`;
        coursePlaceholder.textContent = data.program;
        const userInfo = document.createElement("h1");
        userInfo.textContent = `Welcome ${data.first_name} ${data.last_name}!`;
        const parentElement = document.querySelector(".about-content");
        const firstChild = parentElement.firstChild;
        parentElement.insertBefore(userInfo, firstChild);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    fetch(`http://127.0.0.1:8000/papers/Course/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const courseContainer = document.getElementById("faq1");
        if (Array.isArray(data) && data.length > 0) {
          courseContainer.innerHTML = "";
          const courses = data.map((course) => {
            return {
              id: course.id,
              name: course.name,
              description: course.description,
            };
          });
          console.log(courses);
          data.forEach((course, index) => {
            const formattedCourse = `${course.name} - ${course.id}`;
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("row", "g-0", "gx-5");

            const courseInfoDiv = document.createElement("div");
            courseInfoDiv.classList.add("col-lg-4");
            courseInfoDiv.innerHTML = `
      <div class="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
        <a><p>${formattedCourse}</p></a>
      </div>
    `;

            const courseActionsDiv = document.createElement("div");
            courseActionsDiv.classList.add(
              "col-lg-6",
              "text-start",
              "text-lg-end",
              "wow"
            );
            courseActionsDiv.setAttribute("data-wow-delay", "0.1s");
            courseActionsDiv.innerHTML = `
      <ul class="nav nav-pills d-inline-flex justify-content-end mb-4">
        <li class="nav-item me-2">
          <a class="btn btn-outline-primary" target="_blank" href="${course.description}">Notes</a>
        </li>
        <li class="nav-item me-2">
          <a class="btn btn-outline-primary" href="pastpapers.html">Past Papers</a>
        </li>
        <li class="nav-item me-2">
          <a class="btn btn-outline-primary" href="summaries.html">Summaries</a>
        </li>
      </ul>
    `;

            courseDiv.appendChild(courseInfoDiv);
            courseDiv.appendChild(courseActionsDiv);
            courseContainer.appendChild(courseDiv);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  } catch (error) {
    console.error("Error in DOMContentLoaded event:", error);
  }
});
