import { configureStore } from '@reduxjs/toolkit';
import memoriesReducer from './memoriesSlice';

const store = configureStore({
  reducer: {
    memories: memoriesReducer
  }
});

export default store;