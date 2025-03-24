"use client"
import styled from "styled-components";

export const StyledContainer = styled.div`
  margin: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 20px;
`;

export const StyledSection = styled.section`
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: #FFFFFF;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  border-radius: 8px;
`;

export const StyledTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

export const StyledSpan = styled.span`
  color: #00501b;
`;

export const StyledSubTitle = styled.h1`
  margin: 0;
  font-size: 1rem;
  color: black;
`;