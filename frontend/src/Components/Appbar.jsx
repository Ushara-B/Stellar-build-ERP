import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Avatar from '@mui/material/Avatar';
import Cheems from '../Assets/cheems.png';

export default function ButtonAppBar() {
  return (
    <AppBar position="fixed"  sx={{ backgroundColor: '#535C91' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Good afternoon!
        </Typography>
        <IconButton>
          <NotificationsActiveIcon sx={{ color:'#ffffff',  mr: 2 }} />
        </IconButton>
        <Button color="inherit">Manager</Button>
        <Avatar alt="Profile" src={Cheems} sx={{ ml: 2 }} /> {/* Fixing the alt prop */}
      </Toolbar>
    </AppBar>
  );
}
