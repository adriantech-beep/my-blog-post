import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../allposts/postSlice";
import userPostsReducer from "../features/userPost/userPostSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    userPosts: userPostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
