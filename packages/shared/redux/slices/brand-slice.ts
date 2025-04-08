// File: packages/app/redux/slices/brandSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the brand state.
export interface BrandState {
  brandId: string;
  featureFlags: { [key: string]: boolean };
  content: { [key: string]: any };
}

// Initial state for the brand reducer.
const initialState: BrandState = {
  brandId: '', // e.g. "casino-a" or "casino-b"
  featureFlags: {},
  content: {},
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    // Set the entire brand state at once.
    setBrand(state, action: PayloadAction<BrandState>) {
      state.brandId = action.payload.brandId;
      state.featureFlags = action.payload.featureFlags;
      state.content = action.payload.content;
    },
    // Update a specific feature flag.
    updateFeatureFlag(
      state,
      action: PayloadAction<{ flagName: string; value: boolean }>,
    ) {
      state.featureFlags[action.payload.flagName] = action.payload.value;
    },
    // Update a specific content piece.
    updateContent(state, action: PayloadAction<{ key: string; value: any }>) {
      state.content[action.payload.key] = action.payload.value;
    },
    // Reset the brand state.
    clearBrand(state) {
      state.brandId = '';
      state.featureFlags = {};
      state.content = {};
    },
  },
});

export const { setBrand, updateFeatureFlag, updateContent, clearBrand } =
  brandSlice.actions;
export default brandSlice.reducer;
