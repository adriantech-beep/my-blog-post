import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/apiPosts";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../allposts/postSlice";
import type { RootState } from "../store/store";
import { useEffect } from "react";

export function useGetPosts() {
  const dispatch = useDispatch();

  const { page, limit } = useSelector(
    (state: RootState) => state.posts.pagination,
  );

  const { data, isPending, error } = useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => getPosts({ page, limit }),
  });

  useEffect(() => {
    if (data) {
      dispatch(
        setPosts({
          posts: data.posts,
          total: data.total,
        }),
      );
    }
  }, [data, dispatch]);

  return { isPending, error };
}
