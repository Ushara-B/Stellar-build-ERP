import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '../Components/Appbar';
import Menu from '../Components/menu';
import { TextField, Button, Typography, Grid, Box, MenuItem } from '@mui/material';

function AddVehicle() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    RegNo: "",
    Vname: "",
    Type: "",
    VIN: "",
    lic_expDay: "",
    ins_expDay: "",
    last_serviceDay: "",
    mileage: "",
    dname: "",
    vstatus: ""
  });

  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/viewvehicles'));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/Vehicles", {
      ...inputs,
      lic_expDay: new Date(inputs.lic_expDay).toISOString(),
      ins_expDay: new Date(inputs.ins_expDay).toISOString(),
      last_serviceDay: new Date(inputs.last_serviceDay).toISOString(),
    }).then(res => res.data);
  };
 
  return (
    <div>
      <AppBar />
      <Menu />
      
      <Box 
         sx={{//box position
          marginLeft: '255px',
          paddingTop: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',     
          minHeight: '100vh',
        }}>
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
                <Typography align="center" gutterBottom variant="h4" component="h2">
                      <strong>Add Vehicle Details</strong>
                </Typography>
                  <br></br>
        
                  <Grid container spacing={4} justifyContent="center">
                      <Grid item xs={12} sm={6}>
                        <TextField
                            label="Register No"
                            name="RegNo"
                            value={inputs.RegNo}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                      </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          label="Vehicle Name"
                          name="Vname"
                          value={inputs.Vname}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          required
                         />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        label="Vehicle Type"
                        name="Type"
                        value={inputs.Type}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        select
                        >
                        <MenuItem value="Bike">Bike</MenuItem>
                        <MenuItem value="Car">Car</MenuItem>
                        <MenuItem value="Van">Van</MenuItem>
                        <MenuItem value="Truck">Truck</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        label="Vehicle Identification Number"
                        name="VIN"
                        value={inputs.VIN}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        label="License Expiry Day"
                        name="lic_expDay"
                        type="date"
                        value={inputs.lic_expDay}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        label="Insurance Expiry Day"
                        name="ins_expDay"
                        type="date"
                        value={inputs.ins_expDay}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                     />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                      label="Last Service Day"
                      name="last_serviceDay"
                      type="date"
                      value={inputs.last_serviceDay}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                    label="Current Mileage"
                    name="mileage"
                    value={inputs.mileage} 
                    onChange={handleChange} 
                    variant="outlined"
                    fullWidth
                    required
                  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                    label="Driver Name"
                    name="dname"
                    value={inputs.dname}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Vehicle Status"
                      name="vstatus"
                      value={inputs.vstatus}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                      select
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Repair">Repair</MenuItem> 
                    </TextField>
                  </Grid>

                  <Grid item xs={3}>
                  <Button type="submit"variant="contained" color="primary" fullWidth>
                    Add Vehicle
                  </Button>
                  </Grid>
              </Grid>
            </Box>

        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <label>RegisterNo</label><br/>
          <input type='text' name='RegNo' onChange={handleChange} value={inputs.RegNo}  required /><br/><br/>
          <label>Vehicle Name</label><br/>
          <input type='text' name='Vname' onChange={handleChange} value={inputs.Vname} required /><br/><br/>
          <label>Vehicle Type</label><br/>
          <input type='text' name='Type' onChange={handleChange} value={inputs.Type} required /><br/><br/>
          <label>Vehicle Identification Number</label><br/>
          <input type='text' name='VIN' onChange={handleChange} value={inputs.VIN} required /><br/><br/>
          <label>License Expiry Day</label><br/>
          <input type='date' name='lic_expDay' onChange={handleChange} value={inputs.lic_expDay} required /><br/><br/>
          <label>Insurance Expiry Day</label><br/>
          <input type='date' name='ins_expDay' onChange={handleChange} value={inputs.ins_expDay} required /><br/><br/>
          <label>Last Service Day:</label><br/>
          <input type='date' name='last_serviceDay' onChange={handleChange} value={inputs.last_serviceDay} required /><br/><br/>
          <label>Current Mileage:</label><br/>
          <input type='text' name='mileage' onChange={handleChange} value={inputs.mileage} required /><br/><br/>
          <label>Driver Name:</label><br/>
          <input type='text' name='dname' onChange={handleChange} value={inputs.dname} required /><br/><br/>
          <label>Vehicle Status:</label><br/>
          <input type='text' name='vstatus' onChange={handleChange} value={inputs.vstatus} required /><br/><br/>
          
          <button>Submit</button>

        </Box>
    </div>
  );
}

export default AddVehicle;
