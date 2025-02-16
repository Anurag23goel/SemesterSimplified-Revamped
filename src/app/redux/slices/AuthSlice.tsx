import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define Type for AuthUser
type AuthUser = {
  userLoggedIn: boolean;
  userID: string | null;
};

// Async Thunk: Fetch User Authentication Status from API
export const fetchUserAuth = createAsyncThunk<AuthUser>(
  "auth/fetchUserAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/authenticationStatus", {
        withCredentials: true, // Send HTTP-only cookies
      });

      if (response.data.success) {
        return { userLoggedIn: true, userID: response.data.userID };
      } else {
        return rejectWithValue({ userLoggedIn: false, userID: null });
      }
    } catch (error:any) {
      console.error("Error fetching auth status:", error);
      return rejectWithValue({ userLoggedIn: false, userID: null }); 
    }
  }
);

// Initial State (No `localStorage` in initial state to avoid hydration errors)
const initialState: AuthUser = {
  userLoggedIn: false,
  userID: null,
};

// Redux Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userLoggedIn = true;
      state.userID = action.payload;
    },
    logout: (state) => {
      state.userLoggedIn = false;
      state.userID = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAuth.fulfilled, (state, action) => {
      state.userLoggedIn = action.payload.userLoggedIn;
      state.userID = action.payload.userID;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
