import React, { useState, useEffect } from 'react';
import Drawer from '../Components/menu';
import AppBar from '../Components/Appbar';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Box, Card, CardContent, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

const ViewLoans = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);

  useEffect(() => { 
    const fetchLoan = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Loan/${id}`);
        setLoan(response.data.loan);
      } catch (error) {
        console.error('Error fetching Loan:', error);
      }
    };
    fetchLoan();
  }, [id]); 

  if (!loan) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar />
      <Drawer />

      <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
        
          <Box sx={{ marginLeft: '50px', marginTop: '20px', padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2, marginRight: '50px' }}>

            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Loan Details
                </Typography>

                <Grid container spacing={2}>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Loan Id:
                    </Typography>
                    <Typography variant="body1">{loan.loanId}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Borrowers Name:
                    </Typography>
                    <Typography variant="body1">{loan.BorrowersName}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Loan Amount:
                    </Typography>
                    <Typography variant="body1">{loan.LoanAmount}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Interest Rate:
                    </Typography>
                    <Typography variant="body1">{loan.InterestRate}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Loan Period:
                    </Typography>
                    <Typography variant="body1">{loan.Period}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Loan Starting Date:
                    </Typography>
                    <Typography variant="body1">{(loan.StartingDate)}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Loan Ending Date:
                    </Typography>
                    <Typography variant="body1">{(loan.EndDate)}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Total Installments of Loan:
                    </Typography>
                    <Typography variant="body1">{loan.TotalInstallments}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Paid Installments of Loan:
                    </Typography>
                    <Typography variant="body1">{loan.PaidInstallments}</Typography>
                  </Grid>

                  
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Additional Notes:
                    </Typography>
                    <Typography variant="body1">{loan.Notes}</Typography>
                  </Grid>


                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Loan Status:
                    </Typography>
                    <Typography variant="body1">{loan.LoanStatus}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
      </div>
    </div>
  );
};

export default ViewLoans;
