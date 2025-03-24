import { TExpense } from "@/types/TExpense";
import { TFindOneExpense } from "@/types/TFindOneExpense";
import axios from "axios";

export default async function findOneExpense({
  accessToken,
  id,
}: TFindOneExpense): Promise<TExpense | null> {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/expense/${id}`,
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