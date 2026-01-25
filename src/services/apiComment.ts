import { CommentSchema } from "@/comment/commentSchema";
import supabase, { supabaseUrl } from "./supabase";

export async function createComment({
  comment,
  image,
  post_id,
  user_id,
  user_name,
}: CommentSchema) {
  let imagePath: string | null = null;

  if (image) {
    const imageName = `${crypto.randomUUID()}-${image.name}`.replaceAll(
      "/",
      "",
    );

    const { error: storageError } = await supabase.storage
      .from("comments_images")
      .upload(imageName, image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Image upload failed");
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/comments_images/${imageName}`;
  }

  const { data, error } = await supabase.from("comments").insert([
    {
      comment,
      image: imagePath,
      post_id,
      user_id,
      user_name,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error("Could not create post");
  }

  return data;
}

export async function getCommentsByPostId(commentId: string) {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", commentId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Could not fetch comments");
  }

  return comments;
}

export async function getCommentCountByPostId(postId: string) {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) throw new Error("Failed to fetch comment count");

  return count ?? 0;
}
