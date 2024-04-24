import React, { useState, useEffect } from 'react';
import Drawer from '../Components/menu';
import Appbar from '../Components/Appbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Grid} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ViewVehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Vehicles/${id}`);
        setVehicle(response.data.vehicle);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };
    fetchVehicle();
  }, [id]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
};
  return (
    <div>
      <Appbar />
      <Drawer />
      <div style={{ marginLeft: '255px', paddingTop: '80px'}}>
      <Breadcrumbs arial-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                <Link underline="hover" key="1" color="inherit" href="/vehicle">
                    Vehicle DashBoard
                </Link>
                <Link underline="hover" key="2" color="inherit" href="/viewvehicles">
                    Vehicles List
                </Link>
                <Typography key="3" color="text.primary">
                    Vehicle Advance List
                </Typography>
      </Breadcrumbs>
      <Box sx={{ marginLeft: '50px', marginTop: '20px', padding: 4, backgroundColor: '#1B1A55', borderRadius: 2 ,marginRight: '50px'}}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Vehicle Details
            </Typography>
            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Register No:
                </Typography>
                <Typography variant="body1">{vehicle.RegNo}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Vehicle Name:
                </Typography>
                <Typography variant="body1">{vehicle.Vname}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Type:
                </Typography>
                <Typography variant="body1">{vehicle.Type}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Vehicle ID:
                </Typography>
                <Typography variant="body1">{vehicle.VIN}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  License Expiry Day:
                </Typography>
                <Typography variant="body1">{formatDate(vehicle.lic_expDay)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Insurance Expiry Day:
                </Typography>
                <Typography variant="body1">{formatDate(vehicle.ins_expDay)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Last Service Day:
                </Typography>
                <Typography variant="body1">{formatDate(vehicle.last_serviceDay)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Mileage:
                </Typography>
                <Typography variant="body1">{vehicle.mileage}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Driver Name:
                </Typography>
                <Typography variant="body1">{vehicle.dname}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Vehicle Status:
                </Typography>
                <Typography variant="body1">{vehicle.vstatus}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>         
      </div>
      
    </div>
  );
};

export default ViewVehicle;