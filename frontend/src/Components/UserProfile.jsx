// UserProfile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, Grid, CircularProgress, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setUpdatedUser({ ...updatedUser, dob: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
      console.log('User updated successfully:', response.data.user);
      setUserDetails(response.data.user);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error updating user: ${error.response.data.message}`);
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!userDetails) {
    return <Typography variant="h6">No user logged in</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">User Profile</Typography>
      {editMode ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '80%', maxWidth: 800, padding: 4, bgcolor: 'background.paper', boxShadow: 3, margin: 'auto' }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Username"
                name="user_N"
                value={updatedUser.user_N}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="f_Name"
                value={updatedUser.f_Name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="l_Name"
                value={updatedUser.l_Name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Age"
                name="age"
                value={updatedUser.age}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                name="pswrd"
                value={updatedUser.pswrd}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                name="address"
                value={updatedUser.address}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={updatedUser.dob}
                onChange={handleDateChange}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  placeholder: 'mm/dd/yyyy',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  value={updatedUser.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="m-status-label">Marital Status</InputLabel>
                <Select
                  labelId="m-status-label"
                  name="m_Status"
                  value={updatedUser.m_Status}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Marital Status</MenuItem>
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="divorced">Divorced</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="NIC"
                name="nic"
                value={updatedUser.nic}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={updatedUser.role}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="employer">Employer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contact Number"
                name="contact_No"
                value={updatedUser.contact_No}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Family Contact No"
                name="f_contactNo"
                value={updatedUser.f_contactNo}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Bank Details"
                name="bank_D"
                value={updatedUser.bank_D}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 7, mb: 2, height: '50px', width: '150px', borderRadius: '21px', backgroundColor: '#1B1A55', '&:hover': { backgroundColor: '#16155d' } }}>
                Update User
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Username:</Typography>
              <Typography variant="body1">{userDetails.user_N}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Name:</Typography>
              <Typography variant="body1">{`${userDetails.f_Name} ${userDetails.l_Name}`}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Age:</Typography>
              <Typography variant="body1">{userDetails.age}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Email:</Typography>
              <Typography variant="body1">{userDetails.email}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Address:</Typography>
              <Typography variant="body1">{userDetails.address}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Date of Birth:</Typography>
              <Typography variant="body1">{userDetails.dob}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Gender:</Typography>
              <Typography variant="body1">{userDetails.gender}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Marital Status:</Typography>
              <Typography variant="body1">{userDetails.m_Status}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">NIC:</Typography>
              <Typography variant="body1">{userDetails.nic}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Role:</Typography>
              <Typography variant="body1">{userDetails.role}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Contact Number:</Typography>
              <Typography variant="body1">{userDetails.contact_No}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Family Contact No:</Typography>
              <Typography variant="body1">{userDetails.f_contactNo}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Bank Details:</Typography>
              <Typography variant="body1">{userDetails.bank_D}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={() => setEditMode(true)} sx={{ mt: 2 }}>
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
