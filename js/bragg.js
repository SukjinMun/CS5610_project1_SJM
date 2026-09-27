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
const constant = form.querySelector(".bragg-a");
const constantValue = form.querySelector(".bragg-a-value");
const source = form.querySelector(".bragg-source");
const summary = document.querySelector(".bragg-summary");
const canvas = document.querySelector(".bragg-canvas");
const rows = document.querySelector(".bragg-rows");

// Peaks
function findPeaks(rule, a, lambda) {
  const peaks = new Map();
  const hmax = Math.floor((2 * a * Math.SQRT1_2) / lambda);
  for (let h = 1; h <= hmax; h++) {
    for (let k = 0; k <= h; k++) {
      for (let l = 0; l <= k; l++) {
        if (!rule(h, k, l)) continue;
        const s = h * h + k * k + l * l;
        const d = a / Math.sqrt(s);
        const x = lambda / (2 * d);
        if (x > 1) continue;
        const twoTheta = (2 * Math.asin(x) * 180) / Math.PI;
        if (twoTheta < MIN || twoTheta > MAX) continue;
        const hkl = [h, k, l].join(h > 9 ? " " : "");
        if (peaks.has(s)) peaks.get(s).hkl.push(hkl);
        else peaks.set(s, { s, d, twoTheta, hkl: [hkl] });
      }
    }
  }
  return [...peaks.values()].sort((p, q) => p.s - q.s);
}

// Canvas
function draw(peaks) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);

  const { color, fontFamily } = getComputedStyle(canvas);
  const ink = getComputedStyle(document.body).color;
  const left = 24;
  const right = width - 24;
  const top = 40;
  const base = height - 44;
  const x = (angle) => left + ((angle - MIN) / (MAX - MIN)) * (right - left);

  ctx.font = `13px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.fillStyle = ink;
  ctx.strokeStyle = ink;
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

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  let labelEnd = -Infinity;
  peaks.forEach((peak, i) => {
    const px = x(peak.twoTheta);
    ctx.beginPath();
    ctx.moveTo(px, base);
    ctx.lineTo(px, top);
    ctx.stroke();
    const label = peak.hkl.join("/");
    const half = ctx.measureText(label).width / 2;
    const center = Math.min(Math.max(px, half), width - half);
    if (i < LABELS && center - half > labelEnd + 4) {
      ctx.fillText(label, center, top - 8);
      labelEnd = center + half;
    }
  });
}

// Table
function toRow(peak) {
  const row = document.createElement("tr");
  const head = document.createElement("th");
  head.scope = "row";
  head.textContent = peak.hkl.join("/");
  row.append(head);
  for (const value of [peak.s, peak.d.toFixed(4), peak.twoTheta.toFixed(2)]) {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.append(cell);
  }
  return row;
}

function update() {
  const a = Number(constant.value);
  const peaks = findPeaks(RULES[lattice.value], a, Number(source.value));
  constantValue.textContent = `${a.toFixed(2)} Å`;
  summary.textContent = `${peaks.length} peaks between ${MIN}° and ${MAX}° in 2θ.`;
  rows.replaceChildren(...peaks.map(toRow));
  draw(peaks);
}

form.addEventListener("input", update);
window.addEventListener("resize", update);
update();
