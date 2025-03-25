import { TCommitmentOrPayment } from "@/types/TCommitmentOrPayment";
import axios from "axios";

export default async function findOneCommitment(
  accessToken: string,
  id: number,
): Promise<TCommitmentOrPayment | null> {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/commitment/${id}`,
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