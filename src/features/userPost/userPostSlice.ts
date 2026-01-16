import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserPost } from "../../types/userPost";

type UserPagination = {
  page: number;
  limit: number;
  total: number;
};

type UserPostsState = {
  items: UserPost[];
  pagination: UserPagination;
};

const initialState: UserPostsState = {
  items: [],
  pagination: {
    page: 1,
    limit: 4,
    total: 0,
  },
};

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    setUserPosts(
      state,
      action: PayloadAction<{ items: UserPost[]; total: number }>
    ) {
      state.items = action.payload.items;
      state.pagination.total = action.payload.total;
    },

    addUserPost(state, action: PayloadAction<UserPost>) {
      state.items.unshift(action.payload);
      state.pagination.total += 1;
    },

    setUserPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
  },
});

export const { setUserPosts, addUserPost, setUserPage } =
  userPostsSlice.actions;
export default userPostsSlice.reducer;
