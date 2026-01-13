import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(150, "Title is too long"),

  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),

  excerpt: z.string().max(300, "Excerpt is too long").optional(),

  content: z.string().min(1, "Content is required"),

  featuredImage: z.string().url("Invalid image URL").optional(),

  tags: z.array(z.string().min(1)).optional(),

  status: z.enum(["draft", "published"]),

  publishedAt: z.date().optional(),
});

export type BlogPostFormSchema = z.infer<typeof blogPostSchema>;
