/**
 * Site-wide configuration. Single source of truth for metadata that flows
 * into SEO tags, RSS, sitemap, OG images, the footer, etc.
 */
export const SITE = {
  /** Canonical production URL, no trailing slash. Drives sitemap/RSS/canonical. */
  website: 'https://blog.umstek.com',
  /** Default author name for posts without an explicit `author` field. */
  author: 'Wickramaranga',
  /** Short site title shown in headers, browser tabs, etc. */
  title: 'UMSTeK Blog',
  /** Site description used in meta tags, RSS, and the homepage. */
  desc: 'Personal blog of Wickramaranga (UMSTeK) — programming, tech, and more.',
  /** HTML lang and text direction. */
  lang: 'en',
  dir: 'ltr' as const,
  /** Posts shown on the homepage index. */
  postPerIndex: 4,
  /** Posts per paginated page on /posts. */
  postPerPage: 8,
  /** Let scheduled posts go live this many ms before their pubDatetime. */
  scheduledPostMargin: 15 * 60 * 1000,
} as const;

/**
 * Social/profile links shown in the footer. Only add what you want public.
 */
export const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com/umstek' },
  { name: 'Mastodon', href: 'https://mastodon.social/@hexmint' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/wickramaranga/' },
  { name: 'Email', href: 'mailto:umstek@live.com' },
] as const;
