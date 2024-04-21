import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AppBar  from '../Components/Appbar';
import  Menu from '../Components/menu';



// const ViewLoans = () => {
//   const { id } = useParams();
//   const [loan, setNewLoans] = useState(null);

//   useEffect(() => {
//     const fetchLoan = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/Loan/${id}`);
//         setNewLoans(response.data.loan);
//       } catch (error) {
//         console.error('Error fetching Loan:', error);
//       }
//     };
//     fetchLoan();
//   }, [id]);

//   if (!loan) {
//     return <div>Loading...</div>;
//   }




function ViewLoans(props) {

  //  const { loanId, LoanAmount, InterestRate, Period, StartingDate, EndDate,TotalInstallments, PaidInstallments, LoanStatus } = props.ViewLoans;


  return (
    <div>
      <AppBar/>
      <Menu/>
      <h1>User Details Display</h1>
    </div>
  )
}

export default ViewLoans
