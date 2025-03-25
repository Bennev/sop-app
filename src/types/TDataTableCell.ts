import { TCommitment } from "./TCommitment";
import { TExpense } from "./TExpense";

export type TDataTableCell = {
  column_key: string;
  row: TExpense | TCommitment;
  handleDelete: (id: number) => void;
  handleView?: (id: number) => void;
}