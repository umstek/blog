import type { Post } from '@/lib/posts';

export interface TagCount {
  tag: string;
  count: number;
}

/** Unique tags across published posts, with how many posts use each. */
export function getUniqueTags(posts: Post[]): TagCount[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Posts sharing a given tag, newest first (assumes input already sorted). */
export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter((p) => p.data.tags.includes(tag));
}
