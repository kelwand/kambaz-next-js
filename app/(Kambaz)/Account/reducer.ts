import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signout: (state) => {
      state.currentUser = null;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;

