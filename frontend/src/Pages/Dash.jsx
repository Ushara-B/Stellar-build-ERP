import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../Components/Appbar';
import Drawer from '../Components/menu';
import { Grid, Paper, Typography, Box, Avatar, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ContactsIcon from '@mui/icons-material/Contacts';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupIcon from '@mui/icons-material/Group';

const TileWrapper = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ textDecoration: 'none', color: 'inherit' }} {...props} />
));

function Dash() {
  const handleTileClick = (path) => {
    // Handle tile click event and navigate to the specified path
    console.log(`Navigating to ${path}`);
  };

  return (
    <div>
      <AppBar />
      <Drawer />

      <div style={{ marginLeft: '270px', paddingTop: '130px', padding: '30px' }}>
        <br></br> <br></br>
        <h1>DASHBOARD</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/projects"
              onClick={() => handleTileClick('/projects')}
              component={TileWrapper}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Avatar style={{ backgroundColor: '#3f51b5', marginBottom: '10px' }}>
                  <DashboardIcon />
                </Avatar>
                <Typography variant="h6">Projects</Typography>
                <Typography variant="body1">View and manage projects</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/inventory"
              onClick={() => handleTileClick('/inventory')}
              component={TileWrapper}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Avatar style={{ backgroundColor: '#f44336', marginBottom: '10px' }}>
                  <InventoryIcon />
                </Avatar>
                <Typography variant="h6">Inventory</Typography>
                <Typography variant="body1">Monitor and control inventory</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/finance"
              onClick={() => handleTileClick('/finance')}
              component={TileWrapper}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Avatar style={{ backgroundColor: '#4caf50', marginBottom: '10px' }}>
                  <AttachMoneyIcon />
                </Avatar>
                <Typography variant="h6">Financials</Typography>
                <Typography variant="body1">View and manage financials</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/vehicle"
              onClick={() => handleTileClick('/vehicle')}
              component={TileWrapper}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Avatar style={{ backgroundColor: '#ff9800', marginBottom: '10px' }}>
                  <DirectionsCarIcon />
                </Avatar>
                <Typography variant="h6">Vehicle Management</Typography>
                <Typography variant="body1">Manage vehicle fleet</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/contact"
              onClick={() => handleTileClick('/contact')}
              component={TileWrapper}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Avatar style={{ backgroundColor: '#9c27b0', marginBottom: '10px' }}>
                  <ContactsIcon />
                </Avatar>
                <Typography variant="h6">Contacts</Typography>
                <Typography variant="body1">Manage contacts</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/userdash"
              onClick={() => handleTileClick('/userdash')}
              component={TileWrapper}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Avatar style={{ backgroundColor: '#673ab7', marginBottom: '10px' }}>
                  <SupervisedUserCircleIcon />
                </Avatar>
                <Typography variant="h6">User Management</Typography>
                <Typography variant="body1">Manage users</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/loan-management"
              onClick={() => handleTileClick('/loan-management')}
              component={TileWrapper}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Avatar style={{ backgroundColor: '#00bcd4', marginBottom: '10px' }}>
                  <MonetizationOnIcon />
                </Avatar>
                <Typography variant="h6">Loans</Typography>
                <Typography variant="body1">View and manage loans</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/employee-management"
              onClick={() => handleTileClick('/employee-management')}
              component={TileWrapper}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Avatar style={{ backgroundColor: '#009688', marginBottom: '10px' }}>
                  <GroupIcon />
                </Avatar>
                <Typography variant="h6">Employees</Typography>
                <Typography variant="body1">Manage employees</Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Divider />
        </Box>
      </div>
    </div>
  );
}

export default Dash;