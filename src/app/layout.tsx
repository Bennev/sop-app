import { Lexend } from "next/font/google";
import { Providers } from "@/providers/provider";
import { ReactNode } from "react";
import { StyledMain } from "./styles";

const lexend = Lexend({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <title>Sistema de Despesas</title>
      </head>
      <body className={lexend.className}>
        <Providers>
          <StyledMain>{children}</StyledMain>
        </Providers>
      </body>
    </html>
  );
}
