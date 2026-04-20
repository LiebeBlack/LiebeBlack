/**
 * Yoangel Gómez — Portfolio v5.0
 * Performance-Optimized · GPU-Accelerated · Minimal Paint
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ═══════════════════════════════════════
    // 1. THEME TOGGLE
    // ═══════════════════════════════════════
    const theme = {
        current: 'dark',
        toggleBtn: document.getElementById('theme-toggle'),

        init() {
            this.apply('dark');
            this.toggleBtn?.addEventListener('click', () => this.switch());
        },

        apply(mode) {
            document.documentElement.setAttribute('data-theme', mode);
            this.current = mode;
            const metaColor = document.querySelector('meta[name="theme-color"]');
            if (metaColor) metaColor.content = mode === 'dark' ? '#0a0a0f' : '#f8f9fa';
        },

        switch() {
            this.apply(this.current === 'light' ? 'dark' : 'light');
        }
    };
    theme.init();

    // ═══════════════════════════════════════
    // 2. FAST PRELOADER (1.2s max)
    // ═══════════════════════════════════════
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const hide = () => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 600);
        };

        let loaded = false, timerDone = false;
        window.addEventListener('load', () => { loaded = true; if (timerDone) hide(); });
        setTimeout(() => { timerDone = true; if (loaded) hide(); else hide(); }, 1200);
    }

    // ═══════════════════════════════════════
    // 3. NAVBAR — RAF-throttled scroll
    // ═══════════════════════════════════════
    const nav = document.getElementById('nav');
    let scrollTicking = false;

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(() => {
                if (window.scrollY > 60) {
                    nav?.classList.add('scrolled');
                } else {
                    nav?.classList.remove('scrolled');
                }
                scrollTicking = false;
            });
        }
    }, { passive: true });

    // ═══════════════════════════════════════
    // 4. OPTIMIZED SCROLL REVEAL
    // ═══════════════════════════════════════
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        entries[i].target.classList.add('visible');
                        revealObserver.unobserve(entries[i].target);
                    }
                }
            },
            { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
        );

        for (let i = 0; i < reveals.length; i++) {
            revealObserver.observe(reveals[i]);
        }
    }

    // ═══════════════════════════════════════
    // 5. GPU PARALLAX (desktop only, optimized)
    // ═══════════════════════════════════════
    if (!window.matchMedia('(pointer: coarse)').matches) {
        const orbs = document.querySelectorAll('.ambient-orb');
        if (orbs.length > 0) {
            const pos = [], tgt = [];
            const factors = [1, -0.6, 0.4];

            for (let i = 0; i < orbs.length; i++) {
                pos.push({ x: 0, y: 0 });
                tgt.push({ x: 0, y: 0 });
            }

            document.addEventListener('mousemove', (e) => {
                const nx = (e.clientX / window.innerWidth - 0.5) * 20;
                const ny = (e.clientY / window.innerHeight - 0.5) * 20;
                for (let i = 0; i < orbs.length; i++) {
                    const f = factors[i] || 0.3;
                    tgt[i].x = nx * f;
                    tgt[i].y = ny * f;
                }
            }, { passive: true });

            let animating = true;
            const animate = () => {
                if (!animating) return;
                let moving = false;
                for (let i = 0; i < orbs.length; i++) {
                    const dx = tgt[i].x - pos[i].x;
                    const dy = tgt[i].y - pos[i].y;
                    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                        pos[i].x += dx * 0.05;
                        pos[i].y += dy * 0.05;
                        orbs[i].style.transform = `translate3d(${pos[i].x}px,${pos[i].y}px,0)`;
                        moving = true;
                    }
                }
                requestAnimationFrame(animate);
            };
            animate();

            // Pause when tab hidden
            document.addEventListener('visibilitychange', () => {
                animating = !document.hidden;
                if (animating) animate();
            });
        }
    }

    // ═══════════════════════════════════════
    // 6. SMOOTH SCROLL & MOBILE NAV
    // ═══════════════════════════════════════
    const navLinks = document.getElementById('nav-links');
    const navToggle = document.getElementById('nav-toggle');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navLinks?.classList.remove('active');
                navToggle?.classList.remove('active');
            }
        });
    });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !nav?.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // ═══════════════════════════════════════
    // 7. TYPEWRITER (optimized with RAF)
    // ═══════════════════════════════════════
    const typeEl = document.querySelector('.typewriter');
    if (typeEl) {
        const phrases = ['Arquitecto de Software', 'Android Developer', 'Kotlin Expert', 'Clean Architecture'];
        let idx = 0, charIdx = 0, deleting = false, lastTime = 0;

        const type = (timestamp) => {
            const phrase = phrases[idx];
            let speed = deleting ? 35 : 70;
            if (!deleting && charIdx === phrase.length) speed = 1500;
            else if (deleting && charIdx === 0) speed = 250;

            if (timestamp - lastTime >= speed) {
                lastTime = timestamp;
                typeEl.textContent = deleting
                    ? phrase.substring(0, charIdx - 1)
                    : phrase.substring(0, charIdx + 1);

                if (deleting) charIdx--; else charIdx++;

                if (!deleting && charIdx === phrase.length) deleting = true;
                else if (deleting && charIdx === 0) { deleting = false; idx = (idx + 1) % phrases.length; }
            }
            requestAnimationFrame(type);
        };

        setTimeout(() => requestAnimationFrame(type), 600);
    }

    // ═══════════════════════════════════════
    // 8. SECURITY & COPY PROTECTION
    // ═══════════════════════════════════════
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('copy', e => {
        e.preventDefault();
        e.clipboardData?.setData('text/plain', '');
    });
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
            e.preventDefault();
        }
    });

    // ═══════════════════════════════════════
    // 9. MODERN MINIMALIST CUSTOM CURSOR
    // ═══════════════════════════════════════
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.querySelector('.custom-cursor');
        const cursorGlow = document.querySelector('.custom-cursor-glow');
        
        if (cursor && cursorGlow) {
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let glowX = mouseX;
            let glowY = mouseY;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            }, { passive: true });

            const animateCursor = () => {
                // Smooth interpolation for the glow
                glowX += (mouseX - glowX) * 0.18;
                glowY += (mouseY - glowY) * 0.18;
                
                // Direct translation using transform
                // Fixed centering using translate(-50%, -50%) from CSS + dynamic position
                cursor.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
                cursorGlow.style.transform = `translate3d(calc(${glowX}px - 50%), calc(${glowY}px - 50%), 0)`;
                
                requestAnimationFrame(animateCursor);
            };
            requestAnimationFrame(animateCursor);

            // Hover effects for interactive elements
            const interactables = document.querySelectorAll('a, button, .project-card, .service-card, .arch__panel, .nav__toggle, .nav__theme-toggle');
            interactables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                    cursorGlow.classList.add('hover');
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                    cursorGlow.classList.remove('hover');
                });
            });
            
            // Re-apply hover listeners occasionally to support dynamically added elements if needed
            // But since this is a static site, running once is sufficient.
        }
    }

    // Console
    console.log('%c⚡ Yoangel Gómez Portfolio v5.0 — GPU Optimized', 'color: hsl(185, 90%, 45%); font-weight: bold;');
});
