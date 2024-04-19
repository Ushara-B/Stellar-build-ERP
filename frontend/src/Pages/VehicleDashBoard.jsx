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
import { Box, Paper, InputBase, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

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
            //calculate vehicle Type counts
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

    const handlePrintSingle = (vehicleData) => {
        // Here you can generate a report for the specific vehicleData
        // For example, you can create a new window/tab with the vehicle details to print
        const reportWindow = window.open("", "_blank");
        reportWindow.document.write(`<html><head><title>Vehicle Report</title></head><body><h1>Vehicle Details</h1><p>Register No: ${vehicleData.RegNo}</p><p>Vehicle Name: ${vehicleData.Vname}</p><p>Type: ${vehicleData.Type}</p><p>VIN: ${vehicleData.VIN}</p><p>License Expiry Day: ${formatDate(vehicleData.lic_expDay)}</p><p>Insurance Expiry Day: ${formatDate(vehicleData.ins_expDay)}</p><p>Last Service Day: ${formatDate(vehicleData.last_serviceDay)}</p><p>Mileage: ${vehicleData.mileage}</p><p>Driver Name: ${vehicleData.dname}</p><p>Vehicle Status: ${vehicleData.vstatus}</p></body></html>`);
        reportWindow.document.close();
        reportWindow.print();
    };

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredVehicles = data.vehicle.filter((vehicle) =>
                Object.values(vehicle).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                ));
            setVehicles(filteredVehicles);
            setNoResults(filteredVehicles.length === 0);
        });
    };

    const handleAddClick = () => {
        navigate(`/addvehicle`);
    };

    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    return (
        <div style={{ marginLeft: '250px', paddingTop: '80px' }}>
            <AppBar />
            <Menu />
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '40px' }}>
                <InputBase
                    sx={{ flex: 1, marginLeft: '10px' }}
                    placeholder="Search vehicle Details"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startAdornment={<SearchIcon />}
                />
                <IconButton color="primary" aria-label="search" onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 200 }}>
                            <h2>Total Vehicles</h2>
                            <p>{totalVehicles}</p>
                        </Paper>
                        <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 200 }}>
                            <h2>Total Drivers</h2>
                            <p>{totalDrivers}</p>
                        </Paper>
                        <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 200 }}>
                            <h2>Vehicle Status</h2>
                            <p>Active: {vehicleStatus.active}</p>
                            <p>Inactive: {vehicleStatus.inactive}</p>
                            <p>Repair: {vehicleStatus.repair}</p>
                        </Paper>
                        <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 200 }}>
                            <h2>Vehicle Type</h2>
                            <p>Bike: {vehicleTypeCounts.Bike}</p>
                            <p>Car: {vehicleTypeCounts.Car}</p>
                            <p>Truck: {vehicleTypeCounts.Truck}</p>
                            <p>Van: {vehicleTypeCounts.Van}</p>
                            <p>Other: {vehicleTypeCounts.Other}</p>
                        </Paper>
                    </Box>

                   
                </div>
            )}
            <br /><br />
        </div>
    )
}

export default Vehicles;
