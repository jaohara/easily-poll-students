import * as React from "react";
import { Auth, API } from "aws-amplify";
import * as mutations from "../../../graphql/mutations";

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
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Navbar from "../../../components/Navbar/Navbar";

import EpCopyright from "../../UI/EpCopyright/EpCopyright";

// const theme = createTheme();

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signUp(
      data.get("email"),
      data.get("password"),
      data.get("firstName"),
      data.get("lastName")
    );
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      {/* <Navbar /> */}
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
        <EpCopyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}

async function signUp(username, password, firstName, lastName) {
  await Auth.signUp({
    username,
    password,
    attributes: {
      email: username, // optional
      // other custom attributes
    },
    autoSignIn: {
      // optional - enables auto sign in after user is confirmed
      enabled: true,
    },
  })
    .then(async (res) => {
      console.log("Auth: creating user success");
      await API.graphql({
        query: mutations.createUser,
        variables: {
          input: {
            id: res.username,
            name_first: firstName,
            name_last: lastName,
            email: username,
          },
        },
      })
        .then(() => {
          console.log("Registration: dynamodb input success");
        })
        .catch(async (err) => {
          console.log("Registration: dynamodb failure, attempt deleting user");
          console.log(err);
          await Auth.deleteUser()
            .then(() => {
              console.log("Registration: deleting user successful");
            })
            .catch((err) => {
              console.log("Registration: deleting user unsuccessful");
              console.log(err);
            });
        });
    })
    .catch((err) => {
      console.log("Auth: creating user failure");
      console.log(err);
    });
}
