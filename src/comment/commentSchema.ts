import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/constants";
import z from "zod";

export const commentSchema = z.object({
  comment: z
    .string()
    .max(150, "Comment is too long")
    .optional()
    .or(z.literal("")),

  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 8MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      `Only .jpg, .jpeg, .png, and .webp formats are supported.`,
    )
    .optional(),
  post_id: z.string().optional(),
  user_id: z.string().optional(),
  user_name: z.string().optional(),
});

export type CommentSchema = z.infer<typeof commentSchema>;
