/**
 * Giscus configuration. Values come from https://giscus.app after you enable
 * Discussions on the GitHub repo and pick an "Announcements" (or similar)
 * category. Until these are filled in, the Comments component renders nothing.
 *
 * Steps to populate:
 *   1. Enable Discussions on github.com/umstek/blog (Settings → Features).
 *   2. Visit https://giscus.app, enter umstek/blog, choose a category.
 *   3. Copy the data-repo-id and data-category values here.
 */
export const GISCUS_CONFIG = {
  repo: 'umstek/blog',
  repoId: '', // TODO: fill from giscus.app
  category: 'Announcements',
  categoryId: '', // TODO: fill from giscus.app
  /** Use the pathname as the discussion mapping for stable per-post threads. */
  mapping: 'pathname' as const,
  reactionsEnabled: true,
  /** Match the site theme; the component syncs light/dark on toggle. */
  theme: 'light' as 'light' | 'dark',
} as const;

/** True when the config has been populated and comments should render. */
export function giscusEnabled(): boolean {
  return Boolean(GISCUS_CONFIG.repoId && GISCUS_CONFIG.categoryId);
}
