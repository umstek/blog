import { type CollectionEntry, getCollection } from 'astro:content';
import { byNewestFirst, isPublished, getSlug as getSlugGeneric, getReadingTime } from '@/lib/content';

export type Chat = CollectionEntry<'chats'>;

/**
 * All reader-visible chats, newest first. Mirrors getPublishedPosts; both are
 * thin over the shared content helpers.
 */
export async function getPublishedChats(now: Date = new Date()): Promise<Chat[]> {
  const chats = (await getCollection('chats')).filter((c) => isPublished(c, now));
  return chats.sort(byNewestFirst);
}

/** The chat's slug (see the shared getSlug in content.ts). */
export const getSlug = getSlugGeneric<Chat>;

/**
 * The chat's URL path. Chats live under /chats/<slug>, e.g.
 * https://blog.umstek.com/chats/<slug>. The listing is at /chats (static
 * src/pages/chats/index.astro); individual chats are served by the dynamic
 * src/pages/chats/[...slug]/index.astro.
 */
export function getChatURL(chat: Chat): string {
  return `/chats/${getSlug(chat)}`;
}

export { getReadingTime };
