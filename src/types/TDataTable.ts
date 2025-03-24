import { Dispatch, SetStateAction } from "react";
import { TExpense } from "./TExpense";

export type TDataTable = {
  label: string;
  columns: {
    key: string;
    label: string;
  }[];
  data: TExpense[];
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  labelAddButton: string;
  handleAdd: () => void;
  handleView: (id: number) => void;
  handleDelete: (id: number) => void;
}