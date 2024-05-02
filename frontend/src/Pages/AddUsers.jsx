import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
    pswrd: '',
    gender: '',
    m_Status: '',
    nic: '',
    role: '',
    contact_No: '',
    f_contactNo: '',
    bank_D: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Reset the error for this field
  };

  const handleDateChange = (e) => {
    setNewUser({ ...newUser, dob: e.target.value });
    setErrors({ ...errors, dob: '' }); // Reset the error for the dob field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/users', newUser);
        console.log('User added successfully:', response.data.users);
        navigate('/allusers');
      } catch (error) {
        console.error('Error adding user:', error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(`Error adding user: ${error.response.data.message}`);
        } else {
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateInputs = () => {
    const errors = {};

    // Validate required fields
    if (!newUser.user_N) {
      errors.user_N = 'Please enter a username';
    }
    if (!newUser.f_Name) {
      errors.f_Name = 'Please enter first name';
    }
    if (!newUser.l_Name) {
      errors.l_Name = 'Please enter last name';
    }
    if (!newUser.age) {
      errors.age = 'Please enter age';
    }
    if (!newUser.email) {
      errors.email = 'Please enter email';
    }
    if (!newUser.dob) {
      errors.dob = 'Please enter date of birth';
    }
    if (!newUser.pswrd) {
      errors.pswrd = 'Please enter a password';
    }
    if (!newUser.gender) {
      errors.gender = 'Please select gender';
    }
    if (!newUser.m_Status) {
      errors.m_Status = 'Please select marital status';
    }
    if (!newUser.nic) {
      errors.nic = 'Please enter  NIC';
    }
    if (!newUser.role) {
      errors.role = 'Please select a role';
    }
    if (!newUser.contact_No) {
      errors.contact_No = 'Please enter contact number';
    }

    // Validate email format
    if (newUser.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      errors.email = 'Please enter a valid email address';
    }

    return errors;
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
                error={!!errors.user_N}
                helperText={errors.user_N}
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
                error={!!errors.f_Name}
                helperText={errors.f_Name}
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
                error={!!errors.l_Name}
                helperText={errors.l_Name}
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
                error={!!errors.age}
                helperText={errors.age}
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
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                name="pswrd"
                value={newUser.pswrd}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={!!errors.pswrd}
                helperText={errors.pswrd}
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
                type="date"
                value={newUser.dob}
                onChange={handleDateChange}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  placeholder: 'mm/dd/yyyy',
                }}
                error={!!errors.dob}
                helperText={errors.dob}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth error={!!errors.gender}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  value={newUser.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                  </Select>
                {errors.gender && <Typography variant="caption" color="error">{errors.gender}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth error={!!errors.m_Status}>
                <InputLabel id="m-status-label">Marital Status</InputLabel>
                <Select
                  labelId="m-status-label"
                  name="m_Status"
                  value={newUser.m_Status}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Marital Status</MenuItem>
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="divorced">Divorced</MenuItem>
                </Select>
                {errors.m_Status && <Typography variant="caption" color="error">{errors.m_Status}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="NIC"
                name="nic"
                value={newUser.nic}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={!!errors.nic}
                helperText={errors.nic}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth error={!!errors.role}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="employer">Employer</MenuItem>
                </Select>
                {errors.role && <Typography variant="caption" color="error">{errors.role}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contact Number"
                name="contact_No"
                value={newUser.contact_No}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={!!errors.contact_No}
                helperText={errors.contact_No}
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
                  width: '150px',
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