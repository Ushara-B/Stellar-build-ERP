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
import vehicle from "../css/Vehicle.css";
const URL = "http://localhost:5000/Vehicles";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();
    const ComponentsRef = useRef();
    
    useEffect(() => {
        fetchHandler().then((data) => setVehicles(data.vehicle));
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

    const deleteHandler = async (_id) => {
        try {
            await axios.delete(`http://localhost:5000/vehicles/${_id}`);
            setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle._id !== _id));
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
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
                    <TableContainer component={Paper}>
                        <Table>
                            <div ref={ComponentsRef}>
                                <h1>Details of Vehicles</h1>
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            backgroundColor: '#b1c5d4',
                                            fontWeight: 'bold',
                                            border: 'none',
                                            padding: '5px 10px',
                                            '&:hover': {
                                                backgroundColor: '#b1c5d4',
                                            },
                                        }}>
                                        <TableCell>Register No</TableCell>
                                        <TableCell>Vehicle Name</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>VIN</TableCell>
                                        <TableCell>License Expiry Day</TableCell>
                                        <TableCell>Insurance Expiry Day</TableCell>
                                        <TableCell>Last Service Day</TableCell>
                                        <TableCell>Mileage</TableCell>
                                        <TableCell>Driver Name</TableCell>
                                        <TableCell>Vehicle Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {vehicles.map((vehicle) => (
                                        <TableRow key={vehicle._id}>
                                            <TableCell>{vehicle.RegNo}</TableCell>
                                            <TableCell>{vehicle.Vname}</TableCell>
                                            <TableCell>{vehicle.Type}</TableCell>
                                            <TableCell>{vehicle.VIN}</TableCell>
                                            <TableCell>{formatDate(vehicle.lic_expDay)}</TableCell>
                                            <TableCell>{formatDate(vehicle.ins_expDay)}</TableCell>
                                            <TableCell>{formatDate(vehicle.last_serviceDay)}</TableCell>
                                            <TableCell>{vehicle.mileage}</TableCell>
                                            <TableCell>{vehicle.dname}</TableCell>
                                            <TableCell>{vehicle.vstatus}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => navigate(`/viewvehicles/${vehicle._id}`)} className="update-button">Update</IconButton>
                                                <IconButton onClick={() => deleteHandler(vehicle._id)} className="delete-button">Delete</IconButton>
                                                <IconButton onClick={() => handlePrintSingle(vehicle)} className="report-button">Report</IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </div>
                        </Table>
                    </TableContainer>
                </div>
            )}
            <br /><br />
        </div>
    )
}

export default Vehicles;
