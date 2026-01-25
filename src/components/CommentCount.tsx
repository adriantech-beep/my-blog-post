import { useGetCommentCount } from "@/allposts/useGetCommentCount";
import { MessageCircle } from "lucide-react";

const CommentCount = ({ postId }: { postId: string }) => {
  const { data: count } = useGetCommentCount(postId);

  return (
    <span className="flex items-center gap-1 text-sm text-gray-500">
      <MessageCircle size={16} />
      {count ?? 0}
    </span>
  );
};

export default CommentCount;
