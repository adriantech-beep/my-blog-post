import { getCommentsByPostId } from "@/services/apiComment";
import { useQuery } from "@tanstack/react-query";

export function useGetComments(commentId: string) {
  const { data: comments, isPending } = useQuery({
    queryKey: ["comments", commentId],
    queryFn: () => getCommentsByPostId(commentId),
  });

  return { comments, isPending };
}
