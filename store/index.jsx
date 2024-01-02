import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import authReducer, { setAuthToken } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    userDetails: userReducer,
    auth: authReducer,
  },
})