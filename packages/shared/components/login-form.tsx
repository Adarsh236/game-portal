import React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { UserLogin } from "@game-portal/types";

interface LoginFormProps {
  handleLogin: (data: UserLogin) => void;
  error: string;
  content: any;
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export function LoginForm({ error, handleLogin, content }: LoginFormProps) {
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const handleSubmit = () => {
    const { isValid, username, password } = validateInputs();

    if (!isValid) {
      return;
    }

    handleLogin({
      username,
      password,
    });
  };

  const validateInputs = () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!username.value || username.value.length < 4) {
      setUsernameError(true);
      setUsernameErrorMessage(content.usernameError);
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage(content.passwordError);
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return { isValid, username: username.value, password: password.value };
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        {content.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="username">{content.userName}</FormLabel>
          <TextField
            error={usernameError}
            helperText={usernameErrorMessage}
            id="username"
            type="username"
            name="username"
            placeholder="jackson"
            autoComplete="username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={usernameError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">{content.password}</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>

        {error && (
          <Typography
            variant="h4"
            style={{
              width: "100%",
              fontSize: "1rem",
              color: "red",
              textAlign: "center",
            }}
          >
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => handleSubmit()}
        >
          {content.button}
        </Button>
      </Box>
    </Card>
  );
}
