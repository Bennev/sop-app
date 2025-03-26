import { TFindAllExpensesPaginated } from "@/types/TFindAllExpensesPaginated";
import { TResponseFindAllPaginated } from "@/types/TResponseFindAll";
import axios from "axios";

export default async function findAllExpensesPaginated({
  accessToken,
  page,
}: TFindAllExpensesPaginated): Promise<TResponseFindAllPaginated | null> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/expense`,
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