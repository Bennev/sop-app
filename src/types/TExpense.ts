import { EExpenseStatus } from "@/enums/EExpenseStatus";
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
  status: EExpenseStatus;
}

export type TExpenseWithoutAutoFields = Omit<TExpense, 'id' | 'protocol_number' | 'status'>;