import { TExpense, TExpenseWithoutIdAndProtocolNumber } from "@/types/TExpense";
import axios from "axios";

export default async function postExpense(accessToken: string, body: TExpenseWithoutIdAndProtocolNumber): Promise<TExpense | null> {
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