import { configureStore, Store } from '@reduxjs/toolkit';
import brandReducer from './slices/brandSlice';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';

export const store: Store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    brand: brandReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
