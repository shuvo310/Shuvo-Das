/**
 * Shuvo Das - Portfolio Script
 * This script handles all the dynamic functionality for the portfolio website.
 */
document.addEventListener('DOMContentLoaded', () => {

    /** 1. AOS (Animate on Scroll) Library Initialization */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 900,
            offset: 100,
            delay: 50,
            easing: 'ease-in-out-quad',
        });
    } else {
        console.error("AOS library is not loaded.");
    }

    /** 2. Mobile Navigation Toggle */
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');
        const body = document.querySelector('body');

        if (burger && nav && body) {
            burger.addEventListener('click', () => {
                const isActive = nav.classList.toggle('nav-active');
                body.classList.toggle('no-scroll', isActive);
                burger.classList.toggle('toggle');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (nav.classList.contains('nav-active')) {
                        nav.classList.remove('nav-active');
                        body.classList.remove('no-scroll');
                        burger.classList.remove('toggle');
                    }
                });
            });
        }
    };
    navSlide();

    /** 3. Dynamic Text (Typewriter Effect) */
    const dynamicTextEl = document.querySelector('.dynamic-text');
    if (dynamicTextEl) {
        const words = ["Web Developer", "Tech Enthusiast", "Creative Coder", "Problem Solver", "Future Full-Stack Developer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeEffect = () => {
            const currentWord = words[wordIndex];
            const typeSpeed = isDeleting ? 60 : 120;
            dynamicTextEl.textContent = currentWord.substring(0, charIndex);

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(typeEffect, typeSpeed);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(typeEffect, typeSpeed);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(typeEffect, 1200);
            }
        };
        setTimeout(typeEffect, 1500);
    }

    /** 4. Active Navigation Link Highlighting on Scroll */
    const sections = document.querySelectorAll('section[id]');
    const navLiAnchors = document.querySelectorAll('header nav .nav-links li a');
    const headerEl = document.querySelector('header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 70;

    const scrollActive = () => {
        const scrollY = window.pageYOffset;
        let currentSectionId = 'home'; 

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            if (scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLiAnchors.forEach(anchor => {
            anchor.classList.toggle('active', anchor.getAttribute('href') === `#${currentSectionId}`);
        });
    };
    window.addEventListener('scroll', scrollActive, { passive: true });
    scrollActive();

    /** 5. Animated Statistics Counter */
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const goal = parseInt(el.dataset.goal);
                if (isNaN(goal)) return;
                
                let current = 0;
                const duration = 1500; 
                const stepTime = Math.abs(Math.floor(duration / goal));
                
                const timer = setInterval(() => {
                    current += 1;
                    el.textContent = current + "+";
                    if (current >= goal) {
                        clearInterval(timer);
                        el.textContent = goal + "+";
                    }
                }, stepTime > 0 ? stepTime : 1);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(number => counterObserver.observe(number));

    /** 6. Animated Skill Bars */
    const skillBars = document.querySelectorAll('.skill-item .skill-level');
    const skillBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                skillBar.style.width = skillBar.dataset.level;
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => skillBarObserver.observe(bar));

    /** 7. Scroll to Top Button */
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = "flex";
                scrollToTopBtn.style.opacity = "1";
            } else {
                scrollToTopBtn.style.opacity = "0";
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        scrollToTopBtn.style.display = "none";
                    }
                }, 400);
            }
        }, { passive: true });
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /** 8. Footer Current Year */
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

/** Window Load Event */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.querySelector('body');
    
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000); 
    }

    if (body) {
        setTimeout(() => {
            body.classList.remove('loading');
        }, 1100); 
    }

    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});