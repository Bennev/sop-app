import { TPostRegister } from "@/types/TPostRegister";
import axios from "axios";

export default async function postRegister({
  name,
  login,
  password,
  enqueueSnackbar,
}: TPostRegister) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      { name, login, password },
    );

    return 'SUCCESS';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Erro ao realizar cadastro';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
    return null;
  }
}