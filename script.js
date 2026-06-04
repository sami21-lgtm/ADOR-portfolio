// Premium Dynamic Lightbox Logic 
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCat = document.getElementById('lightboxCat');
let galleryItems = [];
let currentLbIndex = 0;

function buildGallery() {
    galleryItems = [];
    document.querySelectorAll('#projectsGrid .project-card').forEach((c, i) => {
        const img = c.querySelector('img');
        if (img) {
            galleryItems.push({
                src: img.src,
                title: img.dataset.title || '',
                cat: img.dataset.cat || ''
            });
        }
        c.setAttribute('data-index', i);
        c.addEventListener('click', () => openLbAt(i));
    });
}

function openLbAt(i) {
    if (i < 0 || i >= galleryItems.length) return;
    currentLbIndex = i;
    const it = galleryItems[i];
    lightboxImg.src = it.src;
    lightboxTitle.textContent = it.title;
    lightboxCat.textContent = it.cat;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openLightboxByIndex(i) {
    buildGallery();
    openLbAt(i);
}

document.getElementById('lbPrev').addEventListener('click', e => {
    e.stopPropagation();
    openLbAt(currentLbIndex - 1);
});

document.getElementById('lbNext').addEventListener('click', e => {
    e.stopPropagation();
    openLbAt(currentLbIndex + 1);
});

lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));

document.addEventListener('DOMContentLoaded', () => {
    buildGallery();
});

// Custom Fluid Cursor Tracking Setup
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    ring.style.left = `${e.clientX}px`;
    ring.style.top = `${e.clientY}px`;
});

// Scroll State Header Logic
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('bg-[#efe7da]/90', 'backdrop-blur-md', 'border-b', 'border-neutral-300', 'h-16');
        nav.classList.remove('h-20');
    } else {
        nav.classList.remove('bg-[#efe7da]/90', 'backdrop-blur-md', 'border-b', 'border-neutral-300', 'h-16');
        nav.classList.add('h-20');
    }
});

// Structural Reveal Observers
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
function checkReveal() {
    reveals.forEach(r => {
        const t = r.getBoundingClientRect().top;
        if (t < window.innerHeight - 80) {
            r.classList.add('active');
        }
    });
}
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// Mobile Sidebar Hamburger Control Menu
const mBtn = document.getElementById('mobileBtn');
const mMenu = document.getElementById('mobileMenu');
const l1 = document.getElementById('l1');
const l2 = document.getElementById('l2');
const l3 = document.getElementById('l3');

mBtn.addEventListener('click', () => {
    if (mMenu.classList.contains('opacity-0')) {
        mMenu.classList.remove('opacity-0', 'pointer-events-none');
        mMenu.classList.add('opacity-100', 'pointer-events-auto');
        l1.style.transform = 'rotate(45deg) translate(5px, 5px)';
        l2.style.opacity = '0';
        l3.style.transform = 'rotate(-45deg) translate(4px, -5px)';
        l3.style.width = '1.5rem';
    } else {
        mMenu.classList.add('opacity-0', 'pointer-events-none');
        mMenu.classList.remove('opacity-100', 'pointer-events-auto');
        l1.style.transform = '';
        l2.style.opacity = '1';
        l3.style.transform = '';
        l3.style.width = '1rem';
    }
});

// Core Project Gallery Sorting System
const fBtns = document.querySelectorAll('.filter-btn');
const pItems = document.querySelectorAll('#projectsGrid > div');

fBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fBtns.forEach(b => {
            b.classList.remove('bg-[#00ff88]', 'text-black', 'active');
            b.classList.add('text-neutral-600');
        });
        btn.classList.add('bg-[#00ff88]', 'text-black', 'active');
        btn.classList.remove('text-neutral-600');
        
        const f = btn.dataset.filter;
        pItems.forEach(it => {
            const cat = it.dataset.category;
            if (f === 'all' || cat === f) {
                it.style.display = '';
            } else {
                it.style.display = 'none';
            }
        });
    });
});

// Toast System Triggers
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('toast').classList.add('show');
    e.target.reset();
    setTimeout(() => document.getElementById('toast').classList.remove('show'), 4000);
});
