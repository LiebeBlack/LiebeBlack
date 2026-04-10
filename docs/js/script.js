/**
 * E.E.D.A. — Interaction Engine v2.0
 * Scroll reveals, navbar intelligence, preloader, parallax
 */
document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════
    // 1. PRELOADER
    // ═══════════════════════════════════════
    const preloader = document.getElementById('preloader');

    const dismissPreloader = () => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    };

    window.addEventListener('load', () => setTimeout(dismissPreloader, 1200));
    setTimeout(dismissPreloader, 3500); // Hard failsafe

    // ═══════════════════════════════════════
    // 2. NAVBAR SCROLL BEHAVIOR
    // ═══════════════════════════════════════
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    const handleNavScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ═══════════════════════════════════════
    // 3. SCROLL REVEAL (IntersectionObserver)
    // ═══════════════════════════════════════
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
        revealObserver.observe(el);
    });

    // ═══════════════════════════════════════
    // 4. AMBIENT ORB PARALLAX (mouse-driven)
    // ═══════════════════════════════════════
    let ticking = false;

    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 30;
                const y = (e.clientY / window.innerHeight - 0.5) * 30;

                const orbs = document.querySelectorAll('.ambient-orb');
                orbs.forEach((orb, i) => {
                    const factor = i === 0 ? 1 : -0.7;
                    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // ═══════════════════════════════════════
    // 5. SMOOTH ANCHOR SCROLLING
    // ═══════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });

    // ═══════════════════════════════════════
    // 6. MOBILE NAV TOGGLE
    // ═══════════════════════════════════════
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'hsl(225, 20%, 4%)';
            navLinks.style.padding = '1.5rem';
            navLinks.style.gap = '1.2rem';
            navLinks.style.borderBottom = '1px solid hsla(0,0%,100%,0.06)';

            if (isOpen) {
                navLinks.removeAttribute('style');
            }
        });
    }

    // ═══════════════════════════════════════
    // 7. SYSTEM SIGNATURE
    // ═══════════════════════════════════════
    console.log(
        '%cE.E.D.A. Core v2.0 — Ecosystem Online',
        'color: hsl(185, 95%, 55%); font-family: monospace; font-weight: bold; font-size: 11px;'
    );

    // ═══════════════════════════════════════
    // 8. SECURITY & PROTECTION
    // ═══════════════════════════════════════
    // Disable right-click across the entire site
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Disable image dragging
    document.addEventListener('dragstart', event => {
        if (event.target.nodeName === 'IMG') event.preventDefault();
    });
});
