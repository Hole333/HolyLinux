// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders, passthroughImageService } from 'astro/config';
export default defineConfig({
  site: 'https://www.halomoon.cn',
  integrations: [mdx(), sitemap()],
  markdown: { shikiConfig: { theme: 'github-dark', wrap: true } },
  image: { service: passthroughImageService() },
  fonts: [{
    provider: fontProviders.local(), name: 'Atkinson', cssVariable: '--font-atkinson', fallbacks: ['system-ui', 'sans-serif'],
    options: { variants: [
      { src: ['./src/assets/fonts/atkinson-regular.woff'], weight: 400, style: 'normal', display: 'swap' },
      { src: ['./src/assets/fonts/atkinson-bold.woff'], weight: 700, style: 'normal', display: 'swap' },
    ] },
  }],
});

