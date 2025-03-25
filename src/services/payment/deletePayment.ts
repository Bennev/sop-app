import axios from "axios";
import { EnqueueSnackbar } from "notistack";

export default async function deletePayment(
  accessToken: string,
  id: number,
  enqueueSnackbar: EnqueueSnackbar) {
  try {
    await axios.delete(
      `http://localhost:8080/payment/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return 'SUCCESS';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Erro ao deletar pagamento';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
    return null;
  }
}