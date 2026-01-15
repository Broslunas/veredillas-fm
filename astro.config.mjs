import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { globSync } from 'glob';
import path from 'path';

const SITE_URL = 'https://veredillasfm.es';

// Helper to get dynamic pages for sitemap (since we use SSR)
function getCustomPages() {
  const pages = [];
  
  // Episodios
  try {
    const episodios = globSync('src/content/episodios/*.md');
    episodios.forEach(file => {
      const slug = path.basename(file, '.md');
      pages.push(`${SITE_URL}/ep/${slug}`);
    });
  } catch (e) {
    console.error('Error loading episodes for sitemap:', e);
  }

  return pages;
}

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  adapter: vercel(),
  integrations: [
    sitemap({
      customPages: getCustomPages(),
      filter: (page) => 
        !page.includes('/newsletter/confirm') &&
        !page.includes('/verify-comment') &&
        !page.includes('/verify-delete')
    })
  ],
});
