import { TCommitmentOrPayment } from '@/types/TCommitmentOrPayment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TCommitmentOrPayment = {
  id: 0,
  date: '',
  value: 0,
  note: '',
  commitment_number: '',
}

export const commitmentSlice = createSlice({
  name: 'commitment',
  initialState,
  reducers: {
    setCommitment: (state, action: PayloadAction<TCommitmentOrPayment>) => {
      state.id = action.payload.id;
      state.date = action.payload.date;
      state.value = action.payload.value;
      state.note = action.payload.note;
      state.commitment_number = action.payload.commitment_number;
    }
  },
})

export const commitmentActions = commitmentSlice.actions;

export default commitmentSlice.reducer;