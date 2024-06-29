import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userDetailsTeacher',
  initialState: {
    user: null,
  },
  reducers: {
    updateUserTeacher: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateUserTeacher } = userSlice.actions;

export const selectUserCred = (state) => state.userDetailsTeacher.user;

export default userSlice.reducer;