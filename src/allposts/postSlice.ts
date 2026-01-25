import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types/post";

type Pagination = {
  page: number;
  limit: number;
  total: number;
};

type PostsState = {
  posts: Post[];
  pagination: Pagination;
};

const initialState: PostsState = {
  posts: [],
  pagination: {
    page: 1,
    limit: 4,
    total: 0,
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<{ posts: Post[]; total: number }>) {
      state.posts = action.payload.posts;
      state.pagination.total = action.payload.total;
    },

    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
      state.pagination.total += 1;
    },

    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
  },
});

export const { setPosts, addPost, setPage } = postsSlice.actions;
export default postsSlice.reducer;
