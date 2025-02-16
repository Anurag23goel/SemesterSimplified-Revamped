import { createSlice } from "@reduxjs/toolkit";

type AuthUser = {
  userLoggedIn: boolean;
};

const initialState: AuthUser = {
  userLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.userLoggedIn = true;
    },
    logout: (state) => {
      state.userLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
