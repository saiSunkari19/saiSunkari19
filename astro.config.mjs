import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update `site` to your production domain before deploying.
export default defineConfig({
  site: 'https://saisunkari19.dev',
  integrations: [sitemap()],
});
