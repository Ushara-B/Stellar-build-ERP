import React, { useState, useEffect } from 'react';
import Drawer from '../Components/menu';
import Appbar from '../Components/Appbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Appbar />
      <Drawer />
      <Box sx={{ marginLeft: '255px', marginTop: '80px', padding: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              User Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Username:
                </Typography>
                <Typography variant="body1">{user.user_N}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Name:
                </Typography>
                <Typography variant="body1">{`${user.f_Name} ${user.l_Name}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Age:
                </Typography>
                <Typography variant="body1">{user.age}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Email:
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Address:
                </Typography>
                <Typography variant="body1">{user.address}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Date Of Birth:
                </Typography>
                <Typography variant="body1">{user.dob}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Gender:
                </Typography>
                <Typography variant="body1">{user.gender}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Marital Status:
                </Typography>
                <Typography variant="body1">{user.m_Status}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  NIC:
                </Typography>
                <Typography variant="body1">{user.nic}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Role:
                </Typography>
                <Typography variant="body1">{user.role}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Contact Number:
                </Typography>
                <Typography variant="body1">{user.contact_No}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Family Contact No:
                </Typography>
                <Typography variant="body1">{user.f_contactNo}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Bank Details:
                </Typography>
                <Typography variant="body1">{user.bank_D}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ViewUser;