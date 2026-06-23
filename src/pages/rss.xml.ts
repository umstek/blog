import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, getPostURL } from '@/lib/posts';
import { SITE } from '@/config';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: context.site ?? SITE.website,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDatetime,
      categories: post.data.tags,
      link: getPostURL(post),
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
