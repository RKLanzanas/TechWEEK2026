// Mobile Navigation Toggle
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (window.innerWidth <= 1024) {
        navMenu.classList.toggle('active');
    }
}

// View Switcher
function openEventPage(pageId) {
    document.querySelectorAll('.page-view').forEach(view => view.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHomeView() {
    document.querySelectorAll('.page-view').forEach(view => view.classList.add('hidden'));
    document.getElementById('home-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll Animation Reveal Engine
function handleScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);

// Interactive Canvas Animation with Mouse Repulsion
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let pixels = [];
const techSymbols = ['0', '1', '<>', '{}', '[]', ';', '#', '01'];

let mouse = { x: null, y: null, radius: 130 };

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class FallingPixel {
    constructor() {
        this.reset();
    }
    reset() {
        this.baseX = Math.random() * canvas.width;
        this.x = this.baseX;
        this.y = -30;
        this.speed = Math.random() * 1.5 + 0.8;
        this.text = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        this.size = Math.random() * 12 + 18;
        this.opacity = Math.random() * 0.35 + 0.15;
        this.vx = 0;
        this.vy = 0;
    }
    update() {
        this.y += this.speed;

        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let force = (mouse.radius - distance) / mouse.radius;

                this.vx -= forceDirectionX * force * 4;
                this.vy -= forceDirectionY * force * 4;
            }
        }

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.92;
        this.vy *= 0.92;

        if (this.y > canvas.height + 40) {
            this.reset();
        }
    }
    draw() {
        ctx.font = `${this.size}px 'Press Start 2P', monospace`;
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

for (let i = 0; i < 55; i++) {
    pixels.push(new FallingPixel());
}

function animatePixels() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pixels.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animatePixels);
}
animatePixels();

// Real-Time Event Countdown
const targetDate = new Date('October 15, 2026 09:00:00').getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff > 0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Custom Modal Handlers
function showCustomModal(message) {
    document.getElementById('modal-message').innerText = message;
    document.getElementById('custom-modal').classList.remove('hidden');
}

function closeCustomModal() {
    document.getElementById('custom-modal').classList.add('hidden');
    showHomeView();
}

// Registration Handler with Glassmorphism Modal UI
function handleRegistrationSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const section = document.getElementById('reg-section').value;

    const msg = `SUCCESSFUL REGISTRATION!\n\nA confirmation pass has been dispatched to your email: ${email}\n\nRegistered Details:\n• Name: ${name}\n• Section: ${section}\n• Event: Tech Week 2026 Pass Confirmed!`;
    showCustomModal(msg);
}

// Newsletter Handler with Glassmorphism Modal UI
function handleStudentUpdatesSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('student-update-email').value;

    const msg = `EMAIL UPDATE DISPATCHED!\n\nSuccess! The latest announcement and schedule details have been sent to your registered email: ${email}\n\nCheck your inbox for live event alerts!`;
    showCustomModal(msg);
    document.getElementById('student-update-email').value = '';
}