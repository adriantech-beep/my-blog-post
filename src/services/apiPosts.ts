import supabase from "./supabase";

export async function getPosts() {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
  return data;
}
