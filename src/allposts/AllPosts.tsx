import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useGetPosts } from "./useGetPosts";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

import { getMonthDay } from "../helper/transformDate";
import { setPage } from "./postSlice";

import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import AllCommentsModal from "@/comment/AllCommentsModal";
import { useState } from "react";
import { Post } from "@/types/post";
import CommentCount from "@/components/CommentCount";

const AllPosts = () => {
  const { isPending, error } = useGetPosts();

  const dispatch = useDispatch();

  const { items, pagination } = useSelector((state: RootState) => state.posts);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  function handlePreviousPage(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (pagination.page > 1) dispatch(setPage(pagination.page - 1));
  }

  function handleNextPage(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (pagination.page < totalPages) dispatch(setPage(pagination.page + 1));
  }

  if (isPending) return <div>Loading posts...</div>;
  if (error) return <div>Failed to load posts</div>;
  if (!items.length) return <div>No posts to show</div>;

  return (
    <div>
      <div className="flex gap-3 ">
        {items.map((post) => (
          <Card key={post.id} className="w-2xl p-2">
            <CardHeader>
              <CardTitle className="font-medium text-gray-500">
                {post.title}
              </CardTitle>

              <div className="flex items-center justify-center p-4 w-full h-64 overflow-hidden mb-4">
                <img src={post?.image ?? ""} alt={post.title} />
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

              <div className="w-full flex items-end justify-end px-6">
                <CommentCount postId={post?.id} />
              </div>
              <Dialog onOpenChange={(open) => !open && setSelectedPost(null)}>
                <DialogTrigger asChild>
                  <button
                    className="flex cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    Add a comment
                  </button>
                </DialogTrigger>

                <DialogContent>
                  {selectedPost && <AllCommentsModal post={selectedPost} />}
                </DialogContent>
              </Dialog>
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
              onClick={(e) => handlePreviousPage(e)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink size="lg" isActive={pagination.page === 1}>
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
              onClick={(e) => handleNextPage(e)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AllPosts;
