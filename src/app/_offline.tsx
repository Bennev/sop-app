"use client";

import {
  StyledContainer,
  StyledPage,
  StyledSubtitle,
  StyledTitle,
} from "./(auth)/styles";

export default function Offline() {
  return (
    <StyledPage>
      <StyledContainer>
        <StyledTitle>OFFLINE</StyledTitle>
        <StyledSubtitle>
          Desculpe, mas é preciso estar conectado à internet para utilizar essa
          aplicação.
        </StyledSubtitle>
      </StyledContainer>
    </StyledPage>
  );
}
