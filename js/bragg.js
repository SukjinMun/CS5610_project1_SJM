import { accent, fitCanvas, ink } from "./main.js";

// Reflection conditions
const RULES = {
  sc: () => true,
  bcc: (h, k, l) => (h + k + l) % 2 === 0,
  fcc: (h, k, l) => h % 2 === k % 2 && k % 2 === l % 2,
};
const MIN = 10;
const MAX = 90;
const LABELS = 8;

const form = document.querySelector(".bragg-form");
const lattice = form.querySelector(".bragg-lattice");
const size = form.querySelector(".bragg-a");
const sizeValue = form.querySelector(".bragg-a-value");
const source = form.querySelector(".bragg-source");
const summary = document.querySelector(".bragg-summary");
const canvas = document.querySelector(".bragg-canvas");
const rows = document.querySelector(".bragg-rows");

let peaks = [];
let view = fitCanvas(canvas);

// Peaks
function findPeaks(rule, a, lambda) {
  const found = new Map();
  const sAt = (angle) =>
    ((2 * a * Math.sin((angle * Math.PI) / 360)) / lambda) ** 2;
  const sMin = sAt(MIN);
  const sMax = sAt(MAX);
  const newPeak = (s) => {
    const d = a / Math.sqrt(s);
    const twoTheta = (2 * Math.asin(lambda / (2 * d)) * 180) / Math.PI;
    return { s, d, twoTheta, hkl: [] };
  };
  for (let h = 1; h * h <= sMax; h += 1) {
    for (let k = 0; k <= h && h * h + k * k <= sMax; k += 1) {
      const hk = h * h + k * k;
      for (let l = 0; l <= k && hk + l * l <= sMax; l += 1) {
        const s = hk + l * l;
        if (s >= sMin && rule(h, k, l)) {
          const peak = found.get(s) || newPeak(s);
          peak.hkl.push([h, k, l].join(h > 9 ? " " : ""));
          found.set(s, peak);
        }
      }
    }
  }
  return [...found.values()].sort((p, q) => p.s - q.s);
}

// Canvas
function draw() {
  const { ctx, width, height } = view;
  const left = 24;
  const right = width - 24;
  const top = 40;
  const base = height - 44;
  const x = (angle) => left + ((angle - MIN) / (MAX - MIN)) * (right - left);

  ctx.clearRect(0, 0, width, height);
  ctx.textAlign = "center";
  ctx.fillStyle = ink;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, base);
  ctx.lineTo(right, base);
  for (let angle = MIN; angle <= MAX; angle += 10) {
    ctx.moveTo(x(angle), base);
    ctx.lineTo(x(angle), base + 6);
    ctx.fillText(`${angle}°`, x(angle), base + 20);
  }
  ctx.stroke();
  ctx.fillText("2θ (degrees)", (left + right) / 2, height - 6);

  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  peaks.forEach(({ twoTheta }) => {
    ctx.moveTo(x(twoTheta), base);
    ctx.lineTo(x(twoTheta), top);
  });
  ctx.stroke();

  let labelEnd = -Infinity;
  peaks.slice(0, LABELS).forEach(({ hkl, twoTheta }) => {
    const label = hkl.join("/");
    const half = ctx.measureText(label).width / 2;
    const center = Math.min(Math.max(x(twoTheta), half), width - half);
    if (center - half > labelEnd + 4) {
      ctx.fillText(label, center, top - 8);
      labelEnd = center + half;
    }
  });
}

// Table
function toRow({ hkl, s, d, twoTheta }) {
  const row = document.createElement("tr");
  const head = document.createElement("th");
  head.scope = "row";
  head.textContent = hkl.join("/");
  row.append(head);
  [s, d.toFixed(4), twoTheta.toFixed(2)].forEach((value) => {
    row.insertCell().textContent = value;
  });
  return row;
}

// Update
function update() {
  const a = Number(size.value);
  peaks = findPeaks(RULES[lattice.value], a, Number(source.value));
  sizeValue.textContent = `${a.toFixed(2)} Å`;
  summary.textContent = `${peaks.length} peaks between ${MIN}° and ${MAX}° in 2θ.`;
  rows.replaceChildren(...peaks.map(toRow));
  draw();
}

form.addEventListener("input", update);
window.addEventListener("resize", () => {
  view = fitCanvas(canvas);
  draw();
});
update();
