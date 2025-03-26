import { TCommitmentOrPayment } from "@/types/TCommitmentOrPayment";
import axios from "axios";

export default async function findOneCommitment(
  accessToken: string,
  id: number,
): Promise<TCommitmentOrPayment | null> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/commitment/${id}`,
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