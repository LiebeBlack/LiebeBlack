/**
 * Yoangel Gómez — Portfolio v5.0
 * Resilient Animation Engine & Clean Interactions
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ═══════════════════════════════════════
    // 1. FAST, RESILIENT PRELOADER
    // ═══════════════════════════════════════
    const preloader = document.getElementById('preloader');
    
    const dismissPreloader = () => {
        if (!preloader || preloader.classList.contains('hidden')) return;
        preloader.classList.add('hidden');
        initScrollAnimations();
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.remove();
            }
            initScrollAnimations();
        }, 400);
    };

    if (preloader) {
        if (document.readyState === 'complete') {
            setTimeout(dismissPreloader, 250);
        } else {
            window.addEventListener('load', () => {
                setTimeout(dismissPreloader, 250);
            });
        }
        // Safety timeout so preloader NEVER gets stuck
        setTimeout(dismissPreloader, 1500);
    }

    // ═══════════════════════════════════════
    // 2. RESILIENT NATIVE SCROLL ANIMATION ENGINE
    // ═══════════════════════════════════════
    const initScrollAnimations = () => {
        const animElements = document.querySelectorAll('[data-aos]');
        if (!animElements.length) return;

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.05,
                rootMargin: '0px 0px -30px 0px'
            });

            animElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0) {
                    el.classList.add('aos-animate');
                } else {
                    observer.observe(el);
                }
            });
        } else {
            animElements.forEach(el => el.classList.add('aos-animate'));
        }
    };

    initScrollAnimations();
    window.addEventListener('load', initScrollAnimations);

    // ═══════════════════════════════════════
    // 3. NAVBAR SCROLL EFFECT
    // ═══════════════════════════════════════
    const nav = document.getElementById('nav');
    if (nav) {
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                scrollTicking = true;
                requestAnimationFrame(() => {
                    if (window.scrollY > 40) {
                        nav.classList.add('scrolled');
                    } else {
                        nav.classList.remove('scrolled');
                    }
                    scrollTicking = false;
                });
            }
        }, { passive: true });
    }

    // ═══════════════════════════════════════
    // 4. MAGNETIC BUTTONS & CARD SPOTLIGHT
    // ═══════════════════════════════════════
    if (!window.matchMedia('(pointer: coarse)').matches) {
        // Magnetic Buttons
        const magneticElements = document.querySelectorAll('.btn-extreme, .project-link, .footer-links a');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate3d(${x * 0.18}px, ${y * 0.18}px, 0)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = `translate3d(0, 0, 0)`;
            });
        });

        // Interactive Card Spotlight Glow
        const spotlightCards = document.querySelectorAll('.profile-card, .project-card, .service-item, .stack-col, .timeline-item');
        spotlightCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // ═══════════════════════════════════════
    // 5. SMOOTH IN-PAGE SCROLL
    // ═══════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ═══════════════════════════════════════
    // 6. PREDICTIVE PRE-FETCH (Contacto)
    // ═══════════════════════════════════════
    const prefetchContact = () => {
        if (!document.querySelector('link[rel="prefetch"][href="contacto.html"]')) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = 'contacto.html';
            document.head.appendChild(link);
        }
    };

    document.querySelectorAll('a[href="contacto.html"]').forEach(link => {
        link.addEventListener('mouseenter', prefetchContact, { once: true });
        link.addEventListener('touchstart', prefetchContact, { once: true, passive: true });
    });
});
