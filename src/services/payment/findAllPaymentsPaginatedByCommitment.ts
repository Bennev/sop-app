import { TResponseFindAllPaginated } from "@/types/TResponseFindAll";
import axios from "axios";

export default async function findAllPaymentsPaginatedByCommitment(
  accessToken: string,
  commitmentId: number,
  page: number,
): Promise<TResponseFindAllPaginated | null> {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/payment/commitment/${commitmentId}`,
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