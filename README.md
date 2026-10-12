# Ismail Fatih Raihan — Portfolio

A minimal, responsive personal portfolio website showcasing my experience, projects, and skills as a software engineer.

## Preview

**Live sections:** About · Experience · Projects · Contact

## Features

- **Bilingual** — Full English / Japanese (日本語) language toggle
- **Multiple Themes** — Four color themes (Stark, Fern — dark purple, Himmel, Frieren); first visit follows the OS light/dark preference, and the saved theme/language apply before first paint (no flash)
- **Responsive Layout** — Sidebar + content layout that adapts to all screen sizes
- **Contact** — Bilingual call-to-action with email, copy-to-clipboard, LinkedIn and GitHub
- **Mobile navigation** — Compact section links under the intro on small screens
- **Soft Background** — Theme-tinted gradient with a subtle film grain (grain is dropped on small screens)
- **Micro-interactions** — Staggered scroll reveal, count-up stats, smooth theme/language transitions (all off under `prefers-reduced-motion`)
- **Cursor Glow Effect** — Subtle radial glow that follows the mouse on hover-capable devices
- **Smooth Navigation** — Scroll-based active section highlighting
- **Accessible** — Skip link, ARIA states, `lang` tags on Japanese text, reduced-motion support
- **SEO-ready** — Open Graph, Twitter card, JSON-LD, canonical, sitemap

## Tech Stack

| Layer   | Technology                     |
| ------- | ------------------------------ |
| Markup  | HTML5                          |
| Styling | CSS3 (custom properties, grid) |
| Scripts | Vanilla JavaScript             |
| Fonts   | Inter, JetBrains Mono, Noto Sans JP |

## Project Structure

```
├── index.html      # Main page
├── css/
│   └── style.css   # All styles & theme variables
├── js/
│   └── main.js     # Cursor glow, language/theme toggle, scroll nav
├── robots.txt
├── sitemap.xml
└── README.md
```

## Getting Started

No build tools required. Simply open `index.html` in a browser

## Adding project screenshots

Each project card shows an SVG illustration as a placeholder. To use a real screenshot, put the image in `img/projects/` (WebP, about 1200×500) and replace the card's `<svg class="project-art">…</svg>` with:

```html
<img src="img/projects/zakat.webp" alt="Zakat Report System dashboard" width="1200" height="500" loading="lazy" />
```

Then remove `aria-hidden="true"` from its `.project-media` wrapper so the alt text is read.

## License

This project is open source and available for personal use.
