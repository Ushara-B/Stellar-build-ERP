import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import { Box, Button, Grid, MenuItem, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function UpdateLoan() {
  const [loan, setLoan] = useState({});
  const [endDateError, setEndDateError] = useState('');
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios.get(`http://localhost:5000/Loan/${id}`)
        .then((res) => res.data)
        .then((data) => setLoan(data.loan));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/Loan/${id}`, {
        BorrowersName: String(loan.BorrowersName),
        LoanAmount: String(loan.LoanAmount),
        InterestRate: String(loan.InterestRate),
        Period: String(loan.Period),
        StartingDate: new Date(loan.StartingDate),
        EndDate: new Date(loan.EndDate),
        TotalInstallments: String(loan.TotalInstallments),
        PaidInstallments: String(loan.PaidInstallments),
        Notes: String(loan.Notes),
        LoanStatus: String(loan.LoanStatus)
      }).then((res) => res.data);
  };

  const validateEndDate = (endDate, startingDate) => {
    if (endDate < startingDate) {
      setEndDateError('Ending Date cannot be earlier than Starting Date');
    } else {
      setEndDateError('');
    }
  };

  const handleChange = (e) => {
    setLoan(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === 'StartingDate' || e.target.name === 'EndDate') {
      validateEndDate(new Date(loan.EndDate), new Date(loan.StartingDate));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loan);
    sendRequest().then(() =>
      navigate('/loan-management'));
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
          <Typography key="3" color="text.primary">
            Loan Update
          </Typography>
        </Breadcrumbs>

        <Box
          sx={{
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
                {loan.BorrowersName ? (
                  <TextField
                    label="Borrowers Name"
                    value={loan.BorrowersName}
                    variant="outlined"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                ) : (
                  <TextField
                    label="Borrowers Name"
                    name="BorrowersName"
                    value={loan.BorrowersName}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Enter Loan Amount"
                  name="LoanAmount"
                  value={loan.LoanAmount ? loan.LoanAmount : ''}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Enter Interest Rate"
                  name="InterestRate"
                  value={loan.InterestRate ? loan.InterestRate : ''}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Loan Period"
                  name="Period"
                  value={loan.Period ? loan.Period : ''}
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
                  value={loan.StartingDate ? new Date(loan.StartingDate).toISOString().split('T')[0] : ''}
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
                  value={loan.EndDate ? new Date(loan.EndDate).toISOString().split('T')[0] : ''}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!endDateError}
                  helperText={endDateError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Total Installments Of loan"
                  name="TotalInstallments"
                  value={loan.TotalInstallments ? loan.TotalInstallments : ''}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Paid Installments of loan"
                  name="PaidInstallments"
                  value={loan.PaidInstallments ? loan.PaidInstallments : ''}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Additional Notes relevant to the loan :"
                  name="Notes"
                  value={loan.Notes ? loan.Notes : ''}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Loan Status"
                  name="LoanStatus"
                  value={loan.LoanStatus ? loan.LoanStatus : ''}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  select
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Closed</MenuItem>         
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
                Update Loan
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
    </div>
      );

    }
export default UpdateLoan;
