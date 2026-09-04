/**
 * Yoangel Gómez — Shared Behaviors v8
 * Preloader, native reveal engine, nav scroll state + scroll-spy,
 * scroll progress bar and a shared page-prefetch helper.
 *
 * The reveal engine is initialized immediately (scripts load at the
 * end of <body>), so even if a later script throws, page content is
 * never left hidden: [data-aos] is only hidden under `html.js`.
 */
document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Shared helper: prefetch a same-site page after first intent.
function prefetchPage(href) {
    const selector = `link[rel="prefetch"][href="${href}"]`;
    if (document.querySelector(selector)) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
}

// 1. Scroll reveal engine (native IntersectionObserver)
const revealElements = () => {
    const animElements = document.querySelectorAll('[data-aos]');
    if (!animElements.length) return;

    if ('IntersectionObserver' in window && !reduceMotion.matches) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        animElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const viewport = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top < viewport && rect.bottom > 0) {
                el.classList.add('aos-animate');
            } else {
                observer.observe(el);
            }
        });
    } else {
        animElements.forEach(el => el.classList.add('aos-animate'));
    }
};

// Run now (DOM is parsed), again on DOMContentLoaded and on load for safety.
revealElements();
document.addEventListener('DOMContentLoaded', revealElements);
window.addEventListener('load', revealElements);

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 2. Preloader — resolves quickly, never blocks
    const preloader = document.getElementById('preloader');
    const dismissPreloader = () => {
        if (!preloader || preloader.classList.contains('hidden')) return;
        preloader.classList.add('hidden');
        setTimeout(() => {
            if (preloader.parentNode) preloader.remove();
        }, 600);
    };

    if (preloader) {
        if (document.readyState === 'complete') {
            setTimeout(dismissPreloader, 180);
        } else {
            window.addEventListener('load', () => setTimeout(dismissPreloader, 180));
        }
        // Safety timeout so the preloader never gets stuck
        setTimeout(dismissPreloader, 1200);
    }

    // 3. Nav compact state + scroll progress + scroll-spy (single rAF loop)
    const nav = document.getElementById('nav');
    const progress = document.querySelector('.scroll-progress');
    const spyLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
    const spySections = spyLinks
        .map(a => {
            const id = a.getAttribute('href').slice(1);
            return { link: a, section: document.getElementById(id) };
        })
        .filter(s => s.section);

    let ticking = false;
    const update = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);

        if (nav) nav.classList.toggle('scrolled', scrollY > 24);

        if (progress && !reduceMotion.matches) {
            progress.style.transform = `scaleX(${Math.min(1, scrollY / max)})`;
        }

        if (spySections.length) {
            const offset = window.innerHeight * 0.4;
            let current = null;
            for (const { section } of spySections) {
                if (section.getBoundingClientRect().top <= offset) current = section;
            }
            spySections.forEach(({ link, section }) => {
                link.classList.toggle('active', section === current);
            });
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
});
