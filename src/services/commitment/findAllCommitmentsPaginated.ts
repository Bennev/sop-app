import { TResponseFindAllPaginated } from "@/types/TResponseFindAll";
import axios from "axios";

export default async function findAllCommitmentsPaginatedByExpense(
  accessToken: string,
  expenseId: number,
  page: number,
): Promise<TResponseFindAllPaginated | null> {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/commitment/expense/${expenseId}`,
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