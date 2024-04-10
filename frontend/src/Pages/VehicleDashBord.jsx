import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar'; 
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const URL = "http://localhost:5000/Vehicles";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

// Styled components

function VehiclesDashboard() {
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [totalVehicles, setTotalVehicles] = useState(0);
    const [totalDrivers, setTotalDrivers] = useState(0);
    const history = useNavigate();

    useEffect(() => {
        fetchHandler().then((data) => {
          setVehicles(data?.vehicle || []); // Set an empty array if data.vehicle is undefined
          setDrivers(data?.driver || []);   // Set an empty array if data.driver is undefined
          setTotalVehicles(data?.vehicle?.length || 0);
          setTotalDrivers(data?.vehicle.dname?.length || 0);
        });
      }, []);

    return (
        <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
            <AppBar/>
            <Menu/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Total Vehicles
                            </Typography>
                            <Typography variant="body2" component="p">
                                {totalVehicles}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent> 
                            <Typography variant="h5" component="h2">
                                Total Drivers
                            </Typography>
                            <Typography variant="body2" component="p">
                                {totalDrivers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Add more cards for additional statistics if needed */}
            </Grid>
            <br />
            <br />
            <Paper elevation={3}>
                {/* Display Table of Vehicles here */}
            </Paper>
        </div>
    );
}

export default VehiclesDashboard;
