import { z } from "zod";

export const updatePostSchema = z.object({
  title: z.string().min(1, "Title is required").max(150, "Title is too long"),

  body: z.string().min(1, "Body is required"),

  excerpt: z
    .string()
    .max(300, "Excerpt is too long")
    .optional()
    .or(z.literal("")),

  tags: z.string().optional(),

  featuredImage: z
    .string()
    .url("Invalid image URL")
    .optional()
    .or(z.literal("")),
});

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
