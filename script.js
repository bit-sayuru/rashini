const proposal = document.getElementById("proposal");
const celebration = document.getElementById("celebration");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hearts = document.querySelector(".hearts");
const hint = document.getElementById("hint");

let noMoves = 0;
let locked = false;

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.25 ? "♥" : "♡";
  heart.style.setProperty("--left", `${Math.random() * 100}%`);
  heart.style.setProperty("--size", `${12 + Math.random() * 25}px`);
  heart.style.setProperty("--duration", `${5 + Math.random() * 6}s`);
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}

setInterval(createHeart, 420);
for (let i = 0; i < 12; i++) setTimeout(createHeart, i * 180);

function moveNoButton() {
  if (locked) return;

  noMoves++;

  // First move converts it to a floating button so it can escape anywhere.
  noBtn.classList.add("running");

  const padding = 18;
  const maxX = Math.max(padding, window.innerWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(padding, window.innerHeight - noBtn.offsetHeight - padding);

  // Avoid the center where the YES button usually is.
  let x, y;
  for (let i = 0; i < 20; i++) {
    x = padding + Math.random() * (maxX - padding);
    y = padding + Math.random() * (maxY - padding);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    if (Math.hypot(x - centerX, y - centerY) > 150) break;
  }

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = `rotate(${(Math.random() * 16) - 8}deg) scale(${0.9 + Math.random() * .15})`;

  const messages = [
    "Hehe… nice try 😌💕",
    "Nope! You can't catch me 😂",
    "The NO button is shy 🙈",
    "Try YES instead! ❤️",
    "Almost! 😏",
    "I don't think so! 💗",
    "Just say YES, Rashini 🥹❤️"
  ];

  hint.textContent = messages[Math.min(noMoves - 1, messages.length - 1)];
}

["mouseenter", "pointerdown", "touchstart"].forEach(eventName => {
  noBtn.addEventListener(eventName, (event) => {
    event.preventDefault();
    moveNoButton();
  }, { passive: false });
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

window.addEventListener("resize", () => {
  if (noBtn.classList.contains("running")) moveNoButton();
});

yesBtn.addEventListener("click", () => {
  if (locked) return;
  locked = true;

  // Romantic burst before revealing the final message.
  for (let i = 0; i < 35; i++) {
    setTimeout(createHeart, i * 35);
  }

  proposal.style.transition = "opacity .7s ease, transform .7s ease";
  proposal.style.opacity = "0";
  proposal.style.transform = "scale(1.04)";

  setTimeout(() => {
    proposal.classList.add("hidden");
    celebration.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });

    for (let i = 0; i < 45; i++) {
      setTimeout(createHeart, i * 45);
    }
  }, 720);
});
