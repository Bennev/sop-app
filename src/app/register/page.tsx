"use client"

import { ChangeEvent, useMemo, useState } from "react";
import { Alert, IconButton, InputAdornment, TextField } from "@mui/material";
import { StyledLink, StyledButton, StyledContainer, StyledFooter, StyledTextFields, StyledTitle } from "../styles";
import { TRegister } from "@/types/TRegister";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register() {
  const [register, setRegister] = useState<TRegister>({
    name: "",
    login: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleClickShowPassword = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  }

  const isValidPassword = useMemo(() => {
    if (!register.password || !register.confirmPassword) {
      return true;
    }
    return register.password === register.confirmPassword;
  }, [register.password, register.confirmPassword]);

  const isDisable = useMemo(() => {
    return !register.name || !register.login || !register.password || !register.confirmPassword || !isValidPassword;
  }, [register, isValidPassword]);

  return (
    <StyledContainer>
      <StyledTitle>Registre-se</StyledTitle>
      <StyledTextFields>
      <TextField
          name="name"
          type="text"
          label="Nome"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="login"
          type="email"
          label="Email"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="password"
          type={showPassword.password ? 'text' : 'password'}
          label="Senha"
          variant="outlined"
          onChange={(e) => handleChange(e)}
          slotProps={{ input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleClickShowPassword('password')}
                >
                  {showPassword.password ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
                </IconButton>
              </InputAdornment>
            )
          }}}
        />
        <TextField
          name="confirmPassword"
          type={showPassword.confirmPassword ? 'text' : 'password'}
          label="Confirme a senha"
          variant="outlined"
          onChange={(e) => handleChange(e)}
          slotProps={{ input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleClickShowPassword('confirmPassword')}
                >
                  {showPassword.confirmPassword ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
                </IconButton>
              </InputAdornment>
            )
          }}}
        />
        {!isValidPassword && (
          <Alert severity="error" variant="standard">As senhas devem se corresponder</Alert>
        )}
      </StyledTextFields>
      <StyledButton
        variant="contained"
        onClick={() => {}}
        disabled={isDisable}
      >
        Criar conta
      </StyledButton>
      <StyledFooter>
        Ja tem uma conta?
        <StyledLink href='/'>Entrar</StyledLink>
      </StyledFooter>
    </StyledContainer>
  )
}