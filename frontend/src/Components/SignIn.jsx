import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginimg from '../Assets/loginimg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      usernameOrEmail: data.get('usernameOrEmail'),
      password: data.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:5000/users/login', credentials);

      if (response.status === 200) {
        // Credentials are valid, redirect to the dashboard
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          component={Paper}
          elevation={6}
          square
          sx={{ backgroundColor: '#535C91', maxWidth: '480px' }}
        >
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" color={'white'}>
              Sign In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 20, maxWidth: 400 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usernameOrEmail"
                label="Email / Username"
                name="usernameOrEmail"
                autoComplete="email"
                autoFocus
                sx={{
                  borderRadius: '21px',
                  backgroundColor: 'white',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '21px',
                    backgroundColor: 'white',
                    height: '50px',
                  },
                }}
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
                sx={{
                  borderRadius: '21px',
                  backgroundColor: 'white',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '21px',
                    backgroundColor: 'white',
                    height: '50px',
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 7,
                  mb: 2,
                  height: '50px',
                  borderRadius: '21px',
                  backgroundColor: '#1B1A55 ',
                }}
              >
                Sign In
              </Button>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox value="remember" sx={{ color: '#1B1A55', '&.Mui-checked': { color: '#1B1A55' } }} />}
                    label={<Typography variant="body2" sx={{ color: '#1B1A55' }}>Remember me</Typography>}
                  />
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" sx={{ color: '#1B1A55' }}>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={6}
          md={8}
          sx={{
            backgroundImage: `url(${loginimg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}