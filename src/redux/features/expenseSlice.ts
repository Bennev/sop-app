import { EExpenseStatus } from '@/enums/EExpenseStatus';
import { EExpenseType } from '@/enums/EExpenseType';
import { TExpense } from '@/types/TExpense';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TExpense = {
  id: 0,
  type: EExpenseType.BUILDING_CONSTRUCTION,
  protocol_date: '',
  due_date: '',
  creditor: '',
  value: 0,
  description: '',
  protocol_number: '',
  status: EExpenseStatus.WAITING_COMMITMENT,
}

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpense: (state, action: PayloadAction<TExpense>) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
      state.protocol_date = action.payload.protocol_date;
      state.due_date = action.payload.due_date;
      state.creditor = action.payload.creditor;
      state.value = action.payload.value;
      state.description = action.payload.description;
      state.protocol_number = action.payload.protocol_number;
      state.status = action.payload.status;
    }
  },
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;