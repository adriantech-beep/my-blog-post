import { deleteComment } from "@/services/apiComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment successfully deleted");
    },
    onError: () => {
      toast.error("Failed to delete comment");
    },
  });

  return { deleteComment: mutate, isPending };
}
