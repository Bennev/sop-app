import { TPostLogin } from "@/types/TPostLogin";
import axios from "axios";

export default async function postLogin({
  login,
  password,
}: TPostLogin) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { login, password },
    );

    return data;
  } catch {
    return null;
  }
}