/**
 * Yoangel Gómez — Contact Page v8
 * Formspree integration + file feedback (shared behavior in common.js).
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. File input: show the chosen file name
    const fileInput = document.getElementById('file-upload');
    const fileName = document.getElementById('file-name');

    if (fileInput && fileName) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files && fileInput.files[0];
            fileName.textContent = file
                ? `Archivo adjunto: ${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB`
                : 'Adjuntar archivo (opcional)';
        });
    }

    // 2. Formspree submission with clear visual feedback
    const form = document.getElementById('contact-form');
    const status = document.getElementById('status');

    if (form && status) {
        const setStatus = (message, type) => {
            status.textContent = message;
            status.classList.toggle('form-status--success', type === 'success');
            status.classList.toggle('form-status--error', type === 'error');
            status.classList.add('visible');
        };

        async function handleSubmit(event) {
            event.preventDefault();
            const data = new FormData(form);

            const btn = form.querySelector('.btn-extreme');
            const originalBtnText = btn.textContent;

            // Sending state
            btn.textContent = 'Enviando…';
            btn.disabled = true;
            form.setAttribute('aria-busy', 'true');
            status.classList.remove('visible', 'form-status--success', 'form-status--error');

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    if (fileName) fileName.textContent = 'Adjuntar archivo (opcional)';
                    setStatus('Consulta enviada. Te responderé en breve.', 'success');
                } else {
                    const error = await response.json().catch(() => ({}));
                    throw new Error(error.error || 'HTTP ' + response.status);
                }
            } catch (err) {
                setStatus('No se pudo enviar la consulta. Revisa tu conexión e inténtalo de nuevo.', 'error');
            } finally {
                btn.textContent = originalBtnText;
                btn.disabled = false;
                form.setAttribute('aria-busy', 'false');
            }
        }

        form.addEventListener('submit', handleSubmit);
    }

    // 3. Predictive pre-fetch of the home page
    document.querySelectorAll('a[href^="index.html"]').forEach(link => {
        link.addEventListener('mouseenter', () => prefetchPage('index.html'), { once: true });
        link.addEventListener('touchstart', () => prefetchPage('index.html'), { once: true, passive: true });
    });
});
