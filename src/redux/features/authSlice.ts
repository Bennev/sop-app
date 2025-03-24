import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TUser = {
  name: string;
  login: string;
  accessToken: string;
}

const initialState: TUser = {
  name: '',
  login: '',
  accessToken: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<TUser>) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.name = '';
      state.login = '';
      state.accessToken = '';
    },
  },
})

export const authActions = authSlice.actions;

export default authSlice.reducer;