import React, { useState } from "react";
import { useRouter } from "next/router";
import { setUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { User, UserLogin } from "@game-portal/types";
import { styled } from "@mui/material/styles";
import { CssBaseline, Stack } from "@mui/material";

import users from "@game-portal/constants/brands/casino-b/users.json";

import { LoginForm } from "../components/login-form";
import Head from "next/head";
import { useContent } from "../hooks/useContent";

interface UserLoginPageProps {
  brandId: string;
}

const LoginInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export const UserLoginPage: React.FC<UserLoginPageProps> = ({ brandId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { content, market } = useContent(brandId);

  const [error, setError] = useState("");

  const handleLogin = ({ username, password }: UserLogin) => {
    setError("");
    const user = users?.find(
      (data) => data.username === username && data.password === password
    );

    if (user) {
      dispatch(
        setUser({
          username: user.username,
          market: user.market,
          firstName: user.firstName,
          lastName: user.lastName,
        } as User)
      );
      router.push(`/${user.market}/casino`);
    } else {
      setError(content.loginPage.invalidCredentials);
    }
  };

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
