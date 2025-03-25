import { TCommitmentOrPayment } from "./TCommitmentOrPayment";
import { TExpense } from "./TExpense"

export type TResponseFindAllPaginated = {
  content: (TExpense & { commitment_count: number })[] | (TCommitmentOrPayment & { payment_count: number })[];
  totalPages: number;
}