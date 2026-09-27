// Active nav link
const route = (path) => path.replace(/(index)?\.html$/, "");
const here = route(location.pathname);

document.querySelectorAll(".nav-link").forEach((link) => {
  if (route(link.pathname) === here) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

// Footer year
document.querySelector(".footer-year").textContent = new Date().getFullYear();

// Theme
const root = getComputedStyle(document.documentElement);
export const ink = root.getPropertyValue("--ink").trim();
export const accent = root.getPropertyValue("--accent").trim();

// Canvas
export function fitCanvas(canvas) {
  const ratio = window.devicePixelRatio;
  const { clientWidth: width, clientHeight: height } = canvas;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  ctx.font = `13px ${getComputedStyle(canvas).fontFamily}`;
  return { ctx, width, height };
}
