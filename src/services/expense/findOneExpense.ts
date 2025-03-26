import { TExpense } from "@/types/TExpense";
import { TFindOneExpense } from "@/types/TFindOneExpense";
import axios from "axios";

export default async function findOneExpense({
  accessToken,
  id,
}: TFindOneExpense): Promise<TExpense | null> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/expense/${id}`,
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