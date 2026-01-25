import { getCommentCountByPostId } from "@/services/apiComment";
import { useQuery } from "@tanstack/react-query";

export function useGetCommentCount(postId: string) {
  return useQuery({
    queryKey: ["comment-count", postId],
    queryFn: () => getCommentCountByPostId(postId),
  });
}
