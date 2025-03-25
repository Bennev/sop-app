import axios from "axios";
import { EnqueueSnackbar } from "notistack";

export default async function deleteCommitment(
  accessToken: string,
  id: number,
  enqueueSnackbar: EnqueueSnackbar) {
  try {
    await axios.delete(
      `http://localhost:8080/commitment/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return 'SUCCESS';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Erro ao deletar empenho';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
    return null;
  }
}