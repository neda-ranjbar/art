import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      coverImage: image(),

      imageGallery: z
        .array(
          z.object({
            src: image(),
            aspect: z.enum(["square", "vertical", "horizontal"]),
            alt: z.string().optional().default("Gallery image"),
            description: z.string().optional(),
            order: z.number().optional(),
          }),
        )
        .optional()
        .default([]),

      videoGallery: z
        .array(
          z.object({
            src: z.string().optional(),    // For local MP4s
            embed: z.string().optional(),  // Paste raw <iframe> here
            aspect: z.enum(["square", "vertical", "horizontal"]),
            poster: z.string().optional(),
            description: z.string().optional(),
            order: z.number().optional(),
          }),
        )
        .optional()
        .default([]),
    }),
});

const about = defineCollection({
  loader: glob({ pattern: "about.md", base: "./src/data" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      email: z.string(),
      phone: z.string(),
      instagramHandle: z.string(),
      instagramUrl: z.string(),
      linkedInHandle: z.string(),
      linkedInUrl: z.string(),
      profileImage: image(),

      workHistory: z.array(
        z.object({
          company: z.string(),
          period: z.string(),
          role: z.string(),
        }),
      ),
      clients: z.array(z.string()),
    }),
});

export const collections = { works, about };
