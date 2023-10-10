const logo = document.querySelector(".navigation-logo");
const link = document.createElement("a");
link.href = "google.com";
link.appendChild(logo.children[0]);
logo.appendChild(link);
