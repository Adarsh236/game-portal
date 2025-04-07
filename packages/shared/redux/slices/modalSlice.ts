import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Modal {
  id: string;
  title: string;
  description: string;
  subDescription: string;
  buttonText: string;
}

interface ModalState {
  queue: Modal[];
}

const initialState: ModalState = {
  queue: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    addModal(state, action: PayloadAction<Modal>) {
      state.queue.push(action.payload);
    },
    removeModal(state, action: PayloadAction<string>) {
      state.queue = state.queue.filter((modal) => modal.id !== action.payload);
    },
    clearModals(state) {
      state.queue = [];
    },
  },
});

export const { addModal, removeModal, clearModals } = modalSlice.actions;
export default modalSlice.reducer;
