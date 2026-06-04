// Cursor Tracking
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    ring.style.left = e.clientX - 18 + 'px';
    ring.style.top = e.clientY - 18 + 'px';
});

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const images = ["f1_poster.jpg", "gt3_r_poster.jpg", "hamza_classic.jpg", "Match Result.jpg"];
let currentIndex = 0;

function openLightboxByIndex(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('lightboxClose').addEventListener('click', () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = 'auto';
});

// Simple Reveal on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-right').forEach(el => observer.observe(el));

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('bg-[#efe7da]/90', 'backdrop-blur-md', 'shadow-sm');
    } else {
        nav.classList.remove('bg-[#efe7da]/90', 'backdrop-blur-md', 'shadow-sm');
    }
});
