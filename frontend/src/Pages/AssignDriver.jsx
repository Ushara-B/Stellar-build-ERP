import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppBar from '../Components/Appbar';
import Menu from '../Components/menu';
import ViewVehicle from './ViewVehicle';

const AssignDriver = () => {
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUsers(response.data.Users);
      })
      .catch(error => console.error('Error fetching users:', error));

    axios.get('http://localhost:5000/vehicles')
      .then(response => {
        setVehicles(response.data.vehicle);
      })
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const handleVehicleChange = (e) => {
    const selectedVehicleId = e.target.value;
    const selectedVehicle = vehicles.find(vehicle => vehicle._id === selectedVehicleId);
    setSelectedVehicle(selectedVehicle || {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedUser, selectedVehicle);

    // Get the selected user
    const selectedUserObj = users.find(user => user._id === selectedUser);

    // Combine first name and last name to form the full name
    const selectedUserName = `${selectedUserObj.f_Name} ${selectedUserObj.l_Name}`;

    // Update the selected vehicle's driver name
    const updatedVehicle = { ...selectedVehicle, dname: selectedUserName };

    // Send a PUT request to update the vehicle's details
    axios.put(`http://localhost:5000/Vehicles/${selectedVehicle._id}`, updatedVehicle)
      .then(response => {
        console.log('Vehicle updated successfully:', response.data);
        // Assuming you want to navigate to '/viewvehicles' after updating
        navigate('/viewvehicles');
      })
      .catch(error => console.error('Error updating vehicle:', error));
  };

  return (
    <div>
      <AppBar />
      <Menu />
      <Box
        sx={{
          marginLeft: '255px',
          paddingTop: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1>Assign Driver</h1>
          <br></br>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="vehicle-label">Select Vehicle</InputLabel>
                <Select
                  labelId="vehicle-label"
                  value={selectedVehicle._id || ''}
                  onChange={handleVehicleChange}
                >
                  {vehicles.map(vehicle => (
                    <MenuItem key={vehicle._id} value={vehicle._id}>{vehicle.RegNo} {vehicle.Vname}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="user-label">Select Employee</InputLabel>
                <Select
                  labelId="user-label"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  {users.map(user => (
                    <MenuItem key={user._id} value={user._id}>{user.f_Name} {user.l_Name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary"
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
                }}>
                Assign Driver
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
    
  );
};

export default AssignDriver;
