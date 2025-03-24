import { TExpense } from "./TExpense"

export type TResponseFindAllExpensesPaginated = {
  content: TExpense[];
  totalPages: number;
}