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

export async function deleteComment(commentId: string) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error(error);
    throw new Error("Could not delete comment");
  }

  return true;
}

export async function updateUserComment({
  id,
  comment,
  image,
}: {
  id: string;
  comment?: string | null;
  image?: File | null;
}) {
  let imagePath: string | null | undefined;

  if (image instanceof File) {
    const imageName = `${crypto.randomUUID()}-${image.name}`.replaceAll(
      "/",
      "",
    );

    const { error: uploadError } = await supabase.storage
      .from("comments_images")
      .upload(imageName, image);

    if (uploadError) {
      throw new Error("Image upload failed");
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/comments_images/${imageName}`;
  }

  const updatePayload: {
    comment?: string | null;
    image?: string | null;
  } = {};

  if (comment !== undefined) {
    updatePayload.comment = comment;
  }

  if (image === null) {
    updatePayload.image = null;
  } else if (imagePath) {
    updatePayload.image = imagePath;
  }

  const { data, error } = await supabase
    .from("comments")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Could not update comment");
  }

  return data;
}
