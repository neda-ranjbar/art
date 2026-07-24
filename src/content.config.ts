import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),

    // Dedicated image for the home page preview
    coverImage: z.string(),

    // Separated Image Gallery
    imageGallery: z
      .array(
        z.object({
          src: z.string(),
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

export const collections = { works };
