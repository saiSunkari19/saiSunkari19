import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Self-hosted blog posts. Authored via the Sveltia CMS admin (/admin)
// or by adding Markdown files directly to src/content/blog/.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    // Uploaded images live in /public/uploads, referenced as /uploads/…
    cover: z.string().optional(),
    // Attribution: where the piece was originally posted.
    originalSource: z.enum(['x', 'medium', 'none']).default('none'),
    originalUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
