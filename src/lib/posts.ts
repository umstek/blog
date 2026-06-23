import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '@/config';

export type Post = CollectionEntry<'blog'>;

/**
 * Posts visible to readers: not drafts, and whose publish datetime has
 * passed (with a small margin so a post "scheduled" for a near-future
 * time still renders immediately after build).
 */
export function isPublished(post: Post, now: Date = new Date()): boolean {
  if (post.data.draft) return false;
  const publishedAt = post.data.pubDatetime.getTime();
  return publishedAt <= now.getTime() + SITE.scheduledPostMargin;
}

/**
 * All reader-visible posts, newest first. Ties (same publish instant)
 * fall back to slug order for stable output across builds.
 */
export async function getPublishedPosts(now: Date = new Date()): Promise<Post[]> {
  const posts = (await getCollection('blog')).filter((p) => isPublished(p, now));
  return posts.sort(byNewestFirst);
}

export function byNewestFirst(a: Post, b: Post): number {
  const dt = b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime();
  return dt !== 0 ? dt : a.id.localeCompare(b.id);
}

/**
 * The post's slug. Astro's glob loader gives us `id` as the path relative to
 * the collection base, e.g. "hello-world/index" — strip the trailing
 * "/index" so the slug is just the directory name.
 */
export function getSlug(post: Post): string {
  return post.id.replace(/\/index$/, '');
}

/**
 * The post's URL path.
 */
export function getPostURL(post: Post): string {
  return `/blog/${getSlug(post)}`;
}

/**
 * Estimate reading time from raw markdown body. ~200 wpm is a common
 * conservative default for technical prose.
 */
export function getReadingTime(body: string, wpm = 200): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}
