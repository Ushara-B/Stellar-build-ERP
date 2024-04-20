import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Drawer from '../Components/menu';
import Appbar from '../Components/Appbar';
import Swal from 'sweetalert2';

const UpdateInventory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inventory, setInventory] = useState({
    Name: '',
    Category: '',
    Quantity: '',
    Value: '',
    Supplier: '',
    
  });

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

  const handleChange = (e) => {
    setInventory({ ...inventory, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setInventory({ ...inventory, quantity: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });
    if(result.isConfirmed){
      const response = await axios.put(`http://localhost:5000/inventories/${id}`, inventory);
      console.log('Inventory updated successfully:', response.data.inventory);
      navigate('/ViewInventoryList');
      if (response.status === 200) {
        Swal.fire("Updated!", "Your inventory has been updated.", "success");
      }
    }
    } catch (error) {
      console.error("Error updating inventory:",
      error.response ? error.response.data : error
    );
    Swal.fire(
      "Error",
      "An error occurred while updating the inventory.",
      "error");
      
    }
  };

  return (
    <div>
      <Appbar />
      <Drawer />
      <Box
        sx={{
          marginLeft: '255px',
          paddingTop: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '80%',
            maxWidth: 800,
            padding: 4,
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Update Inventory
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                name="Name"
                value={inventory.Name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Category"
                name="Category"
                value={inventory.Category}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                name="Quantity"
                value={inventory.Quantity}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Value"
                name="Value"
                value={inventory.Value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Supplier"
                name="Supplier"
                value={inventory.Supplier}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 7,
                  mb: 2,
                  height: '50px',
                  width: '150px',
                  borderRadius: '21px',
                  backgroundColor: '#1B1A55',
                  '&:hover': {
                    backgroundColor: '#16155d',
                  },
                }}
              >
                Update Inventory
              </Button>
              </Grid>
            </Grid>
          
        </Box>
      </Box>
    </div>

  );
};

export default UpdateInventory;