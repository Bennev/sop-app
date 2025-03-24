import axios from "axios";

export default async function findAllExpenses(accessToken: string) {
  try {
    const { data } = await axios.get(
      'http://localhost:8080/expense',
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