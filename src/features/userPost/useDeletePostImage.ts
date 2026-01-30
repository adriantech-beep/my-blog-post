import { deleteImageByPost } from "@/services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeletePostImage() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteImageByPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Image removed");
    },
    onError: () => {
      toast.error("Failed to remove image");
    },
  });

  return { deleteImage: mutate, isPending };
}
