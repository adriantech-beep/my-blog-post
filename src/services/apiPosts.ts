import { UpdatePostSchema } from "@/editPost/updatePostSchema";
import type { BlogPostFormSchema } from "../features/postCreation/postCreationSchema";
import supabase, { supabaseUrl } from "./supabase";

export async function getPosts({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
  return {
    posts: data ?? [],
    total: count ?? 0,
  };
}

export async function createPost({
  title,
  body,
  image,
  userName,
  userId,
}: BlogPostFormSchema) {
  let imagePath: string | null = null;

  if (image) {
    const imageName = `${crypto.randomUUID()}-${image.name}`.replaceAll(
      "/",
      "",
    );

    const { error: storageError } = await supabase.storage
      .from("post_images")
      .upload(imageName, image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Image upload failed");
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/post_images/${imageName}`;
  }

  const { data, error } = await supabase.from("posts").insert([
    {
      title,
      body,
      image: imagePath,
      user_name: userName,
      user_id: userId,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error("Could not create post");
  }

  return data;
}

export async function getUserPosts({
  userId,
  page,
  limit,
}: {
  userId: string;
  page: number;
  limit: number;
}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, error, count } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user posts:", error);
    throw new Error("Could not fetch user posts");
  }

  return {
    items: data ?? [],
    total: count ?? 0,
  };
}

export async function deleteUserPost(postId: string) {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .single();

  if (error) {
    console.error("Error deleting post:", error);
    throw new Error("Could not delete post");
  }
  return data;
}

export async function updateUserPost({
  id,
  title,
  body,
  image,
}: UpdatePostSchema) {
  let imagePath: string | undefined;

  if (image instanceof File) {
    const imageName = `${crypto.randomUUID()}-${image.name}`.replaceAll(
      "/",
      "",
    );

    const { error: uploadError } = await supabase.storage
      .from("post_images")
      .upload(imageName, image);

    if (uploadError) throw new Error("Image upload failed");

    imagePath = `${supabaseUrl}/storage/v1/object/public/post_images/${imageName}`;
  }

  const updatePayload: { title: string; body: string; image?: string } = {
    title,
    body,
  };

  if (imagePath) {
    updatePayload.image = imagePath;
  }

  const { data, error } = await supabase
    .from("posts")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Could not update post");

  return data;
}

export async function deleteImageByPost({
  postId,
  imageUrl,
}: {
  postId: string;
  imageUrl: string;
}) {
  const fileName = imageUrl.split("/post_images/")[1];

  const { error } = await supabase.storage
    .from("post_images")
    .remove([fileName]);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete image from storage");
  }

  const { error: updateError } = await supabase
    .from("posts")
    .update({ image: null })
    .eq("id", postId);

  if (updateError) {
    throw new Error("Failed to update post image");
  }

  return true;
}
