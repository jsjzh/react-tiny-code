import { configureStore } from '@reduxjs/toolkit';
import global from './reducer/global';
import logger from 'redux-logger';
import { isDevelopment } from '@/shared';

export const store = configureStore({
  reducer: { global },
  middleware: (getDefaultMiddleware) =>
    isDevelopment ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
