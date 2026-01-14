import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPost as createPostApi } from "../../services/apiPosts";
import { toast } from "sonner";

export function useCreatePost() {
  const navigate = useNavigate();

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: ({
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
    }) =>
      createPostApi({
        title,
        body,
        excerpt,
        tags,
        featuredImage,
        userName,
        userId,
      }),

    onSuccess: (data) => {
      navigate("/all-posts", { replace: true });
      //   queryClient.setQueryData(["user"], data);
      toast.success("Post created successfully");
      console.log(data);
    },
    onError: (error) => {
      toast.error("Failed to create post. Please try again.");
      console.error("Failed to create post:", error);
    },
  });

  return { createPost, isPending };
}
