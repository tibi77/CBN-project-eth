import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      dark: "#226daa",
      main: "#226daa",
      light: "#226daa",
    },
    secondary: {
      dark: "#2fbf99",
      main: "#2fbf99",
      light: "#2fbf99",
    },
    info: {
      main: "#fff",
    },
    background: {
      paper: "#ffffff",
      default: "#f5f5f5",
    },
    success: {
      main: "#29563b",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".customScrollbar": {
          scrollbarColor: "#4b3371",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#f5f5f5",
            width: 7,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#4b3371a1",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#f5f5f5",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#f5f5f5",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#4b3371cc",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        columnHeaders: {
          backgroundColor: "#f0f0f0",
        },
      },
    },
  },
});
