import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define Type for AuthUser
type AuthUser = {
  userLoggedIn: boolean;
  user: {
    _id: string;
    name: string;
    userName: string;
    email: string;
    phoneNumber: string;
    status: string;
    university?: string; // Optional if not always present
    college?: string | null;
    role: string;
    freeCredits: number;
    documentsUploaded: string[]; // Assuming this is an array of file URLs or IDs
    createdAt: string;
    updatedAt: string;
  } | null;
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
        // Ensure only safe fields are included
        const {
          _id,
          name,
          userName,
          email,
          phoneNumber,
          status,
          role,
          freeCredits,
          documentsUploaded,
          createdAt,
          updatedAt,
        } = response.data.user;

        return {
          userLoggedIn: true,
          user: {
            _id,
            name,
            userName,
            email,
            phoneNumber,
            status,
            role,
            freeCredits,
            documentsUploaded,
            createdAt,
            updatedAt,
          },
        };
      } else {
        return rejectWithValue({ userLoggedIn: false, user: null });
      }
    } catch (error: any) {
      console.error("Error fetching auth status:", error);
      return rejectWithValue({ userLoggedIn: false, user: null });
    }
  }
);

// Initial State (No `localStorage` in initial state to avoid hydration errors)
const initialState: AuthUser = {
  userLoggedIn: false,
  user: null,
};

// Redux Slice
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
