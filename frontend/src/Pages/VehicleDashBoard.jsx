import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Box, Paper, InputBase } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

const URL = "http://localhost:5000/Vehicles";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const [totalVehicles, setTotalVehicles] = useState(0);
    const [totalDrivers, setTotalDrivers] = useState(0);
    const [vehicleStatus, setVehicleStatus] = useState({ active: 0, inactive: 0, repair: 0 });
    const [vehicleTypeCounts, setVehicleTypeCounts] = useState({Bike: 0, Car: 0, Truck: 0, Van: 0, Other: 0});
    const navigate = useNavigate();
    const ComponentsRef = useRef();

    useEffect(() => {
        fetchHandler().then((data) => {
            setVehicles(data.vehicle);
            setTotalVehicles(data.vehicle.length);
            // Calculate total unique drivers
            const uniqueDrivers = new Set(data.vehicle.map(vehicle => vehicle.dname).filter(Boolean));
            setTotalDrivers(uniqueDrivers.size);
            // Calculate vehicle status counts
            const statusCounts = { active: 0, inactive: 0, repair: 0 };
            data.vehicle.forEach(vehicle => {
                if (vehicle.vstatus === 'Active') statusCounts.active++;
                else if (vehicle.vstatus === 'Inactive') statusCounts.inactive++;
                else if (vehicle.vstatus === 'Repair') statusCounts.repair++;
            });
            setVehicleStatus(statusCounts);
            // Calculate vehicle type counts
            const vehicleTypeCounts = {Bike: 0, Car: 0, Truck: 0, Van: 0, Other: 0};
            data.vehicle.forEach(vehicle => {
                if (vehicle.Type === 'Bike') vehicleTypeCounts.Bike++;
                else if (vehicle.Type === 'Car') vehicleTypeCounts.Car++;
                else if (vehicle.Type === 'Truck') vehicleTypeCounts.Truck++;
                else if (vehicle.Type === 'Van') vehicleTypeCounts.Van++;
                else if (vehicle.Type === 'Other') vehicleTypeCounts.Other++;
            });
            setVehicleTypeCounts(vehicleTypeCounts);

        });
    }, []);

    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: 'Vehicles Report',
        onAfterPrint: () => alert("Vehicles Report successfully Downloaded!"),
    });
    const handleAddClick = () => {
        navigate(`/addvehicle`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    const vehicleTypeData = {
        labels: ['Bike', 'Car', 'Truck', 'Van', 'Other'],
        datasets: [
            {
                label: 'Vehicle Types',
                data: Object.values(vehicleTypeCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const vehicleStatusData = {
        labels: ['Active', 'Inactive', 'Repair'],
        datasets: [
            {
                label: 'Vehicle Status',
                data: Object.values(vehicleStatus),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ marginLeft: '250px', paddingTop: '80px' }} >
            <AppBar />
            <Menu />
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '40px' }} >
                <IconButton color="primary" aria-label="add vehicle" onClick={handleAddClick}>
                    <AddIcon />
                </IconButton>
                <IconButton color="primary" aria-label="print all" onClick={handlePrint}>
                    <PrintIcon />
                </IconButton>
            </Box>

            {noResults ? (
                <div>
                    <p>No results found</p>
                </div>
            ) : (
                <div>
                    <Box sx={{ display: 'flex'}} ref={ComponentsRef}>
                    <div style={{ width: '30%', height: '30%' }}>
                        <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
                            <h2>Total Vehicles</h2>
                            <p>{totalVehicles}</p>
                        </Paper>
                        <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, }}>
                            <h2>Total Drivers</h2>
                            <p>{totalDrivers}</p>
                        </Paper><br /><br />
                    </div>   
                        <div style={{ width: '30%', height: '30%' }}>
                            <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
                                <h2>Vehicle Status</h2>
                                <Doughnut data={vehicleStatusData} />
                            </Paper>
                        </div>
                        <div style={{ width: '30%', height: '30%' }}>
                            <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
                                <h2>Vehicle Type</h2>
                                <Doughnut data={vehicleTypeData} />
                            </Paper>
                        </div>
                    </Box>
                </div>
            )}
            <br /><br />
        </div>
    )
}

export default Vehicles;
