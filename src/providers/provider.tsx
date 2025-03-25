"use client";

import { createRef, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { muiTheme } from "@/assets/styles/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Provider } from "react-redux";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import StyledJsxRegistry from "@/providers/registry";
import GlobalStyle from "@/assets/styles/global";
import { store } from "@/redux/store";
import { ptBR } from "date-fns/locale";

const theme = createTheme(muiTheme);
const snackbarProviderRef = createRef<SnackbarProvider>();

const handleDismissSnackbar = (key: SnackbarKey) =>
  snackbarProviderRef?.current?.closeSnackbar(key);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <StyledJsxRegistry>
            <GlobalStyle />
            <SnackbarProvider
              preventDuplicate
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              maxSnack={3}
              ref={snackbarProviderRef}
              action={(key: SnackbarKey) => (
                <IconButton onClick={() => handleDismissSnackbar(key)}>
                  <Close style={{ color: "#FFFFFF" }} />
                </IconButton>
              )}
            >
              {children}
            </SnackbarProvider>
          </StyledJsxRegistry>
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  );
}
