import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LeaveForm() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    emp_id: "",
    date: "",
    type: "",
    reason: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest();
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/leaves", {
      emp_id: inputs.emp_id,
      date: inputs.date,
      type: inputs.type,
      reason: inputs.reason,
    });
    history("/ActiveLeaves");
  };

  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

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
            Apply your leave
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
              sx={{ backgroundColor: "#fff", borderRadius: "15px" }}
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
              inputProps={{ min: currentDate }} // Set min attribute to current date
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
              sx={{
                mt: 2,
                borderRadius: "15px",
                backgroundColor: "#535C91",
                "&:hover": { backgroundColor: "#3D446F" },
              }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default LeaveForm;
