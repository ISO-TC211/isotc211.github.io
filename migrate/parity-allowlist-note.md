# Visual residuals (documented, accepted)

Pixel comparison (migrate/visual-diff.mjs) vs the pre-migration live site,
after switching to the no-preflight theme variant (@isotc211/astro-ui
theme-nopreflight.css — the legacy Jekyll-vite builds never loaded Tailwind
preflight; verified via computed border-style/line-height on the live sites):

- home page content complete and chrome-identical; full-page height deltas
  now within +4px (desktop) / +100px (mobile, news-excerpt wrapping)
- about: -20px; faq/related/strategic-policy/2005 pages within +-20px except
  strategic-policy +306px->+... (md conversion wraps; last measured +-20px)
- posts: -20px
- Chrome, routes, bytes (all non-HTML), redirects, and feed URLs are
  identical. kwkwan can fine-tune typography with the same toolkit.
