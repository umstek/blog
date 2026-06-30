import { SITE } from '@/config';

/**
 * Structural shape a content collection entry needs for the publication
 * helpers below. Satisfied by posts, chats, and any future prose-like
 * collection whose schema carries the standard publish/draft fields. Kept
 * structural (not tied to a specific CollectionEntry<'...'>) so the helpers
 * are reusable across collections.
 */
export interface Publishable {
  id: string;
  body?: string;
  data: {
    draft?: boolean;
    pubDatetime: Date;
  };
}

/**
 * Entries visible to readers: not drafts, and whose publish datetime has
 * passed (with a small margin so an entry "scheduled" for a near-future
 * time still renders immediately after build).
 */
export function isPublished<T extends Publishable>(entry: T, now: Date = new Date()): boolean {
  if (entry.data.draft) return false;
  const publishedAt = entry.data.pubDatetime.getTime();
  return publishedAt <= now.getTime() + SITE.scheduledPostMargin;
}

/**
 * Newest-first comparator. Ties (same publish instant) fall back to id order
 * for stable output across builds.
 */
export function byNewestFirst<T extends Publishable>(a: T, b: T): number {
  const dt = b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime();
  return dt !== 0 ? dt : a.id.localeCompare(b.id);
}

/**
 * The entry's slug. Astro's glob loader gives us `id` as the path relative to
 * the collection base, e.g. "hello-world/index" — strip the trailing
 * "/index" so the slug is just the directory name.
 */
export function getSlug<T extends Publishable>(entry: T): string {
  return entry.id.replace(/\/index$/, '');
}

/**
 * Estimate reading time from raw markdown body. ~200 wpm is a common
 * conservative default for technical prose.
 */
export function getReadingTime(body: string, wpm = 200): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}
