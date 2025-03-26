import { TCommitmentOrPayment } from "./TCommitmentOrPayment";
import { TExpense } from "./TExpense";

export type TDataTableCell = {
  column_key: string;
  row: TExpense | TCommitmentOrPayment;
  handleDelete: (id: number) => void;
  handleView?: (id: number) => void;
}