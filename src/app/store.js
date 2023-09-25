import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api } from "./services/api";
import postsReducer from "../features/postsSlice"; // Импортируйте ваш срез (slice)

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    posts: postsReducer, // Добавьте ваш срез (slice) в reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
