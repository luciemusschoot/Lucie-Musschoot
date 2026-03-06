const container = document.getElementById("trail-container");

const images = [
    "Fleur6.png",
    "Fleur19.png",
    "Fleur38.png",
    "Fleur44.png",
    "Fleur51.png",
    "Fleur53.png",
];

let lastX = 0;
let lastY = 0;
const minDistance = 100;
let currentIndex = 0;

document.body.addEventListener("mousemove", (e) => {
    // Exclure footer
    if (e.target.closest(".no-trail-footer")) return;

    // Exclure H1 avec sa zone réelle
    const h1 = document.querySelector("h1");
    const rect = h1.getBoundingClientRect();
    if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
    ) return;

    // Distance minimale pour éviter superposition
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (Math.sqrt(dx*dx + dy*dy) < minDistance) return;

    lastX = e.clientX;
    lastY = e.clientY;

    // Création de la fleur
    const img = document.createElement("img");
    img.src = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
    img.classList.add("trail-image");

    const rotation = Math.random() * 30 - 15;

    // Position absolue par rapport au document
    img.style.left = `${e.clientX + window.scrollX}px`;
    img.style.top = `${e.clientY + window.scrollY}px`;
    img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

    container.appendChild(img);

    // Animation disparition
    setTimeout(() => {
        img.style.opacity = 0;
        img.style.transform += " scale(0.7)";
        setTimeout(() => img.remove(), 500);
    }, 2000);
});