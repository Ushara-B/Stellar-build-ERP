// AddCategory.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';


const InventoryCategory = ({closeEvent}) => {
  const history = useNavigate();
  const [newICategory, setNewICategory] = useState('');
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    Name: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const sendRequest = async () => {
    await axios
      .post(`http://localhost:5000/icategories`, {
        Name: String(inputs.Name)
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => closeEvent());
  };


  return (
    <>
     
    
    <Box
      sx={{ m:2}}
    />
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
          value={inputs.Name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          
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
    
    </>
  );
};

export default InventoryCategory;