/**
 * Giscus configuration. Values come from https://giscus.app after you enable
 * Discussions on the GitHub repo and pick an "Announcements" (or similar)
 * category. Until these are filled in, the Comments component renders nothing.
 *
 * Populated from https://giscus.app. Mapping is `pathname` so threads are
 * keyed by URL path (e.g. /posts/foo/) and survive the domain cutover from
 * umstek.github.io to blog.umstek.com intact.
 */
export const GISCUS_CONFIG = {
  repo: 'umstek/blog',
  repoId: 'R_kgDOTDHIqg',
  category: 'Comments',
  categoryId: 'DIC_kwDOTDHIqs4C_0ev',
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
