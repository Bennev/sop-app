import { TExpense } from "./TExpense";

export type TExpenseColumns = {
  key: keyof TExpense,
  label: string,
};