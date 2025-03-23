"use client"

import { ChangeEvent, useMemo, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { StyledButton, StyledContainer, StyledFooter, StyledLink, StyledTextFields, StyledTitle } from "./styles";
import { TLogin } from "@/types/TLogin";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Home() {
  const [login, setLogin] = useState<TLogin>({
    login: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  }

  const isDisable = useMemo(() => {
      return !login.login || !login.password;
    }, [login]);

  return (
    <StyledContainer>
      <StyledTitle>Bem Vindo</StyledTitle>
      <StyledTextFields>
        <TextField
          name="login"
          type="email"
          label="Email"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Senha"
          variant="outlined"
          onChange={(e) => handleChange(e)}
          slotProps={{ input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
                </IconButton>
              </InputAdornment>
            )
          }}}
        />
      </StyledTextFields>
      <StyledButton
        variant="contained"
        onClick={() => {}}
        disabled={isDisable}
      >
        Entrar
      </StyledButton>
      <StyledFooter>
        Não tem conta?
        <StyledLink href='/register'>Criar conta</StyledLink>
      </StyledFooter>
    </StyledContainer>
  )
}
