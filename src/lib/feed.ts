import type { Post } from '@/lib/posts';
import type { Chat } from '@/lib/chats';

/**
 * A flattened, collection-agnostic view of a published entry, for places that
 * list or tag across content types (the tag pages, RSS, and anything that
 * treats posts and chats uniformly). Carries a discriminator so callers can
 * branch on kind when they need to (e.g. to build the right URL).
 */
export interface FeedItem {
  kind: 'post' | 'chat';
  id: string;
  title: string;
  description: string;
  body?: string;
  pubDatetime: Date;
  tags: string[];
}

const fromPost = (p: Post): FeedItem => ({
  kind: 'post',
  id: p.id,
  title: p.data.title,
  description: p.data.description,
  body: p.body,
  pubDatetime: p.data.pubDatetime,
  tags: p.data.tags,
});

const fromChat = (c: Chat): FeedItem => ({
  kind: 'chat',
  id: c.id,
  title: c.data.title,
  description: c.data.description,
  body: c.body,
  pubDatetime: c.data.pubDatetime,
  tags: c.data.tags,
});

/**
 * All published posts and chats, newest first, as a single feed. Ties fall
 * back to id order for stable output across builds (same rule as the post
 * comparator).
 */
export async function getFeed(now: Date = new Date()): Promise<FeedItem[]> {
  const [{ getPublishedPosts }, { getPublishedChats }] = await Promise.all([
    import('@/lib/posts'),
    import('@/lib/chats'),
  ]);
  const [posts, chats] = await Promise.all([
    getPublishedPosts(now),
    getPublishedChats(now),
  ]);
  const items = [...posts.map(fromPost), ...chats.map(fromChat)];
  return items.sort((a, b) => {
    const dt = b.pubDatetime.getTime() - a.pubDatetime.getTime();
    return dt !== 0 ? dt : a.id.localeCompare(b.id);
  });
}

/** The feed item's URL path: /posts/<slug> or /chats/<slug>. */
export function getFeedItemURL(item: FeedItem): string {
  const slug = item.id.replace(/\/index$/, '');
  return item.kind === 'post' ? `/posts/${slug}` : `/chats/${slug}`;
}
