// AddCategory.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import AppBar  from '../Components/Appbar';
import Menu  from '../Components/menu';

const AddCategory = () => {
  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/categories', { name: newCategory });
      navigate('/Newprojects'); // Navigate to the AddProject page after adding the category
    } catch (error) {
      console.error('Error adding new category:', error);
    }
  };

  return (
    <>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: '255px'}}>
    
    <Box
      sx={{
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
          maxWidth: 400,
          padding: 4,
          bgcolor: 'background.paper',
          boxShadow: 3,
        }}
      >
        <Typography align="center" gutterBottom variant="h4" component="h2">
          Add New Category
        </Typography>
        <br />
        <TextField
          label="Category Name"
          value={newCategory}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Add Category
        </Button>
      </Box>
    </Box>
    </div>
    </>
  );
};

export default AddCategory;