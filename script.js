window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);
window.addEventListener("click", createFireworkAtClick, false);
window.addEventListener("mousemove", createSparkleAtMouse, false);

window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

let canvas, ctx, w, h, particles = [];
const maxParticles = 500;
const probability = 0.02;
const sparkles = [];
const sound = new Audio("firework.mp3"); // Add a small firework explosion sound

function onLoad() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.requestAnimationFrame(updateWorld);
}

function resizeCanvas() {
    if (canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
}

function updateWorld() {
    updateParticles();
    paintParticles();
    window.requestAnimationFrame(updateWorld);
}

function updateParticles() {
    if (particles.length < maxParticles && Math.random() < probability) {
        createFirework();
    }
    particles = particles.filter(p => p.move());
    sparkles.forEach((s, i) => {
        s.move();
        if (s.alpha <= 0) sparkles.splice(i, 1);
    });
}

function paintParticles() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, w, h);
    
    ctx.globalCompositeOperation = "lighter";
    particles.forEach(p => p.draw(ctx));
    sparkles.forEach(s => s.draw(ctx));
}

function createFirework() {
    const xPoint = Math.random() * (w - 200) + 100;
    const yPoint = Math.random() * (h - 200) + 100;
    generateParticles(xPoint, yPoint);
}

function createFireworkAtClick(event) {
    generateParticles(event.clientX, event.clientY);
    sound.currentTime = 0;
    sound.play(); // Play explosion sound on firework click
}

function generateParticles(x, y) {
    const numParticles = Math.random() * 50 + 100;
    const gradient = ctx.createRadialGradient(x, y, 1, x, y, 50);
    gradient.addColorStop(0, getRandomColor());
    gradient.addColorStop(1, getRandomColor());

    for (let i = 0; i < numParticles; i++) {
        let particle = Particle.get();
        particle.init(x, y, gradient);
        particles.push(particle);
    }
}

function createSparkleAtMouse(event) {
    const sparkle = new Particle();
    sparkle.init(event.clientX, event.clientY, "white");
    sparkle.w = sparkle.h = Math.random() * 2 + 1;
    sparkle.alpha = 0.8;
    sparkles.push(sparkle);
}

class Particle {
    constructor() {
        this.w = this.h = Math.random() * 4 + 1;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.alpha = Math.random() * 0.5 + 0.5;
        this.gravity = 0.05;
        this.color = "white";
    }

    init(x, y, color) {
        this.x = x - this.w / 2;
        this.y = y - this.h / 2;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.alpha = Math.random() * 0.5 + 0.5;
    }

    move() {
        this.x += this.vx;
        this.vy += this.gravity;
        this.y += this.vy;
        this.alpha -= 0.007;
        return this.alpha > 0 && this.y < h;
    }

    draw(c) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.w, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
        c.fill();
        c.closePath();
        c.restore();
    }

    static get() {
        return Particle.pool.length ? Particle.pool.pop() : new Particle();
    }
}

Particle.pool = [];

function getRandomColor() {
    return `rgb(${~~(Math.random() * 200 + 55)}, ${~~(Math.random() * 200 + 55)}, ${~~(Math.random() * 200 + 55)})`;
}


const floatingHearts = [];
const floatingPhotos = [];
// const loveNotes = [
//     "HAPPY VALENTINE'S DAY BABY MELOT✨",
//     "I MISS YOU💖",
//     "SEE YOU SOON❤️",
//     "I LOVE YOU ALWAYS💫",
//     "ALWAYS TAKE CARE OF YOURSELF💕"
// ];

const photoSources = [
    "images/pretty.jfif",
    "images/pretty2.jpg",
    "images/pretty3.jpg",
    "images/pretty4.jpg",
    "images/pretty5.jpg",
    "images/pretty6.jpg",
    "images/pretty7.jpg",
    "images/pretty8.jpg",
    "images/pretty9.jpg",
    "images/love1.jpg",
    "images/love2.jpg",
    "images/love3.jpg",
    "images/love4.jpg",
    "images/love5.jpg",
    "images/love6.jpg",
    "images/love7.jpg",
    "images/love8.jpg",
    "images/love9.jpg",
    "images/love10.jpg",
    "images/10.jpg",
    "images/bby.jpg",
];

