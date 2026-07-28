// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Fasolati — static build, deployed to GitHub Pages.
 *
 * `site` is load-bearing: @astrojs/sitemap uses it to emit absolute URLs, and
 * Base.astro resolves canonicals against it. The previous hand-written page
 * canonicalised to https://fasolati.com — a domain that does not resolve and
 * is not in the portfolio — so the one place that decides the site's own
 * address is worth keeping deliberate and singular.
 *
 * fasolati.life is home. fasolati.live is reserved for the inward-facing site
 * and currently 302s here.
 */
export default defineConfig({
  site: 'https://fasolati.life',

  // GitHub Pages serves directory-index files; trailing-slash URLs keep the
  // canonical tags, the sitemap and the served URL in agreement.
  trailingSlash: 'always',
  build: { format: 'directory' },

  integrations: [
    sitemap({
      // Pages that exist to submit a form or bounce a visitor onward carry no
      // standalone search intent, so they stay out of the sitemap.
      filter: (page) => !page.includes('/partner/'),
    }),
  ],
});
