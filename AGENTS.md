# AGENTS.md

Este documento proporciona una descripción detallada de la arquitectura del proyecto CyberRockola Music para desarrolladores y agentes de IA que trabajen en este repositorio en futuras sesiones.

---

## 🎵 Descripción del Proyecto

**CyberRockola Music** es un portal editorial dinámico y de alto impacto visual con temática cyberpunk y retro-rock. El sitio está diseñado en español y sirve como el archivo definitivo de las ediciones del **Weekend Beach Festival** (Torre del Mar, Málaga) y radar informativo de festivales en la península ibérica.

### Ficha Técnica

| Capa | Tecnología Utilizada |
|------|----------------------|
| **Framework** | TanStack Start (React 19) |
| **Enrutamiento** | TanStack Router (File-based) |
| **Estilos** | Tailwind CSS v4 |
| **Gestión de Contenido** | Content Collections |
| **Formularios Backend** | Netlify Forms |
| **Iconos** | Lucide React |

---

## 📂 Directorios Clave y Flujo de Datos

```
├── content/
│   └── posts/                # Archivos Markdown (.md) de artículos y ediciones del festival
├── public/
│   ├── __forms.html          # Esqueleto estático requerido por Netlify para capturar formularios en el build
│   └── favicon.ico
├── src/
│   ├── routes/
│   │   ├── __root.tsx        # Layout común: Cabecera con logo neon, menú y pie de página
│   │   ├── index.tsx         # Portada interactiva: Tabs, timeline del festival, radar de agenda y suscripción
│   │   └── posts.$slug.tsx   # Visualización detallada de artículos renderizados con marked
│   ├── styles.css            # Hoja de estilos con variables de color neón y prosa de Markdown
│   └── router.tsx            # Inicialización del enrutador
├── content-collections.ts    # Esquemas Zod y transformaciones automáticas de contenido
└── netlify.toml              # Configuración de despliegue en la plataforma Netlify
```

---

## ⚡ Decisiones de Arquitectura e Implementación

### 1. Gestión de Contenido con Content Collections
Los artículos y resúmenes de cada edición están escritos en archivos Markdown individuales bajo `content/posts/`.
* **Esquema de Validación:** Definido en `content-collections.ts`. Se requiere `title`, `summary`, `categories[]`, `image` (URL de imagen espectacular) y `date`.
* **Soporte de Slugs Personalizados:** Se modificó la transformación por defecto para dar soporte prioritario al campo `slug` de los metadatos si está presente, cayendo en un reemplazo seguro de caracteres especiales derivado del título si no se especifica.

### 2. Estructura de Enrutamiento Basada en Archivos
El enrutamiento está gestionado automáticamente por TanStack Router:
* **`/` (src/routes/index.tsx):** Combina el cargador de posts con estados locales de React para el filtrado asíncrono y los selectores interactivos (como el selector de años para el Weekend Beach).
* **`/posts/$slug` (src/routes/posts.$slug.tsx):** Carga dinámicamente el post coincidente por slug. Utiliza la librería `marked` para convertir el cuerpo del Markdown a HTML estructurado y lo inyecta mediante `dangerouslySetInnerHTML` utilizando la clase contenedora `.markdown-content`.

### 3. Integración Segura de Formularios (Netlify Forms)
Debido a la naturaleza SSR (Server-Side Rendering) de TanStack Start, los envíos estándar de formularios fallarían o serían interceptados por funciones de renderizado.
* **Solución de Doble Factor:**
  1. **Detección en Compilación:** Se creó `public/__forms.html` que contiene una envoltura estática del formulario con el atributo `data-netlify="true"`. Al compilar, Netlify escanea este HTML e inicializa el backend del formulario.
  2. **Envío por AJAX Client-Side:** El formulario en `src/routes/index.tsx` captura el evento `onSubmit`, previene el comportamiento por defecto y hace un `fetch` POST dirigido específicamente a `/__forms.html` enviando un cuerpo formateado como `application/x-www-form-urlencoded` que incluye la cabecera `form-name` reglamentaria.

---

## 🎨 Convenciones de Diseño y Variables CSS

La aplicación hace un uso intensivo de variables de entorno CSS nativas declaradas en `src/styles.css` para asegurar una ambientación cyberpunk inmersiva:

```css
--bg-dark: #0a070f;                      /* Fondo base off-black con tintes violetas */
--bg-card: rgba(18, 12, 28, 0.65);       /* Fondo traslúcido para paneles glassmorphism */
--neon-pink: #ff2a85;                    /* Rosa eléctrico para logotipos y títulos primarios */
--neon-cyan: #00f0ff;                    /* Cian neón para botones de acción y títulos secundarios */
--neon-yellow: #ffee00;                  /* Amarillo para viñetas en forma de rayo (⚡) */
```

### Fuentes Tipográficas Cargadas
* **Syne (Google Fonts):** Fuente de titulares muy pesada, artística y de rasgos asimétricos. Utilizada exclusivamente para logotipos, encabezados de hero y títulos principales en mayúsculas.
* **Space Mono (Google Fonts):** Monospace limpio y cibernético. Utilizada para el cuerpo de texto, etiquetas meta, estados de terminal, botones e inputs.

---

## 📌 Guía para Futuras Ediciones

* **Añadir una Nueva Edición de Festival:** Crea un archivo Markdown en `content/posts/weekend-beach-YYYY.md`. Asegúrate de etiquetar la categoría como `Weekend Beach` y asignar una imagen de alto impacto visual desde una fuente confiable. El selector interactivo de la portada y el timeline se actualizarán automáticamente.
* **Añadir Artículos Musicales:** Crea un archivo Markdown en `content/posts/X.md` con la categoría `Artículos`. Aparecerá inmediatamente en el Grid asimétrico de la portada.
* **No correr comandos de build localmente en el agente:** La infraestructura del pipeline corre y valida automáticamente el build tras la ejecución de las ediciones; no modifiques carpetas temporales de caché ni corras `npm run build` en hilos de background de larga duración.
