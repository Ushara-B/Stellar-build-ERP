import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import{ useParams } from 'react-router'
import{ useNavigate } from 'react-router'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, TextField, Select } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
function UpdateVehicle() {

    const[inputs,setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;


    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://localhost:5000/Vehicles/${id}`)
            .then((res)=> res.data)
            .then((data)=> setInputs(data.vehicle));
        };
        fetchHandler();
    },[id]);
    const  sendRequest = async()=>{
        await axios
        .put(`http://localhost:5000/Vehicles/${id}`,{
            RegNo: String(inputs.RegNo),
            Vname: String(inputs.Vname),
            Type: String(inputs.Type),
            VIN: String(inputs.VIN),
            lic_expDay: new Date(inputs.lic_expDay),
            ins_expDay: new Date(inputs.ins_expDay),
            last_serviceDay: new Date(inputs.last_serviceDay),
            mileage: String(inputs.mileage),
            dname: String(inputs.dname),
            vstatus: String(inputs.vstatus)
          }).then((res) => res.data);
    };
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => 
        history('/viewvehicles'));
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
                    Vehicle Update
                </Typography>
            </Breadcrumbs>
      <br></br>
      
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
            <strong>Update Vehicle Details</strong>
          </Typography>
          <br />
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Register No"
                name="RegNo"
                value={inputs.RegNo ? inputs.RegNo : ''}
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
                value={inputs.Vname ? inputs.Vname : ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="Type-label">Vehicle Type</InputLabel>
                <Select
                labelId="Type-label"
                name="Type"
                value={inputs.Type ? inputs.Type : ''}
                onChange={handleChange}
              >
                <MenuItem value="Bike">Bike</MenuItem>
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Van">Van</MenuItem>
                <MenuItem value="Truck">Truck</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Vehicle Identification Number"
                name="VIN"
                value={inputs.VIN ? inputs.VIN : ''}
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
                value={inputs.lic_expDay ? new Date(inputs.lic_expDay).toISOString().split('T')[0] : ''}
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
                value={inputs.ins_expDay ? new Date(inputs.ins_expDay).toISOString().split('T')[0] : ''}
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
                value={inputs.last_serviceDay ? new Date(inputs.last_serviceDay).toISOString().split('T')[0] : ''}
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
                value={inputs.mileage ? inputs.mileage : ''}
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
                value={inputs.dname ? inputs.dname : ''}
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
                value={inputs.vstatus ? inputs.vstatus : ''}
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
                Update Vehicle
              </Button>
            </Grid>
          </Grid>
        </Box>
      

    </div>
    </div>
      );
}

export default UpdateVehicle
