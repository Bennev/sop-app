"use client"

import { StyledAppBar, StyledAppBarContainer, StyledButton } from "./styles";
import { Home, Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { authActions } from "@/redux/features/authSlice";
import { useRouter, usePathname } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => {
      dispatch(authActions.logout());
      router.push("/");
    };

  return (
    <StyledAppBar>
      <StyledAppBarContainer between={path !== '/expenses'}>
        {path !== '/expenses' && (
          <StyledButton
            variant="contained"
            color="warning"
            startIcon={<Home />}
            onClick={() => router.push("/expenses")}
          >
            Início
          </StyledButton>
        )}
        <StyledButton
          variant="contained"
          color="warning"
          startIcon={<Logout />}
          onClick={() => handleLogout()}
        >
          Sair
        </StyledButton>
      </StyledAppBarContainer>
    </StyledAppBar>
  )
}
export default NavBar;