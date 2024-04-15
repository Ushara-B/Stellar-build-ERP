import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Drawer from '../Components/menu';
import Appbar from '../Components/Appbar';

const AddUser = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    user_N: '',
    f_Name: '',
    l_Name: '',
    age: '',
    email: '',
    address: '',
    dob: '',
    gender: '',
    m_Status: '',
    nic: '',
    role: '',
    contact_No: '',
    f_contactNo: '',
    bank_D: '',
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', newUser);
      navigate('/allusers');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <Appbar />
      <Drawer />
      <Box
        sx={{
          marginLeft: '255px',
          paddingTop: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '80%',
            maxWidth: 800,
            padding: 4,
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Add New User
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Username"
                name="user_N"
                value={newUser.user_N}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="f_Name"
                value={newUser.f_Name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="l_Name"
                value={newUser.l_Name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Age"
                name="age"
                value={newUser.age}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                name="address"
                value={newUser.address}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date of Birth"
                name="dob"
                value={newUser.dob}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Gender"
                name="gender"
                value={newUser.gender}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Marital Status"
                name="m_Status"
                value={newUser.m_Status}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="NIC"
                name="nic"
                value={newUser.nic}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Role"
                name="role"
                value={newUser.role}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contact Number"
                name="contact_No"
                value={newUser.contact_No}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Family Contact No"
                name="f_contactNo"
                value={newUser.f_contactNo}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Bank Details"
                name="bank_D"
                value={newUser.bank_D}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 7,
                  mb: 2,
                  height: '50px',
                  borderRadius: '21px',
                  backgroundColor: '#1B1A55',
                  '&:hover': {
                    backgroundColor: '#16155d',
                  },
                }}
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default AddUser;