import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import TablePagination from "@mui/material/TablePagination";

const columns = [
  { id: "fullName", label: "Name", minWidth: 170 },
  { id: "emp_id", label: "Employee ID", minWidth: 170 },
  { id: "basicSalary", label: "Basic Salary", minWidth: 170 },
  { id: "tax", label: "Tax", minWidth: 170 },
  { id: "insurance", label: "Insurance", minWidth: 170 },
  { id: "netSalary", label: "Net Salary", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170, align: "center" },
];

export default function PaySlip() {
  const [payslips, setPayslips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayslips();
  }, []);

  const fetchPayslips = async () => {
    try {
      const response = await axios.get("http://localhost:5000/PaySlip");
      setPayslips(response.data);
    } catch (error) {
      console.error("Error fetching payslips:", error);
    }
  };

  // pdf print function
  const ComponentsRef = React.useRef();
  const handlePrintToPdf = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "All payslips",
  });

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
           
            <Box>
              <IconButton
                color="primary"
                aria-label="print"
                onClick={handlePrintToPdf}
              >
                <PrintIcon />
              </IconButton>
            </Box>
          </Box>
          <TableContainer ref={ComponentsRef}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ borderCollapse: "collapse", width: "80%", margin: "auto" }}
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        backgroundColor: "#b1c5d4",
                        fontWeight: "bold",
                        border: "none",
                        padding: "5px 10px",
                        "&:hover": {
                          backgroundColor: "#b1c5d4",
                        },
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                 { payslips.map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#DEDEDE", // Background color on hover
                          transition: "background-color 0.3s, color 0.3s", // Smooth transition
                          cursor: "pointer", // Change cursor to pointer on hover
                        },
                        border: "none",
                        padding: "8px 16px",
                      }}
                    >
                      <TableCell
                        sx={{
                          border: "1px solid",
                          padding: "10px 12px",
                          backgroundColor: "white",
                        }}
                      >
                        {row.fullName}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid",
                          padding: "10px 12px",
                          backgroundColor: "white",
                        }}
                      >
                        {row.emp_id}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid",
                          padding: "10px 12px",
                          backgroundColor: "white",
                        }}
                      >
                        {row.basicSalary}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid",
                          padding: "10px 12px",
                          backgroundColor: "white",
                        }}
                      >
                        {row.tax}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid",
                          padding: "10px 12px",
                          backgroundColor: "white",
                        }}
                      >
                        {row.insurance}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid",
                          padding: "10px 12px",
                          backgroundColor: "white",
                        }}
                      >
                        {row.netSalary}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid",
                          padding: "10px",
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        
                        
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: "none",
              padding: "12px 16px",
            }}
          />
        </Paper>
      </div>
    </>
  );
}
