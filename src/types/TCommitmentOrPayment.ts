export type TCommitmentOrPayment = {
  id: number;
  date: string;
  value: number;
  note: string;
}

export type TCommitmentOrPaymentWithoutId = Omit<TCommitmentOrPayment, 'id'>;