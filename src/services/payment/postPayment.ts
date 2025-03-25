import { TCommitmentOrPayment, TCommitmentOrPaymentWithoutIdAndNumber } from "@/types/TCommitmentOrPayment";
import axios from "axios";
import { EnqueueSnackbar } from "notistack";

export default async function postPayment(
  accessToken: string,
  body: TCommitmentOrPaymentWithoutIdAndNumber & { commitment_id: number },
  enqueueSnackbar: EnqueueSnackbar,
): Promise<TCommitmentOrPayment | null> {
  try {
    const { data } = await axios.post(
      `http://localhost:8080/payment`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    enqueueSnackbar('Pagamento criado com sucesso', { variant: 'success' });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Erro ao criar pagamento';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
    return null;
  }
}