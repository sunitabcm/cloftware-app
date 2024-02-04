import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userDetails',
  initialState: {
    user: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;

export const selectUserCred = (state) => state.userDetails.user;

export default userSlice.reducer;