/**
 * Pure-string OG-image path helper.
 *
 * This is a local, fs-free copy of `getImagePath` from `astro-takumi`
 * (node_modules/astro-takumi/dist/util.js). The original lives in a module
 * that also imports `node:fs` (for the build-time `getFilePath`/`fetchImage`
 * helpers), so importing it at render time drags `fs` into the page chunk.
 * That breaks build environments that prerender inside workerd/miniflare
 * (e.g. Cloudflare Pages), which have no Node `fs`.
 *
 * `astro-takumi` still does the actual OG rendering at build time via its
 * Astro integration (registered in astro.config.mjs); this helper only
 * constructs the URL the rendered image is served from. Keep it in sync
 * with the upstream util if the format/path convention changes.
 */
export function getOgImagePath({
  url,
  site,
  format = 'png',
}: {
  url: URL;
  site: URL;
  format?: 'png' | 'webp' | 'jpeg' | 'avif';
}): string {
  if (!site) {
    throw new Error(
      '`site` must be set in your Astro configuration: https://docs.astro.build/en/reference/configuration-reference/#site',
    );
  }

  let target = url.pathname;
  // Directories get index.<format>; bare files get .<format>.
  target = target.endsWith('/') ? `${target}index.${format}` : `${target}.${format}`;

  // Astro emits 404/500 as top-level files rather than in a folder.
  if (target === `/404/index.${format}`) return `${site}404.${format}`;
  if (target === `/500/index.${format}`) return `${site}500.${format}`;

  // Drop the leading slash, prefix the site URL.
  return `${site}${target.slice(1)}`;
}
