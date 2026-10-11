/**
 * YOANGEL GÓMEZ · LIEBEBLACK — CONTACT PAGE SCRIPT
 * Formspree Async Handling & File Attachment Feedback
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. File Upload Feedback
    const fileInput = document.getElementById('file-upload');
    const fileName = document.getElementById('file-name');

    if (fileInput && fileName) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files && fileInput.files[0];
            if (file) {
                const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
                fileName.textContent = `Adjunto: ${file.name} (${sizeMb} MB)`;
            } else {
                fileName.textContent = 'Adjuntar archivo (opcional)';
            }
        });
    }

    // 2. Formspree Asynchronous Submission
    const form = document.getElementById('contact-form');
    const status = document.getElementById('status');

    if (form && status) {
        const setStatus = (message, type) => {
            status.textContent = message;
            status.classList.toggle('form-status--success', type === 'success');
            status.classList.toggle('form-status--error', type === 'error');
            status.classList.add('visible');
        };

        const clearStatus = () => {
            status.textContent = '';
            status.classList.remove('visible', 'form-status--success', 'form-status--error');
        };

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitBtn = form.querySelector('.btn-extreme');
            const originalText = submitBtn.textContent;
            const data = new FormData(form);

            // Set loading state
            submitBtn.textContent = 'Enviando consulta…';
            submitBtn.disabled = true;
            form.setAttribute('aria-busy', 'true');
            clearStatus();

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    if (fileName) {
                        fileName.textContent = 'Adjuntar archivo (opcional)';
                    }
                    setStatus('Consulta enviada exitosamente. Responderé a la brevedad.', 'success');
                } else {
                    const errData = await response.json().catch(() => ({}));
                    const errMsg = errData.errors?.map(e => e.message).join(', ') || 'Error al procesar el formulario.';
                    throw new Error(errMsg);
                }
            } catch (err) {
                setStatus('No se pudo enviar la consulta. Por favor, verifica tu conexión o escríbeme directamente a contact@yoangelgomez.dev', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.setAttribute('aria-busy', 'false');
            }
        });
    }

    // 3. Predictive Prefetch of Home Page
    const homeLinks = document.querySelectorAll('a[href^="index.html"]');
    homeLinks.forEach(link => {
        link.addEventListener('mouseenter', () => prefetchPage('index.html'), { once: true });
        link.addEventListener('touchstart', () => prefetchPage('index.html'), { once: true, passive: true });
    });
});
