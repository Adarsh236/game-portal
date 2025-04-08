import { configureStore, Store } from '@reduxjs/toolkit';
import brandReducer from './slices/brand-slice';
import modalReducer from './slices/modal-slice';
import userReducer from './slices/user-slice';

export const store: Store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    brand: brandReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
