import { accent, fitCanvas, ink } from "./main.js";

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
const grid = canvas.getContext("2d");
const plot = document.querySelector(".ising-plot");
const magnetization = document.querySelector(".ising-m");
const energy = document.querySelector(".ising-e");
const status = document.querySelector(".ising-status");
const historyRows = document.querySelector(".ising-history-rows");
const details = historyRows.closest("details");

// Colors
const toPixel = (hex) => {
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return new Uint32Array(Uint8ClampedArray.of(...rgb, 255).buffer)[0];
};
const UP = toPixel(accent);
const DOWN = toPixel("#ffffff");

// State
let n = 0;
let spins = null;
let image = null;
let pixels = null;
let accept = {};
let history = [];
let chart = fitCanvas(plot);
let running = false;
let frameId = 0;
let spoken = 0;

// Lattice
function init() {
  n = Number(size.value);
  spins = Int8Array.from({ length: n * n }, () =>
    Math.random() < 0.5 ? 1 : -1,
  );
  canvas.width = n;
  canvas.height = n;
  image = new ImageData(n, n);
  pixels = new Uint32Array(image.data.buffer);
  history = [];
  render();
  announce();
}

function setTemperature() {
  const t = Number(temp.value);
  tempValue.textContent = t.toFixed(2);
  accept = { 4: Math.exp(-4 / t), 8: Math.exp(-8 / t) };
  announce();
}

// Metropolis
function sweep() {
  const count = spins.length;
  for (let step = 0; step < SWEEPS * count; step += 1) {
    const i = Math.floor(Math.random() * count);
    const x = i % n;
    const rowStart = i - x;
    const sum =
      spins[rowStart + ((x + 1) % n)] +
      spins[rowStart + ((x + n - 1) % n)] +
      spins[(i + n) % count] +
      spins[(i + count - n) % count];
    const dE = 2 * spins[i] * sum;
    if (dE <= 0 || Math.random() < accept[dE]) {
      spins[i] = -spins[i];
    }
  }
}

// Canvas and observables
function draw() {
  const count = spins.length;
  let m = 0;
  let e = 0;
  for (let i = 0; i < count; i += 1) {
    const x = i % n;
    pixels[i] = spins[i] > 0 ? UP : DOWN;
    m += spins[i];
    e -= spins[i] * (spins[i - x + ((x + 1) % n)] + spins[(i + n) % count]);
  }
  grid.putImageData(image, 0, 0);
  return { m: m / count, e: e / count };
}

// Plot
function drawPlot() {
  const { ctx, width, height } = chart;
  const left = 24;
  const y = (m) => 8 + ((1 - m) / 2) * (height - 16);

  ctx.clearRect(0, 0, width, height);
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
  history.forEach((m, i) => {
    ctx.lineTo(left + (i / (HISTORY - 1)) * (width - left), y(m));
  });
  ctx.stroke();
}

// History table
function listHistory() {
  if (!details.open) {
    return;
  }
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
function render() {
  const { m, e } = draw();
  magnetization.textContent = m.toFixed(2);
  energy.textContent = e.toFixed(2);
  history.push(m);
  if (history.length > HISTORY) {
    history.shift();
  }
  drawPlot();
}

function frame() {
  sweep();
  render();
  if (performance.now() - spoken > 5000) {
    announce();
  }
  frameId = requestAnimationFrame(frame);
}

// Controls
play.addEventListener("click", () => {
  running = !running;
  play.textContent = running ? "Pause" : "Play";
  if (running) {
    frameId = requestAnimationFrame(frame);
  } else {
    cancelAnimationFrame(frameId);
  }
  announce();
});
reset.addEventListener("click", init);
size.addEventListener("change", init);
temp.addEventListener("input", setTemperature);
details.addEventListener("toggle", listHistory);
window.addEventListener("resize", () => {
  chart = fitCanvas(plot);
  drawPlot();
});

init();
setTemperature();
