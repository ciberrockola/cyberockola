# CyberRockola Music ⚡🌴

**CyberRockola Music** es una plataforma web de temática musical retro-futurista y cyberpunk concebida como el templo definitivo del rock y la electrónica en España. 

Este proyecto ofrece un archivo histórico exhaustivo y detallado de todas las ediciones celebradas del **Weekend Beach Festival** de Torre del Mar (Málaga), acompañado de artículos musicales especializados de alta calidad y un radar interactivo de los próximos grandes festivales de música en la agenda de España para el año 2026.

---

## 🚀 Características Clave

* **🌴 Archivo de Ediciones del Weekend Beach Festival (2014 - 2026):** Una sección cronológica interactiva que permite consultar de manera dinámica el resumen, los line-ups oficiales, el impacto de público y los momentos más memorables de cada una de las 11 ediciones del festival costero, todo acompañado de espectaculares fotos de alta definición procedentes de Unsplash.
* **📰 Artículos de Tendencia y Opinión:** Un catálogo de crónicas detalladas sobre el resurgir de la cultura de las rockolas analógicas en la era digital, guías definitivas de supervivencia para festivales de playa, y el auge del sonido híbrido cyberpunk-rock.
* **📅 Radar de Festivales España 2026:** Una agenda interactiva con filtrado en tiempo real por estilo musical (Rock, Indie, Metal, Pop, Electrónica) que recopila fechas, sedes, estados y atractivos principales de eventos masivos como *Primavera Sound Barcelona, Mad Cool Festival Madrid, Resurrection Fest Viveiro*, etc.
* **✉️ Club CyberRockola (Netlify Forms):** Un boletín de preventas y primicias totalmente integrado de forma nativa a través de Netlify Forms con protección contra spam honeypot y envío asíncrono seguro vía AJAX.
* **🎨 Diseño Cohesivo de Neón:** Una interfaz oscura inspirada en sintetizadores modulares e iluminada por acentos cromáticos de neón rosa, cian y amarillo, impulsada por tipografías sofisticadas de Google Fonts (*Syne* para titulares contundentes y *Space Mono* para la atmósfera técnica analógica).

---

## 🛠️ Stack Tecnológico

El proyecto se asienta sobre la infraestructura de desarrollo moderna más eficiente y ágil:

| Tecnología | Propósito | Descripción |
|------------|-----------|-------------|
| **[TanStack Start](https://tanstack.com/router/v1/docs/start/overview)** | Framework Principal | SSR y enrutamiento basado en archivos de alto rendimiento sobre React 19 y Vite 7 |
| **[Content Collections](https://www.content-collections.dev/)** | Gestión de Contenido | Base de datos estática y tipada para la validación y transformación segura de los artículos en formato Markdown |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Estilos de Interfaz | Motor de hojas de estilo ultra veloz con soporte nativo de variables CSS y personalización visual |
| **[Lucide Icons](https://lucide.dev/)** | Iconografía | Colección rica y estilizada de vectores SVG consistentes con la estética técnica |
| **[Netlify Forms](https://docs.netlify.com/forms/setup/)** | Formulario Serverless | Captura de suscriptores y datos en el backend de Netlify sin necesidad de mantener servidores propios |

---

## 📂 Estructura del Proyecto

```
├── content
│   └── posts               # Artículos y ediciones del Weekend Beach en Markdown
├── public
│   ├── __forms.html        # Esqueleto HTML requerido para la detección de Netlify Forms
│   └── favicon.ico         # Icono del navegador
├── src
│   ├── routes
│   │   ├── __root.tsx      # Envoltura global: Layout, cabecera neon, pie de página y tipografías
│   │   ├── index.tsx       # Landing page interactiva, filtros, radar y formulario de suscripción
│   │   └── posts.$slug.tsx # Vista detallada y estilizada de cada artículo o edición festivalera
│   ├── styles.css          # Personalización CSS global, variables de color neón y estilos de prosa Markdown
│   └── router.tsx          # Configuración del enrutador de TanStack
├── content-collections.ts  # Esquema Zod de validación de los artículos y autogeneración de slugs
├── netlify.toml            # Configuración de despliegue, scripts de compilación y emulación local
└── package.json            # Manifesto de dependencias del proyecto
```

---

## 💻 Desarrollo Local

Para correr el proyecto localmente emulando todas las capacidades integradas de la plataforma Netlify:

1. **Instalar Dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el Servidor de Desarrollo con Netlify CLI:**
   Utiliza el emulador nativo de Netlify para validar las funciones del formulario localmente en el puerto `8889`:
   ```bash
   npx netlify dev --port 8889
   ```

3. **Ver en el Navegador:**
   Abre [http://localhost:8889](http://localhost:8889) para interactuar con la plataforma CyberRockola Music.

---

## ⚡ Autores y Créditos

Desarrollado de manera autónoma como un prototipo de producción moderno de alta fidelidad estética y excelente valor informativo sobre festivales musicales en España. Powered by Netlify.
