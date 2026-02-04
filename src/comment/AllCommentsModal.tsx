import { ScrollArea } from "@/components/ui/scroll-area";
import CommentForm from "./CommentForm";
import { Post } from "@/types/post";
import { useGetComments } from "./useGetComments";
import { timeAgo } from "@/helper/timeAgo";
import { useEffect, useRef, useState } from "react";
import MessageIcon from "../assets/message-circle-more.svg";
import { useUser } from "@/features/authentication/useUser";
import { useDeleteComment } from "./useDeleteComment";

type AllCommentsModalProps = {
  post: Post;
};

const AllCommentsModal = ({ post }: AllCommentsModalProps) => {
  const { comments, isPending } = useGetComments(post?.id);
  const { user } = useUser();
  const { deleteComment } = useDeleteComment();
  const [editingComment, setEditingComment] = useState<{
    id: string;
    comment: string | null;
    image: string | null;
  } | null>(null);

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

                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    {comment.comment && (
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {comment.comment}
                      </p>
                    )}

                    {comment.image && (
                      <img
                        src={comment.image}
                        alt="Comment attachment"
                        className="mt-3 max-h-60 w-auto rounded-md border object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  {comment.user_id === user?.id && (
                    <div className="flex gap-2 items-start">
                      <button
                        className="text-xs cursor-pointer"
                        onClick={() => setEditingComment(comment)}
                      >
                        Edit
                      </button>

                      <button
                        className="text-xs text-red-500 cursor-pointer"
                        onClick={() => deleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      <div className="mt-4 border-t pt-4">
        <CommentForm
          post={post}
          editingComment={editingComment}
          onCancelEdit={() => setEditingComment(null)}
          onEditSuccess={() => setEditingComment(null)}
        />
      </div>
    </>
  );
};

export default AllCommentsModal;
