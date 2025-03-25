import { TFindAllExpensesPaginated } from "@/types/TFindAllExpensesPaginated";
import { TResponseFindAllPaginated } from "@/types/TResponseFindAll";
import axios from "axios";

export default async function findAllExpensesPaginated({
  accessToken,
  page,
}: TFindAllExpensesPaginated): Promise<TResponseFindAllPaginated | null> {
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