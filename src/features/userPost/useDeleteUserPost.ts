import { toast } from "sonner";
import { deleteUserPost } from "../../services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteUserPost() {
  const queryClient = useQueryClient();
  const {
    mutate: deletePost,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteUserPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  return { deletePost, isPending, error };
}
