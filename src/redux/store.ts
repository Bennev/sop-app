'use client'

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import expenseReducer from './features/expenseSlice';

export const store = configureStore({
    reducer: {
      auth: authReducer,
      expense: expenseReducer,
    }
})


export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;