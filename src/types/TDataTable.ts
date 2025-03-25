import { Dispatch, SetStateAction } from "react";
import { TExpense } from "./TExpense";
import { TCommitmentOrPayment } from "./TCommitmentOrPayment";

export type TDataTable = {
  label: string;
  columns: {
    key: string;
    label: string;
  }[];
  data: TExpense[] | TCommitmentOrPayment[];
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  labelAddButton: string;
  handleAdd: () => void;
  handleDelete: (id: number) => void;
  handleView?: (id: number) => void;
}