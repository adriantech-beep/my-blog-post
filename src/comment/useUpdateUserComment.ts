import { updateUserComment } from "@/services/apiComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateUserComment() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateUserComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment updated successfully");
    },
    onError: () => {
      toast.error("Failed to update Comment");
    },
  });
  return { updateComment: mutate, isPending, error };
}
