import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  username: "",
  token: "",
  isLoggedIn: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createSession: (
      state,
      { payload }: PayloadAction<{ username: string }>
    ) => {
      state.isLoggedIn = true;
      state.username = payload.username;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
    },
  },
});

export const selectIsLoading = (root: RootState) => root.auth.isLoading;
export const selectIsLoggedIn = (root: RootState) => root.auth.isLoggedIn;
export const selectUsername = (root: RootState) => root.auth.username;
export const selectAuth = (root: RootState) => root.auth;

export const authActions = authSlice.actions;
