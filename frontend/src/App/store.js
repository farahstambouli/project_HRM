// src/App/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reportsReducer from './reportsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    // reports: reportsReducer,
  },
});
