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
import { Box, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const URL = "http://localhost:5000/leaves";

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

const ConfirmationDialog = ({ open, handleClose, handleConfirmDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this leave?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function ActiveLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [leaveToDelete, setLeaveToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const history = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeavesFromDatabase();
  }, []);

  const fetchLeavesFromDatabase = async () => {
    try {
      const response = await axios.get(URL);
      setLeaves(response.data.leaves);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const deleteHandler = async (id) => {
    setLeaveToDelete(id);
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/leaves/${leaveToDelete}`);
      // After successful deletion, update the leaves state to reflect the changes
      setLeaves(leaves.filter((leave) => leave._id !== leaveToDelete));
      setConfirmationOpen(false);
      setSnackbarMessage("Leave deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting leave:", error);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const handleEdit = (id) => {
    history(`/ActiveLeaves/${id}`);
  };

 const handlePrintToPdf = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Leave Summary Sheet",
    pageStyle: `@page {
      size: A4;
    }
    @media print {
      .hide-on-print {
        display: none;
      }
      
    }`,
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const ComponentsRef = useRef();

  // Filter leaves based on search term
  const filteredLeaves = leaves.filter((leave) =>
    leave.emp_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <style>
        {`
          @media print {
            .hide-on-print {
              display: none;
            }
          }
          .pdf-header {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }
        `}
      </style>
      <AppBar />
      <Drawer />
      <div style={{ marginLeft: '260px', paddingTop: '100px' }}>
        <Paper sx={{ width: '100%', boxShadow: 'none' }}>
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
              placeholder="Search users.."
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
              <IconButton color="primary" aria-label="Add user" onClick={() => navigate('/LeaveForm')}>
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
              margin:"auto"
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
                  <StyledTableCell>Employee ID</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">Reason</StyledTableCell>
                  <StyledTableCell align="center" className="hide-on-print">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLeaves.map((leave, index) => (
                  <StyledTableRow key={index} >
                    <StyledTableCell component="th" scope="row">
                      {leave.emp_id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {leave.date}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {leave.type}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {leave.reason}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className="hide-on-print"
                    >
                      <StyledButton
                        style={{padding:"10px 35px", borderRadius:"12px" }}
                        onClick={() => handleEdit(leave._id)}
                      >
                        Edit
                      </StyledButton>
                      <StyledButton
                        style={{ padding:"10px 35px", backgroundColor:"#992045" , borderRadius:"12px"}}
                        onClick={() => deleteHandler(leave._id)}
                      >
                        Delete
                      </StyledButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <ConfirmationDialog
        open={confirmationOpen}
        handleClose={handleCloseConfirmation}
        handleConfirmDelete={handleConfirmDelete}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </>
  );
}

export default ActiveLeaves;
