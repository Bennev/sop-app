'use client'

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import expenseReducer from './features/expenseSlice';
import commitmentReducer from './features/commitmentSlice';

export const store = configureStore({
    reducer: {
      auth: authReducer,
      expense: expenseReducer,
      commitment: commitmentReducer,
    }
})


export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;