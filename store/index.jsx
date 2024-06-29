import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import authReducer, { setAuthToken } from './slices/authSlice';
import teacherReducer from './slices/teacherSlice';
import classReducer from './slices/classSlice';

export const store = configureStore({
  reducer: {
    userDetails: userReducer,
    userDetailsTeacher: teacherReducer,
    auth: authReducer,
    class: classReducer,

  },
})