let  coins = 100000;

const commonHats = [1,2,3,4,5,6,7,8,9,10];
const rareHats = Array.from({ length: 15 }, (_, i) => i + 11);
const legendaryHats = [26,27,28,29,30];

function buyPack(cost, type) {
  if (coins < cost) return alert("Not enough coins!");
  coins -= cost;
  document.getElementById("coinCount").textContent = coins;
  openPack(type);
}

function openPack(type) {
  const modal = document.getElementById("packModal");
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const { hat, rarity } = rollHat(type);

    const card = document.createElement("div");
    card.className = `card ${rarity}`;

    const img = document.createElement("img");
    img.src = `images/hat${hat}.png`;

    const stars = document.createElement("div");
    stars.className = "stars";
    stars.textContent = rarity === "common" ? "★" :
                        rarity === "rare" ? "★★" : "★★★";

    card.appendChild(img);
    card.appendChild(stars);
    container.appendChild(card);
  }

  modal.classList.remove("hidden");
}

function closePack() {
  document.getElementById("packModal").classList.add("hidden");
}

function rollHat(type) {
  const roll = Math.random() * 100;

  if (type === "common") {
    return roll < 70 ? pick(commonHats, "common") : pick(rareHats, "rare");
  }
  if (type === "rare") {
    if (roll < 50) return pick(commonHats, "common");
    if (roll < 90) return pick(rareHats, "rare");
    return pick(legendaryHats, "legendary");
  }
  if (roll < 25) return pick(commonHats, "common");
  if (roll < 75) return pick(rareHats, "rare");
  return pick(legendaryHats, "legendary");
}

function pick(arr, rarity) {
  return { hat: arr[Math.floor(Math.random() * arr.length)], rarity };
}

/* ===== SLIDER ===== */
let currentSlide = 0;
const track = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slide");

function updateSlider() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}
