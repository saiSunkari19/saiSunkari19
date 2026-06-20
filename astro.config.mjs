import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production URL — used for canonical links, OG tags and the sitemap.
export default defineConfig({
  site: 'https://saisunkari.netlify.app',
  integrations: [
    sitemap({
      // Emit <lastmod>/<changefreq>/<priority> so crawlers see freshness.
      lastmod: new Date(),
      changefreq: 'monthly',
      priority: 0.7,
      serialize(item) {
        if (item.url.endsWith('saisunkari.netlify.app/')) item.priority = 1.0;
        return item;
      },
    }),
  ],
});
