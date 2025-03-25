import { TCommitmentOrPayment } from "./TCommitmentOrPayment";
import { TExpense } from "./TExpense";

export type TExpenseColumns = {
  key: keyof TExpense | 'commitment_count',
  label: string,
};

export type TCommitmentOrPaymentColumns = {
  key: keyof TCommitmentOrPayment | 'payment_count',
  label: string,
};