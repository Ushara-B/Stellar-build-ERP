import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '../Components/Appbar';
import Menu from '../Components/menu';
import { TextField, Button, Typography, Grid, Box, MenuItem } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function AddLoans() {
    const navigates = useNavigate();
    const [newLoans, setLoans] = useState({
        BorrowersName: "",
        LoanAmount: "",
        InterestRate: "",
        Period: "",
        StartingDate: "",
        EndDate: "",
        TotalInstallments: "",
        PaidInstallments: "",
        Notes: "",
        LoanStatus: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'BorrowersName') {
            updatedValue = value.replace(/[^a-zA-Z\s]/g, ''); // Remove non-alphabetic characters
        } else if (name === 'LoanAmount') {
            updatedValue = value.replace(/[^0-9]/g, ''); // Allow only digits
        } else if (name === 'InterestRate') {
            updatedValue = value.replace(/[^0-9%]/g, ''); // Allow only digits and %
            if (!/^([0-9]+)%?$/.test(updatedValue)) {
                updatedValue = ''; // Clear value if it doesn't match the format
            }
        }

        setLoans(prevState => ({
            ...prevState,
            [name]: updatedValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            Number(newLoans.LoanAmount) <= 0 ||
            !/^([0-9]+)%?$/.test(newLoans.InterestRate) ||
            parseFloat(newLoans.InterestRate) < 0 ||
            parseFloat(newLoans.InterestRate) > 100 ||
            new Date(newLoans.EndDate) < new Date(newLoans.StartingDate)
        ) {
            alert("Please check your input values.");
            return;
        }
        sendRequest().then(() => navigates('/loan-management'));
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/Loan", {
            ...newLoans,
        }).then(res => res.data);
    };

    return (
        <div>
            <AppBar />
            <Menu />
            <div style={{ marginLeft: '255px', paddingTop: '80px', }}>

                <Breadcrumbs arial-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" key="1" color="inherit" href="/loan-management">
                        Loan Management
                    </Link>
                    <Link underline="hover" key="2" color="inherit" href="/loan-management/addloans">
                        Add loans
                    </Link>
                </Breadcrumbs>


                <Box
                    sx={{
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
                            <strong>Add Loan Details</strong>
                        </Typography>
                        <br></br>

                        <Grid container spacing={4} justifyContent="center">

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Borrowers Name"
                                    name="BorrowersName"
                                    value={newLoans.BorrowersName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Enter Loan Amount"
                                    name="LoanAmount"
                                    value={newLoans.LoanAmount}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={Number(newLoans.LoanAmount) <= 0 || !Number.isInteger(Number(newLoans.LoanAmount))}
                                    helperText={(Number(newLoans.LoanAmount) <= 0 || !Number.isInteger(Number(newLoans.LoanAmount))) ? "Amount must be a positive integer" : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Enter Interest Rate"
                                    name="InterestRate"
                                    value={newLoans.InterestRate}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!/^([0-9]+)%?$/.test(newLoans.InterestRate) || parseFloat(newLoans.InterestRate) < 0 || parseFloat(newLoans.InterestRate) > 100}
                                    helperText={!/^([0-9]+)%?$/.test(newLoans.InterestRate) || parseFloat(newLoans.InterestRate) < 0 || parseFloat(newLoans.InterestRate) > 100 ? "Interest rate must be between 0 and 100 with optional %" : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Loan Period"
                                    name="Period"
                                    value={newLoans.Period}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Loan Starting Date"
                                    name="StartingDate"
                                    type="date"
                                    value={newLoans.StartingDate}
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
                                    label="Loan Ending Date"
                                    name="EndDate"
                                    type="date"
                                    value={newLoans.EndDate}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={new Date(newLoans.EndDate) < new Date(newLoans.StartingDate)}
                                    helperText={new Date(newLoans.EndDate) < new Date(newLoans.StartingDate) ? "End date must be after starting date" : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Total Installments Of loan"
                                    name="TotalInstallments"
                                    value={newLoans.TotalInstallments}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Paid Installments of loan"
                                    name="PaidInstallments"
                                    value={newLoans.PaidInstallments}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Additional Notes relevant to the loan :"
                                    name="Notes"
                                    value={newLoans.Notes}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Loan Status"
                                    name="LoanStatus"
                                    value={newLoans.LoanStatus}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    select
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Closed">Closed</MenuItem>
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
                                    Add Loan
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default AddLoans;
