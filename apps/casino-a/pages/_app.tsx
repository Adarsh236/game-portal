'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { BrandLayout } from '@game-portal/shared/modules/brand-layout';

import '@game-portal/shared/themes/casino-a.css';
import '../app/globals.css';

import { BRANDS } from '@game-portal/constants/brands';
import { store } from '@game-portal/shared/redux/store';
import { casinoATheme } from '@game-portal/shared/themes/casino-a-theme';
import { ThemeProvider } from '@mui/material/styles';

const queryClient = new QueryClient();

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={casinoATheme}>
          <BrandLayout brandId={BRANDS.CASINO_B}>
            <Component {...pageProps} />
          </BrandLayout>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
