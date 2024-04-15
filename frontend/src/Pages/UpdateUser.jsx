import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  // Create a custom theme with a dark blue primary color
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1B1A55',
        contrastText: '#fff',
      },
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        // Exclude '_id' and '__v' fields from the user object
        const { _id, __v, ...updatableUser } = response.data.user;
        setUser(updatableUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${id}`, user);
      navigate('/allusers');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '80%',
            maxWidth: 800,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Update User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {Object.keys(user).map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                  {/* Exclude '_id' and '__v' fields from the form */}
                  {key !== '_id' && key !== '__v' && (
                    <TextField
                      label={key}
                      name={key}
                      value={user[key] || ''}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                </Grid>
              ))}
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} align="right">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 7,
                    mb: 2,
                    height: '50px',
                    width : '150px',
                    borderRadius: '21px',
                    backgroundColor: '#1B1A55',
                    '&:hover': {
                      backgroundColor: '#16155d',
                    },
                  }}
                >
                  Update User
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default UpdateUser;