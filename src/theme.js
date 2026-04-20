import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#22c55e",
      dark: "#16a34a"
    },
    background: {
      default: "#f5f7f9",
      paper: "#ffffff"
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280"
    }
  },

  shape: {
    borderRadius: 12
  },

  typography: {
    fontFamily: "Segoe UI, sans-serif",
    h6: {
      fontWeight: 700
    },
    subtitle1: {
      fontWeight: 600
    }
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "420px !important",
          margin: "0 auto"
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: "bold",
          padding: "12px"
        }
      }
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
        }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderRadius: 12
        }
      }
    }
  }
});

export default theme;