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

    // 3. Repository Archive Live Search
    const repoSearch = document.getElementById('repo-search');
    const repoArchive = document.getElementById('repos-archive');
    const repoCount = document.getElementById('repo-count');
    const repoEmpty = document.getElementById('repo-empty');

    if (repoSearch && repoArchive && repoCount) {
        const repoEntries = Array.from(repoArchive.querySelectorAll('.repo-entry'));
        const normalize = (value) => value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        const updateRepoSearch = () => {
            const query = normalize(repoSearch.value.trim());
            let visible = 0;

            repoEntries.forEach(entry => {
                const searchable = Array.from(
                    entry.querySelectorAll('.repo-entry__name, .repo-entry__desc, .repo-entry__lang')
                ).map(node => node.textContent).join(' ');
                const matches = !query || normalize(searchable).includes(query);

                entry.hidden = !matches;
                if (matches) visible += 1;
            });

            repoCount.textContent = `${visible} ${visible === 1 ? 'repositorio' : 'repositorios'}`;

            if (repoEmpty) {
                repoEmpty.hidden = visible !== 0;
            }
        };

        repoSearch.addEventListener('input', updateRepoSearch, { passive: true });
        repoSearch.addEventListener('search', updateRepoSearch);
        updateRepoSearch();
    }
});
