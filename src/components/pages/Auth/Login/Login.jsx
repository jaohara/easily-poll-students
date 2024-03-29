import React, {
  useState,
} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext'

import "../Auth.scss";

import EpContainer from "../../../UI/EpContainer/EpContainer";
import EpLoading from '../../../UI/EpLoading/EpLoading'

import { useLocation } from 'react-router-dom';

export default function Login() {
  const [ loginSubmitted, setLoginSubmitted ] = useState(false);

  const location = useLocation();

  const Auth = React.useContext(AuthContext);

  const handleSubmit = async (event) => {
    const from = location.state ? location.state.from : null;
    //TODO: reset this if login goes bad
    setLoginSubmitted(true);
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    await Auth.login(data.get('email'), data.get('password'), from);
  }

  return (
    <div className="login-page">
      {
        loginSubmitted ? (
          <EpLoading 
            centered
            message="Logging in..."
            narrow 
          />
        ) : (
          <EpContainer narrow centered>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="/recover" variant="body2">
                      Forgot password?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </EpContainer>
        )
      }
    </div>
  )
}
