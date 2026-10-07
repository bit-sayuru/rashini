const proposal = document.getElementById("proposal");
const celebration = document.getElementById("celebration");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");
const heartLayer = document.getElementById("heartLayer");
const sparkleLayer = document.getElementById("sparkleLayer");

let noMoves = 0;
let locked = false;

const messages = [
  "Hehe... nice try 😌💕",
  "The NO button is running away! 😂",
  "Rashini, you can't catch it 🙈❤️",
  "Maybe YES is easier? 🥹",
  "Nope! My heart already decided. 💗",
  "Try the beautiful pink button 😏",
  "Just say YES, Rashini! 💍❤️"
];

function createHeart(options = {}) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > .2 ? "♥" : "♡";

  heart.style.setProperty("--left", `${Math.random() * 100}%`);
  heart.style.setProperty("--size", `${options.size || (11 + Math.random() * 27)}px`);
  heart.style.setProperty("--duration", `${options.duration || (5 + Math.random() * 6)}s`);
  heart.style.setProperty(
    "--heart-color",
    Math.random() > .45 ? "rgba(233,30,99,.38)" : "rgba(255,91,137,.32)"
  );

  heartLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 13000);
}

function createSparkle() {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.style.setProperty("--left", `${Math.random() * 100}%`);
  sparkle.style.setProperty("--top", `${Math.random() * 100}%`);
  sparkle.style.setProperty("--size", `${2 + Math.random() * 5}px`);
  sparkle.style.setProperty("--delay", `${Math.random() * 2.5}s`);
  sparkleLayer.appendChild(sparkle);
}

for (let i = 0; i < 28; i++) {
  setTimeout(createHeart, i * 130);
}

for (let i = 0; i < 22; i++) createSparkle();

setInterval(() => createHeart(), 380);

function moveNoButton() {
  if (locked) return;

  noMoves++;
  noBtn.classList.add("running");

  const pad = 12;
  const maxX = window.innerWidth - noBtn.offsetWidth - pad;
  const maxY = window.innerHeight - noBtn.offsetHeight - pad;

  let x = pad;
  let y = pad;

  // Find a position away from the YES button and current pointer area.
  for (let i = 0; i < 30; i++) {
    x = pad + Math.random() * Math.max(1, maxX - pad);
    y = pad + Math.random() * Math.max(1, maxY - pad);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    if (Math.hypot(x - centerX, y - centerY) > 170) break;
  }

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform =
    `rotate(${(Math.random() * 18) - 9}deg) scale(${.9 + Math.random() * .13})`;

  hint.textContent = messages[Math.min(noMoves - 1, messages.length - 1)];

  // A little heart burst each time she tries to catch NO.
  for (let i = 0; i < 4; i++) {
    setTimeout(() => createHeart({ size: 10 + Math.random() * 13, duration: 3.5 }), i * 45);
  }
}

// Escape on desktop hover and mobile touch/click.
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
  if (noBtn.classList.contains("running")) {
    noBtn.style.left = `${Math.min(parseFloat(noBtn.style.left) || 12, window.innerWidth - noBtn.offsetWidth - 12)}px`;
    noBtn.style.top = `${Math.min(parseFloat(noBtn.style.top) || 12, window.innerHeight - noBtn.offsetHeight - 12)}px`;
  }
});

function celebrationBurst() {
  for (let i = 0; i < 70; i++) {
    setTimeout(() => {
      createHeart({
        size: 10 + Math.random() * 32,
        duration: 4 + Math.random() * 5
      });
    }, i * 25);
  }
}

yesBtn.addEventListener("click", () => {
  if (locked) return;
  locked = true;

  celebrationBurst();

  proposal.style.transition = "opacity .75s ease, transform .75s cubic-bezier(.2,.8,.2,1)";
  proposal.style.opacity = "0";
  proposal.style.transform = "scale(1.045)";

  setTimeout(() => {
    proposal.classList.add("hidden");
    celebration.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "instant" });

    // Keep hearts floating around the whole celebration screen.
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createHeart(), i * 55);
    }
  }, 760);
});
