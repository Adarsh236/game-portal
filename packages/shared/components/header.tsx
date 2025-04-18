'use client';
import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AdbIcon from '@mui/icons-material/Adb';

interface HeaderProps {
  content: any;
  isLoggedIn: boolean;
  onClickNavigate: (link: string) => void;
  onClickToggle: (loggedOut: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  content,
  isLoggedIn,
  onClickNavigate,
  onClickToggle,
}) => {
  return (
    <AppBar
      position="static"
      sx={[
        (theme) => ({
          backgroundColor: theme.palette.primary.main,
        }),
      ]}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'var(--on-secondary)',
              textDecoration: 'none',
            }}
          >
            {content.title}
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'center',
            }}
          >
            {content.pages.map(
              ({ title, link, isLoggedIn: _isLoggedIn }: any) => {
                if (_isLoggedIn && !isLoggedIn) return null;
                return (
                  <Button
                    key={title}
                    onClick={() => onClickNavigate(link)}
                    sx={{
                      my: 2,
                      color: 'var(--on-secondary)',
                      display: 'block',
                    }}
                  >
                    {title}
                  </Button>
                );
              },
            )}
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', sm: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'var(--on-secondary)',
              textDecoration: 'none',
            }}
          >
            {content.title}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {!isLoggedIn ? (
              <Button
                onClick={() => onClickToggle(false)}
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--on-secondary)',
                }}
                color="primary"
              >
                {content.buttons.login.text}
              </Button>
            ) : (
              <Button
                onClick={() => onClickToggle(true)}
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--on-secondary)',
                }}
              >
                {content.buttons.logout.text}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
