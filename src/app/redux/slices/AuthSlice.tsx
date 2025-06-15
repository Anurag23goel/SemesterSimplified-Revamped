import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { user_type } from "@/types/types";

type AuthUser = {
  userLoggedIn: boolean;
  user: user_type | null;
};

export const fetchUserAuth = createAsyncThunk<AuthUser>(
  "auth/fetchUserAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/authenticationStatus", {
        withCredentials: true,
      });

      if (response.data.success) {
        console.log("response.data.user:", response.data.user);

        const user: user_type = response.data.user; // make sure backend sends all fields
        return {
          userLoggedIn: true,
          user,
        };
      } else {
        return rejectWithValue({ userLoggedIn: false, user: null });
      }
    } catch (error: any) {
      return rejectWithValue({ userLoggedIn: false, user: null });
    }
  }
);

const initialState: AuthUser = {
  userLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.userLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAuth.fulfilled, (state, action) => {
      state.userLoggedIn = action.payload.userLoggedIn;
      state.user = action.payload.user;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
