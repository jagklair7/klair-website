import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://klair.ca',
  integrations: [
    react(),
    sitemap({
     filter: (page) => {
        const excluded = ['admin-blog', 'dashboard', 'dashboard-demo', 'login', 'monitoring-live'];
        const path = new URL(page).pathname.replace(/^\/|\/$/g, ''); // strip leading/trailing slash
        return !excluded.includes(path);
      },
    }),
  ],
  output: 'static',
});