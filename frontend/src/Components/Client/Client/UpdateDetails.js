import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Container,
} from "@mui/material";
import Menu from "../../menu";
import AppBar from "../../Appbar";

const UpdateDetails = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const [clientDetails, setClientDetails] = useState({
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const fetchClientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/clients/${id}`);
      setClientDetails(response.data.client);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching client details:", error);
      setError("Error fetching client details");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/clients/${id}`, clientDetails);
      alert("Successfully uploaded client details");
      window.location.href = "/client-details";
    } catch (error) {
      console.error("Error updating client details:", error);
      setError("Error updating client details");
    }
  };

  if (loading) return <CircularProgress />;

  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <div>
      <AppBar />
      <Menu />

      <div style={{ marginLeft: "255px", paddingTop: "80px" }}>
        <div>
          <Container maxWidth="sm">
            {/* Centers the form */}
            <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
              {/* Adds border */}
              <Typography variant="h4" gutterBottom align="center">
                Update Client
              </Typography>
              <form onSubmit={handleSubmit}>
                {/* Input fields for client information */}
                <br />
                <TextField
                  label="Name"
                  name="name"
                  value={clientDetails.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <br /><br />
                <TextField
                  label="Business Name"
                  name="bname"
                  value={clientDetails.bname}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <br /><br />
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  value={clientDetails.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <br /><br />
                <TextField
                  label="Contact"
                  name="contact"
                  value={clientDetails.contact}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    inputProps: {
                      pattern: "^[0-9]{10}$", // Regex for 10-digit phone number
                      title: "Please enter a valid 10-digit phone number",
                    },
                  }}
                />

                <br /><br />
                <TextField
                  label="Address"
                  name="address"
                  value={clientDetails.address}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <br /><br />
                <TextField
                  type="number"
                  label="Tax"
                  name="tax"
                  value={clientDetails.tax}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <br /><br />
                <TextField
                  label="Recent Project"
                  name="rproject"
                  value={clientDetails.rproject}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <br /><br />
                <TextField
                  label="Current Project"
                  name="cproject"
                  value={clientDetails.cproject}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <br /><br />
                <TextField
                  type="number"
                  label="Total"
                  name="total"
                  value={clientDetails.total}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <br /><br />
                <div style={{ textAlign: "center", margin: "25px 0" }}>
                  <Button type="submit" variant="contained" color="primary">
                    Update Details
                  </Button>
                </div>
              </form>
            </Paper>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetails;
