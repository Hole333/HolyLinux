import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(), description: z.string(), pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(), heroImage: z.optional(image()),
		tags: z.array(z.string()).default([]),
	}),
});

const notes = defineCollection({
	loader: glob({ base: './external-notes/notes', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(), description: z.string(), created: z.coerce.date(),
		updated: z.coerce.date().optional(), tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, notes };
