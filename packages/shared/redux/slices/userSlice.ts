import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearCookie, setCookie } from '../../helpers/utils';

export interface UserState {
  username: string | null;
  market: 'en' | 'ca' | null;
  firstName: string | null;
  lastName: string | null;
}

const initialState: UserState = {
  username: null,
  market: null,
  firstName: null,
  lastName: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.username = action.payload.username;
      state.market = action.payload.market;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      setCookie(`username=${action.payload.username}`);
      setCookie(`userMarket=${action.payload.market}`);
      setCookie(`firstName=${action.payload.firstName}`);
      setCookie(`lastName=${action.payload.lastName}`);
    },
    clearUser(state) {
      state.username = null;
      state.market = null;
      clearCookie();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
