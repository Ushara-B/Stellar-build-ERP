import React from 'react';
import { Avatar, Box, Typography, Divider, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const UserProfile = ({ user }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        p: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{
            width: 120,
            height: 120,
            mr: 4,
          }}
        />
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body1" component="p" color="text.secondary">
            {user.role}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <EmailIcon sx={{ color: '#535C91', mr: 1 }} />
            <Typography variant="body1" component="p">
              {user.email}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <PhoneIcon sx={{ color: '#535C91', mr: 1 }} />
            <Typography variant="body1" component="p">
              {user.phone}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LocationOnIcon sx={{ color: '#535C91', mr: 1 }} />
            <Typography variant="body1" component="p">
              {user.address}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;