import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getUserPosts } from "../../services/apiPosts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { setUserPosts } from "./userPostSlice";

export function useGetUserPosts(userId: string) {
  const dispatch = useDispatch();

  const { page, limit } = useSelector(
    (state: RootState) => state.userPosts.pagination
  );

  const { data, isPending, error } = useQuery({
    queryKey: ["posts", page, limit],
    enabled: Boolean(userId),
    queryFn: () => getUserPosts({ page, limit, userId }),
  });

  useEffect(() => {
    if (data) {
      dispatch(
        setUserPosts({
          items: data.items,
          total: data.total,
        })
      );
    }
  }, [data, dispatch]);

  return { isPending, error };
}
