import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  login: "",
  token: "",
  isLoggedIn: false,
  isLoading: false,
};

export const loginAction = createAsyncThunk(
  "auth/login",
  async (data: { login: string; password: string }) => {
    const response = {
      login: data.login,
      token: "0000",
    };

    return {
      login: response.login,
      token: response.token,
    };
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createSession: (state, { payload }: PayloadAction<{ login: string }>) => {      
      state.isLoggedIn = true;
      state.login = payload.login;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.login = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.login = payload.login;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });
  },
});

export const selectIsLoading = (root: RootState) => root.auth.isLoading;
export const selectIsLoggedIn = (root: RootState) => root.auth.isLoggedIn;
export const selectAuth = (root: RootState) => root.auth;

export const authActions = authSlice.actions;
