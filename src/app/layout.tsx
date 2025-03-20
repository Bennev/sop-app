"use client"
import { Lexend } from "next/font/google";
import StyledJsxRegistry from "./registry";
import GlobalStyle from '@/assets/styles/global'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import NavBar from "@/components/Navbar/Navbar";

const lexend = Lexend({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="shortcut icon" href="/vercel.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <title>Sistema de Despesas</title>
      </head>
      <body className={lexend.className}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StyledJsxRegistry>
            <GlobalStyle />
            <NavBar />
            {children}
          </StyledJsxRegistry>
        </LocalizationProvider>
      </body>
    </html>
  );
}
