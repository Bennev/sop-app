import { EExpenseType } from "@/enums/EExpenseType";

export type TExpense = {
  id: number;
  type: EExpenseType;
  protocol_date: string;
  due_date: string;
  creditor: string;
  description: string;
  value: number;
  protocol_number: string;
}

export type TExpenseWithoutIdAndProtocolNumber = Omit<TExpense, 'id' | 'protocol_number'>;