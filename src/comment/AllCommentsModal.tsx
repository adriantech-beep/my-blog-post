import { ScrollArea } from "@/components/ui/scroll-area";
import CommentForm from "./CommentForm";
import { Post } from "@/types/post";
import { useGetComments } from "./useGetComments";
import { timeAgo } from "@/helper/timeAgo";
import { useEffect, useRef } from "react";
import MessageIcon from "../../public/message-circle-more.svg";

type AllCommentsModalProps = {
  post: Post;
};

const AllCommentsModal = ({ post }: AllCommentsModalProps) => {
  const { comments, isPending } = useGetComments(post?.id);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastCommentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [comments]);
  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-center h-72 text-sm text-muted-foreground">
          Loading comments…
        </div>
      ) : comments?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-72 gap-2 text-center">
          <img
            src={MessageIcon}
            alt="No comments"
            className="w-10 h-10 opacity-60"
          />
          <h3 className="text-lg font-medium">Share your thoughts</h3>
          <p className="text-sm text-muted-foreground">
            Behind every good post is a better commenter
          </p>
        </div>
      ) : (
        <ScrollArea className="h-72 w-full rounded-md border">
          <div className="flex flex-col divide-y">
            {comments?.map((comment) => (
              <div key={comment.id} ref={lastCommentRef} className="p-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium">{comment.user_name}</h4>
                  <span className="text-xs text-muted-foreground">
                    • {timeAgo(comment.created_at)}
                  </span>
                </div>

                {comment.comment && (
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {comment.comment}
                  </p>
                )}

                {comment.image && (
                  <div className="mt-3">
                    <img
                      src={comment.image}
                      alt="Comment attachment"
                      className="max-h-60 w-auto rounded-md border object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      <div className="mt-4 border-t pt-4">
        <CommentForm post={post} />
      </div>
    </>
  );
};

export default AllCommentsModal;
