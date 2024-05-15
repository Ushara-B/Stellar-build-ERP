import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Typography,Button } from '@mui/material';
import AppBar from '../Components/Appbar';
import Menu from '../Components/menu';
import { Doughnut } from 'react-chartjs-2';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";



const URL = 'http://localhost:5000/Loan';
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function LoanDashboard() {
  const navigate = useNavigate();

  const [totalBorrowers, setTotalBorrowers] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);
  const [loanStatusCounts, setLoanStatusCounts] = useState({ Active: 0, Inactive: 0 });

  useEffect(() => {
    fetchHandler().then((data) => {
      // Calculate total borrowers
      const uniqueBorrowers = new Set(data.loan.map((loan) => loan.BorrowersName));
      setTotalBorrowers(uniqueBorrowers.size);

      // Calculate total loans
      setTotalLoans(data.loan.length);

      // Calculate loan status counts
      const statusCounts = { Active: 0, Inactive: 0 };
      data.loan.forEach((loan) => {
        if (loan.LoanStatus === 'Active') {
          statusCounts.Active++;
        } else {
          statusCounts.Inactive++;
        }
      });
      setLoanStatusCounts(statusCounts);
    });
  }, []);

  const loanStatusData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: Object.values(loanStatusCounts),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderWidth: 1,
      },
    ],
  };
  const handleAddClick = () => {
    navigate(`/loan-management/addloans`);
};  

  return (
    <div style={{ marginLeft: '250px', paddingTop: '80px', position: 'relative' }}>
      <AppBar />
      <Menu />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 200, backgroundColor: '#87CEEB' }}>
          <Typography variant="h6" gutterBottom>
            Total Borrowers
          </Typography>
          <Typography variant="h4">{totalBorrowers}</Typography>
        </Paper>
        <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 200, backgroundColor: '#708090' }}>
          <Typography variant="h6" gutterBottom>
            Total Loans
          </Typography>
          <Typography variant="h4">{totalLoans}</Typography>
        </Paper>
        <Paper sx={{ p: 2, m: 2, minWidth: 50, backgroundColor: "#87CEEB" }}>
  <Button style={{backgroundColor: "#708090",color:"white", margin: "10px"}}  variant="centered" startIcon={<AddIcon />} sx={{p: 2, m: 2, flexGrow: 1, backgroundColor: "#87CEEB"}}  onClick={handleAddClick}>
    <h2 style={{color:"white"}}>Add New Loans</h2></Button>
 </Paper>
      </Box>
      
      <div style={{ display: "flex", justifyContent: "start" }} className="flex-container">
       
        <div> <Paper sx={{ p: 2, m: 3, flexGrow: 1, minWidth:500}}>
          {/* Reduced margin */}
          
            <h2>Loan Status</h2>
          
          <Doughnut data={loanStatusData} />
        </Paper>
       
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "2px",
          width: "600px",
          height: "400px",
          backgroundImage: "url(https://img.freepik.com/premium-vector/bank-credit-finance-management-loan-agreement-signing-mortgage-money-credit-loan-disbursement_566886-3593.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
         
        }}
      />
    </div>
  );
}

export default LoanDashboard;