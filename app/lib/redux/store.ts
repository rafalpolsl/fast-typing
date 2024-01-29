"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";

/**
 * Create redux store
 *
 * @return {Object} - return store with all available reducers
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
