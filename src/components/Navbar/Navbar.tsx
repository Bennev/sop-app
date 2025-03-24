"use client"

import { AppBar } from "@mui/material";
import { StyledAppBarContainer, StyledButton } from "./styles";
import { Home, Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
      dispatch(logout());
      router.push("/");
    };

  return (
    <AppBar position="static">
      <StyledAppBarContainer>
        <StyledButton
          variant="outlined"
          color="inherit"
          startIcon={<Home />}
          onClick={() => router.push("/expenses")}
        >
          Início
        </StyledButton>
        <StyledButton
          variant="outlined"
          color="inherit"
          startIcon={<Logout />}
          onClick={() => handleLogout()}
        >
          Sair
        </StyledButton>
      </StyledAppBarContainer>
    </AppBar>
  )
}
export default NavBar;