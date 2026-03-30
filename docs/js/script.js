document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DYNAMIC PROGRESS & NAVBAR ---
    const progressBar = document.getElementById('progress');
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
        // Progress Bar
        const docElement = document.documentElement;
        const winScroll = window.pageYOffset || docElement.scrollTop;
        const height = docElement.scrollHeight - docElement.clientHeight;
        
        if (progressBar && height > 0) {
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        }

        // Navbar Scroll
        if (navbar) {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load

    // --- 2. ELITE SECURITY PROTOCOLS (PROTECTED DIGITAL IDENTITY) ---
    const secureEvents = ['contextmenu', 'copy', 'cut', 'paste', 'dragstart', 'selectstart'];
    secureEvents.forEach(evt => document.addEventListener(evt, e => e.preventDefault()));

    document.addEventListener('keydown', (e) => {
        // Bloquear F12
        if (e.keyCode === 123) e.preventDefault();
        
        // Bloquear Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J (DevTools)
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 67 || e.keyCode === 74)) e.preventDefault();
        
        // Bloquear Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) e.preventDefault();
        
        // Bloquear Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) e.preventDefault();

        // Bloquear Ctrl+C, Ctrl+V, Ctrl+X
        if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88)) e.preventDefault();
    });
    
    // --- 3. MODULAR CARD EXPANSION ENGINE ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });

    // --- 4. REVEAL-ON-SCROLL ENGINE (STAGGERED) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15, 
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 5. RELIABLE LOADER DISMISSAL ---
    const dismissLoader = () => {
        const loader = document.getElementById('loader');
        if (loader && !loader.classList.contains('hidden')) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    const heroReveal = document.querySelector('.hero .reveal');
                    if (heroReveal) heroReveal.classList.add('active');
                }, 400);
            }, 800);
        }
    };

    if (document.readyState === 'complete') {
        dismissLoader();
    } else {
        window.addEventListener('load', dismissLoader);
    }

    console.log("SYSTEM: X10 Modern Symmetry v13.1 - Luxury Digital Active.");
});
