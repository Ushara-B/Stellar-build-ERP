import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, createTheme, ThemeProvider
} from '@mui/material';
import loginimg from '../Assets/loginimg.png';

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext); // Destructure loginUser from context
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: '',
  });

  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem('credentials'));
    if (savedCredentials) {
      setCredentials(savedCredentials);
      setRememberMe(true);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/users/login', credentials);

      if (response.status === 200) {
        const { user, token } = response.data;

        // Store the JWT token in localStorage
        localStorage.setItem('token', token);

        const userDetails = {
          username: user.user_N,
          id: user._id,
          role: user.role,
          email: user.email,
        };

        // Set the user state with the logged-in user's data using context
        loginUser(userDetails);

        if (rememberMe) {
          localStorage.setItem('credentials', JSON.stringify(credentials));
        } else {
          localStorage.removeItem('credentials');
        }

        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response) {
        setError(error.response.data.error || 'An error occurred while logging in. Please try again.');
      } else if (error.request) {
        setError('No response received from the server. Please check your internet connection.');
      } else {
        setError('An error occurred while logging in. Please try again.');
      }
    } finally {
      setLoading(false);
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
                value={credentials.usernameOrEmail}
                onChange={handleChange}
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
                value={credentials.password}
                onChange={handleChange}
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
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                        value="remember"
                        sx={{ color: '#1B1A55', '&.Mui-checked': { color: '#1B1A55' } }}
                      />
                    }
                    label={<Typography variant="body2" sx={{ color: '#1B1A55' }}>Remember me</Typography>}
                  />
                </Grid>
                <Grid item>
                  <Link href="/forgot-password" variant="body2" sx={{ color: '#1B1A55' }}>
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
