import { TCommitmentOrPayment, TCommitmentOrPaymentWithoutIdAndNumber } from "@/types/TCommitmentOrPayment";
import axios from "axios";
import { EnqueueSnackbar } from "notistack";

export default async function postCommitment(
  accessToken: string,
  body: TCommitmentOrPaymentWithoutIdAndNumber & { expense_id: number },
  enqueueSnackbar: EnqueueSnackbar,
): Promise<TCommitmentOrPayment | null> {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/commitment`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    enqueueSnackbar('Empenho criado com sucesso', { variant: 'success' });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Erro ao criar empenho';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
    return null;
  }
}