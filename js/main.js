// Active nav link
const clean = (path) => path.replace(/(index)?\.html$/, "");

for (const link of document.querySelectorAll(".navbar .nav-link")) {
  if (clean(link.pathname) === clean(location.pathname)) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
}

// Footer year
document.querySelector(".footer-year").textContent = new Date().getFullYear();
