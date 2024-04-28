import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  AppBar  from '../Components/Appbar';
import Menu from '../Components/menu';
import { TextField, Button, Typography, Grid, Box, MenuItem } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';





function AddLoans() {
  const navigates = useNavigate();
  const [newLoans, setLoans] = useState({ // Call the data what are inserting
    //form eke input gnna details 
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
    setLoans(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => { //adala values tika set wenne meken
    e.preventDefault();
    console.log(newLoans);
    sendRequest().then(() => navigates('/loan-management')); //submit karahama navigate wena page eka
  };

  const sendRequest = async () => { //form eke details fill karahama submit button eka click karaham data base ekata yna eka
    await axios.post("http://localhost:5000/Loan", {
      ...newLoans,                      
      
    }).then(res => res.data);
  };

  return (
    <div>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: '255px', paddingTop: '80px',}}>

      <Breadcrumbs arial-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                <Link underline="hover" key="1" color="inherit" href="/loan-management">
                    Loan Management
                </Link>
                <Link underline="hover" key="2" color="inherit" href="/loan-management/addloans">
                    Add loans
                </Link>
            </Breadcrumbs>
    

      <Box 
         sx={{//box position
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
                        required
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
