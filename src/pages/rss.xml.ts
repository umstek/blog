import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getFeed, getFeedItemURL } from '@/lib/feed';
import { SITE } from '@/config';

export async function GET(context: APIContext) {
  const feed = await getFeed();
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: context.site ?? SITE.website,
    items: feed.map((item) => ({
      title: item.title,
      description: item.description,
      pubDate: item.pubDatetime,
      categories: item.tags,
      link: getFeedItemURL(item),
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
