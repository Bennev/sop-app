import axios from "axios";
import { EnqueueSnackbar } from "notistack";

export default async function deleteExpense(
  accessToken: string,
  id: number,
  enqueueSnackbar: EnqueueSnackbar,
) {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/expense/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return 'SUCCESS';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Erro ao deletar despesa';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
    return null;
  }
}