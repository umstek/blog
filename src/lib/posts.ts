import { type CollectionEntry, getCollection } from 'astro:content';
import { byNewestFirst, isPublished, getSlug as getSlugGeneric, getReadingTime } from '@/lib/content';

export type Post = CollectionEntry<'blog'>;

/**
 * All reader-visible posts, newest first. Ties (same publish instant) fall
 * back to slug order for stable output across builds.
 */
export async function getPublishedPosts(now: Date = new Date()): Promise<Post[]> {
  const posts = (await getCollection('blog')).filter((p) => isPublished(p, now));
  return posts.sort(byNewestFirst);
}

/**
 * The post's slug. Astro's glob loader gives us `id` as the path relative to
 * the collection base, e.g. "hello-world/index" — strip the trailing
 * "/index" so the slug is just the directory name.
 *
 * Re-exported from the shared content helpers for callers that still import
 * it from @/lib/posts.
 */
export const getSlug = getSlugGeneric<Post>;

/**
 * The post's URL path. Posts live under /posts/<slug>, e.g.
 * https://blog.umstek.com/posts/hello-world. The listing of all posts is at
 * /posts (served by the static src/pages/posts/index.astro); individual posts
 * are served by the dynamic src/pages/posts/[...slug]/index.astro, which
 * Astro routes after the static index so the two coexist cleanly.
 */
export function getPostURL(post: Post): string {
  return `/posts/${getSlug(post)}`;
}

// Re-exported for existing import sites that pull reading time from @/lib/posts.
export { getReadingTime };
