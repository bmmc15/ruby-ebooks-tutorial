import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { ApiClient } from "../services";
import {
  validateEmail,
  validateRequiredField,
  validatePassword,
} from "../utils/validators";

const resolver = async (values) => {
  const errors = {};

  const { username } = values;

  const usernameError = validateRequiredField(username, "Username");
  if (usernameError) {
    errors.username = usernameError;
  }

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

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const { mutate, isLoading } = useMutation(ApiClient.registerUser, {
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.token);
      navigate("/");
    },
    onError: (error) => {
      console.error("Sign-up failed:", error);
      alert("SignUp failed");
      navigate("/signup");
    },
  });

  const onFormSubmit = handleSubmit(async (data) => {
    const { username, email, password } = data;
    console.log(`email ${email}, password ${password}`);
    await mutate({ username: `${username}`, email, password });
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={onFormSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                {...register("username")}
                error={!!errors?.username}
                helperText={errors?.username?.message || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register("email")}
                error={!!errors?.email}
                helperText={errors?.email?.message || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password")}
                error={!!errors?.password}
                helperText={errors?.password?.message || ""}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
