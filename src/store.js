import { configureStore } from '@reduxjs/toolkit';
import contactSlice from './features/ContactSlice';
export const store = configureStore({
  reducer: {
    contactData: contactSlice,
  },
});
