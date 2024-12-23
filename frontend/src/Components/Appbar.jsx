import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'; // Import Button component
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Cheems from '../Assets/cheems.jpeg';

function Appbar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

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

    // Simulated fetch user role
    const fetchUserRole = () => {
      // Assuming userRole is fetched from localStorage
      const storedUserRole = localStorage.getItem('userRole');
      if (storedUserRole) {
        setUserRole(storedUserRole);
      }
    };

    fetchUserRole();

    return () => clearInterval(interval);
  }, [currentTime]);

  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleProfileClick = () => {
    navigate('/user-profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
        <Typography color="inherit" variant="body1">
          {userRole && `Role: ${userRole}`}
        </Typography>
        <IconButton onClick={handleProfileClick}>
          <NotificationsActiveIcon sx={{ color: '#ffffff', mr: 2 }} />
        </IconButton>
        <Avatar alt="Profile" src={Cheems} sx={{ ml: 2 }} onClick={handleProfileClick} />
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;