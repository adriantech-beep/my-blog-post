import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPost as createPostApi } from "../../services/apiPosts";
import { toast } from "sonner";
import type { BlogPostFormSchema } from "./postCreationSchema";

export function useCreatePost() {
  const navigate = useNavigate();

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: (data: BlogPostFormSchema) => createPostApi(data),

    onSuccess: () => {
      navigate("/all-posts", { replace: true });
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create post. Please try again.");
      console.error("Failed to create post:", error);
    },
  });

  return { createPost, isPending };
}
