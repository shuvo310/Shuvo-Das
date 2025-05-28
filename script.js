// Mobile Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.querySelector('body');
    const btnCv = document.querySelector('.btn-cv');

    if (burger && nav) { // Ensure elements exist
        burger.addEventListener('click', () => {
            const isActive = nav.classList.toggle('nav-active');
            body.classList.toggle('no-scroll', isActive);

            navLinks.forEach((link, index) => {
                if (isActive) {
                    link.style.animation = `navLinkFade 0.55s ease forwards ${index / 7 + 0.35}s`;
                } else {
                    link.style.animation = '';
                }
            });
            if (btnCv && nav.contains(btnCv)) {
                if (isActive) {
                    btnCv.style.animation = `navLinkFade 0.55s ease forwards ${navLinks.length / 7 + 0.35}s`;
                } else {
                    btnCv.style.animation = '';
                }
            }
            burger.classList.toggle('toggle');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    body.classList.remove('no-scroll');
                    navLinks.forEach(navLink => navLink.style.animation = '');
                    if (btnCv && nav.contains(btnCv)) btnCv.style.animation = '';
                    burger.classList.remove('toggle');
                }
            });
        });
    }
}
navSlide();

// Dynamic Text (Typewriter Effect)
const dynamicTextEl = document.querySelector('.dynamic-text');
const words = [
    "Web Developer",    // English
    "Tech Enthusiast",  // English
    "Creative Coder",   // English
    "Problem Solver",   // English
    "Future Full-Stack Developer" // English
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetweenWords = 1700;

const typeEffect = () => {
    if (!dynamicTextEl) return;

    const currentWord = words[wordIndex];
    let displayText = '';

    if (isDeleting) {
        displayText = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        displayText = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    dynamicTextEl.textContent = displayText;
    dynamicTextEl.classList.add('stop-blinking');

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, delayBetweenWords);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        dynamicTextEl.classList.remove('stop-blinking');
        setTimeout(typeEffect, 450);
        return;
    }
    
    const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(typeEffect, currentSpeed);
}

// Active Nav Link Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');
const navLiAnchors = document.querySelectorAll('header nav .nav-links li a');
const headerEl = document.querySelector('header');
const headerHeight = headerEl ? headerEl.offsetHeight : 70;

window.addEventListener('scroll', () => {
    let currentSectionId = 'home';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 15;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLiAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href') && anchor.getAttribute('href').substring(1) === currentSectionId) {
            anchor.classList.add('active');
        }
    });
});

// Stat Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const goal = parseInt(el.dataset.goal);
            if (isNaN(goal)) return;
            
            let current = 0;
            const totalDuration = 1400;
            const steps = 45;
            const increment = Math.max(1, Math.ceil(goal / steps));
            const stepDuration = totalDuration / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= goal) {
                    el.textContent = goal + "+";
                    clearInterval(timer);
                } else {
                    el.textContent = current + "+";
                }
            }, stepDuration);
            observer.unobserve(el);
        }
    });
}, { threshold: 0.45, rootMargin: "0px 0px -35px 0px" });

statNumbers.forEach(number => {
    counterObserver.observe(number);
});

// Skill level bar animation
const skillBars = document.querySelectorAll('.skill-item .skill-level');
const skillBarObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const level = skillBar.dataset.level;
            if (level) {
                skillBar.style.width = level;
            }
            observer.unobserve(skillBar);
        }
    });
}, { threshold: 0.35, rootMargin: "0px 0px -15px 0px" });

skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
});

// Document Ready Initializations
document.addEventListener('DOMContentLoaded', () => {
    if (dynamicTextEl) {
        setTimeout(typeEffect, 1400);
    }

    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (window.pageYOffset < (sections[0] ? sections[0].offsetTop - headerHeight - 15 : 50)) {
        const homeLink = document.querySelector('header nav .nav-links li a[href="#home"]');
        if (homeLink) {
            navLiAnchors.forEach(a => a.classList.remove('active'));
            homeLink.classList.add('active');
        }
    }
});