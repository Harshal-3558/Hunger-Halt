import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch auth status
export const fetchAuthStatus = createAsyncThunk(
  "auth/fetchAuthStatus",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_HOST2}/auth/authStatus`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuthStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedIn = action.payload.loggedIn;
        state.user = action.payload.user;
      })
      .addCase(fetchAuthStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
