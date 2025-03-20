"use client"

import { StyledContainer } from "./styles";
import AddExpense from "@/components/Expense/AddExpense/AddExpense";

export default function Home() {
  return (
    <StyledContainer>
      <AddExpense />
    </StyledContainer>
  )
}
