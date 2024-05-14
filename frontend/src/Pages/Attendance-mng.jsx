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
import { styled } from "@mui/material/styles";

const columns = [
  { id: "name", label: "Name" },
  { id: "emp_id", label: "Employee ID" },
  { id: "role", label: "Role" },
  { id: "actions", label: "Actions", align: "center" },
];

const StyledButton = styled(Button)({
  backgroundColor: "#535C91",
  color: "white",
  width: "45%",
  marginRight: "10px",
  "&:hover": {
    backgroundColor: "#405487",
  },
});

const EmployeeDetailsContent = ({ user }) => (
  <div>
    <h2>{`${user.f_Name} ${user.l_Name}'s Attendance`}</h2>
    <p>User ID: {user.user_N}</p>
    <p>Role: {user.role}</p>
    {/* Add more details as needed */}
  </div>
);

export default function AttendanceMng() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState({});
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
  });

  const markAttendance = async (userId) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    // Check if attendance has already been marked for the user today
    if (attendanceMarked[userId] === currentDate) {
      setSuccessMessage("You have already marked the attendance");
      setOpenSuccessSnackbar(true);
      return;
    }
    // Proceed with marking attendance
    setSelectedUserId(userId);
    setConfirmationOpen(true);
    // Update the attendanceMarked state
    setAttendanceMarked(prevState => ({ ...prevState, [userId]: currentDate }));
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

  const handleViewAttendance = (userId) => {
    const selectedUser = users.find((user) => user._id === userId);
    handlePrintToPdf({
      content: () => <EmployeeDetailsContent user={selectedUser} />,
      documentTitle: `${selectedUser.f_Name} ${selectedUser.l_Name}'s Attendance`,
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.f_Name} ${user.l_Name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.user_N.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

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
                          width: "40%",
                        }}
                      >
                        <StyledButton
                          variant="contained"
                          onClick={() => markAttendance(row._id)}
                        >
                          Mark Attendance
                        </StyledButton>
                        <StyledButton
                          variant="contained"
                          onClick={() => handleViewAttendance(row._id)}
                        >
                          View Attendance
                        </StyledButton>
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
