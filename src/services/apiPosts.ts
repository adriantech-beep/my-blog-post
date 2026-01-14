import supabase from "./supabase";

export async function getPosts() {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
  return data;
}

export async function createPost({
  title,
  body,
  excerpt,
  tags,
  featuredImage,
  userName,
  userId,
}: {
  title: string;
  body: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: string;
  userName: string;
  userId: string;
}) {
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
