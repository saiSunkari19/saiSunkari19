import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production URL — used for canonical links, OG tags and the sitemap.
export default defineConfig({
  site: 'https://saisunkari.netlify.app',
  integrations: [sitemap()],
});
