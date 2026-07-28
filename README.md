# fasolati.life

The Fasolati site — an Astro static build, deployed to GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
```

## Pages

| URL | Source | Was |
|---|---|---|
| `/` | `src/pages/index.astro` | the whole site |
| `/platform/` | `src/pages/platform.astro` | `#products-overlay` |
| `/science/` | `src/pages/science.astro` | `#bb-overlay` |
| `/shop/` | `src/pages/shop.astro` | `#shop-overlay` |
| `/loria/` `/lytica/` `/gut-stack/` `/engine/` | `src/pages/[slug].astro` | cards inside `#shop-overlay` |
| `/about/` | `src/pages/about.astro` | `#about-overlay` |
| `/partner/` | `src/pages/partner.astro` | `#partner-overlay` |
| `/404.html` | `src/pages/404.astro` | — |

Everything except `/` used to be a `position:fixed` panel that JavaScript
faded over the home page. All of it shared one URL, so none of it could be
linked to, bookmarked, advertised against, or cited by a search or answer
engine — including Loria, the only product actually for sale.

## Where things live

- `src/data/products.ts` — the product catalogue. Drives `/shop/`, the four
  product pages, and the `Product` / `Offer` schema on each. One source, so
  they cannot disagree.
- `src/data/nav.ts` — the navigation model. Every entry is an `href` now.
- `src/data/site.ts` — `SITE`, the shared Organization / Person / WebSite
  schema nodes, and the breadcrumb helper.
- `src/layouts/Base.astro` — the single place that decides title, canonical,
  Open Graph, robots and JSON-LD for every page.
- `src/styles/global.css` — the original stylesheet, essentially unchanged.
- `src/scripts/` — `site.js` (all pages), plus `framework.js`,
  `partner-form.js` and `waitlist.js`, which load only where they are used.

## Getting new pages indexed

Google: submit `https://fasolati.life/sitemap-index.xml` in Search Console.
There is no API for this on our side — it is a manual step in the GSC UI.

Everyone else — Bing (and therefore Copilot), Yandex, Seznam, Naver — accepts
a direct push:

```bash
npm run indexnow          # submit every URL in the live sitemap
npm run indexnow -- --dry # print the payload, submit nothing
```

Ownership is proven by `public/<key>.txt`, which is deployed with the site.
The script reads the live sitemap rather than a hardcoded list, so it can
never push `/partner/` (noindex) or a URL that no longer exists.

## Deployment

`.github/workflows/deploy.yml` builds on push to `main` and publishes `dist/`.

**It does nothing until Pages is switched over.** In
Settings → Pages → Build and deployment, change Source from
*Deploy from a branch* to *GitHub Actions*.

Until that switch is flipped, Pages keeps serving the legacy root
`index.html`, which is still in the repo for exactly that reason — the live
site is unaffected by this change until someone decides otherwise, and
flipping back is the same one setting.

### After the cutover

These root files are superseded by their `public/` counterparts and can be
deleted once the Actions deploy is confirmed live:

- `index.html` (the 140 KB original)
- `robots.txt`, `sitemap.xml`, `og-image.png`, `CNAME`

`sitemap.xml` in particular is the stale one: it lists a single URL, and the
build now generates `sitemap-index.xml` covering all nine indexable pages.
