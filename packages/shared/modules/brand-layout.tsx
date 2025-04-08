'use client';
import { FEATURE_FLAGS } from '@game-portal/constants/brands';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/header';
import { getCookie } from '../helpers/utils';
import { useContent } from '../hooks/useContent';
import { setBrand } from '../redux/slices/brandSlice';
import { addModal } from '../redux/slices/modalSlice';
import { clearUser, setUser, UserState } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

interface BrandLayoutProps {
  brandId: string;
  children: React.ReactNode;
}

const ModalQueue = dynamic(
  () => import('@game-portal/shared/modules/modal-queue'),
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

  useEffect(() => {
    // Retrieve cookies for username and userMarket
    const username = getCookie('username');
    const userMarket = getCookie('userMarket');
    const firstName = getCookie('firstName');
    const lastName = getCookie('lastName');

    if (username && userMarket) {
      dispatch(
        setUser({
          username,
          market: userMarket,
          firstName,
          lastName,
        } as UserState),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    const featureFlags = FEATURE_FLAGS[brandId].en;
    if (content && brandId && featureFlags) {
      dispatch(
        setBrand({
          brandId,
          content,
          featureFlags,
        }),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(addModal(content.modal));
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch]);

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
      <main style={{ padding: 'var(--space-xl)' }}>{children}</main>
      <ModalQueue />
    </>
  );
};
