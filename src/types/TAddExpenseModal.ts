import { Dispatch, SetStateAction } from "react";

export type TAddExpenseModal = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}