import { TExpense, TExpenseWithoutAutoFields } from "@/types/TExpense";
import axios from "axios";

export default async function postExpense(accessToken: string, body: TExpenseWithoutAutoFields): Promise<TExpense | null> {
  try {
    const { data } = await axios.post(
      `http://localhost:8080/expense`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return data;
  } catch {
    return null;
  }
}