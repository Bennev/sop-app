export type TCommitmentOrPayment = {
  id: number;
  date: string;
  value: number;
  note: string;
  commitment_number?: string;
  payment_number?: string;
}

export type TCommitmentOrPaymentWithoutIdAndNumber = Omit<TCommitmentOrPayment, 'id' | 'commitment_number' | 'payment_number'>;