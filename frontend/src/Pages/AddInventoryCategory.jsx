import Menu from "../Components/menu";
import AppBar from "../Components/Appbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCategory from "./InventoryCategory";

import {
  Grid,
  TextField
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

function AddInventoryCategory() {
  const history = useNavigate();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState({
    Name: ""
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

 

  return (
    <>
    <div>
      
      <Modal
        open={open}
        //onClose={handleClose}
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

              <Button>
                  Submit
                </Button>
              </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default AddCategoryInventory;
