import React, {useRef } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import AppBar from '../Components/Appbar';
import Drawer from '../Components/menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 170 },
  { id: 'nic', label: 'NIC', minWidth: 170 },
  { id: 'age', label: 'Age', minWidth: 170 },
  { id: 'gender', label: 'Gender', minWidth: 170 },
  { id: 'marital_status', label: 'Marital status', minWidth: 170 },
  { id: 'no', label: 'Contact No', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
];

export default function AllUsers() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data.Users);
    } catch (error) {
      console.error('Error fetching users:', error);
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
  const handlePrintToPdf = useReactToPrint({content: () => ComponentsRef.current,
    documentTitle: 'All users',
  });
  
  const handleViewUser = (userId) => {
    navigate(`/viewuser/${userId}`);
  };

  const handleUpdateUser = (userId) => {
    navigate(`/updateuser/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      fetchUsers(); // Refresh the user list after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.f_Name} ${user.l_Name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_N.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AppBar />
      <Drawer />
      <div style={{ marginLeft: '260px', paddingTop: '100px' }}>
        <Paper sx={{ width: '100%', boxShadow: 'none' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search users.."
              value={searchTerm}
              onChange={handleSearchChange}
              startAdornment={<SearchIcon fontSize="small" />}
            />
            <Box>
              <IconButton color="primary" aria-label="print" onClick={handlePrintToPdf}>
                <PrintIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Add user" onClick={() => navigate('/adduser')}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <TableContainer ref={ComponentsRef}>
            <Table stickyHeader aria-label="sticky table" sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        backgroundColor: '#b1c5d4',
                        fontWeight: 'bold',
                        border: 'none',
                        padding: '5px 10px',
                        '&:hover': {
                          backgroundColor: '#b1c5d4',
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
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                        border: 'none',
                        padding: '8px 16px',
                      }}
                    >
                      <TableCell sx={{ border: '1px', padding: '10px 12px', backgroundColor: 'white' }}>
                        {`${row.f_Name} ${row.l_Name}`}
                      </TableCell>
                      <TableCell sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.user_N}
                      </TableCell>
                      <TableCell sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.role}
                      </TableCell>
                      <TableCell sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.nic}
                      </TableCell>
                      <TableCell sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.age}
                      </TableCell>
                      <TableCell sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.gender}
                      </TableCell>
                      <TableCell sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.m_Status}
                      </TableCell>
                      <TableCell sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.contact_No}
                      </TableCell>
                      <TableCell align="center" sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        <IconButton
                          color="primary"
                          aria-label="view"
                          sx={{
                            '&:hover': {
                              color: '#00008b',
                            },
                            color: '',
                          }}
                          onClick={() => handleViewUser(row._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          aria-label="edit"
                          sx={{
                            '&:hover': {
                              color: '#00008b',
                            },
                            color: '',
                          }}
                          onClick={() => handleUpdateUser(row._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="delete"
                          sx={{
                            '&:hover': {
                              color: '#FF1B1B',
                            },
                            color: '#CF5C5C',
                          }}
                          onClick={() => handleDeleteUser(row._id)}
                        >
                          <DeleteIcon />
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
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: 'none',
              padding: '12px 16px',
            }}
          />
        </Paper>
      </div>
    </>
  );

}




