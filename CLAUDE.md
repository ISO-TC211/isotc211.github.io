# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ISO/TC 211 resource site (www.isotc211.org) — a single-page Jekyll site that publishes links and resources for ISO/TC 211 Geographic information/Geomatics standards (UML models, XML schemas, ontologies, registries, terminology). Managed jointly by ISO/TC 211 and Ribose.

## Build & Development

```sh
# Install dependencies
bundle install
npm install

# Build site (output to _site/)
make all

# Local dev server with live reload
make serve

# Clean build artifacts
make clean
```

Requires Ruby 3.1 and Node.js 20+.

## Architecture

### Stack
- **Jekyll 4.3** — static site generator, content in AsciiDoc (`.adoc`) and HTML (`.html`)
- **Vite 7** — frontend build tool, integrated via `jekyll-vite` Ruby gem
- **Tailwind CSS v4** — utility-first CSS (uses `@import "tailwindcss"`, not v3 `@tailwind` directives)
- **Dark mode** — class-based toggle via `_frontend/js/theme.js`, persisted in localStorage

### Directory Structure
```
_frontend/          # Frontend source (CSS, JS entrypoints)
  entrypoints/      # application.js/css (Vite entry points)
  css/              # Component CSS files (home.css, header.css, footer.css, etc.)
  js/               # theme.js (dark mode toggle)
_layouts/           # HTML layouts (base.html, default.html, home.html, page.html, post.html, etc.)
_includes/          # head.html, header.html, footer.html, icons/
assets/             # Static assets (images, iso-red.svg)
2005/               # Legacy GML 3.2 XML schema files from ISO 19136:2005
_posts/             # Dated news articles in AsciiDoc
config/             # vite.json (Vite/Jekyll integration config)
```

### Layout hierarchy
- `base.html` — raw content pass-through
- `default.html` — full page with `<html>`, head, header, `<main>`, footer, Vite JS
- `home.html` — extends `default`, wraps content for the landing page
- `page.html`, `post.html`, `posts.html`, `xml-schemas.html` — content page layouts

### Frontend pipeline
1. `vite.config.ts` — Vite config with RubyPlugin
2. `_frontend/entrypoints/application.css` — `@import "tailwindcss"` + custom theme tokens
3. `_frontend/entrypoints/application.js` — imports all CSS + theme.js
4. `jekyll-vite` runs Vite automatically during `jekyll build`

### CSS import order
All component CSS files are imported by `application.js`, which must come before Tailwind in `application.css`.

## CI/CD
- **`build_deploy.yml`** — Builds with Jekyll + Vite and deploys to GitHub Pages on push to `main`.
- **`links.yml`** — Runs lychee link checker on the built `_site/` HTML.

## Key Configuration
- `_config.yml` — Site metadata, committee info, social links, Google Analytics.
- `postcss.config.js` — PostCSS with `@tailwindcss/postcss`.
