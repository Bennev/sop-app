import { TFindAllExpensesPaginated } from "@/types/TFindAllExpensesPaginated";
import { TResponseFindAllExpensesPaginated } from "@/types/TResponseFindAllExpensesPaginated";
import axios from "axios";

export default async function findAllExpensesPaginated({
  accessToken,
  page,
}: TFindAllExpensesPaginated): Promise<TResponseFindAllExpensesPaginated | null> {
  try {
    const { data } = await axios.get(
      'http://localhost:8080/expense',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          page,
        }
      }
    );

    return data;
  } catch {
    return null;
  }
}