// File: packages/design-system/src/createCustomTheme.ts
import { createTheme } from '@mui/material/styles';
import { getCssVariable } from '../helpers/utils';

export const casinoBTheme = createTheme({
  palette: {
    primary: {
      main: getCssVariable('--primary-color', '#ff927b'),
    },
    secondary: {
      main: getCssVariable('--secondary-color', '#b6a82d'),
    },
    background: {
      default: getCssVariable('--background-color', '#ffffff'),
    },
    error: {
      main: getCssVariable('--error-color', '#e00'),
    },
  },
  typography: {
    fontFamily: getCssVariable(
      '--font-family',
      "'Helvetica Neue', Helvetica, Arial, sans-serif",
    ),
    fontSize: Number(getCssVariable('--font-size', '16')),
  },
});
