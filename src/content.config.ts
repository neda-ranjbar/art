import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),

      // Dedicated image for the home page preview
      coverImage: image(),

      // Separated Image Gallery
      imageGallery: z
        .array(
          z.object({
            src: image(), // 3. Change this one too
            aspect: z.enum(["square", "vertical", "horizontal"]),
            alt: z.string().optional().default("Gallery image"),
          }),
        )
        .optional()
        .default([]),

      // Separated Video Gallery
      videoGallery: z
        .array(
          z.object({
            src: z.string(),
            aspect: z.enum(["square", "vertical", "horizontal"]),
            poster: z.string().optional(), // Optional thumbnail for the video
          }),
        )
        .optional()
        .default([]),
    }),
});

const about = defineCollection({
  // Adjust the base to match where your about.md is located
  loader: glob({ pattern: "**/*.md", base: "./src/data" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      email: z.string(),
      phone: z.string(),
      instagramHandle: z.string(),
      instagramUrl: z.string(),
      // This is the critical part:
      profileImage: image(),
      workHistory: z.array(z.any()),
      clients: z.array(z.string()),
    }),
});

export const collections = { works, about };
