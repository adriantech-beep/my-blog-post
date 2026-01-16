import supabase from "./supabase";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
  return data;
}

export async function signup({
  userName,
  email,
  password,
}: {
  userName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { userName } },
  });
  if (error) {
    console.error("Error during signup:", error);
    throw new Error("Signup failed");
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
