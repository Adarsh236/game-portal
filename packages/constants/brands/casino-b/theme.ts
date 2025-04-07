"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  cssVariables: true,
});

export const themeUITheme = {
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  colors: {
    primary: "#0020f3",
    secondary: "#1A1A1A",
    background: "#ffffff",
    error: "#e00",
  },
};
