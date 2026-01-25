import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CommentSchema } from "./commentSchema";
import { createComment as createCommentApi } from "@/services/apiComment";

export function useCreateComment() {
  const queryClient = useQueryClient();

  const {
    mutate: createComment,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: CommentSchema) => createCommentApi(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["comment-count"] });
      queryClient.setQueryData(["comments"], data);
      toast.success("Comment submitted successfully");
    },
    onError: (error) => {
      toast.error("Failed to create comment. Please try again.");
      console.error("Failed to create comment:", error);
    },
  });

  return { createComment, isPending, isSuccess };
}
