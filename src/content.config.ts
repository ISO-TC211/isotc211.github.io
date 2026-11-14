import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.string().array().default([]),
    excerpt: z.string().optional(),
    illustration: z.string().optional(),
    authors: z.array(z.object({ name: z.string() })).optional(),
  }),
})

export const collections = { news }
