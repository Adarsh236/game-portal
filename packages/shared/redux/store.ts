import { configureStore, Store } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import modalReducer from "./slices/modalSlice";

export const store: Store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
