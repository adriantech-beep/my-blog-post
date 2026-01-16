import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserPost } from "../services/apiPosts";
import { toast } from "sonner";

export function useUpdateUserPost() {
  const queryClient = useQueryClient();

  const {
    mutate: updatePost,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateUserPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated successfully");
    },
    onError: () => {
      toast.error("Failed to update post");
    },
  });
  return { updatePost, isPending, error };
}
