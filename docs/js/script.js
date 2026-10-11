/**
 * YOANGEL GÓMEZ · LIEBEBLACK — MAIN PAGE SCRIPT
 * Smooth Anchor Navigation & Predictive Prefetch
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // 1. Smooth In-Page Anchor Scrolling with Calibrated Nav Offset
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                const navHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = Math.max(0, elementPosition - navHeight);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: reduceMotion.matches ? 'auto' : 'smooth'
                });

                if (history.pushState) {
                    history.pushState(null, '', targetId);
                }
            }
        });
    });

    // 2. Predictive Prefetch of Contact Page
    const contactLinks = document.querySelectorAll('a[href="contacto.html"]');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', () => prefetchPage('contacto.html'), { once: true });
        link.addEventListener('touchstart', () => prefetchPage('contacto.html'), { once: true, passive: true });
    });
});
