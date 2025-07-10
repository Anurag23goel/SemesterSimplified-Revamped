import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnlineUsersState {
  userIds: string[]; // or user_type[] if full user data
}

const initialState: OnlineUsersState = {
  userIds: [],
};

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.userIds = action.payload;
    },
    addOnlineUser: (state, action: PayloadAction<string>) => {
      if (!state.userIds.includes(action.payload)) {
        state.userIds.push(action.payload);
      }
    },
    removeOnlineUser: (state, action: PayloadAction<string>) => {
      state.userIds = state.userIds.filter((id) => id !== action.payload);
    },
  },
});

export const { setOnlineUsers, addOnlineUser, removeOnlineUser } =
  onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;
