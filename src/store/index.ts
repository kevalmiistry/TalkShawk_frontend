import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./user/userSlice";
import chatReducer from "./chat/chatSlice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    chat: chatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
