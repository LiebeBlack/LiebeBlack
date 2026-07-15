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
    // 4. PREMIUM SCROLL REVEAL (Scale + Fade)
    // ═══════════════════════════════════════
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        reveals.forEach((el) => revealObserver.observe(el));
    }

    // ═══════════════════════════════════════
    // 5. MAGNETIC EFFECT (Premium Interaction)
    // ═══════════════════════════════════════
    if (!window.matchMedia('(pointer: coarse)').matches) {
        const magneticElements = document.querySelectorAll('.nav__cta, .hero__cta, .nav__theme-toggle, .footer__social a');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = `translate3d(0, 0, 0)`;
            });
        });
    }

    // ═══════════════════════════════════════
    // 6. GPU PARALLAX (desktop only, optimized)
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
    // 7. SMOOTH SCROLL & MOBILE NAV
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
    // 8. TYPEWRITER (REMOVED)
    // ═══════════════════════════════════════

    // ═══════════════════════════════════════
    // 9. PERFORMANCE: PRE-FETCH CONTACT PAGE
    // ═══════════════════════════════════════
    const prefetchContact = () => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'contacto.html';
        document.head.appendChild(link);
    };

    const contactLinks = document.querySelectorAll('a[href="contacto.html"]');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', prefetchContact, { once: true });
        link.addEventListener('touchstart', prefetchContact, { once: true, passive: true });
    });

    // ═══════════════════════════════════════
    // 10. FINAL INITIALIZATION
    // ═══════════════════════════════════════
    document.documentElement.style.cursor = 'auto';

    // Console
    console.log('%c⚡ Yoangel Gómez Portfolio v5.0 — GPU Optimized & Pre-fetched', 'color: hsl(185, 90%, 45%); font-weight: bold;');
});
