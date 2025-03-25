"use client"

import { ChangeEvent, useMemo, useState } from "react";
import { CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import { StyledButton, StyledContainer, StyledFooter, StyledLink, StyledTextFields, StyledTitle } from "../styles";
import { TLogin } from "@/types/TLogin";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import postLogin from "@/services/auth/postLogin";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authActions } from "@/redux/features/authSlice";

export default function Home() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState<TLogin>({
    login: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuth((prev) => ({ ...prev, [name]: value }));
  }

  const handleLogin = async () => {
    try {
      const response = await postLogin({ login: auth.login, password: auth.password })
      if (!response) {
        enqueueSnackbar('Usuário e/ou senha inválidos', { variant: 'error' });
        return;
      }
      dispatch(authActions.login({
        accessToken: response.token,
        name: response.name,
        login: response.login,
      }))
      router.push('/expenses');
    } catch {
      enqueueSnackbar('Erro ao realizar login', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  const isDisable = useMemo(() => {
    return !auth.login || !auth.password || isLoading;
  }, [auth, isLoading]);

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
        onClick={() => handleLogin()}
        disabled={isDisable}
      >
        {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Entrar'}
      </StyledButton>
      <StyledFooter>
        Não tem conta?
        <StyledLink href='/register'>Criar conta</StyledLink>
      </StyledFooter>
    </StyledContainer>
  )
}
