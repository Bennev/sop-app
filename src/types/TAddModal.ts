import { Dispatch, SetStateAction } from "react";

export type TAddModal = {
  entity: 'Empenho' | 'Pagamento';
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refreshData: () => void;
  id: number;
}