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

    // 6. Interactive Card Pointer Glow (Fine Pointers)
    if (!reduceMotionQuery.matches && window.matchMedia('(pointer: fine)').matches) {
        const interactiveCards = document.querySelectorAll(
            '.project-card, .service-item, .profile-card, .stack-col, .channel-card, .contact-form-wrapper'
        );

        interactiveCards.forEach(card => {
            card.addEventListener('pointermove', (event) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
                card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
            }, { passive: true });
        });

        document.documentElement.classList.add('pointer-depth');
    }
});
