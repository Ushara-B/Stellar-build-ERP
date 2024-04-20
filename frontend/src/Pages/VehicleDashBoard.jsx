import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Box, Paper, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

const URL = "http://localhost:5000/Vehicles";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [totalVehicles, setTotalVehicles] = useState(0);
    const [totalDrivers, setTotalDrivers] = useState(0);
    const [vehicleStatus, setVehicleStatus] = useState({ Active: 0, Inactive: 0, Repair: 0 });
    const [vehicleTypeCounts, setVehicleTypeCounts] = useState({Bike: 0, Car: 0, Truck: 0, Van: 0, Other: 0});
    const [soonToExpireLicenses, setSoonToExpireLicenses] = useState([]);
    const [soonToExpireInsurance, setSoonToExpireInsurance] = useState([]);
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
            // Calculate vehicle type counts
            const vehicleTypeCounts = {Bike: 0, Car: 0, Truck: 0, Van: 0, Other: 0};
            // Temporary arrays for soon-to-expire licenses and insurance
            const tempSoonToExpireLicenses = [];
            const tempSoonToExpireInsurance = [];

            data.vehicle.forEach(vehicle => {
                // Update status counts
                if (vehicle.vstatus === 'Active') statusCounts.active++;
                else if (vehicle.vstatus === 'Inactive') statusCounts.inactive++;
                else if (vehicle.vstatus === 'Repair') statusCounts.repair++;

                // Update vehicle type counts
                if (vehicle.Type === 'Bike') vehicleTypeCounts.Bike++;
                else if (vehicle.Type === 'Car') vehicleTypeCounts.Car++;
                else if (vehicle.Type === 'Truck') vehicleTypeCounts.Truck++;
                else if (vehicle.Type === 'Van') vehicleTypeCounts.Van++;
                else if (vehicle.Type === 'Other') vehicleTypeCounts.Other++;

                // Check for license expiry date within 1 month
                const licenseExpiryDate = new Date(vehicle.lic_expDay);
                const oneMonthBefore = new Date();
                oneMonthBefore.setMonth(oneMonthBefore.getMonth() + 1);
                if (licenseExpiryDate <= oneMonthBefore) {
                    tempSoonToExpireLicenses.push(vehicle);
                }
                
                // Check for insurance expiry date within 1 month
                const insuranceExpiryDate = new Date(vehicle.ins_expDay);
                if (insuranceExpiryDate <= oneMonthBefore) {
                    tempSoonToExpireInsurance.push(vehicle);
                }
            });

            // Update state after the loop
            setVehicleStatus(statusCounts);
            setVehicleTypeCounts(vehicleTypeCounts);
            setSoonToExpireLicenses(tempSoonToExpireLicenses);
            setSoonToExpireInsurance(tempSoonToExpireInsurance);
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
                <div ref={ComponentsRef}>
                    <Box sx={{ display: 'flex'}} >
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
                                {Object.entries(vehicleStatus).map(([status, count], index) => (
                                    `${status}: ${count}${index === Object.keys(vehicleStatus).length - 1 ? '' : '| '}`
                                ))}
                                <Doughnut data={vehicleStatusData} />
                            </Paper>
                        </div>
                        <div style={{ width: '30%', height: '30%' }}>
                            <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
                                <h2>Vehicle Type</h2>
                                {Object.entries(vehicleTypeCounts).map(([type, count], index) => (
                                    `${type}: ${count}${index === Object.keys(vehicleTypeCounts).length - 1 ? '' : '| '}`
                                ))}
                                <Doughnut data={vehicleTypeData} />
                            </Paper>
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', marginTop: '20px', marginLeft: '20px' }}>
                        <Paper sx={{ p: 2, m: 2, minWidth: '200px', maxWidth: '400px' }}>
                            <Typography variant="h6" gutterBottom>
                                Vehicles with Soon-to-Expire Licenses
                            </Typography>
                            {soonToExpireLicenses.map(vehicle => (
                                <Typography key={vehicle._id}>
                                    - {vehicle.Vname}: License Expiry on {formatDate(vehicle.lic_expDay)}
                                </Typography>
                            ))}
                        </Paper>
                        <Paper sx={{ p: 2, m: 2, minWidth: '200px', maxWidth: '400px', marginLeft: '20px' }}>
                            <Typography variant="h6" gutterBottom>
                                Vehicles with Soon-to-Expire Insurance
                            </Typography>
                            {soonToExpireInsurance.map(vehicle => (
                                <Typography key={vehicle._id}>
                                    - {vehicle.Vname}: Insurance Expiry on {formatDate(vehicle.ins_expDay)}
                                </Typography>
                            ))}
                        </Paper>
                    </Box>
                </div>
            
            <br /><br />
        </div>
    )
}

export default Vehicles;
