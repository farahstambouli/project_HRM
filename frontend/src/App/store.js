// src/App/store.js
//this is the store for the redux part of our application
// for now we only store the users and we can add more slices 


import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';


export default configureStore({
  reducer: {
    auth: authReducer,
    // reports: reportsReducer,
  },
});
