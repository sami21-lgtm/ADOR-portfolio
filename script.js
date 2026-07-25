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

window.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (e.key === 'ArrowLeft') openLbAt(currentLbIndex - 1);
    if (e.key === 'ArrowRight') openLbAt(currentLbIndex + 1);
});

document.addEventListener('DOMContentLoaded', () => {
    buildGallery();
});

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
    dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    ring.style.transform = `translate3d(${e.clientX - 18}px, ${e.clientY - 18}px, 0)`;
});

document.querySelectorAll('a, button, .project-card, .cursor-pointer, .experience-box').forEach(el => {
    el.addEventListener('mouseenter', () => {
        dot.style.transform += ' scale(2)';
        ring.style.borderColor = '#00ab5b';
        ring.style.transform += ' scale(1.2)';
        ring.style.background = 'rgba(0,171,91,0.05)';
    });
    el.addEventListener('mouseleave', () => {
        dot.style.transform = dot.style.transform.replace(' scale(2)', '');
        ring.style.borderColor = 'rgba(0,171,91,.5)';
        ring.style.transform = ring.style.transform.replace(' scale(1.2)', '');
        ring.style.background = 'transparent';
    });
});

const nav = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('bg-[#efe7da]/90', 'backdrop-blur-lg', 'border-b', 'border-neutral-300', 'h-16');
        nav.classList.remove('h-20');
    } else {
        nav.classList.remove('bg-[#efe7da]/90', 'backdrop-blur-lg', 'border-b', 'border-neutral-300', 'h-16');
        nav.classList.add('h-20');
    }
    
    let cur = '';
    sections.forEach(s => {
        const top = s.offsetTop, height = s.clientHeight;
        if (pageYOffset >= top - 160) {
            cur = s.getAttribute('id');
        }
    });
    
    navLinks.forEach(l => {
        l.classList.remove('active', 'text-[#00ab5b]');
        l.classList.add('text-neutral-700');
        if (l.getAttribute('href') === `#${cur}`) {
            l.classList.add('active', 'text-[#00ab5b]');
            l.classList.remove('text-neutral-700');
        }
    });
});

const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
function checkReveal() {
    reveals.forEach(r => {
        const t = r.getBoundingClientRect().top;
        if (t < window.innerHeight - 100) {
            r.classList.add('active');
            if (r.classList.contains('stagger')) {
                r.querySelectorAll('.card-hover').forEach((c, i) => {
                    c.style.transitionDelay = `${i * 0.1}s`;
                });
            }
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

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
        document.body.style.overflow = 'hidden';
    } else {
        mMenu.classList.add('opacity-0', 'pointer-events-none');
        mMenu.classList.remove('opacity-100', 'pointer-events-auto');
        l1.style.transform = '';
        l2.style.opacity = '1';
        l3.style.transform = '';
        l3.style.width = '1rem';
        document.body.style.overflow = '';
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mMenu.classList.add('opacity-0', 'pointer-events-none');
        mMenu.classList.remove('opacity-100', 'pointer-events-auto');
        l1.style.transform = '';
        l2.style.opacity = '1';
        l3.style.transform = '';
        l3.style.width = '1rem';
        document.body.style.overflow = '';
    });
});

const fBtns = document.querySelectorAll('.filter-btn');
const pItems = document.querySelectorAll('#projectsGrid > div');

fBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fBtns.forEach(b => {
            b.classList.remove('bg-[#00ff88]', 'text-black', 'active', 'border-black');
            b.classList.add('text-neutral-600', 'border-neutral-400');
        });
        btn.classList.add('bg-[#00ff88]', 'text-black', 'active');
        btn.classList.remove('text-neutral-600', 'border-neutral-400');
        
        const f = btn.dataset.filter;
        pItems.forEach(it => {
            const cat = it.dataset.category;
            if (f === 'all' || cat === f) {
                it.style.display = '';
                it.style.opacity = '0';
                it.style.transform = 'scale(.9)';
                setTimeout(() => {
                    it.style.opacity = '1';
                    it.style.transform = 'scale(1)';
                    it.style.transition = 'all .5s cubic-bezier(.16,1,.3,1)';
                }, 50);
            } else {
                it.style.opacity = '0';
                it.style.transform = 'scale(.9)';
                setTimeout(() => it.style.display = 'none', 300);
            }
        });
    });
});

document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('toast').classList.add('show');
    e.target.reset();
    setTimeout(() => document.getElementById('toast').classList.remove('show'), 4000);
});
