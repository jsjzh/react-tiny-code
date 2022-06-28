import { configureStore } from '@reduxjs/toolkit';
import globalSlicer from './reducer/globalSlicer';
import globalBuilder from './reducer/globalBuilder';

export const store = configureStore({
  reducer: {
    globalSlicer,
    globalBuilder,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
