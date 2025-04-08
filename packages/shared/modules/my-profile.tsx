import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../helpers/utils';
import { setUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

export const MyProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // Initialize first and last names from Redux or cookie.
  const username = user.username || getCookie('username') || '';
  const userMarket = user.market || getCookie('userMarket') || null;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFirstName(user.firstName || getCookie('firstName') || '');
    setLastName(user.lastName || getCookie('lastName') || '');
  }, [user.firstName, user.lastName]);

  const handleEdit = () => {
    setIsEditing(true);
    setMessage('');
  };

  const handleCancel = () => {
    setFirstName(user.firstName || getCookie('firstName') || '');
    setLastName(user.lastName || getCookie('lastName') || '');
    setIsEditing(false);
    setMessage('');
  };

  // Save profile updates.
  const handleSave = () => {
    if (!firstName || !lastName) {
      setMessage('Please fill in both first and last names.');
      return;
    }
    dispatch(setUser({ username, market: userMarket, firstName, lastName }));
    setMessage('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <>
      <Head>
        <title>My Profile</title>
        <meta name="description" content="Customize your profile settings." />
      </Head>
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            p: 4,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Profile Settings
          </Typography>
          <Box component="form" sx={{ mt: 3 }} noValidate>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              disabled={!isEditing}
            />
            {message && (
              <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
            <Grid container spacing={2} sx={{ mt: 3 }}>
              {isEditing ? (
                <>
                  <Grid>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      type="button"
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
