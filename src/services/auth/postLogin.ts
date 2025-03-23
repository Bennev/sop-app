import { TPostLogin } from "@/types/TPostLogin";
import axios from "axios";

export default async function postLogin({
  login,
  password,
}: TPostLogin) {
  try {
    const { data } = await axios.post(
      'http://localhost:8080/auth/login',
      { login, password },
    );

    return data;
  } catch {
    return null;
  }
}