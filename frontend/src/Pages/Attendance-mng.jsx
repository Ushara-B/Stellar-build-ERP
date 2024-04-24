import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const columns = [
  { id: "name", label: "Name" },
  { id: "emp_id", label: "Employee ID" },
  { id: "role", label: "Role" },
  { id: "actions", label: "Actions", align: "center" },
];

export default function AttendanceMng() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data.Users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //pdf print function
  const ComponentsRef = useRef();
  const handlePrintToPdf = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "All users",
  });

  const markAttendance = async (userId) => {
    setSelectedUserId(userId);
    setConfirmationOpen(true);
  };

  const handleConfirmAttendance = async () => {
    try {
      const currentTime = new Date();
      const selectedUser = users.find((user) => user._id === selectedUserId);
      if (!selectedUser || !selectedUser._id) {
        console.error("Selected user or user ID not found");
        return;
      }
      const attendanceData = {
        uId: selectedUser._id,
        emp_id: selectedUser.user_N,
        date: currentTime.toISOString().slice(0, 10),
        clock_in: currentTime.toISOString(),
      };

      await axios.post("http://localhost:5000/attendance", attendanceData);
      console.log("Attendance marked successfully!");
      setConfirmationOpen(false);
      setSuccessMessage("Attendance marked successfully!");
      setOpenSuccessSnackbar(true);
      // Optionally, you can add additional logic here after marking attendance
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const handleCancelAttendance = () => {
    setConfirmationOpen(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessSnackbar(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.f_Name} ${user.l_Name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.user_N.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (userId) => {
    navigate(`/viewAttendance/${userId}`);
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
            </Box>
          </Box>
          <TableContainer ref={ComponentsRef}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ borderCollapse: "collapse", width: "75%", margin: "auto" }}
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
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#DEDEDE", 
                          transition: "background-color 0.3s, color 0.3s", 
                          cursor: "pointer", 
                        },
                        border: "none",
                        padding: "8px 16px",
                      }}
                    >
                      <TableCell
                        sx={{
                          border: "1",
                          padding: "10px 12px",
                          backgroundColor: "white",
                        }}
                      >{`${row.f_Name} ${row.l_Name}`}</TableCell>
                      <TableCell
                        sx={{
                          border: "1",
                          padding: "10px 12px",
                          backgroundColor: "white",
                        }}
                      >
                        {row.user_N}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1",
                          padding: "10px 12px",
                          backgroundColor: "white",
                        }}
                      >
                        {row.role}
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          border: "1",
                          padding: "10px",
                          backgroundColor: "white",
                          display: "flex",
                          width: "40%",
                        }}
                      >
                        <button
                          style={{ backgroundColor: "#535C91", width: "45%" }}
                          onClick={() => markAttendance(row._id)}
                        >
                          Mark Attendance
                        </button>
                        <button
                          style={{ backgroundColor: "#535C91", width: "45%" }}
                          onClick={() => handleViewUser(row._id)}
                        >
                          View Attendance
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredUsers.length}
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

      <Dialog open={confirmationOpen} onClose={handleCancelAttendance}>
        <DialogTitle>Confirm Attendance</DialogTitle>
        <DialogContent>
          Are you sure you want to mark attendance for this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAttendance} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmAttendance} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
