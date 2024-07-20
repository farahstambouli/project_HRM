import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      addUser: (state, action) => {
        state.users.push(action.payload);
      },
      deleteUser: (state, action) => {
        state.users = state.users.filter((user) => user._id!== action.payload);
      },
    },
  });

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;