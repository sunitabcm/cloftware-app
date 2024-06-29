// src/redux/classSlice.js
import { createSlice } from '@reduxjs/toolkit';

const classSlice = createSlice({
  name: 'class',
  initialState: {
    selectedClass: null,
  },
  reducers: {
    setSelectedClass: (state, action) => {
      state.selectedClass = action.payload;
    },
  },
});

export const { setSelectedClass } = classSlice.actions;
export default classSlice.reducer;
