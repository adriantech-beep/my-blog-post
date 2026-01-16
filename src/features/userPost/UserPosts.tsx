import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useGetUserPosts } from "./useGetUserPosts";
import { useUser } from "../authentication/useUser";
import { getMonthDay } from "../../helper/transformDate";
import { setUserPage } from "./userPostSlice";
import { useDeleteUserPost } from "./useDeleteUserPost";
import { SquarePen, X } from "lucide-react";
import { useState } from "react";
import type { Post } from "../../types/post";
import EditPostModal from "../../editPost/EditPostModal";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";

const UserPosts = () => {
  const { user } = useUser();
  const { deletePost, isPending: isDeleting } = useDeleteUserPost();
  const [editPost, setEditPost] = useState<Post | null>(null);

  const dispatch = useDispatch();

  const { isPending, error } = useGetUserPosts(user?.id ?? "");

  const { items, pagination } = useSelector(
    (state: RootState) => state.userPosts
  );

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  if (isPending) return <div>Loading posts...</div>;
  if (error) return <div>Failed to load posts</div>;
  if (!items.length) return <div>No posts to show</div>;

  return (
    <div>
      <div className="flex gap-3 relative">
        {items.map((post) => (
          <Card key={post.id} className="w-2xl p-2">
            <div className="w-full flex items-end justify-end p-2 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setEditPost({ ...post, tags: post.tags ?? "" })
                    }
                  >
                    <SquarePen />
                  </button>
                </DialogTrigger>
                {editPost && (
                  <DialogContent>
                    <EditPostModal
                      post={editPost}
                      onClose={() => setEditPost(null)}
                    />
                  </DialogContent>
                )}
              </Dialog>

              <button
                className="cursor-pointer "
                disabled={isDeleting}
                onClick={() => deletePost(post.id)}
              >
                <X />
              </button>
            </div>

            <CardHeader>
              <CardTitle className="font-medium text-gray-500">
                {post.title}
              </CardTitle>

              <div className="w-full h-64 overflow-hidden mb-4">
                <img src={post?.featured_image ?? ""} alt={post.title} />
              </div>
            </CardHeader>
            <Card className="w-full flex flex-col text-center items-center justify-center">
              <div className="w-full  justify-items-start p-2">
                <h3 className="text-md font-medium text-gray-600">
                  {post.user_name}
                </h3>
                <p className="text-sm font-light text-gray-500">
                  {getMonthDay(post.created_at)}
                </p>
              </div>
              <CardDescription className="text-gray-900 font-bold">
                {post.body}
              </CardDescription>
              <p>{post.tags}</p>
              <CardDescription className="text-gray-800 italic mt-4 text-lg leading-none p-2">
                By {post.excerpt}
              </CardDescription>
            </Card>
          </Card>
        ))}
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              size="lg"
              className={
                pagination.page <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              onClick={(e) => {
                e.preventDefault();
                if (pagination.page > 1)
                  dispatch(setUserPage(pagination.page - 1));
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              size="lg"
              isActive={pagination.page === 1}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setUserPage(1));
              }}
            >
              {pagination.page} of {totalPages}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              size="lg"
              className={
                pagination.page >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              onClick={(e) => {
                e.preventDefault();
                if (pagination.page < totalPages)
                  dispatch(setUserPage(pagination.page + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UserPosts;
