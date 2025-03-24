import { TExpense } from "./TExpense";

export type TDataTable = {
  label: string;
  columns: {
    key: string;
    label: string;
  }[];
  data: TExpense[];
  handleView: (id: number) => void;
  handleDelete: (id: number) => void;
}