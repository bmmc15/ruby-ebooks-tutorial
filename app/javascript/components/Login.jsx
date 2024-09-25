import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ApiClient } from "../services";
import "./styles/Login.css";
import { validateEmail, validatePassword } from "../utils/validators";

const Login = () => {
  const navigate = useNavigate();

  const resolver = (values) => {
    const errors = {};

    const emailError = validateEmail(values.email);
    if (emailError) {
      errors.email = emailError;
    }
    const passwordError = validatePassword(values.password);
    if (passwordError) {
      errors.password = passwordError;
    }

    return {
      values: Object.keys(errors).length === 0 ? values : {},
      errors,
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver })

  const { mutate: login, isLoading } = useMutation(ApiClient.login, {
    onSuccess: (data) => {
      console.log("Login successful")
      navigate('/');
    },
    onError: (error) => {
      console.error("Login failed:", error);
      alert("login failed");
      navigate('/login');
    },
  });

  const onFormSubmit = handleSubmit(async (data) => {

    console.log("handleSubmit(async (data) => {", data)
    const { email, password } = data;

    await login({
      email,
      password,
    });
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={onFormSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={!!errors?.email}
            helperText={errors?.email?.message || ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
            error={!!errors?.password}
            helperText={errors?.password?.message || ""}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href={'#'} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={'/signup'} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
