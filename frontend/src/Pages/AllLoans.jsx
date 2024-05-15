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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Paper, InputBase, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const URL = "http://localhost:5000/Loan";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);//url local host wenuwata
}

function Loans() {
    const [loans, setLoans] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();
    const ComponentsRef = useRef();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchHandler().then((data) => setLoans(data.loan));
    }, []);

    const handlePrint = useReactToPrint({
        content: () => {
            const clonedComponent = ComponentsRef.current.cloneNode(true); // Cloning the component to avoid manipulating the original DOM
            const table = clonedComponent.querySelector('table'); // Selecting the table element
            const actionColumnIndex = 10; // Assuming the index of the "Action" column is 10 (0-indexed)
    
            // Hide the "Action" column header
            const headerRow = table.querySelector('thead tr');
            if (headerRow) {
                const headerCell = headerRow.querySelectorAll('th')[actionColumnIndex];
                if (headerCell) {
                    headerCell.style.display = 'none'; // Hide the "Action" column header cell
                }
            }
    
            // Loop through each row and hide the "Action" column
            table.querySelectorAll('tr').forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length > actionColumnIndex) {
                    cells[actionColumnIndex].style.display = 'none'; // Hide the "Action" column cell
                }
            });
    
            return clonedComponent;
        },
        documentTitle: 'Loan Report',
        onAfterPrint: () => alert("Loan Report successfully Downloaded!"),
    });

    const handlePrintSingle = (loanData) => {
        // Here you can generate a report for the specific vehicleData
        // For example, you can create a new window/tab with the vehicle details to print
        const reportWindow = window.open("", "_blank");

        reportWindow.document.write(`<html><head><title>Loan Report</title></head><body><h1>Loan Details</h1><p>Loan ID: ${loanData.loanId}</p><p>Borrowers Name: ${loanData.BorrowersName}</p><p>Loan Amount: ${loanData.LoanAmount}</p><p>Interest Rate of Loan: ${loanData.InterestRate}</p><p>Loan Period: ${loanData.Period}</p><p>Loan Starting Date: ${formatDate(loanData.StartingDate)}</p><p>Loan Ending Date: ${formatDate(loanData.EndDate)}</p><p>Total Installments of loan:  ${loanData.TotalInstallments}</p><p>Paid Installments of loan: ${loanData.PaidInstallments}</p><p>Notes Relavant to the loan: ${loanData.Notes}</p><p>: ${loanData.LoanStatus}</p></body></html>`);
        reportWindow.document.close();
        reportWindow.print();
    };

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredLoans = data.loan.filter((loan) =>
                Object.values(loan).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                ));
                setLoans(filteredLoans);
            setNoResults(filteredLoans.length === 0);
        });
    };

    const handleAddClick = () => {
        navigate(`/loan-management/addloans`);
    };

    const deleteHandler = async (_id) => {
        try {
            await axios.delete(`http://localhost:5000/Loan/${_id}`);
            setLoans(prevLoans => prevLoans.filter(loan => loan._id !== _id));
        } catch (error) {
            console.error("Error deleting Loan:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
    return (
    <div>
            <br></br>   <br></br>
            <AppBar />
            <Menu />
            <div style={{ marginLeft: '260px', paddingTop: '100px'}}>
            <Breadcrumbs arial-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                <Link underline="hover" key="1" color="inherit" href="/loan-management">
                    Loan Management
                </Link>
            </Breadcrumbs>
                <br></br>
                <br></br>
            <Paper sx={{ width: '100%', boxShadow: 'none' }}>
                <Box >
                <InputBase
                    sx={{ flex: 1, marginLeft: '10px' }}
                    placeholder="Search Loan Details"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startAdornment={<SearchIcon />}
                    />
                    <IconButton color="primary" aria-label="search" onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>


                    <IconButton color="primary" aria-label="Add Loan" onClick={handleAddClick}>
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
                <div ref={ComponentsRef}>
                     <h1 style={{ textAlign: 'center' }}>Details of Loans</h1>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table" sx={{ borderCollapse: 'collapse' }}>
                           
                                <TableHead>
                                    <TableRow
                    sx={{
                      backgroundColor: "#b1c5d4",
                      fontWeight: "bold",
                      border: "none",
                      padding: "5px 10px",
                      "&:hover": {
                        backgroundColor: "#b1c5d4",
                      },
                    }}>
                                      
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Borrowers Name</TableCell>
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Loan Amount</TableCell>
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Interest Rate Of Loan</TableCell>
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Loan Period</TableCell>
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Loan Starting Date</TableCell>
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Loan Ending Date</TableCell>
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Total Installments</TableCell>
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Paid Installments</TableCell>
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Notes </TableCell>                                        
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Loan Status</TableCell>
                                        <TableCell sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Action</TableCell>

                                    </TableRow>
                                </TableHead>


                                <TableBody>
                                    {loans.map((loan) => (
                                        <TableRow key={loan._id}>
                                           

                                            <TableCell sx={{ border: '1px', padding: '5px 10px', backgroundColor: 'white', textAlign: 'center' }}>{loan.BorrowersName}</TableCell>

                                            <TableCell sx={{ border: '1px', padding: '5px 10px', backgroundColor: 'white', textAlign: 'center' }}>{loan.LoanAmount}</TableCell>

                                            <TableCell sx={{ border: '1px', padding: '5px 4px', backgroundColor: 'white', textAlign: 'center' }}>{loan.InterestRate}</TableCell>

                                            <TableCell sx={{ border: '1px', padding: '5px 10px', backgroundColor: 'white', textAlign: 'center' }}>{(loan.Period)}</TableCell>

                                            <TableCell sx={{ border: '1px', padding: '5px 10px', backgroundColor: 'white', textAlign: 'center' }}>{formatDate(loan.StartingDate)}</TableCell>

                                            <TableCell sx={{ border: '1px', padding: '5px 10px', backgroundColor: 'white', textAlign: 'center' }}>{formatDate(loan.EndDate)}</TableCell>

                                            <TableCell sx={{ border: '1px', padding: '5px 10px', backgroundColor: 'white', textAlign: 'center' }}>{loan.TotalInstallments}</TableCell>

                                            <TableCell sx={{ border: '1px', padding: '5px 10px', backgroundColor: 'white', textAlign: 'center' }}>{loan.PaidInstallments}</TableCell>

                                            <TableCell sx={{ border: '1px', padding: '5px 10px', backgroundColor: 'white', textAlign: 'center' }}>{loan.Notes}</TableCell>

                                            <TableCell sx={{ border: '1px', padding: '5px 10px', backgroundColor: 'white', textAlign: 'center' }}>{loan.LoanStatus}</TableCell>

                                            <TableCell sx={{ border: '1px', padding: '5px 10px', backgroundColor: 'white', textAlign: 'center'}}>

                                           


                                                <IconButton onClick={() => navigate(`/loan-management/upateloans/${loan._id}`)} >
                                                <EditIcon
                                                    color="primary"
                                                    aria-label="edit"
                                                    sx={{
                                                      '&:hover': {
                                                        color: '#00008b',
                                                      },
                                                      color: '',
                                                    }} 
                                                />
                                                </IconButton>

                                                <IconButton onClick={() => deleteHandler(loan._id)} >
                                                    <DeleteIcon  color="secondary"
                                                                aria-label="delete"
                                                                sx={{
                                                                    '&:hover': {
                                                                    color: '#FF1B1B',
                                                                    },
                                                                    color: '#CF5C5C',
                                                                    }}/>
                                                </IconButton>

                                                <IconButton onClick={() => handlePrintSingle(loan)} >
                                                    <PrintIcon
                                                     color="primary"
                                                     aria-label="print"
                                                     sx={{
                                                       '&:hover': {
                                                         color: '#00008b',
                                                       },
                                                       color: '',
                                                     }}  />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                           
                        </Table>
                    </TableContainer>


                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={loans.length} // Assuming vehicles is the array of data you want to paginate
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            borderTop: 'none',
                            padding: '12px 16px',
                        }}
                    />

                </div>
            )}
            <br /><br />
            </Paper>
        </div>
    </div>
    )
}

export default Loans;