function createFloatingHeart() {
    const img = new Image();
    img.src = "images/heart.png"; // Replace with actual image path
    img.classList.add("floating-heart");
    img.style.left = `${Math.random() * window.innerWidth}px`;
    img.style.top = `${Math.random() * window.innerHeight}px`;
    img.onclick = () => expandElement(img);
    document.body.appendChild(img);
    floatingHearts.push(img);
}

let currentPhotoIndex = 0; // Track the current photo index

const photoMessages = [
    "WILL YOU BE MY VALENTINE Meliza P. Junio?💖",
    "SURPRISE, since you love fireworks, here you go! 🎆",
    "I promise nga makadawat raka bouquet of flowers next hearts day 💐",
    "Always remember that I'm always proud of you.😊",
    "I love your smile here.💕",
    "Always remember to be kind to yourself 🏡.",
    "Smile future Architect 📐",
    "Always follow your dreams, I'm always here to support you.🌟",
    "Soon we can travel the world together🌍",
    "I miss kissing you",
    "Can't wait to hug you soon",
    "Wana gi kilig nako hahaha",
    "More pictures like this hehe",
    "More mirror shots like this also",
    "Puhon abroad na nga bus or train ato masakyan hahah",
    "More roller coaster rides hahaha",
    "Disneyland na ang next destination",
    "I got your back always byyy, I LOVE YOU",
    "Forever yours, Daddy Jade hehe",
    "HAPPY VALENTINE'S DAY BABY",
    "SEE YOU SOON BABY",
];

function createFloatingPhoto() {
    if (currentPhotoIndex >= photoSources.length) {
        currentPhotoIndex = 0; // Reset after last photo
    }

    const img = new Image();
    img.src = photoSources[currentPhotoIndex];
    img.classList.add("floating-photo");

    // Get canvas size
    const canvasWidth = window.innerWidth - 140; // Keep some margin
    const canvasHeight = window.innerHeight - 170;

    // Ensure the photo stays inside the canvas
    const posX = Math.random() * canvasWidth + 50; 
    const posY = Math.random() * canvasHeight + 50; 

    img.style.left = `${posX}px`;
    img.style.top = `${posY}px`;

    // Store original position
    img.dataset.originalLeft = img.style.left;
    img.dataset.originalTop = img.style.top;
    img.dataset.message = photoMessages[currentPhotoIndex]; // Assign message

    img.onclick = () => expandPhoto(img);

    document.body.appendChild(img);
    floatingPhotos.push(img);

    currentPhotoIndex++; // Move to next photo
}

function expandPhoto(img) {
    img.classList.add("expanded-photo");

    // Move to the center & apply glow effect
    img.style.left = "50%";
    img.style.top = "50%";
    img.style.width = "auto";
    img.style.height = "auto";
    img.style.maxWidth = "60vw";
    img.style.maxHeight = "70vh";
    img.style.transform = "translate(-50%, -50%)"; 

    // Show special message at the top center
    showSpecialMessage(img.dataset.message);

    setTimeout(() => {
        // Restore original position and size
        img.style.left = img.dataset.originalLeft;
        img.style.top = img.dataset.originalTop;
        img.style.maxWidth = "120px";
        img.style.maxHeight = "150px";
        img.style.transform = "translate(0, 0)";
        img.classList.remove("expanded-photo");
    }, 5000);
}

