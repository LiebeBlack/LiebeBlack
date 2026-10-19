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

    if ('IntersectionObserver' in window) {
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
        if (progress) {
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
    if (window.matchMedia('(pointer: fine)').matches) {
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

    // 7. Multi-Archetype Quantum Constellation Engine (Exactly 23 Active Varied Animations)
    // Varied shapes, morphing polygons, waving filaments, orbitals, and HUD reticles
    // Tuned for slow, hypnotic, and majestic movement across the entire page
    const initAtomicCanvas = () => {
        const canvas = document.getElementById('atomic-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dpr = 1;
        let animationFrameId = null;
        let isVisible = true;

        const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, active: false };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.scale(dpr, dpr);
        };

        const PALETTE = [
            '56, 189, 248',  // Cyan #38bdf8
            '129, 140, 248', // Electric Indigo #818cf8
            '52, 211, 153'   // Quantum Emerald #34d399
        ];
        const randomColor = () => PALETTE[Math.floor(Math.random() * PALETTE.length)];

        // ── FACTORY 1: Morphing Wireframe Figures (Polígonos Mutantes) ────
        // 7 items: varied sides (3, 4, 5, 6), sizes (small, med, large), durations
        const createMorphPolygon = (sizeTier) => {
            let baseRadius;
            let maxLife;
            let fadeSpeed;
            if (sizeTier === 'small') {
                baseRadius = Math.random() * 8 + 18;   // 18-26px
                maxLife = Math.random() * 400 + 700;    // ~12-18s
                fadeSpeed = Math.random() * 0.002 + 0.0015;
            } else if (sizeTier === 'large') {
                baseRadius = Math.random() * 20 + 55;  // 55-75px
                maxLife = Math.random() * 600 + 1000;   // ~22-30s
                fadeSpeed = Math.random() * 0.0012 + 0.0008;
            } else { // medium
                baseRadius = Math.random() * 14 + 32;  // 32-46px
                maxLife = Math.random() * 500 + 850;    // ~16-24s
                fadeSpeed = Math.random() * 0.0016 + 0.001;
            }

            const sidesRoll = Math.random();
            const sides = sidesRoll > 0.65 ? 4 : (sidesRoll > 0.35 ? 3 : (sidesRoll > 0.15 ? 5 : 6));
            const vertices = [];
            for (let i = 0; i < sides; i++) {
                vertices.push({
                    angleOffset: (i * Math.PI * 2) / sides,
                    radialPhase: Math.random() * Math.PI * 2,
                    tangentPhase: Math.random() * Math.PI * 2,
                    radialSpeed: Math.random() * 0.0007 + 0.00035, // Slow organic morphing
                    tangentSpeed: Math.random() * 0.0006 + 0.0003,
                    deformAmp: Math.random() * 0.32 + 0.16
                });
            }

            return {
                type: 'polygon',
                sizeTier,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.12, // Slow calm drift
                vy: (Math.random() - 0.5) * 0.12,
                rotation: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.0009,
                baseRadius,
                vertices,
                sides,
                colorRgb: randomColor(),
                alpha: 0,
                maxAlpha: Math.random() * 0.46 + 0.36,
                fadeSpeed,
                state: 'in',
                life: 0,
                maxLife,
                hasDiagonals: sides >= 4 && Math.random() > 0.4,
                hasCoreTick: Math.random() > 0.3
            };
        };

        // ── FACTORY 2: Undulating Wave Filaments (Líneas y Cintas) ─────────
        // 8 items: varied sub-types (spline, cross-spine, dual), sizes, durations
        const createWaveFilament = (sizeTier) => {
            let length;
            let maxLife;
            let fadeSpeed;
            if (sizeTier === 'compact') {
                length = Math.random() * 25 + 50;      // 50-75px
                maxLife = Math.random() * 400 + 650;   // ~12-18s
                fadeSpeed = Math.random() * 0.002 + 0.0014;
            } else if (sizeTier === 'panoramic') {
                length = Math.random() * 60 + 165;    // 165-225px
                maxLife = Math.random() * 600 + 1000;  // ~22-30s
                fadeSpeed = Math.random() * 0.0012 + 0.0008;
            } else { // standard
                length = Math.random() * 40 + 95;      // 95-135px
                maxLife = Math.random() * 500 + 800;   // ~15-22s
                fadeSpeed = Math.random() * 0.0016 + 0.001;
            }

            const subRoll = Math.random();
            const subType = subRoll > 0.65 ? 'cross-spine' : (subRoll > 0.3 ? 'spline' : 'dual');
            const pointCount = 5;
            const points = [];
            for (let i = 0; i < pointCount; i++) {
                points.push({
                    u: (i / (pointCount - 1)) - 0.5,
                    wavePhase: Math.random() * Math.PI * 2,
                    waveSpeed: Math.random() * 0.0008 + 0.0004,
                    waveAmp: Math.random() * 13 + 8
                });
            }

            return {
                type: 'filament',
                sizeTier,
                subType,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.13,
                vy: (Math.random() - 0.5) * 0.13,
                angle: Math.random() * Math.PI * 2,
                vAngle: (Math.random() - 0.5) * 0.0007,
                length,
                points,
                colorRgb: randomColor(),
                alpha: 0,
                maxAlpha: Math.random() * 0.54 + 0.38,
                fadeSpeed,
                state: 'in',
                life: 0,
                maxLife,
                pulseOffset: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.00035 + 0.00025,
                hasEndHalos: Math.random() > 0.4
            };
        };

        // ── FACTORY 3: Quantum Orbitals & Gyroscopes (Órbitas y Satélites) ─
        // 4 items: breathing elliptical paths with orbiting quantum satellites
        const createQuantumOrbital = (sizeTier) => {
            let rx0, ry0, maxLife, fadeSpeed;
            if (sizeTier === 'mini') {
                rx0 = Math.random() * 6 + 18;  // 18-24px
                ry0 = rx0 * (Math.random() * 0.35 + 0.45);
                maxLife = Math.random() * 500 + 850;
                fadeSpeed = Math.random() * 0.0018 + 0.001;
            } else { // medium
                rx0 = Math.random() * 12 + 34; // 34-46px
                ry0 = rx0 * (Math.random() * 0.35 + 0.5);
                maxLife = Math.random() * 600 + 1050;
                fadeSpeed = Math.random() * 0.0014 + 0.0008;
            }

            const satelliteCount = Math.random() > 0.45 ? 2 : 1;
            return {
                type: 'orbital',
                sizeTier,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.11,
                vy: (Math.random() - 0.5) * 0.11,
                tilt: Math.random() * Math.PI * 2,
                vTilt: (Math.random() - 0.5) * 0.0006,
                rx0,
                ry0,
                satelliteCount,
                orbitSpeed: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.0016 + 0.001),
                breathSpeed: Math.random() * 0.0008 + 0.0004,
                breathPhase: Math.random() * Math.PI * 2,
                colorRgb: randomColor(),
                alpha: 0,
                maxAlpha: Math.random() * 0.46 + 0.36,
                fadeSpeed,
                state: 'in',
                life: 0,
                maxLife
            };
        };

        // ── FACTORY 4: Tactical HUD Reticles & Brackets (Retículas HUD) ────
        // 4 items: corner brackets [ ] and rotating quadrant crosshairs
        const createHudReticle = (sizeTier) => {
            let radius, maxLife, fadeSpeed;
            if (sizeTier === 'micro') {
                radius = Math.random() * 6 + 14; // 14-20px
                maxLife = Math.random() * 400 + 700;
                fadeSpeed = Math.random() * 0.002 + 0.0012;
            } else { // focus
                radius = Math.random() * 10 + 28; // 28-38px
                maxLife = Math.random() * 500 + 900;
                fadeSpeed = Math.random() * 0.0015 + 0.0009;
            }

            const subType = Math.random() > 0.5 ? 'brackets' : 'cross-dial';
            return {
                type: 'reticle',
                sizeTier,
                subType,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                rotation: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.001,
                radius,
                breathSpeed: Math.random() * 0.001 + 0.0005,
                breathPhase: Math.random() * Math.PI * 2,
                colorRgb: randomColor(),
                alpha: 0,
                maxAlpha: Math.random() * 0.48 + 0.36,
                fadeSpeed,
                state: 'in',
                life: 0,
                maxLife
            };
        };

        // ── ENTITY RESPAWN DISPATCHER ──────────────────────────────────────
        const resetEntity = (entity) => {
            entity.x = Math.random() * width;
            entity.y = Math.random() * height;
            entity.vx = (Math.random() - 0.5) * 0.12;
            entity.vy = (Math.random() - 0.5) * 0.12;
            entity.colorRgb = randomColor();
            entity.alpha = 0;
            entity.state = 'in';
            entity.life = 0;

            if (entity.type === 'polygon') {
                entity.rotation = Math.random() * Math.PI * 2;
                entity.vRot = (Math.random() - 0.5) * 0.0009;
                const sidesRoll = Math.random();
                entity.sides = sidesRoll > 0.65 ? 4 : (sidesRoll > 0.35 ? 3 : (sidesRoll > 0.15 ? 5 : 6));
                entity.vertices.length = 0;
                for (let i = 0; i < entity.sides; i++) {
                    entity.vertices.push({
                        angleOffset: (i * Math.PI * 2) / entity.sides,
                        radialPhase: Math.random() * Math.PI * 2,
                        tangentPhase: Math.random() * Math.PI * 2,
                        radialSpeed: Math.random() * 0.0007 + 0.00035,
                        tangentSpeed: Math.random() * 0.0006 + 0.0003,
                        deformAmp: Math.random() * 0.32 + 0.16
                    });
                }
            } else if (entity.type === 'filament') {
                entity.angle = Math.random() * Math.PI * 2;
                entity.vAngle = (Math.random() - 0.5) * 0.0007;
                entity.pulseOffset = Math.random() * Math.PI * 2;
            } else if (entity.type === 'orbital') {
                entity.tilt = Math.random() * Math.PI * 2;
                entity.breathPhase = Math.random() * Math.PI * 2;
            } else if (entity.type === 'reticle') {
                entity.rotation = Math.random() * Math.PI * 2;
                entity.breathPhase = Math.random() * Math.PI * 2;
            }
        };

        // ── THE EXACT 23-ENTITY ARRAY ──────────────────────────────────────
        // 7 Polygons (2 small, 3 medium, 2 large)
        // 8 Filaments (3 compact, 3 standard, 2 panoramic)
        // 4 Orbitals (2 mini, 2 medium)
        // 4 Reticles (2 micro, 2 focus)
        // Total = 23 animations simultaneously active!
        const entities = [];

        const initEntities = () => {
            entities.length = 0;

            // 1. Polygons (7)
            entities.push(createMorphPolygon('small'));
            entities.push(createMorphPolygon('small'));
            entities.push(createMorphPolygon('medium'));
            entities.push(createMorphPolygon('medium'));
            entities.push(createMorphPolygon('medium'));
            entities.push(createMorphPolygon('large'));
            entities.push(createMorphPolygon('large'));

            // 2. Filaments (8)
            entities.push(createWaveFilament('compact'));
            entities.push(createWaveFilament('compact'));
            entities.push(createWaveFilament('compact'));
            entities.push(createWaveFilament('standard'));
            entities.push(createWaveFilament('standard'));
            entities.push(createWaveFilament('standard'));
            entities.push(createWaveFilament('panoramic'));
            entities.push(createWaveFilament('panoramic'));

            // 3. Orbitals (4)
            entities.push(createQuantumOrbital('mini'));
            entities.push(createQuantumOrbital('mini'));
            entities.push(createQuantumOrbital('medium'));
            entities.push(createQuantumOrbital('medium'));

            // 4. Reticles (4)
            entities.push(createHudReticle('micro'));
            entities.push(createHudReticle('micro'));
            entities.push(createHudReticle('focus'));
            entities.push(createHudReticle('focus'));

            // Stagger life and alphas so they appear naturally distributed across time
            entities.forEach(e => {
                e.life = Math.random() * e.maxLife;
                e.alpha = Math.random() * e.maxAlpha;
                e.state = Math.random() > 0.4 ? 'alive' : 'in';
            });
        };

        resize();
        initEntities();

        window.addEventListener('pointermove', (e) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
            mouse.active = true;
        }, { passive: true });

        window.addEventListener('pointerleave', () => {
            mouse.active = false;
        }, { passive: true });

        window.addEventListener('resize', () => {
            resize();
            initEntities();
        }, { passive: true });

        let lastTime = performance.now();
        const render = (time) => {
            if (!isVisible) return;

            const dt = Math.min(32, time - lastTime) / 16.666;
            lastTime = time;

            ctx.clearRect(0, 0, width, height);

            // Silky mouse interpolation
            if (mouse.active) {
                mouse.x += (mouse.targetX - mouse.x) * 0.08;
                mouse.y += (mouse.targetY - mouse.y) * 0.08;
            } else {
                mouse.x = -9999;
                mouse.y = -9999;
            }

            const mouseRadius = 180;

            // ── UPDATE & RENDER ALL 23 ENTITIES ───────────────────────────
            for (let i = 0; i < entities.length; i++) {
                const e = entities[i];

                // Continuous slow harmonic navigation
                const flowAngle = Math.sin(e.y * 0.001 + time * 0.00014) * 1.6 + Math.cos(e.x * 0.001 + time * 0.00014) * 1.6;
                e.vx += Math.cos(flowAngle) * 0.012 * dt;
                e.vy += Math.sin(flowAngle) * 0.012 * dt;
                e.vx *= 0.99;
                e.vy *= 0.99;

                // Speed cap: keep it strictly slow and zen
                const spd = Math.hypot(e.vx, e.vy);
                if (spd > 0.16) {
                    e.vx = (e.vx / spd) * 0.16;
                    e.vy = (e.vy / spd) * 0.16;
                }

                e.x += e.vx * dt;
                e.y += e.vy * dt;
                e.life += dt;

                // Soft cursor interaction
                if (mouse.active) {
                    const mdx = e.x - mouse.x;
                    const mdy = e.y - mouse.y;
                    const mdist = Math.hypot(mdx, mdy);
                    if (mdist < mouseRadius && mdist > 1) {
                        const mforce = (1 - mdist / mouseRadius) * 0.32;
                        e.vx += (mdx / mdist) * mforce * dt;
                        e.vy += (mdy / mdist) * mforce * dt;
                    }
                }

                // Generous screen boundary wrapping
                if (e.x < -70) e.x = width + 70;
                else if (e.x > width + 70) e.x = -70;
                if (e.y < -70) e.y = height + 70;
                else if (e.y > height + 70) e.y = -70;

                // Lifecycle: In -> Alive -> Out -> Respawn
                if (e.state === 'in') {
                    e.alpha += e.fadeSpeed * dt;
                    if (e.alpha >= e.maxAlpha) {
                        e.alpha = e.maxAlpha;
                        e.state = 'alive';
                    }
                } else if (e.state === 'alive') {
                    if (e.life >= e.maxLife) {
                        e.state = 'out';
                    }
                } else if (e.state === 'out') {
                    e.alpha -= e.fadeSpeed * dt;
                    if (e.alpha <= 0) {
                        e.alpha = 0;
                        resetEntity(e);
                    }
                }

                if (e.alpha <= 0.01) continue;

                // ── RENDER ACCORDING TO ARCHETYPE ─────────────────────────
                if (e.type === 'polygon') {
                    e.rotation += e.vRot * dt;

                    const coords = [];
                    for (let k = 0; k < e.vertices.length; k++) {
                        const v = e.vertices[k];
                        const radialDeform = Math.sin(time * v.radialSpeed + v.radialPhase) * v.deformAmp;
                        const r = e.baseRadius * (1 + radialDeform);
                        const tangentDeform = Math.cos(time * v.tangentSpeed + v.tangentPhase) * 0.22;
                        const ang = e.rotation + v.angleOffset + tangentDeform;
                        coords.push({
                            x: e.x + Math.cos(ang) * r,
                            y: e.y + Math.sin(ang) * r
                        });
                    }

                    // Face fill
                    ctx.beginPath();
                    ctx.moveTo(coords[0].x, coords[0].y);
                    for (let k = 1; k < coords.length; k++) ctx.lineTo(coords[k].x, coords[k].y);
                    ctx.closePath();
                    ctx.fillStyle = `rgba(${e.colorRgb}, ${(e.alpha * 0.04).toFixed(3)})`;
                    ctx.fill();

                    // Glow wireframe perimeter
                    ctx.shadowColor = `rgba(${e.colorRgb}, ${(e.alpha * 0.65).toFixed(3)})`;
                    ctx.shadowBlur = 6;
                    ctx.strokeStyle = `rgba(${e.colorRgb}, ${e.alpha.toFixed(3)})`;
                    ctx.lineWidth = e.sizeTier === 'large' ? 1.3 : 1.1;
                    ctx.stroke();
                    ctx.shadowBlur = 0;

                    // Diagonals
                    if (e.hasDiagonals && coords.length >= 4) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${e.colorRgb}, ${(e.alpha * 0.28).toFixed(3)})`;
                        ctx.lineWidth = 0.65;
                        ctx.moveTo(coords[0].x, coords[0].y);
                        ctx.lineTo(coords[2].x, coords[2].y);
                        if (coords.length > 3) {
                            ctx.moveTo(coords[1].x, coords[1].y);
                            ctx.lineTo(coords[3].x, coords[3].y);
                        }
                        ctx.stroke();
                    }

                    // Vertex beacons
                    ctx.fillStyle = `rgba(${e.colorRgb}, ${Math.min(1, e.alpha * 1.5).toFixed(3)})`;
                    for (let k = 0; k < coords.length; k++) {
                        ctx.beginPath();
                        ctx.arc(coords[k].x, coords[k].y, 1.25, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    // Center tick
                    if (e.hasCoreTick) {
                        const tickSize = e.sizeTier === 'large' ? 5.5 : 3.5;
                        ctx.beginPath();
                        ctx.moveTo(e.x - tickSize, e.y);
                        ctx.lineTo(e.x + tickSize, e.y);
                        ctx.moveTo(e.x, e.y - tickSize);
                        ctx.lineTo(e.x, e.y + tickSize);
                        ctx.strokeStyle = `rgba(${e.colorRgb}, ${(e.alpha * 0.65).toFixed(3)})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }

                } else if (e.type === 'filament') {
                    e.angle += e.vAngle * dt;

                    const breath = 1 + 0.16 * Math.sin(time * 0.0007 + e.pulseOffset);
                    const cosA = Math.cos(e.angle);
                    const sinA = Math.sin(e.angle);
                    const curvePts = [];

                    for (let k = 0; k < e.points.length; k++) {
                        const p = e.points[k];
                        const wave = Math.sin(time * p.waveSpeed + p.wavePhase) * p.waveAmp;
                        const along = p.u * e.length * breath;
                        curvePts.push({
                            x: e.x + cosA * along - sinA * wave,
                            y: e.y + sinA * along + cosA * wave
                        });
                    }

                    // Draw smooth spline
                    const drawSplineAt = (pts, strokeAlpha, width) => {
                        ctx.beginPath();
                        ctx.moveTo(pts[0].x, pts[0].y);
                        for (let k = 1; k < pts.length - 1; k++) {
                            const mx = (pts[k].x + pts[k + 1].x) / 2;
                            const my = (pts[k].y + pts[k + 1].y) / 2;
                            ctx.quadraticCurveTo(pts[k].x, pts[k].y, mx, my);
                        }
                        ctx.quadraticCurveTo(
                            pts[pts.length - 2].x,
                            pts[pts.length - 2].y,
                            pts[pts.length - 1].x,
                            pts[pts.length - 1].y
                        );
                        ctx.shadowColor = `rgba(${e.colorRgb}, ${(strokeAlpha * 0.65).toFixed(3)})`;
                        ctx.shadowBlur = 6;
                        ctx.strokeStyle = `rgba(${e.colorRgb}, ${strokeAlpha.toFixed(3)})`;
                        ctx.lineWidth = width;
                        ctx.lineCap = 'round';
                        ctx.stroke();
                        ctx.shadowBlur = 0;
                    };

                    drawSplineAt(curvePts, e.alpha, e.sizeTier === 'panoramic' ? 1.35 : 1.15);

                    // Dual coupled parallel hairline
                    if (e.subType === 'dual') {
                        const gap = 6.5;
                        const twinPts = curvePts.map(pt => ({
                            x: pt.x - sinA * gap,
                            y: pt.y + cosA * gap
                        }));
                        drawSplineAt(twinPts, e.alpha * 0.65, 0.8);
                    }

                    // Center crosshair tick
                    if (e.subType === 'cross-spine') {
                        const halfCross = 5;
                        ctx.beginPath();
                        ctx.moveTo(e.x - sinA * halfCross, e.y + cosA * halfCross);
                        ctx.lineTo(e.x + sinA * halfCross, e.y - cosA * halfCross);
                        ctx.strokeStyle = `rgba(${e.colorRgb}, ${(e.alpha * 0.8).toFixed(3)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }

                    // Endpoint beacons
                    ctx.fillStyle = `rgba(${e.colorRgb}, ${Math.min(1, e.alpha * 1.5).toFixed(3)})`;
                    ctx.beginPath();
                    ctx.arc(curvePts[0].x, curvePts[0].y, 1.25, 0, Math.PI * 2);
                    ctx.arc(curvePts[curvePts.length - 1].x, curvePts[curvePts.length - 1].y, 1.25, 0, Math.PI * 2);
                    ctx.fill();

                    // Gliding photon spark
                    const pulseT = ((time * e.pulseSpeed + e.pulseOffset * 0.5) % 1);
                    const segFloat = pulseT * (curvePts.length - 1);
                    const segIdx = Math.floor(segFloat);
                    const segFrac = segFloat - segIdx;
                    const p1 = curvePts[segIdx];
                    const p2 = curvePts[Math.min(curvePts.length - 1, segIdx + 1)];
                    const sparkX = p1.x + (p2.x - p1.x) * segFrac;
                    const sparkY = p1.y + (p2.y - p1.y) * segFrac;

                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, e.alpha * 1.8).toFixed(3)})`;
                    ctx.beginPath();
                    ctx.arc(sparkX, sparkY, 1.45, 0, Math.PI * 2);
                    ctx.fill();

                } else if (e.type === 'orbital') {
                    e.tilt += e.vTilt * dt;

                    const breath = 1 + 0.16 * Math.sin(time * e.breathSpeed + e.breathPhase);
                    const rx = e.rx0 * breath;
                    const ry = e.ry0 * breath;

                    // Draw breathing elliptical orbital ring
                    ctx.beginPath();
                    ctx.ellipse(e.x, e.y, rx, ry, e.tilt, 0, Math.PI * 2);
                    ctx.shadowColor = `rgba(${e.colorRgb}, ${(e.alpha * 0.55).toFixed(3)})`;
                    ctx.shadowBlur = 5;
                    ctx.strokeStyle = `rgba(${e.colorRgb}, ${(e.alpha * 0.65).toFixed(3)})`;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                    ctx.shadowBlur = 0;

                    // Center quantum nucleus
                    ctx.fillStyle = `rgba(${e.colorRgb}, ${(e.alpha * 0.8).toFixed(3)})`;
                    ctx.beginPath();
                    ctx.arc(e.x, e.y, 1.2, 0, Math.PI * 2);
                    ctx.fill();

                    // Orbiting satellites
                    const cosTilt = Math.cos(e.tilt);
                    const sinTilt = Math.sin(e.tilt);
                    for (let sIdx = 0; sIdx < e.satelliteCount; sIdx++) {
                        const satAngle = time * e.orbitSpeed + (sIdx * Math.PI);
                        const ox = Math.cos(satAngle) * rx;
                        const oy = Math.sin(satAngle) * ry;
                        const sx = e.x + ox * cosTilt - oy * sinTilt;
                        const sy = e.y + ox * sinTilt + oy * cosTilt;

                        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, e.alpha * 1.8).toFixed(3)})`;
                        ctx.beginPath();
                        ctx.arc(sx, sy, 1.4, 0, Math.PI * 2);
                        ctx.fill();

                        // Tiny halo around satellite
                        ctx.fillStyle = `rgba(${e.colorRgb}, ${(e.alpha * 0.25).toFixed(3)})`;
                        ctx.beginPath();
                        ctx.arc(sx, sy, 3.2, 0, Math.PI * 2);
                        ctx.fill();
                    }

                } else if (e.type === 'reticle') {
                    e.rotation += e.vRot * dt;

                    const breath = 1 + 0.15 * Math.sin(time * e.breathSpeed + e.breathPhase);
                    const rad = e.radius * breath;
                    const cosR = Math.cos(e.rotation);
                    const sinR = Math.sin(e.rotation);

                    if (e.subType === 'brackets') {
                        // 4 corner brackets [ ]
                        const arm = rad * 0.38;
                        const corners = [
                            { dx: -rad, dy: -rad, ax: arm, ay: 0, bx: 0, by: arm },
                            { dx: rad, dy: -rad, ax: -arm, ay: 0, bx: 0, by: arm },
                            { dx: rad, dy: rad, ax: -arm, ay: 0, bx: 0, by: -arm },
                            { dx: -rad, dy: rad, ax: arm, ay: 0, bx: 0, by: -arm }
                        ];

                        ctx.strokeStyle = `rgba(${e.colorRgb}, ${(e.alpha * 0.75).toFixed(3)})`;
                        ctx.lineWidth = 0.95;
                        ctx.beginPath();
                        corners.forEach(c => {
                            const cx = e.x + c.dx * cosR - c.dy * sinR;
                            const cy = e.y + c.dx * sinR + c.dy * cosR;
                            const p1x = cx + c.ax * cosR - c.ay * sinR;
                            const p1y = cy + c.ax * sinR + c.ay * cosR;
                            const p2x = cx + c.bx * cosR - c.by * sinR;
                            const p2y = cy + c.bx * sinR + c.by * cosR;

                            ctx.moveTo(p1x, p1y);
                            ctx.lineTo(cx, cy);
                            ctx.lineTo(p2x, p2y);
                        });
                        ctx.stroke();

                        // Tiny center focus dot
                        ctx.fillStyle = `rgba(255, 255, 255, ${(e.alpha * 0.85).toFixed(3)})`;
                        ctx.beginPath();
                        ctx.arc(e.x, e.y, 1.1, 0, Math.PI * 2);
                        ctx.fill();

                    } else if (e.subType === 'cross-dial') {
                        // Precision crosshair + quadrant tick points
                        ctx.strokeStyle = `rgba(${e.colorRgb}, ${(e.alpha * 0.75).toFixed(3)})`;
                        ctx.lineWidth = 0.85;

                        // Cross arms
                        ctx.beginPath();
                        ctx.moveTo(e.x - rad * cosR, e.y - rad * sinR);
                        ctx.lineTo(e.x + rad * cosR, e.y + rad * sinR);
                        ctx.moveTo(e.x + rad * sinR, e.y - rad * cosR);
                        ctx.lineTo(e.x - rad * sinR, e.y + rad * cosR);
                        ctx.stroke();

                        // 4 quadrant ticks
                        const tickDist = rad * 1.35;
                        ctx.fillStyle = `rgba(${e.colorRgb}, ${(e.alpha * 0.9).toFixed(3)})`;
                        for (let t = 0; t < 4; t++) {
                            const tAngle = e.rotation + (t * Math.PI / 2) + (Math.PI / 4);
                            const tx = e.x + Math.cos(tAngle) * tickDist;
                            const ty = e.y + Math.sin(tAngle) * tickDist;
                            ctx.beginPath();
                            ctx.arc(tx, ty, 1.15, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }

                // ── INTER-ENTITY RESONANCE BEAMS ──────────────────────────
                // When any 2 entities cross within 80px, draw a delicate quantum chord
                for (let j = i + 1; j < entities.length; j++) {
                    const e2 = entities[j];
                    if (e2.alpha < 0.15) continue;
                    const dx = e.x - e2.x;
                    const dy = e.y - e2.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 80) {
                        const linkAlpha = (1 - dist / 80) * Math.min(e.alpha, e2.alpha) * 0.35;
                        ctx.strokeStyle = `rgba(129, 140, 248, ${linkAlpha.toFixed(3)})`;
                        ctx.lineWidth = 0.55;
                        ctx.beginPath();
                        ctx.moveTo(e.x, e.y);
                        ctx.lineTo(e2.x, e2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            } else {
                lastTime = performance.now();
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(render);
                }
            }
        });
    };

    initAtomicCanvas();
});
