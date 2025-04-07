'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { BrandLayout } from '@game-portal/shared/modules/brand-layout';

import '../app/globals.css';

import { BRANDS } from '@game-portal/constants/brands';
import { store } from '@game-portal/shared/redux/store';

const queryClient = new QueryClient();

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrandLayout brandId={BRANDS.CASINO_B}>
          <Component {...pageProps} />
        </BrandLayout>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
