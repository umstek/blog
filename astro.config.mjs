// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import astroTakumi from 'astro-takumi';
import { blogCard } from './src/og/renderer.js';

// https://astro.build/config
export default defineConfig({
  // Canonical site URL — drives sitemap, OG, RSS, canonical links.
  site: 'https://blog.umstek.com',

  // Markdown rendering. Astro 7 deprecated the top-level remarkPlugins/
  // rehypePlugins in favor of passing them to unified({...}) from
  // @astrojs/markdown-remark. KaTeX CSS is loaded per-page (post detail),
  // not here, so posts without math don't pay for the stylesheet.
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      wrap: true,
    },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },

  integrations: [
    mdx(),
    sitemap(),
    // Build-time OG images via Takumi (non-Vercel). Custom blogCard renderer
    // matches the site's minimal theme (spec §B.2.5). React is a build-time-
    // only dependency.
    astroTakumi({
      options: {
        fonts: [
          readFileSync(
            fileURLToPath(
              new URL(
                'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
                import.meta.url,
              ),
            ),
          ),
        ],
        format: 'webp',
        quality: 85,
      },
      render: blogCard,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // @takumi-rs/core (the native engine under astro-takumi) routes the
      // `workerd` condition to a `not-available.js` stub in its `exports`
      // map. Cloudflare Pages' build image sets the `workerd` condition, so
      // Vite selects the stub and the build fails with
      // '"Renderer" is not exported by not-available.js'. Locally there is no
      // `workerd` condition, so the real `import` entry is used and it works.
      // Pin the package to its real ESM entry by absolute path: file-path
      // imports skip the `exports` map entirely, so the condition routing
      // never comes into play. The linux native binary installs fine on CF.
      alias: {
        '@takumi-rs/core': fileURLToPath(
          new URL('node_modules/@takumi-rs/core/dist/export.mjs', import.meta.url),
        ),
      },
    },
  },
});
