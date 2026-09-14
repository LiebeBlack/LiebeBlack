# LiebeBlack

## Yoangel Gómez · Ingeniería de software de sistemas

Portafolio personal de **Yoangel Gómez (LiebeBlack)**: software de escritorio, audio en tiempo real, hardware y herramientas de bajo nivel. El sitio presenta proyectos, experiencia técnica y una vía directa de contacto para colaboraciones o desarrollo a medida.

<p>
  <a href="https://liebeblack.github.io/LiebeBlack/">Ver portafolio</a>
  ·
  <a href="https://github.com/LiebeBlack">GitHub</a>
  ·
  <a href="https://liebeblack.github.io/LiebeBlack/contacto.html">Contactar</a>
</p>

![Estado](https://img.shields.io/badge/estado-activo-55d6a7?style=flat-square)
![Interfaz](https://img.shields.io/badge/interfaz-HTML%20%2F%20CSS%20%2F%20JS-6bd5ff?style=flat-square)
![Licencia](https://img.shields.io/badge/licencia-consultar-718096?style=flat-square)

## Enfoque

Construyo herramientas donde importan la latencia, el consumo de recursos y la claridad de cada capa:

- **Sistemas nativos:** C++, Win32, Direct3D 11, HLSL y multithreading.
- **Audio y escritorio:** Python, CustomTkinter, DSP, SQLite y automatización TTS.
- **Hardware conectado:** WebUSB, Fastboot, ADB y utilidades para Android.
- **Arquitectura:** diseño modular, separación de responsabilidades, SOLID y profiling.

## Proyectos destacados

| Proyecto | Enfoque | Tecnologías |
| --- | --- | --- |
| [S.M.A.C. Broadcast System](https://github.com/LiebeBlack/S.M.A.C_Station) | Consola de radiodifusión, DSP, telemetría y TTS | Python, CustomTkinter, SQLite |
| [Fastboot Web Tool](https://github.com/LiebeBlack/Anroy) | Diagnóstico y comunicación con Android desde el navegador | JavaScript, WebUSB, Fastboot |
| [Ky! Movies](https://github.com/LiebeBlack/RG) | Catálogo web con exploración y filtrado dinámico | JavaScript, REST, Cloudflare Pages |
| [Wallpaper Engine Ultra](https://github.com/LiebeBlack/Besto) | Renderizado nativo de fondos animados | C++20, Direct3D 11, Win32 |
| [SDEP_CPP5](https://github.com/LiebeBlack/SDEP_CPP5) | Gestión de personal y cálculo de nómina | Python, CustomTkinter, SQLite |
| [D.A.S.O.](https://github.com/LiebeBlack/D.A.S.O) | Debloat y optimización de Android/AOSP | ADB, Bash, servicios del sistema |

## El sitio

El portafolio está construido como un sitio estático ligero, sin frameworks ni dependencias de runtime:

- Diseño responsive con una estética oscura, editorial y HUD.
- Animaciones progresivas con `IntersectionObserver`.
- Microinteracciones de cursor solo en dispositivos compatibles.
- Soporte para `prefers-reduced-motion`.
- Formulario de contacto con Formspree y adjuntos opcionales.
- Metadatos SEO, Open Graph, datos estructurados y precarga de recursos críticos.

## Estructura

```text
docs/
├── index.html       # Portafolio principal
├── contacto.html    # Formulario y canales de contacto
├── css/
│   ├── base.css     # Tokens, navegación y primitives compartidos
│   ├── style.css    # Hero, secciones y proyectos
│   └── contact.css  # Contacto, formulario y estados
├── js/
│   ├── common.js    # Reveal, navegación, scroll y microinteracciones
│   ├── script.js    # Comportamiento de la página principal
│   └── contact.js   # Formspree y carga de archivos
└── img/
    └── avatar_premium.png
```

## Ejecutar localmente

No se requiere compilación. Sirve `docs/` con cualquier servidor estático:

```bash
python -m http.server 8000 --directory docs
```

Después abre <http://localhost:8000>.

## Contacto

- Correo: [contact@yoangelgomez.dev](mailto:contact@yoangelgomez.dev)
- GitHub: [github.com/LiebeBlack](https://github.com/LiebeBlack)
- Portafolio: [liebeblack.github.io/LiebeBlack](https://liebeblack.github.io/LiebeBlack/)

---

© 2026 Yoangel Gómez · LiebeBlack
