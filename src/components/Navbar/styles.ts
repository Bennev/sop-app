import styled from "styled-components";
import { AppBar, Button } from "@mui/material";

export const StyledAppBar = styled(AppBar)`
  position: fixed;
  top: 0;
  left: 0;
`;

export const StyledAppBarContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .MuiButton-root {
    text-transform: none;
  }
`;

export const StyledButton = styled(Button)`
  height: 40px;
`;