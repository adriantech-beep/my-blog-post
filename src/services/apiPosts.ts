import type { BlogPostFormSchema } from "../features/postCreation/postCreationSchema";
import supabase from "./supabase";

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
    items: data ?? [],
    total: count ?? 0,
  };
}

export async function createPost({
  title,
  body,
  excerpt,
  tags,
  featuredImage,
  userName,
  userId,
}: BlogPostFormSchema) {
  const { data, error } = await supabase.from("posts").insert([
    {
      title,
      body,
      excerpt,
      tags,
      featured_image: featuredImage,
      user_name: userName,
      user_id: userId,
    },
  ]);
  if (error) {
    console.error("Error creating post:", error);
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
  if (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
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
  excerpt,
  tags,
  featuredImage,
}: {
  id: string;
  title: string;
  body: string;
  excerpt?: string;
  tags?: string;
  featuredImage?: string;
}) {
  const { data, error } = await supabase
    .from("posts")
    .update({
      title,
      body,
      excerpt,
      tags,
      featured_image: featuredImage,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating post:", error);
    throw new Error("Could not update post");
  }

  return data;
}
