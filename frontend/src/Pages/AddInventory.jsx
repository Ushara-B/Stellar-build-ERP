import Menu from "../Components/menu";
import AppBar from "../Components/Appbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCategory from "./InventoryCategory";

import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

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
  { id: 1, title: "Stuctural Components" },
  { id: 2, title: "Concrete and Masorry" },
  { id: 3, title: "Dry wall/ Wall finishing" },
  { id: 4, title: "Elecrical Component" },
  { id: 5, title: "Safty Equiepment" },
  { id: 6, title: "Flooring and Tile" },
  // Add more categories as needed
];

function AddInventory() {
  const history = useNavigate();
  const navigate = useNavigate();
  const [selectedICategory, setSelectedICategory] = useState("");
  const [ICategory, setICategory] = useState([]);
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
    setICategory(event.target.value);
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    console.log(inputs);
  };

  console.log(categories);
  

  const sendRequest = async () => {
    await axios
      .post(`http://localhost:5000/inventories`, {
        Name: String(inputs.Name),
        ICategory: String(inputs.ICategory),
        Quantity: String(inputs.Quantity),
        Value: Number(inputs.Value),
        Supplier: String(inputs.Supplier),
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, selectedICategory);
    sendRequest().then(() => history("/viewInventoryList"));
  };

  return (
    <>
      <div>
        <Modal
          open={open}
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
                  pattern="[A-Za-z]+"
                  onInvalid={(e) => {
                    e.target.setCustomValidity(
                      "Only letter characters are allowed."
                    );
                  }}
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    name="ICategory"
                    value={inputs.ICategory}
                    onChange={handleChange}
                    label="Category"
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
                  min="1"
                  max="10000"
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
