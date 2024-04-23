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
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

export default function ButtonAppBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const updateGreeting = () => {
      const hour = currentTime.getHours();
      if (hour >= 0 && hour < 12) {
        setGreeting('Good Morning! ');
      } else if (hour >= 12 && hour < 18) {
        setGreeting('Good Afternoon! ');
      } else if (hour >= 18 && hour < 20) {
        setGreeting('Good Evening! ');
      } else {
        setGreeting('Good Night! ');
      }
    };

    updateGreeting();

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${month}/${day}/${year}  ${hours}:${minutes}:${seconds}`;
  };

  const handleProfileClick = () => {
    // Redirect to /user-profile
    window.location.href = '/user-profile';
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#535C91' }}>
      <Toolbar>
      
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ mr: 7 }}>
          {formatTime(currentTime)}
          </Typography>
          <Typography variant="h6" component="div">
          {greeting}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} /> 
        <IconButton onClick={handleProfileClick}>
          <NotificationsActiveIcon sx={{ color: '#ffffff', mr: 2 }} />
        </IconButton>
        <Button color="inherit">Manager</Button>
        <Avatar alt="Profile" src={Cheems} sx={{ ml: 2 }} onClick={handleProfileClick} />
      </Toolbar>
    </AppBar>
  );
}