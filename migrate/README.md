# Migration parity toolkit

Programs to prove that a migrated site (Astro `dist/`) is **identical** to the
current Jekyll build (`_site/`): same files, same bytes, same routes, same
redirects, same feed, and pixel-identical rendering.

Copy this `migrate/` directory into the repo of the site being migrated, run
the checks below, and commit the result (`migrate/parity-allowlist.json`,
`migrate/routes.txt`) with the migration branch.

## Workflow per site (in the site's repo)

```sh
# 1. Baseline: build the CURRENT site (pre-migration main, Jekyll) and inventory it
git checkout main
make all                    # or the site's normal full build
node migrate/inventory.mjs _site -o migrate/manifest-old.json

# 2. Migration branch: build the NEW site (Astro) and inventory it
git checkout migrate/astro
make all                    # or: node scripts/prepare-public.mjs && npx astro build && node scripts/postbuild.mjs
node migrate/inventory.mjs dist -o migrate/manifest-new.json

# 3. File + byte parity (allowlist documents every intentional difference)
node migrate/parity.mjs migrate/manifest-old.json migrate/manifest-new.json \
  --allowlist migrate/parity-allowlist.json

# 4. HTML structural smoke: shared chrome present, forbidden strings absent
node migrate/html-smoke.mjs dist --config migrate/smoke.json

# 5. Redirects still work for machines and browsers
node migrate/redirects-check.mjs dist migrate/redirects.json

# 6. Feed parity
node migrate/feed-check.mjs _site/feed.xml dist/feed.xml --host schemas.isotc211.org

# 7. Visual identity: pixel-compare served builds
python3 -m http.server 5000 --directory _site &
python3 -m http.server 5001 --directory dist &
node migrate/visual-diff.mjs --base http://localhost:5000 \
  --candidate http://localhost:5001 --routes migrate/routes.txt
```

All checks exit non-zero on failure; wire them as CI steps on the migration
branch so parity is enforced on every push.

## The checks

| Script | Proves | Notes |
|---|---|---|
| `inventory.mjs` | — | SHA-256 manifest of a build tree (path, bytes, hash) |
| `parity.mjs` | file-list + byte equality | Every non-HTML file must hash-identical; HTML routes must exist. Differences allowed only via allowlist |
| `html-smoke.mjs` | page structure | Every page has nav header, FOUC dark-mode script, skip link; forbidden strings (e.g. `/schemas/19`) absent. Excludes `**/browse/**` (self-contained lutaml SPAs) and redirect pages by config |
| `redirects-check.mjs` | redirect behavior | Data-file redirects: target bytes copied to old path. Page redirects: meta-refresh + canonical present |
| `feed-check.mjs` | `feed.xml` parity | Same entry URLs, ignoring order |
| `visual-diff.mjs` | rendering identity | Headless Chromium screenshots of both builds, `pixelmatch` per-pixel diff at each route × viewport × theme. Default: zero differing pixels allowed |

## Config files (per site, committed with the migration branch)

- `migrate/parity-allowlist.json` — intentional differences:
  ```json
  {
    "added":   ["404.html", "docs/**"],
    "removed": ["package.json", "package-lock.json", "redirects.json", "config/**"],
    "changed": []
  }
  ```
  Exact paths or `dir/**` prefixes. `parity.mjs` warns about stale entries, so
  prune as you curate. For schemas.isotc211.org, the known Jekyll junk leaking
  into `_site` today (candidates for `removed`) is: `package.json`,
  `package-lock.json`, `schemas.yml`, `redirects.json`, `config/`. Grep the old
  HTML for references before removing anything.
- `migrate/smoke.json` — optional overrides: extra `forbidden` strings, extra
  `required` markers, `excludePaths` (add your redirect-page paths here), and
  `excludeContains`.
- `migrate/redirects.json` — the site's redirect list, exported from
  `_data/redirects.yml` (+ any `jekyll-redirect-from` entries like
  `/transforms/` → `/resources/`):
  ```json
  [
    { "from": "/19155/gpi/1.0/gpi.xsd", "to": "/19155/-/gpi/1.0/gpi.xsd" },
    { "from": "/transforms/", "to": "/resources/" }
  ]
  ```
- `migrate/routes.txt` — routes to pixel-compare. Cover every page archetype
  plus a representative sample of generated pages (one hub, one standard page,
  one codelist page, one post, the docs guide…). The route-equality guarantee
  comes from `parity.mjs`; visual coverage is for look and feel.

## visual-diff specifics

```sh
npm i -D playwright pixelmatch pngjs
npx playwright install chromium
```

- Screenshots are full-page, per route × viewport (`--viewports`, default
  `1280x800,390x844`) × theme (`--themes light,dark`; dark is forced via the
  site's `iso-tc211-theme` localStorage key before load).
- Analytics/fontawesome requests are blocked so they cannot flake the diff.
- `--threshold 0` (default) fails on ANY differing pixel. Only raise it to
  absorb antialiasing noise; layout/color regressions still produce visible
  `diff-*.png` images in `--out`.
- `report.json` records every comparison for the migration PR description.

## CI sketch (migration branch)

```yaml
- name: Inventory old build (artifact from baseline job or committed manifest)
  run: node migrate/parity.mjs migrate/manifest-old.json migrate/manifest-new.json --allowlist migrate/parity-allowlist.json
- name: HTML smoke
  run: node migrate/html-smoke.mjs dist --config migrate/smoke.json
- name: Redirects
  run: node migrate/redirects-check.mjs dist migrate/redirects.json
- name: Feed
  run: node migrate/feed-check.mjs _site/feed.xml dist/feed.xml --host <site-host>
```

Commit the baseline `manifest-old.json` produced on pre-migration `main` (or
upload it as a workflow artifact from the baseline job) so parity runs on
every migration-branch push.
