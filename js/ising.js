// Ising model
const SWEEPS = 4;
const HISTORY = 200;

const form = document.querySelector(".ising-form");
const temp = form.querySelector(".ising-temp");
const tempValue = form.querySelector(".ising-temp-value");
const size = form.querySelector(".ising-size");
const play = form.querySelector(".ising-play");
const reset = form.querySelector(".ising-reset");
const canvas = document.querySelector(".ising-canvas");
const magnetization = document.querySelector(".ising-m");
const energy = document.querySelector(".ising-e");
const plot = document.querySelector(".ising-plot");
const status = document.querySelector(".ising-status");
const historyRows = document.querySelector(".ising-history-rows");
const buffer = document.createElement("canvas");

// Colors
const accent = getComputedStyle(document.documentElement)
  .getPropertyValue("--accent")
  .trim();
const UP = [1, 3, 5].map((i) => parseInt(accent.slice(i, i + 2), 16));
const DOWN = [255, 255, 255];

let n = 0;
let spins = new Int8Array(0);
let image = null;
let accept = {};
let running = false;
let frameId = 0;
let history = [];
let spoken = 0;

// Lattice
function init() {
  n = Number(size.value);
  spins = Int8Array.from({ length: n * n }, () =>
    Math.random() < 0.5 ? 1 : -1,
  );
  image = new ImageData(n, n);
  buffer.width = n;
  buffer.height = n;
  draw();
  history = [measure()];
  drawPlot();
  announce();
}

function setTemperature() {
  const t = Number(temp.value);
  tempValue.textContent = t.toFixed(2);
  accept = { 4: Math.exp(-4 / t), 8: Math.exp(-8 / t) };
}

// Metropolis
function sweep() {
  for (let k = 0; k < n * n; k++) {
    const x = Math.floor(Math.random() * n);
    const y = Math.floor(Math.random() * n);
    const i = y * n + x;
    const sum =
      spins[y * n + ((x + 1) % n)] +
      spins[y * n + ((x + n - 1) % n)] +
      spins[((y + 1) % n) * n + x] +
      spins[((y + n - 1) % n) * n + x];
    const dE = 2 * spins[i] * sum;
    if (dE <= 0 || Math.random() < accept[dE]) spins[i] = -spins[i];
  }
}

function measure() {
  let m = 0;
  let e = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const s = spins[y * n + x];
      m += s;
      e -= s * (spins[y * n + ((x + 1) % n)] + spins[((y + 1) % n) * n + x]);
    }
  }
  magnetization.textContent = (m / (n * n)).toFixed(2);
  energy.textContent = (e / (n * n)).toFixed(2);
  return m / (n * n);
}

// Canvas
function draw() {
  spins.forEach((s, i) => {
    image.data.set(s > 0 ? UP : DOWN, i * 4);
    image.data[i * 4 + 3] = 255;
  });
  buffer.getContext("2d").putImageData(image, 0, 0);
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * ratio;
  canvas.height = canvas.clientHeight * ratio;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);
}

// Plot
function drawPlot() {
  const ratio = window.devicePixelRatio || 1;
  const width = plot.clientWidth;
  const height = plot.clientHeight;
  plot.width = width * ratio;
  plot.height = height * ratio;
  const ctx = plot.getContext("2d");
  ctx.scale(ratio, ratio);
  const { fontFamily } = getComputedStyle(plot);
  const ink = getComputedStyle(document.body).color;
  const left = 24;
  const top = 8;
  const bottom = height - 8;
  const y = (m) => top + ((1 - m) / 2) * (bottom - top);

  ctx.font = `13px ${fontFamily}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ink;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 1;
  ctx.beginPath();
  [1, 0, -1].forEach((m) => {
    ctx.fillText(m, left - 6, y(m));
    ctx.moveTo(left, y(m));
    ctx.lineTo(width, y(m));
  });
  ctx.globalAlpha = 0.2;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  history.forEach((m, i) =>
    ctx.lineTo(left + (i / (HISTORY - 1)) * (width - left), y(m)),
  );
  ctx.stroke();
}

// History table
function listHistory() {
  historyRows.replaceChildren();
  history.forEach((m, i) => {
    const row = historyRows.insertRow();
    row.insertCell().textContent = i + 1;
    row.insertCell().textContent = m.toFixed(2);
  });
}

// Status
function announce() {
  status.textContent = `${running ? "Running" : "Paused"} at temperature ${tempValue.textContent} on a ${n} by ${n} grid: magnetization ${magnetization.textContent}, energy per spin ${energy.textContent}.`;
  spoken = performance.now();
  listHistory();
}

// Loop
function frame() {
  for (let k = 0; k < SWEEPS; k++) sweep();
  draw();
  history.push(measure());
  if (history.length > HISTORY) history.shift();
  drawPlot();
  if (performance.now() - spoken > 5000) announce();
  frameId = requestAnimationFrame(frame);
}

play.addEventListener("click", () => {
  running = !running;
  play.textContent = running ? "Pause" : "Play";
  if (running) frameId = requestAnimationFrame(frame);
  else cancelAnimationFrame(frameId);
  announce();
});
reset.addEventListener("click", init);
size.addEventListener("change", init);
temp.addEventListener("input", setTemperature);
historyRows.closest("details").addEventListener("toggle", listHistory);
window.addEventListener("resize", () => {
  draw();
  drawPlot();
});

setTemperature();
init();
