/**
 * Yoangel Gómez — Main Page v13
 * Page-specific interactions (shared behavior lives in common.js).
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Smooth in-page scroll (respects reduced motion)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: reduceMotion.matches ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Predictive pre-fetch of the contact page
    document.querySelectorAll('a[href="contacto.html"]').forEach(link => {
        link.addEventListener('mouseenter', () => prefetchPage('contacto.html'), { once: true });
        link.addEventListener('touchstart', () => prefetchPage('contacto.html'), { once: true, passive: true });
    });
});
