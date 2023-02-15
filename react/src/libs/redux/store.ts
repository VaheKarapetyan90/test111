import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { Autentication } from "./auth.api";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [Autentication.reducerPath]: Autentication.reducer,
    },

    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware().concat(Autentication.middleware),
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
