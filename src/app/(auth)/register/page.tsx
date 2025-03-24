"use client"

import { ChangeEvent, useMemo, useState } from "react";
import { Alert, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import { StyledLink, StyledButton, StyledContainer, StyledFooter, StyledTextFields, StyledTitle } from "../styles";
import { TRegister } from "@/types/TRegister";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import postRegister from "@/services/auth/postRegister";
import { useRouter } from "next/navigation";
import { TShowPassword } from "@/types/TShowPassword";

export default function Register() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [register, setRegister] = useState<TRegister>({
    name: "",
    login: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState<TShowPassword>({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickShowPassword = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  }

  const handleRegister = async () => {
      if (!register.login.includes('@')) {
        enqueueSnackbar('Email inválido', { variant: 'error' });
        return;
      }
      try {
        const response = await postRegister({
          name: register.name,
          login: register.login,
          password: register.password,
          enqueueSnackbar,
        })
        if (!response) return;
        enqueueSnackbar('Cadastro realizado com sucesso', { variant: 'success' });
        router.push('/');
      } catch {
        enqueueSnackbar('Erro ao realizar login', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    }

  const isValidPassword = useMemo(() => {
    if (!register.password || !register.confirmPassword) {
      return true;
    }
    return register.password === register.confirmPassword;
  }, [register.password, register.confirmPassword]);

  const isDisable = useMemo(() => {
    return !register.name ||
    !register.login ||
    !register.password ||
    !register.confirmPassword ||
    !isValidPassword ||
    isLoading;
  }, [register, isValidPassword, isLoading]);

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
        onClick={() => handleRegister()}
        disabled={isDisable}
      >
        {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Criar conta'}
      </StyledButton>
      <StyledFooter>
        Ja tem uma conta?
        <StyledLink href='/'>Entrar</StyledLink>
      </StyledFooter>
    </StyledContainer>
  )
}