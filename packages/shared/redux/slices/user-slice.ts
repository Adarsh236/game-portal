import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearCookie, setCookie } from '../../helpers/cookies';

export interface UserState {
  username: string | null;
  market: 'en' | 'ca' | null;
  firstName: string | null;
  lastName: string | null;
  brandId: string | null;
}

const initialState: UserState = {
  username: null,
  market: null,
  firstName: null,
  lastName: null,
  brandId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      const brandId = action.payload.brandId;
      if (!brandId) return;

      state.username = action.payload.username;
      state.market = action.payload.market;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;

      setCookie(`username=${action.payload.username}`, brandId);
      setCookie(`userMarket=${action.payload.market}`, brandId);
      setCookie(`firstName=${action.payload.firstName}`, brandId);
      setCookie(`lastName=${action.payload.lastName}`, brandId);
    },
    clearUser(state) {
      state.username = null;
      state.market = null;
      state.firstName = null;
      state.lastName = null;
      state.brandId && clearCookie();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
