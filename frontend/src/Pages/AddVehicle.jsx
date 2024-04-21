import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '../Components/Appbar';
import Menu from '../Components/menu';
import { TextField, Button, Grid, Box, MenuItem } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
      <div style={{ marginLeft: '255px', paddingTop: '80px',}}>
      <Breadcrumbs arial-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                <Link underline="hover" key="1" color="inherit" href="/vehicle">
                    Vehicle DashBoard
                </Link>
                <Link underline="hover" key="2" color="inherit" href="/viewvehicles">
                    Vehicles List
                </Link>
                <Typography key="3" color="text.primary">
                    Add Vehicle
                </Typography>
            </Breadcrumbs>
      <Box 
         sx={{//box position
        
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
                  }}>
                    Add Vehicle
                  </Button>
                  </Grid>
              </Grid>
            </Box>

        </Box>
    </div>
    </div>
  );
}

export default AddVehicle;
