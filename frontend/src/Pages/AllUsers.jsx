import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
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

const columns = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'age', label: 'Age', minWidth: 100, },
  { id: 'role', label: 'Role', minWidth: 170 },
  { id: 'nic', label: 'NIC', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
];

const userRows = [
  { id: 1, username: 'useraa', name: 'John Doe', age: 25, role: 'Admin', nic: '123456789V' },
  { id: 2, username: 'userf', name: 'Jane Smith', age: 30, role: 'User', nic: '987654321V' },
  { id: 3, username: 'userdd', name: 'Bob Johnson', age: 35, role: 'User', nic: '456789123V' },
  { id: 4, username: 'user1', name: 'Alice Johnson', age: 28, role: 'User', nic: '111111111V' },

];

export default function AllUsers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [orderBy, setOrderBy] = React.useState('username');
  const [order, setOrder] = React.useState('asc');

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

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePrintToPdf = () => {
    //  logic to print the table data to a PDF
    console.log('Printing to PDF...');
  };

  const sortedUsers = userRows.sort((a, b) => {
    const isAsc = order === 'asc';
    return (
      (isAsc ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy])) * (order === 'asc' ? 1 : -1)
    );
  });

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nic.toLowerCase().includes(searchTerm.toLowerCase())
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
              <IconButton color="primary" aria-label="add">
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table" sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sortDirection={orderBy === column.id ? order : false}
                      sx={{
                        backgroundColor: '#b1c5d4',
                        fontWeight: 'bold',
                        border: 'none',
                        padding: '5px 10px',
                        '&:hover': {
                          backgroundColor: '#b1c5d4'},
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                          },
                          border: 'none',
                          padding: '8px 16px',
                        }}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{
                                border: 'none',
                                padding: '10px 12px',
                                backgroundColor:'white',
                              }}
                            >
                              {column.id === 'actions' ? (
                                <>
                                  <IconButton
                                    color="primary"
                                    aria-label="view"
                                    sx={{
                                      '&:hover': {
                                        color: '#00008b',
                                      },
                                      color: '',
                                    }}
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
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
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