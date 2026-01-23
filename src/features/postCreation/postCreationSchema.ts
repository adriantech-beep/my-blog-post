import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(150, "Title is too long"),

  body: z.string().min(1, "Body is required"),

  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      `Only .jpg, .jpeg, .png, and .webp formats are supported.`,
    )
    .optional(),
  userName: z.string().optional(),
  userId: z.string().optional(),
});

export type BlogPostFormSchema = z.infer<typeof blogPostSchema>;
