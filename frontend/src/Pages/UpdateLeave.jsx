import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateLeave() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Initialize inputs state with default values
  const [inputs, setInputs] = useState({
    emp_id: "",
    date: "",
    type: "",
    reason: "",
  });

  // Fetch leave data from the server
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/leaves/${id}`);
        // If data is successfully fetched, update the inputs state
        setInputs(response.data);
      } catch (error) {
        console.error("Error fetching leave:", error);
      }
    };
    fetchHandler();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/leaves/${id}`,
        inputs
      );
      console.log("Leave updated successfully:", response.data);
      navigate("/ActiveLeaves");
    } catch (error) {
      console.error("Error updating leave:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Error updating leave: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <AppBar />
      <Drawer />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        textAlign="center" // Center align the form
        sx={{
          maxWidth: "1000px",
          margin: "150px auto auto auto",
          backgroundColor: "#D9D9D9", // Background color for the form
          borderRadius: "50px", // Border radius for the form
          padding: "20px", // Add padding to the form
          
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Update your leave
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ backgroundColor: "#fff", borderRadius: "15px" }}
              label="Employee ID"
              name="emp_id"
              value={inputs.emp_id}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputProps={{ disableUnderline: true }}
            />
            <TextField
              sx={{ backgroundColor: "#fff", borderRadius: "15px"}}
              label="Date"
              name="date"
              type="date"
              value={inputs.date}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              InputProps={{ disableUnderline: true }}
            />
            <TextField
              sx={{ backgroundColor: "#fff", borderRadius: "15px" }}
              select
              label="Type"
              name="type"
              value={inputs.type}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{ disableUnderline: true }}
            >
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="Sick Leave">Sick leave</MenuItem>
              <MenuItem value="Vacation Leave">Vacation leave</MenuItem>
              <MenuItem value="Personal Leave">Personal leave</MenuItem>
            </TextField>
            <TextField
              sx={{ backgroundColor: "#fff", borderRadius: "15px" }}
              label="Reason"
              name="reason"
              value={inputs.reason}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              InputProps={{ disableUnderline: true }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, borderRadius:"15px",backgroundColor: "#535C91", "&:hover": { backgroundColor: "#3D446F" } }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default UpdateLeave;
