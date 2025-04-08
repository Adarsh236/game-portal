'use client';
import { FEATURE_FLAGS } from '@game-portal/constants/brands';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/header';
import { getCookie } from '../helpers/cookies';
import { useContent } from '../hooks/useContent';
import { setBrand } from '../redux/slices/brand-slice';
import { addModal } from '../redux/slices/modal-slice';
import { clearUser, setUser, UserState } from '../redux/slices/user-slice';
import { RootState } from '../redux/store';

interface BrandLayoutProps {
  brandId: string;
  children: React.ReactNode;
}

const ModalQueue = dynamic(
  () => import('./modal-queue.js').then((mod) => mod.ModalQueue),
  {
    ssr: false,
    loading: () => <div>Loading notifications...</div>,
  },
);

export const BrandLayout: React.FC<BrandLayoutProps> = ({
  brandId,
  children,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { content, market } = useContent(brandId);
  const user = useSelector((state: RootState) => state.user);
  const brand = useSelector((state: RootState) => state.brand);

  useEffect(() => {
    // Retrieve cookies for username and userMarket
    const username = getCookie('username', brandId);
    const userMarket = getCookie('userMarket', brandId);
    const firstName = getCookie('firstName', brandId);
    const lastName = getCookie('lastName', brandId);

    if (username && userMarket) {
      dispatch(
        setUser({
          username,
          market: userMarket,
          firstName,
          lastName,
          brandId,
        } as UserState),
      );
    }
  }, [dispatch, brandId]);

  useEffect(() => {
    const featureFlags = FEATURE_FLAGS[brandId]?.[market as 'en' | 'ca'];
    document.documentElement.dataset.theme = brandId;
    if (content && brandId && featureFlags) {
      dispatch(
        setBrand({
          brandId,
          content,
          featureFlags,
        }),
      );
    }
  }, [dispatch, brandId, content, market]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(addModal(content.modal));
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch, content]);

  const onClickNavigate = (link: string) => {
    router.push(`/${market}${link}`);
  };

  const onClickToggle = (loggedOut: boolean) => {
    if (loggedOut) {
      dispatch(clearUser());
      window.location.reload();
    } else {
      router.push(`/${market}/login`);
    }
  };
  return (
    <>
      <Head>
        <title>{content.home.title}</title>
        <meta name="description" content={content.home.description} />
      </Head>
      <Header
        content={content.header}
        isLoggedIn={!!user.username}
        onClickNavigate={onClickNavigate}
        onClickToggle={onClickToggle}
      />
      <main style={{ padding: 'var(--space-xl)' }}>
        <h3>featureFlags</h3>
        <p>
          isLiveCasinoEnabled:{' '}
          {brand.featureFlags.isLiveCasinoEnabled ? 'YES' : 'NO'}
        </p>

        {children}
      </main>
      <ModalQueue />
    </>
  );
};
