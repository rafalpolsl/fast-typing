import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  isLoading: false,
};

export const loginAction = createAsyncThunk("auth/login", () => {});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectIsLoading = () => {};
