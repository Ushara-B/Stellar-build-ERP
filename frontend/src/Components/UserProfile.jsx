import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { Typography, Box, Grid, IconButton, TextField, Button, CircularProgress, InputAdornment, Avatar, Paper } from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import axios from 'axios';

const labelMap = {
  user_N: 'Username',
  f_Name: 'First Name',
  l_Name: 'Last Name',
  age: 'Age',
  email: 'Email',
  address: 'Address',
  dob: 'Date of Birth',
  pswrd: 'Password', // Exclude from display
  gender: 'Gender',
  m_Status: 'Marital Status',
  nic: 'NIC',
  role: 'Role',
  contact_No: 'Contact Number',
  f_contactNo: 'Family Contact Number',
  bank_D: 'Bank Details',
};

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    if (user && user.id) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/users/${user.id}`);
          setUserDetails(response.data.user);
          setUpdatedUser(response.data.user);
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleCancelClick = () => {
    setEditField(null);
    setUpdatedUser(userDetails);
  };

  const handleSaveClick = async (field) => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
      setUserDetails(response.data.user);
      setEditField(null);
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error updating user: ${error.response.data.message}`);
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!userDetails) {
    return <Typography variant="h6">No user logged in</Typography>;
  }

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <Avatar alt={userDetails.username} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100, marginRight: 4 }} />
          <Typography variant="h4" gutterBottom>{userDetails.username}</Typography>
        </Box>
        <Grid container spacing={2}>
          {Object.entries(userDetails).map(([key, value]) => {
            if (key === 'id' || key === 'pswrd' || key === '_id' || key === '__v') return null; // Exclude _id and __v
            const labelName = labelMap[key] || key.replace(/_/g, ' '); // Use label from labelMap or replace underscores with spaces
            return (
              <Grid item xs={12} sm={6} key={key}>
                {editField === key ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      label={labelName}
                      name={key}
                      value={updatedUser[key]}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => handleSaveClick(key)}>
                              <Save />
                            </IconButton>
                            <IconButton onClick={handleCancelClick}>
                              <Cancel />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                      <strong>{labelName.toUpperCase()}:</strong> {value}
                    </Typography>
                    <IconButton onClick={() => handleEditClick(key)}>
                      <Edit />
                    </IconButton>
                  </Box>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserProfile;