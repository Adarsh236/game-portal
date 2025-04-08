import { UserLogin } from '@game-portal/types';
import { CssBaseline, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, UserState } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

import users from '@game-portal/constants/users.json';

import Head from 'next/head';
import { LoginForm } from '../components/login-form';

const LoginInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
  },
}));

export const UserLoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const brandId = useSelector((state: RootState) => state.brand.brandId);
  const content = useSelector((state: RootState) => state.brand.content);
  const [error, setError] = useState('');

  const handleLogin = ({ username, password }: UserLogin) => {
    setError('');
    const user = users?.find(
      (data) => data.username === username && data.password === password,
    );

    if (user) {
      dispatch(
        setUser({
          username: user.username,
          market: user.market,
          firstName: user.firstName,
          lastName: user.lastName,
          brandId,
        } as UserState),
      );
      router.push(`/${user.market}/casino`);
    } else {
      setError(content.loginPage.invalidCredentials);
    }
  };

  if (!content.loginPage) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{content.loginPage.headerTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main>
        <CssBaseline enableColorScheme />
        <LoginInContainer direction="column" justifyContent="space-between">
          <LoginForm
            handleLogin={handleLogin}
            error={error}
            content={content.loginPage}
          />
        </LoginInContainer>
      </main>
    </>
  );
};