function showSpecialMessage(message) {
    let msg = document.getElementById("special-message");
    
    if (!msg) {
        msg = document.createElement("div");
        msg.id = "special-message";
        msg.className = "special-message";
        document.body.appendChild(msg);
    }

    msg.innerText = message;
    msg.style.opacity = "1"; // Make visible
    msg.style.transform = "translate(-50%, 0)";

    setTimeout(() => {
        msg.style.opacity = "0"; // Fade out smoothly
    }, 5000);
}

function createLoveNote(x, y) {
    const note = document.createElement("div");
    note.className = "love-note";
    note.innerText = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    note.style.left = `${x}px`;
    note.style.top = `${y}px`;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 3000);
}

// Modify firework explosion to trigger love notes
function createFireworkAtClick(event) {
    generateParticles(event.clientX, event.clientY);
    createLoveNote(event.clientX, event.clientY);
    sound.currentTime = 0;
    sound.play();
}

// Generate floating hearts and photos periodically
setInterval(createFloatingHeart, 5000);
setInterval(createFloatingPhoto, 7000);



// CSS Styles
const style = document.createElement('style');
style.innerHTML = `
    .floating-heart, .floating-photo {
        position: absolute;
        width: 80px;
        height: 100px;
        opacity: 0.8;
        transition: transform 0.5s ease-in-out;
        cursor: pointer;
    }

    .floating-photo {
        position: absolute;
        max-width: 120px;
        max-height: 150px;
        object-fit: contain;
        opacity: 0.9;
        transition: all 0.5s ease-in-out;
        cursor: pointer;
        border: 4px solid white;
        border-bottom: 18px solid white;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        background: white;
        padding: 4px;
    }

    .floating-photo:hover {
        transform: scale(1.1);
    }

    .expanded-photo {
        z-index: 1000;
        transition: all 0.5s ease-in-out;
        border: none;
        box-shadow: 0 0 25px 8px rgba(255, 255, 255, 0.8);
    }

    #special-message {
        position: fixed;
        top: 10px; /* Always at the top center */
        left: 50%;
        transform: translate(-50%, 0);
        background: rgba(255, 182, 193, 0.9);
        color: #5a0e41;
        padding: 12px 16px;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: bold;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 0px 15px rgba(255, 182, 193, 0.9);
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        z-index: 1100;
        margin-top: 50px;
    }

    .love-note {
        position: absolute;
        background: rgba(255, 182, 193, 0.9); /* Light pink with slight transparency */
        color: #5a0e41; /* Darker shade for contrast */
        padding: 12px 16px;
        border-radius: 12px;
        font-size: 1.2rem;
        font-weight: bold;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
        animation: fadeOut 3s ease-in-out;
    }

    @keyframes fadeOut {
        0% { opacity: 1; transform: translateY(0px); }
        50% { opacity: 0.8; transform: translateY(-20px); }
        100% { opacity: 0; transform: translateY(-40px); }
    }
`;
document.head.appendChild(style);

// Create an audio element for background music
const bgMusic = new Audio("musika.mp3"); // Replace with your actual song file
bgMusic.loop = true; // Loop the song
bgMusic.volume = 0.5; // Set volume (adjust as needed)

// Play music when the page loads
window.addEventListener("DOMContentLoaded", () => {
    playMusic(); // Attempt to play automatically
});

// Function to play music
function playMusic() {
    bgMusic.play().catch(() => {
        console.log("Autoplay blocked. User interaction required.");
    });
}

// Optional: Add a music control button
const musicButton = document.createElement("button");
musicButton.innerText = "🔊 Play Music";
musicButton.className = "music-button";
musicButton.onclick = () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicButton.innerText = "🔇 Pause Music";
    } else {
        bgMusic.pause();
        musicButton.innerText = "🔊 Play Music";
    }
};
document.body.appendChild(musicButton);

// CSS Styles for music button
const musicStyle = document.createElement('style');
musicStyle.innerHTML = `
    .music-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #ff5e5e;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        transition: background 0.3s ease-in-out;
    }
    .music-button:hover {
        background: #ff3b3b;
    }
`;
document.head.appendChild(musicStyle);

