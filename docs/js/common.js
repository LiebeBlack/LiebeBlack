/**
 * YOANGEL GÓMEZ · LIEBEBLACK — SHARED BEHAVIORS
 * Preloader, Native IntersectionObserver Reveal, Scroll Spy,
 * Progress Bar, Prefetching & Dynamic Pointer Depth
 * Optimized for Modern Chrome 157+, Firefox 167+, Safari 19+
 */

// 1. Mark JS capability immediately
document.documentElement.classList.add('js');

const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

// 2. Predictive prefetch helper (Progressive fallback if Speculation Rules API is not active)
function prefetchPage(href) {
    if (!href) return;
    if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) return;
    const selector = `link[rel="prefetch"][href="${href}"]`;
    if (document.querySelector(selector)) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
}

// 3. Scroll Reveal Engine (Pure IntersectionObserver)
const initReveal = () => {
    const animElements = document.querySelectorAll('[data-aos]');
    if (!animElements.length) return;

    if ('IntersectionObserver' in window && !reduceMotionQuery.matches) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        animElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight && rect.bottom > 0) {
                el.classList.add('aos-animate');
            } else {
                observer.observe(el);
            }
        });
    } else {
        animElements.forEach(el => el.classList.add('aos-animate'));
    }
};

// Run reveal right away and on DOM readiness
initReveal();
document.addEventListener('DOMContentLoaded', initReveal);
window.addEventListener('load', initReveal);

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 4. Preloader Dismissal
    const preloader = document.getElementById('preloader');
    const dismissPreloader = () => {
        if (!preloader || preloader.classList.contains('hidden')) return;
        preloader.classList.add('hidden');
        setTimeout(() => {
            if (preloader.parentNode) preloader.remove();
        }, 500);
    };

    if (preloader) {
        if (document.readyState === 'complete') {
            setTimeout(dismissPreloader, 150);
        } else {
            window.addEventListener('load', () => setTimeout(dismissPreloader, 150));
        }
        // Safety timeout so preloader never blocks the user
        setTimeout(dismissPreloader, 1000);
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) dismissPreloader();
        });
    }

    // 5. Scroll Progress, Floating Nav Scrolled State & Scroll-Spy
    const nav = document.getElementById('nav');
    const progress = document.querySelector('.scroll-progress');
    const spyLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
    const spySections = spyLinks
        .map(link => {
            const id = link.getAttribute('href').slice(1);
            return { link, section: document.getElementById(id) };
        })
        .filter(item => item.section !== null);

    let isTicking = false;

    const onScrollUpdate = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const doc = document.documentElement;
        const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);

        // Nav scrolled state
        if (nav) {
            nav.classList.toggle('scrolled', scrollY > 20);
        }

        // Scroll progress bar
        if (progress && !reduceMotionQuery.matches) {
            const progressRatio = Math.min(1, Math.max(0, scrollY / maxScroll));
            progress.style.transform = `scaleX(${progressRatio})`;
        }

        // Scroll Spy
        if (spySections.length) {
            const offset = window.innerHeight * 0.35;
            let activeItem = null;

            // Check if at the very bottom of page
            if (scrollY + window.innerHeight >= doc.scrollHeight - 50) {
                activeItem = spySections[spySections.length - 1];
            } else {
                for (const item of spySections) {
                    const rect = item.section.getBoundingClientRect();
                    if (rect.top <= offset) {
                        activeItem = item;
                    }
                }
            }

            spySections.forEach(item => {
                item.link.classList.toggle('active', item === activeItem);
            });
        }

        isTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            isTicking = true;
            requestAnimationFrame(onScrollUpdate);
        }
    }, { passive: true });

    window.addEventListener('resize', onScrollUpdate, { passive: true });
    onScrollUpdate();

    // 6. Interactive Card Pointer Depth & Magnetic Physics (Fine Pointers)
    if (!reduceMotionQuery.matches && window.matchMedia('(pointer: fine)').matches) {
        const interactiveCards = document.querySelectorAll(
            '.project-card, .service-item, .profile-card, .stack-col, .channel-card, .contact-form-wrapper'
        );

        interactiveCards.forEach(card => {
            let rect = null;

            card.addEventListener('pointerenter', () => {
                rect = card.getBoundingClientRect();
            }, { passive: true });

            card.addEventListener('pointermove', (event) => {
                if (!rect) rect = card.getBoundingClientRect();
                const relX = event.clientX - rect.left;
                const relY = event.clientY - rect.top;

                // Pointer illumination coords
                card.style.setProperty('--pointer-x', `${relX}px`);
                card.style.setProperty('--pointer-y', `${relY}px`);
            }, { passive: true });

            card.addEventListener('pointerleave', () => {
                rect = null;
            }, { passive: true });
        });

        document.documentElement.classList.add('pointer-depth');

        // Magnetic Action Physics for Key Interactive Elements
        const magneticElements = document.querySelectorAll('.btn--primary, .btn--ghost, .btn-extreme, .nav-brand');
        magneticElements.forEach(el => {
            el.addEventListener('pointermove', (e) => {
                const rect = el.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                el.style.transform = `translate3d(${dx * 0.16}px, ${dy * 0.16}px, 0)`;
            }, { passive: true });

            el.addEventListener('pointerleave', () => {
                el.style.transform = '';
            }, { passive: true });
        });
    }

    // 7. Atomic Particle Physics Engine (Ultra-lightweight Subatomic Nodes)
    const initAtomicCanvas = () => {
        const canvas = document.getElementById('atomic-canvas');
        if (!canvas || reduceMotionQuery.matches) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dpr = 1;
        let animationFrameId = null;
        let isVisible = false;

        const mouse = { x: -9999, y: -9999, active: false };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.scale(dpr, dpr);
        };

        const PARTICLE_COUNT = Math.min(42, Math.max(22, Math.floor((window.innerWidth * window.innerHeight) / 28000)));
        const particles = [];

        const createParticle = () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.42,
            vy: (Math.random() - 0.5) * 0.42,
            radius: Math.random() * 0.8 + 0.9,
            baseAlpha: Math.random() * 0.35 + 0.35,
            phase: Math.random() * Math.PI * 2
        });

        const initParticles = () => {
            particles.length = 0;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        };

        resize();
        initParticles();

        const parentSection = canvas.parentElement || document.body;
        parentSection.addEventListener('pointermove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        }, { passive: true });

        parentSection.addEventListener('pointerleave', () => {
            mouse.active = false;
            mouse.x = -9999;
            mouse.y = -9999;
        }, { passive: true });

        window.addEventListener('resize', () => {
            resize();
            initParticles();
        }, { passive: true });

        let lastTime = performance.now();
        const render = (time) => {
            if (!isVisible) return;

            const dt = Math.min(32, time - lastTime) / 16.666;
            lastTime = time;

            ctx.clearRect(0, 0, width, height);

            const connectionDist = 95;
            const mouseRadius = 130;

            // Physics Update
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.phase += 0.02 * dt;

                if (p.x < 0) { p.x = 0; p.vx *= -1; }
                else if (p.x > width) { p.x = width; p.vx *= -1; }
                if (p.y < 0) { p.y = 0; p.vy *= -1; }
                else if (p.y > height) { p.y = height; p.vy *= -1; }

                if (mouse.active) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < mouseRadius && dist > 0.1) {
                        const force = (1 - dist / mouseRadius) * 0.8;
                        p.x += (dx / dist) * force * 2.2 * dt;
                        p.y += (dy / dist) * force * 2.2 * dt;
                    }
                }
            }

            // Hairline Inter-particle Connections
            ctx.lineWidth = 0.65;
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < connectionDist) {
                        const alpha = (1 - dist / connectionDist) * 0.22;
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Subatomic Node Dots
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const pulse = (Math.sin(p.phase) + 1) * 0.15;
                const currentAlpha = Math.min(1, p.baseAlpha + pulse);

                ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha.toFixed(2)})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    lastTime = performance.now();
                    if (!animationFrameId) animationFrameId = requestAnimationFrame(render);
                } else if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            });
        }, { threshold: 0.05 });

        observer.observe(canvas);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            } else if (!document.hidden && isVisible && !animationFrameId) {
                lastTime = performance.now();
                animationFrameId = requestAnimationFrame(render);
            }
        });
    };

    initAtomicCanvas();
});
