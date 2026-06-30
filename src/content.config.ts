import { defineCollection } from 'astro:content';
import { z } from 'zod/v4';
import { glob } from 'astro/loaders';
import { SITE } from '@/config';

// Content collection for blog posts. Posts are Markdown/MDX in
// src/content/blog/<slug>/index.{md,mdx}, with optional co-located assets
// (cover images, screenshots) referenced via relative paths.
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDatetime: z.coerce.date(),
      // Optional: when the post was last meaningfully edited.
      modDatetime: z.coerce.date().optional().nullable(),
      // Optional: when drafting started (kept for provenance, not displayed).
      draftDatetime: z.coerce.date().optional().nullable(),
      // Optional: hide from the site while still in the repo.
      draft: z.boolean().optional().default(false),
      // Optional: surface on the homepage / featured strip.
      featured: z.boolean().optional().default(false),
      tags: z.array(z.string()).default(['others']),
      // Optional cover image, co-located with the post. Either an image()
      // asset (type-checked, optimized) or a literal path string for assets
      // referenced only inside the body.
      ogImage: image().or(z.string()).optional(),
      // Optional: external canonical URL when a post is cross-posted.
      canonicalURL: z.url().optional(),
      // Optional: group multi-part posts into a navigable series.
      series: z
        .object({
          name: z.string(),
          // 1-indexed position within the series.
          order: z.number().int().positive(),
        })
        .optional(),
      // Optional: override the global author for a single post.
      author: z.string().default(SITE.author),
    }),
});

// Content collection for AI chats published as posts. Markdown/MDX in
// src/content/chats/<slug>/index.{md,mdx}. Slugs resolve to /chats/<slug>.
// Schema is the common publishable shape; conversation-specific fields
// (participants, turns, source) can be added when the first chat lands.
const chats = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/chats' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional().nullable(),
    draftDatetime: z.coerce.date().optional().nullable(),
    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
    tags: z.array(z.string()).default(['others']),
    // Roster of conversation participants. Keys are referenced by the
    // <Turn speaker="key"> component inside the .mdx body; the page resolves
    // the key to { name, role } here so names live in one place. role drives
    // bubble styling (user = accent-tinted, assistant = subtle fill).
    participants: z
      .record(
        z.string(),
        z.object({
          name: z.string(),
          role: z.enum(['user', 'assistant', 'system']).default('assistant'),
        }),
      )
      .default({}),
    author: z.string().default(SITE.author),
  }),
});

export const collections = { blog, chats };
