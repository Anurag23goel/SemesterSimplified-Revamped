import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import onlineUsersReducer from "./slices/OnlineUsersSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onlineUsers: onlineUsersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
