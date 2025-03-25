"use client"
import { useRouter } from "next/navigation";
import { StyledButton, StyledContainer, StyledPage, StyledSubtitle, StyledTitle } from "./(auth)/styles";

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  }

  return (
    <StyledPage>
      <StyledContainer>
        <StyledTitle>Página não encontrada</StyledTitle>
        <StyledSubtitle>
          Desculpe, a página que você está tentando acessar não existe.
        </StyledSubtitle>
        <StyledButton
          variant="contained"
          onClick={() => handleBack()}
        >
          Ir para o Login
        </StyledButton>
      </StyledContainer>
    </StyledPage>
  )
}