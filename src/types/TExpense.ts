import { EExpenseType } from "@/enums/EExpenseType";

export type TExpense = {
  id: number;
  type: EExpenseType;
  protocol_date: Date;
  due_date: Date;
  creditor: string;
  description: string;
  value: string;
}