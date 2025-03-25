/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import NavBar from "@/components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { StyledPage } from "./styles";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken]);

  if (!accessToken) return null;

  return (
    <>
      <NavBar />
      <StyledPage>
        {children}
      </StyledPage>
    </>
  )
}