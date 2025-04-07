import React from 'react';

import {
  ThemeProvider as MUIThemeProvider,
  THEME_ID,
} from '@mui/material/styles';

export const ThemeProvider = (props: any) => {
  const { children, theme, font } = props;
  return (
    <MUIThemeProvider theme={{ [THEME_ID]: theme }}>
      <main className={font}>{children} </main>
    </MUIThemeProvider>
  );
};
