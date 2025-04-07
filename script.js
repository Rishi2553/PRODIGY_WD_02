let [ms, s, m, h] = [0, 0, 0, 0];
let timer = null;
let display = document.getElementById("display");
let laps = document.getElementById("laps");

function updateDisplay() {
  let format = (val, digits = 2) => String(val).padStart(digits, "0");
  display.innerText = `${format(h)}:${format(m)}:${format(s)}:${format(ms, 3)}`;
}

function tick() {
  ms += 10;
  if (ms >= 1000) { ms = 0; s++; }
  if (s >= 60) { s = 0; m++; }
  if (m >= 60) { m = 0; h++; }
  updateDisplay();
}

function start() {
  if (timer !== null) return;
  timer = setInterval(tick, 10);
  playBeep();
}

function stop() {
  clearInterval(timer);
  timer = null;
  playBeep();
  saveLastTime();
}

function reset() {
  stop();
  [ms, s, m, h] = [0, 0, 0, 0];
  updateDisplay();
  laps.innerHTML = "";
}

function lap() {
  const time = display.innerText;
  const lapEl = document.createElement("div");
  lapEl.textContent = `Lap ${laps.children.length + 1} - ${time}`;
  laps.appendChild(lapEl);
}

function saveLastTime() {
  localStorage.setItem("last-time", display.innerText);
  document.getElementById("last-time").innerText = `Last: ${display.innerText}`;
}

function playBeep() {
  const beep = new Audio("https://www.soundjay.com/buttons/beep-07.mp3");
  beep.volume = 0.2;
  beep.play();
}

function toggleMode() {
  document.body.classList.toggle("light");
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
document.getElementById("modeToggle").addEventListener("click", toggleMode);

window.onload = () => {
  const last = localStorage.getItem("last-time");
  if (last) document.getElementById("last-time").innerText = `Last: ${last}`;
};
