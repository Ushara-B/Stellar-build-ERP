import React, { useState, useEffect } from 'react';
import Drawer from '../Components/menu';
import Appbar from '../Components/Appbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent,  Grid, Typography } from '@mui/material';

const ViewInventory = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/inventories/${id}`);
        setInventory(response.data.inventories);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
    fetchInventory();
  }, [id]);

  if (!inventory) {
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
              Inventory Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Name:
                </Typography>
                <Typography variant="body1">{inventory.Name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Category:
                </Typography>
                <Typography variant="body1">{inventory.ICategory}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Quantity:
                </Typography>
                <Typography variant="body1">{inventory.Quantity}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                 Value:
                </Typography>
                <Typography variant="body1">{inventory.Value}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                 Supplier:
                </Typography>
                <Typography variant="body1">{inventory.Supplier}</Typography>
              </Grid>
              
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ViewInventory;