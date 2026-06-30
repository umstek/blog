/**
 * Structural shape an entry needs to participate in tagging. Matches the
 * flat FeedItem shape (tags at the top level) used by the cross-collection
 * feed. Satisfied by posts and chats via getFeed().
 */
export interface Taggable {
  id: string;
  tags: string[];
}

export interface TagCount {
  tag: string;
  count: number;
}

/** Unique tags across the given entries, with how many use each. */
export function getUniqueTags<T extends Taggable>(entries: T[]): TagCount[] {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Entries sharing a given tag. Assumes input is already sorted as desired. */
export function getPostsByTag<T extends Taggable>(entries: T[], tag: string): T[] {
  return entries.filter((p) => p.tags.includes(tag));
}
