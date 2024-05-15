import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Modal,
  Box,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "../Components/Appbar";
import Menu from "../Components/menu";
import AddCategory from "./InventoryCategory";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const categories = [
  { id: 1, title: "Structural Components" },
  { id: 2, title: "Concrete and Masonry" },
  { id: 3, title: "Dry Wall/Wall Finishing" },
  { id: 4, title: "Electrical Components" },
  { id: 5, title: "Safety Equipment" },
  { id: 6, title: "Flooring and Tile" },
  // Add more categories as needed
];

function AddInventory() {
  const navigate = useNavigate();
  const [selectedICategory, setSelectedICategory] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState({
    Name: "",
    ICategory: "",
    Quantity: "",
    Value: "",
    Supplier: "",
  });

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleICategoryChange = (event) => {
    setSelectedICategory(event.target.value);
    setInputs({ ...inputs, ICategory: event.target.value });
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/inventories`, {
        Name: String(inputs.Name),
        ICategory: String(inputs.ICategory),
        Quantity: String(inputs.Quantity),
        Value: Number(inputs.Value),
        Supplier: String(inputs.Supplier),
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/viewInventoryList"));
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddCategory closeEvent={handleClose} />
          </Box>
        </Modal>
      </div>
      <div>
        <AppBar />
        <Menu />
        <Box
          sx={{
            marginLeft: "255px",
            paddingTop: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "80%",
              maxWidth: 800,
              padding: 4,
              bgcolor: "background.paper",
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Add New Inventory Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  name="Name"
                  value={inputs.Name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Name here"
                  required
                  pattern="[A-Za-z ]+"
                  onInvalid={(e) => {
                    e.target.setCustomValidity(
                      "Only letter characters are allowed."
                    );
                  }}
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="Icategory"
                    value={selectedICategory}
                    onChange={handleICategoryChange}
                    label="ICategory"
                    name="ICategory"
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.title}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Quantity"
                  name="Quantity"
                  value={inputs.Quantity}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter quantity here"
                  required
                  type="number"
                  inputProps={{ min: "1", max: "10000" }}
                  onInvalid={(e) => {
                    e.target.setCustomValidity(
                      "Please enter a number between 1 and 10000."
                    );
                  }}
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Value (Unit Price)"
                  name="Value"
                  value={inputs.Value}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter value here"
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Supplier"
                  name="Supplier"
                  value={inputs.Supplier}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Supplier Name here"
                  required
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
                    height: "50px",
                    width: "150px",
                    borderRadius: "21px",
                    backgroundColor: "#1B1A55",
                    "&:hover": {
                      backgroundColor: "#16155d",
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default AddInventory;
