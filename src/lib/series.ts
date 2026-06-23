import type { Post } from '@/lib/posts';

/**
 * The ordered posts belonging to the same series as `post`, by `series.order`.
 * Returns an empty array when the post isn't part of a series.
 */
export function getSeriesPosts(all: Post[], post: Post): Post[] {
  const series = post.data.series;
  if (!series) return [];
  // Filter + narrow to posts that actually carry the series field, so the
  // sort below can read `.order` without a non-null assertion.
  const siblings = all.filter(
    (p): p is Post & { data: { series: NonNullable<Post['data']['series']> } } =>
      p.data.series?.name === series.name,
  );
  return siblings.sort((a, b) => a.data.series.order - b.data.series.order);
}

/**
 * Previous and next posts in the series relative to `post`.
 * Either may be `undefined` at the ends of the series.
 */
export function getSeriesNeighbors(
  all: Post[],
  post: Post,
): { prev?: Post; next?: Post } {
  const series = getSeriesPosts(all, post);
  if (series.length === 0) return {};
  const index = series.findIndex((p) => p.id === post.id);
  return {
    prev: index > 0 ? series[index - 1] : undefined,
    next: index >= 0 && index < series.length - 1 ? series[index + 1] : undefined,
  };
}
