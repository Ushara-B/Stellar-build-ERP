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
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
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
      console.log("Response Data: ", response.data); // Add this line to check your API response
      setSlips(response.data.slip); // Change setPayslips to setSlips
    } catch (error) {
      console.error("Error fetching payslips:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/PaySlip/${id}`);
  };

  const handlePrintToPdf = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "All Payslips",
  });

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
            <Box>
              <IconButton
                color="primary"
                aria-label="print"
                onClick={handlePrintToPdf}
              >
                <PrintIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Add payslip"
                onClick={() => navigate("/")}
              >
                <AddIcon />
              </IconButton>
            </Box>
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
                width: "100%", // Adjusted width to be 100% of its container
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
                          justifyContent: "space-around", // Adjusted to evenly space the buttons
                          padding: 2,
                          margin: "auto",
                        }}
                      >
                        <StyledButton
                          style={{ padding: "10px 35px", backgroundColor:"#535C91" }}
                          onClick={() => handleEdit(row._id)}
                        >
                          View
                        </StyledButton>
                        <StyledButton
                          style={{ padding: "10px 35px", backgroundColor:"#535C91" }}
                          onClick={() => handleEdit(row._id)}
                        >
                          Download
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
