"use client"

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import NavBar from "@/components/Navbar/Navbar";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  if (!accessToken) return null;

  return (
    <>
      <NavBar />
      {children}
    </>
  )
}