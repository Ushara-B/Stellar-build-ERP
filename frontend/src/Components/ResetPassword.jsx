import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState(''); // New state for debugging information

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/reset-password', { token, password });
      setMessage(response.data.message);
      setError('');
      setDebugInfo(''); // Clear debugging information on success

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);

      // Extract detailed error information
      const errorMessage = err.response?.data?.message || 'Unknown error occurred.';
      const errorStatus = err.response?.status || 'No status code received.';
      const errorDetails = err.message || 'No additional error details.';

      setError('Error: Unable to reset password.');
      setMessage('');

      // Populate debugInfo with detailed error information
      setDebugInfo(
        `Debug Info:
        Status: ${errorStatus}
        Error Message: ${errorMessage}
        Details: ${errorDetails}`
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: '#535C91', marginBottom: 2 }}>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Enter new password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#535C91' }}
          >
            Reset Password
          </Button>
        </form>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        {debugInfo && (
          <Alert severity="info" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
            {debugInfo}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default ResetPassword;
