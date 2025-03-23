import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  name: string;
  login: string;
  accessToken: string;
}

const initialState: IUser = {
  name: '',
  login: '',
  accessToken: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
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

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;