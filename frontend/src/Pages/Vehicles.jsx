import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const URL = "http://localhost:5000/Vehicles";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        fetchHandler().then((data) => setVehicles(data.vehicle));
    }, []);

    const deleteHandler = async (id) => {
        await axios.delete(`http://localhost:5000/vehicles/${id}`)
            .then (res => res.data)
            .then (() => history('/'))
            .then(() => history('/viewvehicles'));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredVehicles = data.vehicle.filter((vehicle) =>
                Object.values(vehicle).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setVehicles(filteredVehicles);
            setNoResults(filteredVehicles.length === 0);
        });
    };

    const generateReport = async (id) => {
        // Here you would implement your report generation logic
        console.log("Generating report for vehicle with ID:", id);
        // For demonstration, let's generate a simple text report and offer it for download
        const vehicle = vehicles.find(vehicle => vehicle._id === id);
        if (vehicle) {
            const reportText = `
                Vehicle ID: ${vehicle._id}
                Register No: ${vehicle.RegNo}
                Vehicle Name: ${vehicle.Vname}
                Vehicle Identification NO: ${vehicle.VIN}
                License Expiry Day: ${formatDate(vehicle.lic_expDay)}
                Insurance Expiry Day:${formatDate(vehicle.ins_expDay)}
                Last Service Day:${formatDate(vehicle.last_serviceDay)}
                Driver Name: ${vehicle.dname}
                Mileage: ${vehicle.mileage}
                Vehicle Status: ${vehicle.vstatus}

         
            `;
            // Create a Blob containing the report text
            const blob = new Blob([reportText], { type: 'text/plain' });
            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `vehicle_report_${id}.txt`;
            // Append the link to the document body and trigger the click event
            document.body.appendChild(link);
            link.click();
            // Cleanup
            document.body.removeChild(link);
        }
    };

    return (
        <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
            <AppBar/>
            <Menu/>
            <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                placeholder="Search vehicle Details"
            />
            <button onClick={handleSearch}>Search</button>
            <button><Link to={'/addvehicle'}>ADD Vehicle</Link></button>
            {noResults ? (
                <div>
                    <p>No results found</p>
                </div>
            ) : (
                <div>
                    <h1>Details of Vehicles</h1>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Register No</StyledTableCell>
                                    <StyledTableCell>Vehicle Name</StyledTableCell>
                                    <StyledTableCell>Vehicle Identification NO</StyledTableCell>
                                    <StyledTableCell>License Expiry Day</StyledTableCell>
                                    <StyledTableCell>Insurance Expiry Day</StyledTableCell>
                                    <StyledTableCell>Last Service Day</StyledTableCell>
                                    <StyledTableCell>Mileage</StyledTableCell>
                                    <StyledTableCell>Driver Name</StyledTableCell>
                                    <StyledTableCell>Vehicle Status</StyledTableCell>
                                    <StyledTableCell>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vehicles.map(vehicle => (
                                    <StyledTableRow key={vehicle._id}>
                                        <StyledTableCell>{vehicle.RegNo}</StyledTableCell>
                                        <StyledTableCell>{vehicle.Vname}</StyledTableCell>
                                        <StyledTableCell>{vehicle.VIN}</StyledTableCell>
                                        <StyledTableCell>{formatDate(vehicle.lic_expDay)}</StyledTableCell>
                                        <StyledTableCell>{formatDate(vehicle.ins_expDay)}</StyledTableCell>
                                        <StyledTableCell>{formatDate(vehicle.last_serviceDay)}</StyledTableCell>
                                        <StyledTableCell>{vehicle.mileage}</StyledTableCell>
                                        <StyledTableCell>{vehicle.dname}</StyledTableCell>
                                        <StyledTableCell>{vehicle.vstatus}</StyledTableCell>
                                        <StyledTableCell>
                                            <button><Link to={`/viewvehicles/${vehicle._id}`}>Update</Link></button>
                                            <button onClick={() => deleteHandler(vehicle._id)}>Delete</button>
                                            <button onClick={() => generateReport(vehicle._id)}>Report</button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
}

export default Vehicles;
