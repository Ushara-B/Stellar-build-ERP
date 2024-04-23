import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(4),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

function AddSupplier() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    bname: "",
    email: "",
    contact: "",
    address: "",
    tax: 0,
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
      !inputs.total
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/suppliers", inputs);
      showAlert("Supplier added successfully!");
      navigate("/supplier-details");
    } catch (error) {
      console.error("Error adding supplier:", error);
      showAlert("Error adding supplier. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Supplier
      </Typography>
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <TextField
          className={classes.formControl}
          label="Name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          className={classes.formControl}
          label="Business Name"
          name="bname"
          value={inputs.bname}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          className={classes.formControl}
          label="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          className={classes.formControl}
          label="Contact"
          name="contact"
          value={inputs.contact}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          className={classes.formControl}
          label="Address"
          name="address"
          value={inputs.address}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          className={classes.formControl}
          label="Tax"
          name="tax"
          type="number"
          value={inputs.tax}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          className={classes.formControl}
          label="Total"
          name="total"
          type="number"
          value={inputs.total}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Add Supplier
        </Button>
      </form>
    </Container>
  );
}

export default AddSupplier;
