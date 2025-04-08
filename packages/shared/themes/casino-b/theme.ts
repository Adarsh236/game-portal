'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { getCssVariable } from '../../helpers/utils';

export const casinoBTheme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: getCssVariable('--primary-color', '#298190'),
    },
    secondary: {
      main: getCssVariable('--secondary-color', '#4edab9'),
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

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
