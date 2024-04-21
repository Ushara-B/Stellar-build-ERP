import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import{ useParams } from 'react-router'
import{ useNavigate } from 'react-router'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, TextField, Typography, Select } from '@mui/material';



function UpdateLoan() {

    const[newLoans,setLoans] = useState({});
    const navigates = useNavigate();
    const id = useParams().id; ///methana


    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://localhost:5000/Loan/${id}`)  ///methana
            .then((res)=> res.data)
            .then((data)=> setLoans(data.loan)); ////methana
        };
        fetchHandler();
    },[id]);


    const  sendRequest = async()=>{
        await axios
        .put(`http://localhost:5000/Loan/${id}`,{  ///menna methana
            loanId: String(newLoans.loanId),
            LoanAmount: String(newLoans.LoanAmount),
            InterestRate: String(newLoans.InterestRate),
            Period: String(newLoans.Period),
            StartingDate: new Date(newLoans.StartingDate),
            EndDate: new Date(newLoans.EndDate),
            TotalInstallments: String(newLoans.TotalInstallments), /// methana
            PaidInstallments: String(newLoans.PaidInstallments),  ///methana
            LoanStatus: String(newLoans.LoanStatus)

          }).then((res) => res.data);
    };
    const handleChange = (e) => {
      newLoans(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newLoans);
        sendRequest().then(() => 
        navigates('/loan-management'));  ////methana
      };

      return (
        <div>
      <AppBar />
      <Menu />
      <Box
        sx={{
          marginLeft: '255px',
          paddingTop: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
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
            <strong>Update Loan Details</strong>
          </Typography>
          <br />
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Loan Id"
                name="loanId"
                value={newLoans.loanId ? newLoans.loanId : ''}
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
                value={newLoans.LoanAmount ? newLoans.LoanAmount : ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
               label="Enter Interest Rate"                                                                                                                                                        name="InterestRate"
               value={newLoans.InterestRate ? newLoans.InterestRate : ''}
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
                value={newLoans.Period ? newLoans.Period : ''}
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
                value={newLoans.StartingDate ? new Date(newLoans.StartingDate).toISOString().split('T')[0] : ''}
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
                value={newLoans.EndDate ? new Date(newLoans.EndDate).toISOString().split('T')[0] : ''}
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
                type="date"
                value={newLoans.TotalInstallments ? new Date(newLoans.TotalInstallments).toISOString().split('T')[0] : ''}
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
                label="Paid Installments of loan"
                name="PaidInstallments"
                value={newLoans.PaidInstallments ? newLoans.PaidInstallments : ''}
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
                value={newLoans.vstatus ? newLoans.vstatus : ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                select
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Closed">Inactive</MenuItem>                
              </TextField>
            </Grid>


            <Grid item xs={3}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Loan
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
      );
};

export default UpdateLoan;
