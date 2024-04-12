import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
}));

const AllUsers = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');

  const userRows = [
    { id: 1, username: 'user1', name: 'John Doe', age: 25, role: 'Admin', nic: '123456789V' },
    { id: 2, username: 'user2', name: 'Jane Smith', age: 30, role: 'User', nic: '987654321V' },
    { id: 3, username: 'user3', name: 'Bob Johnson', age: 35, role: 'User', nic: '456789123V' },
    // Add more user data here
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = userRows.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.searchRoot}>
          <InputBase
            className={classes.searchInput}
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton className={classes.searchIconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add">
            <AddIcon />
          </IconButton>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>NIC</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.nic}</TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="view">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AllUsers;