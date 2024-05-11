import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import { Box } from "@mui/material";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1B1A55",
    color: theme.palette.common.white,
    border: 1,
    borderColor: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: "#DEDEDE",
    transition: "background-color 0.3s, color 0.3s",
    cursor: "pointer",
  },
}));

const StyledButton = styled("button")({
  width: "45%",
  padding: "10px",
  marginLeft: "5px",
  color: "white",
});

const columns = [
  { id: "fullName", label: "Name", minWidth: 170 },
  { id: "emp_id", label: "Employee ID", minWidth: 170 },
  { id: "basicSalary", label: "Basic Salary", minWidth: 170 },
  { id: "tax", label: "Tax", minWidth: 170 },
  { id: "netSalary", label: "Net Salary", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170, align: "center" },
];

function PaySlip() {
  const [slips, setSlips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayslips();
  }, []);

  const fetchPayslips = async () => {
    try {
      const response = await axios.get("http://localhost:5000/PaySlip");
      console.log("Response Data: ", response.data); 
      setSlips(response.data.slip);
    } catch (error) {
      console.error("Error fetching payslips:", error);
    }
  };

  const handleEdit = async (id) => {
    const payslipData = await fetchPaySlipById(id);
    printPayslip(payslipData);
  };

  const fetchPaySlipById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/PaySlip/${id}`);
      return response.data.slip;
    } catch (error) {
      console.error("Error fetching payslip:", error);
      return null;
    }
  };

 const handleEditPrint = async (id) => {
    const payslipData = await fetchPaySlipById(id);
    printPayslipID(payslipData);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const ComponentsRef = useRef();

  const filteredPayslips = Array.isArray(slips)
    ? slips.filter((slip) =>
        slip.emp_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const printPayslip = (payslipData) => {
    if (payslipData) {
      const { fullName, emp_id, basicSalary, tax, netSalary } = payslipData; 
      const payslipContent = `
        <div style="padding: 20px; text-align: center;">
          <h1>Hamilton De Silva and Sons company</h1>
          <h2>ERP system for construction company</h2>
          <h3>Payslip</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Employee ID:</strong> ${emp_id}</p>
          <p><strong>Basic Salary:</strong> ${basicSalary}.00</p>
          <p><strong>Tax:</strong> ${tax}.00</p>
          <p><strong>Net Salary:</strong> ${netSalary}.00</p>
        </div>
      `;
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
        <html>
          <head>
            <title>Payslip</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              h1, h2, h3 {
                color: #1B1A55;
              }
              p {
                margin: 5px 0;
              }
            </style>
          </head>
          <body>
            ${payslipContent}
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const printPayslipID = (payslipData) => {
    if (payslipData) {
      const { fullName, emp_id, basicSalary, tax, netSalary } = payslipData; 
      const payslipContent = `
        <div style="padding: 20px; text-align: center;">
          <h1>Hamilton De Silva and Sons company</h1>
          <h2>ERP system for construction company</h2>
          <h3>Payslip</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Employee ID:</strong> ${emp_id}</p>
          <p><strong>Basic Salary:</strong> ${basicSalary}.00</p>
          <p><strong>Tax:</strong> ${tax}.00</p>
          <p><strong>Net Salary:</strong> ${netSalary}.00</p>
        </div>
      `;
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
        <html>
          <head>
            <title>Payslip</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              h1, h2, h3 {
                color: #1B1A55;
              }
              p {
                margin: 5px 0;
              }
            </style>
          </head>
          <body>
            ${payslipContent}
            <script>
              window.onload = function() {
                window.print();
              }
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };
  

  const handleDownload = async (id) => {
    const payslipData = await fetchPaySlipById(id);
    printPayslip(payslipData);
  };

  return (
    <>
      <AppBar />
      <Drawer />
      <div style={{ marginLeft: "260px", paddingTop: "100px" }}>
        <Paper sx={{ width: "100%", boxShadow: "none" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by Employee ID.."
              value={searchTerm}
              onChange={handleSearchChange}
              startAdornment={<SearchIcon fontSize="small" />}
            />
           
          </Box>
          <TableContainer
            ref={ComponentsRef}
            component={Paper}
            xs={12}
            sm={8}
            sx={{
              maxWidth: "90%",
              alignContent: "center",
              display: "block",
              overflow: "hidden",
              borderRadius: "15px",
              margin: "auto",
            }}
          >
            <Table
              sx={{
                minWidth: 650,
                width: "100%",
                borderCollapse: "collapse",
                borderRadius: "15px",
                overflow: "hidden",
              }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayslips
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((row) => (
                    <StyledTableRow
                      key={row._id}
                      tabIndex={-1}
                      role="checkbox"
                    >
                      <StyledTableCell>
                        {row.fullName}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.emp_id}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.basicSalary}
                      </StyledTableCell>
                      <StyledTableCell>{row.tax}</StyledTableCell>
                      <StyledTableCell>
                        {row.netSalary}
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          padding: 2,
                          margin: "auto",
                        }}
                      >
                        <StyledButton
                          sx={{ padding: "10px 35px", backgroundColor:"#535C91",borderRadius:"12px" }}
                          onClick={() => handleEdit(row._id)}
                        >
                          View Payslip
                        </StyledButton>
                        <StyledButton
                          sx={{ padding: "10px 35px", backgroundColor:"#535C91" , borderRadius:"12px"}}
                          onClick={() => handleEditPrint(row._id)}
                        >
                          Print
                        </StyledButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredPayslips.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}

export default PaySlip;
