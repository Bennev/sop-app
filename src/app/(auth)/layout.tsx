"use client"

import { ReactNode } from "react";
import { StyledPage } from "./styles";


export default function PublicRoute({ children }: { children: ReactNode }) {
  return (
    <StyledPage>
      {children}
    </StyledPage>
  )
}