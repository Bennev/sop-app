import { TExpense } from "./TExpense";

export type TDataTableCell = {
  column_key: string;
  row: TExpense;
  handleView: (id: number) => void;
  handleDelete: (id: number) => void;
}