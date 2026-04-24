/**
 * Contact Page Logic - Ultra-Premium Version
 * Handles Formspree integration and high-end UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. AOS Initialization with Refined Timing
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,
            easing: 'cubic-bezier(0.2, 1, 0.2, 1)',
            once: true
        });
    }

    // Preloader Handling
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        });
    }

    // 2. Formspree High-End Integration
    const form = document.getElementById("contact-form");
    const status = document.getElementById("status");

    if (form) {
        async function handleSubmit(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            
            const btn = form.querySelector('.btn-extreme');
            const originalBtnText = btn.innerText;
            
            // Visual feedback: Start Transmission
            btn.innerText = "TRANSFERIENDO...";
            btn.style.opacity = "0.7";
            btn.disabled = true;

            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "TRANSACCIÓN COMPLETADA CON ÉXITO";
                    status.style.color = "var(--neon-cyan)";
                    form.reset();
                    btn.innerText = "COMPLETADO";
                    btn.style.background = "var(--neon-cyan)";
                } else {
                    response.json().then(data => {
                        status.innerHTML = "ERROR EN EL PROTOCOLO. REINTENTE.";
                        status.style.color = "#ff3e3e";
                        btn.innerText = originalBtnText;
                        btn.style.opacity = "1";
                        btn.disabled = false;
                    })
                }
            }).catch(error => {
                status.innerHTML = "FALLO DE CONEXIÓN CRÍTICO.";
                status.style.color = "#ff3e3e";
                btn.innerText = originalBtnText;
                btn.style.opacity = "1";
                btn.disabled = false;
            });
        }
        form.addEventListener("submit", handleSubmit);
    }

    // 3. Navbar Adaptive Scroll
    const nav = document.querySelector('.nav-contact');
    const navInner = document.querySelector('.nav-contact__inner');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.top = '1rem';
            navInner.style.padding = '0.5rem 2rem';
            navInner.style.background = 'rgba(5, 5, 10, 0.9)';
            navInner.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
        } else {
            nav.style.top = '2rem';
            navInner.style.padding = '0.75rem 2rem';
            navInner.style.background = 'rgba(10, 10, 15, 0.7)';
            navInner.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        }
    });

    // 5. Performance: Predictive Pre-fetching
    const prefetchHome = () => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'index.html';
        document.head.appendChild(link);
    };

    document.querySelectorAll('a[href="index.html"], a[href="index.html#proyectos"]').forEach(link => {
        link.addEventListener('mouseenter', prefetchHome, { once: true });
        link.addEventListener('touchstart', prefetchHome, { once: true, passive: true });
    });

    console.log('%c⚡ Protocolo de Enlace Optimizado', 'color: #00f2ff; font-weight: bold;');
});
