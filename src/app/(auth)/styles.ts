"use client"
import { Button } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 500px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;

  background-color: #FFFFFF;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  border-radius: 8px;

  .MuiButton-root {
    text-transform: none;
  }
`;

export const StyledTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #00501b;
`;

export const StyledTextFields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
`;

export const StyledFooter = styled.h2`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 14px;
  font-weight: 400;
`;

export const StyledLink = styled(Link)`
  color: #00bd19;
  text-decoration: none;

  &:hover{
    text-decoration: underline;
  }
`;