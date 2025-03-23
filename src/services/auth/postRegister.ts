import { TPostRegister } from "@/types/TPostRegister";
import axios from "axios";

export default async function postRegister({
  name,
  login,
  password,
  enqueueSnackbar,
}: TPostRegister) {
  try {
    const { data } = await axios.post(
      'http://localhost:8080/auth/register',
      { name, login, password },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.data?.status === 'BAD_REQUEST') {
        enqueueSnackbar('Email já cadastrado', { variant: 'error'});
    } else {
      enqueueSnackbar('Erro ao realizar cadastro', { variant: 'error' });
    }
  }
    return null;
  }
}