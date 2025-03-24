import { Lexend } from "next/font/google";
import { StyledMain } from "./styles";
import { Providers } from "@/providers/provider";
import { ReactNode } from "react";

const lexend = Lexend({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
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
        <Providers>
          <StyledMain>
            {children}
          </StyledMain>
        </Providers>
      </body>
    </html>
  );
}