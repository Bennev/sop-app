import { EnqueueSnackbar } from "notistack";

export type TPostRegister = {
  name: string;
  login: string;
  password: string;
  enqueueSnackbar: EnqueueSnackbar;
}