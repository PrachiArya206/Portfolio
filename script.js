/* script.js */

// --- 1. PRELOADER ---
const preloader = document.getElementById('preloader');
const loaderText = document.getElementById('loader-text');
const loaderBar = document.getElementById('loader-bar');
const loadTxt = "INITIALIZING SYSTEM...";
let charIndex = 0;

function typeLoader() {
    if (charIndex < loadTxt.length) {
        loaderText.innerHTML += loadTxt.charAt(charIndex);
        charIndex++;
        loaderBar.style.width = (charIndex / loadTxt.length) * 100 + "%";
        setTimeout(typeLoader, 40);
    } else {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => { preloader.style.display = "none"; startMainSite(); }, 1000);
        }, 800);
    }
}
setTimeout(typeLoader, 500);

// --- 2. MAIN SITE LOGIC ---
function startMainSite() {
    const line1 = document.getElementById('hero-line-1');
    const line2 = document.getElementById('hero-line-2');
    const line3 = document.getElementById('hero-line-3');

    async function typeWriter(text, element, speed = 100) {
        for (let i = 0; i < text.length; i++) {
            element.innerHTML += text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }
    }

    async function runHeroSequence() {
        await typeWriter("I'm", line1, 100);
        await new Promise(r => setTimeout(r, 300));
        await typeWriter("PRACHI ARYA", line2, 100);
        await new Promise(r => setTimeout(r, 300));
        await typeWriter("AI ANALYST", line3, 80);
    }
    runHeroSequence();

    document.querySelectorAll('.skill-progress').forEach(skill => {
        skill.style.width = '40%'; 
    });

    // SCROLL OBSERVER
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.scroll-hidden');
    hiddenElements.forEach((el) => observer.observe(el));
}

// --- 3. DATA STREAM LOGIC (ATSD TREAMA -> DATA STREAM) ---
const streamSection = document.querySelector("#data-stream");
const streamText = document.querySelector("#stream-text");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const scrambled = "ATSD TREAMA";
const target = "DATA_STREAM";

streamSection.addEventListener('mouseenter', () => {
    let iterations = 0;
    const interval = setInterval(() => {
        streamText.innerText = streamText.innerText.split("")
            .map((letter, index) => {
                if(index < iterations) {
                    return target[index]; // Reveal Target
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        
        if(iterations >= target.length){ 
            clearInterval(interval);
            streamText.innerText = target;
        }
        iterations += 1 / 3;
    }, 30);
});

streamSection.addEventListener('mouseleave', () => {
    // Revert back to scrambled on leave
    let iterations = 0;
    const interval = setInterval(() => {
        streamText.innerText = streamText.innerText.split("")
            .map((letter, index) => {
                if(index < iterations) {
                    return scrambled[index]; // Revert to Scrambled
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        
        if(iterations >= scrambled.length){ 
            clearInterval(interval);
            streamText.innerText = scrambled;
        }
        iterations += 1 / 3;
    }, 30);
});


// --- 4. SKILL COUNTER ---
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    const percentText = card.querySelector('.skill-percent');
    const originalValue = parseInt(card.getAttribute('data-target'));
    let interval;

    card.addEventListener('mouseenter', () => {
        let counter = originalValue;
        clearInterval(interval);
        interval = setInterval(() => {
            if (counter < 100) {
                counter++;
                percentText.innerText = counter + "%";
                percentText.style.color = "#00f3ff";
                percentText.style.textShadow = "0 0 5px #00f3ff";
            } else {
                clearInterval(interval);
            }
        }, 20);
    });
    card.addEventListener('mouseleave', () => {
        clearInterval(interval);
        percentText.innerText = originalValue + "%";
        percentText.style.color = "";
        percentText.style.textShadow = "";
    });
});

// --- 5. MODULE OVERLAY ---
const projectCards = document.querySelectorAll('.project-card');
const overlay = document.getElementById('module-overlay');
const closeBtn = document.getElementById('close-overlay');
const overlayName = document.getElementById('overlay-name');
const overlayDesc = document.getElementById('overlay-desc');
const overlayTech = document.getElementById('overlay-tech');
let typeInterval;

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        const title = card.getAttribute('data-title');
        const rawTech = card.getAttribute('data-tech');
        const desc = card.getAttribute('data-desc');

        overlayName.innerText = title;
        overlayTech.innerHTML = "";
        const techArray = rawTech.split(',');
        techArray.forEach(t => {
            const badge = document.createElement('span');
            badge.className = "bg-gray-800 text-neonCyan border border-neonCyan px-3 py-1 rounded font-bold font-mono text-sm";
            badge.innerText = t.trim();
            overlayTech.appendChild(badge);
        });
        
        overlayDesc.innerText = "";
        let dIndex = 0;
        clearInterval(typeInterval);
        typeInterval = setInterval(() => {
            if (dIndex < desc.length) {
                overlayDesc.innerText += desc.charAt(dIndex);
                dIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 15);

        startMiniVisual();
    });
});

closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    clearInterval(typeInterval);
});
overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('#close-overlay')) {
        overlay.classList.add('hidden');
        clearInterval(typeInterval);
    }
});

// --- 6. MINI VISUAL ---
function startMiniVisual() {
    const cvs = document.getElementById('mini-visual');
    const c = cvs.getContext('2d');
    c.fillStyle = '#000'; c.fillRect(0,0,100,100);
    c.beginPath();
    c.moveTo(0, 50);
    for(let i=0; i<100; i+=10) {
        c.lineTo(i, Math.random() * 80 + 10);
    }
    c.strokeStyle = '#00f3ff'; c.stroke();
}

// --- 7. CURSOR & BG ---
const cursor = document.getElementById('cursor-ring');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const canvas = document.getElementById('neuralNetwork');
const ctx = canvas.getContext('2d');
let particlesArray;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, dx, dy, size) {
        this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#00f3ff'; ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        this.x += this.dx; this.y += this.dy;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let n = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < n; i++) {
        let size = (Math.random() * 2) + 1;
        particlesArray.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, (Math.random()*1)-0.5, (Math.random()*1)-0.5, size));
    }
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dist = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (dist < (canvas.width/7) * (canvas.height/7)) {
                ctx.strokeStyle = 'rgba(0, 243, 255,' + (1 - (dist/20000)) + ')';
                ctx.lineWidth = 1; ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particlesArray.forEach(p => p.update());
    connect();
}

window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; init(); });
init(); animate();