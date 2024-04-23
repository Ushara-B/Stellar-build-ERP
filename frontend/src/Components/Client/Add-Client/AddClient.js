import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Paper, Container } from "@material-ui/core";
import Menu from '../../menu';
import AppBar from '../../Appbar';

const useStyles = makeStyles((theme) => ({
  adminTopicClient: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "10px 0",
    textTransform: "capitalize",
    fontSize: 35,
  },
  itemFullBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "25px 0",
  },
  itemFormAdmin: {
    border: "2px solid #2196f3",
    padding: 25,
    borderRadius: 5,
    width: 450,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  },
  formBoxItemLabel: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 18,
  },
  formBoxItemInput: {
    width: "100%",
    fontSize: 17,
    padding: "0px",
    borderRadius: 3,
    margin: "8px 0",
    border: "1.5px solid #2196f3",
  },
  adminFormCenterBtn: {
    backgroundColor: "#2196f3",
    color: "white",
    border: "2px solid #2196f3",
    fontSize: 20,
    cursor: "pointer",
    borderRadius: 3,
    padding: "8px 16px",
    textDecoration: "none",
    fontWeight: "bold",
    margin: "20px auto 0 auto",
    display: "flex",
    textTransform: "capitalize",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  },
}));

function AddClient() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    bname: "",
    email: "",
    contact: "",
    address: "",
    tax: 0,
    rproject: "",
    cproject: "",
    total: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.name ||
      !inputs.bname ||
      !inputs.email ||
      !inputs.contact ||
      !inputs.address ||
      !inputs.tax ||
      !inputs.rproject ||
      !inputs.cproject ||
      !inputs.total
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/clients", inputs);
      showAlert("Client added successfully!");
      navigate("/client-details");
    } catch (error) {
      console.error("Error adding client:", error);
      showAlert("Error adding client. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  return (

    <div>
    <AppBar />
        <Menu/>

    <div style={{ marginLeft: '255px', paddingTop: '80px' }}>'
    <Container maxWidth="sm">
    
      {/* Centers the form */}
      <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
      
        {/* Adds border */}
        <Typography variant="h4" gutterBottom align="center">
          Add Client
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Input fields for client information */}
          <br />
          <TextField
            label="Name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <br />
          <TextField
            label="Business Name"
            name="bname"
            value={inputs.bname}
            onChange={handleChange}
            fullWidth
            required
          />
          <br />
          <TextField
            type="email"
            label="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <br />
          <TextField
            label="Contact"
            name="contact"
            value={inputs.contact}
            onChange={handleChange}
            fullWidth
            required
          />
          <br />
          <TextField
            label="Address"
            name="address"
            value={inputs.address}
            onChange={handleChange}
            fullWidth
            required
          />
          <br />
          <TextField
            type="number"
            label="Tax"
            name="tax"
            value={inputs.tax}
            onChange={handleChange}
            fullWidth
            required
          />
          <br />
          <TextField
            label="Recent Project"
            name="rproject"
            value={inputs.rproject}
            onChange={handleChange}
            fullWidth
            required
          />
          <br />
          <TextField
            label="Current Project"
            name="cproject"
            value={inputs.cproject}
            onChange={handleChange}
            fullWidth
            required
          />
          <br />
          <TextField
            type="number"
            label="Total"
            name="total"
            value={inputs.total}
            onChange={handleChange}
            fullWidth
            required
          />

          <div style={{ textAlign: "center", margin: "25px 0" }}>
            <Button type="submit" variant="contained" color="primary">
            AddClient
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
    </div>
    </div>
  );
}

export default AddClient;
