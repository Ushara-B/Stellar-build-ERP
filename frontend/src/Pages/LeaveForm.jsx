import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LeaveForm() {
 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data here
    console.log(inputs);
    sendRequest().then(() => history('/ActiveLeaves'))
  };

  const sendRequest = async() =>{
    await axios.post("http://localhost:5000/leaves",{
      emp_id: String(inputs.emp_id),
      date: String(inputs.date),
      type: String(inputs.type),
      reason: String(inputs.reason),
    }).then(() => history('ActiveLeaves'))
  }

  const history = useNavigate();
  const [inputs, setInputs] = useState({
    emp_id: "",
    date: "",
    type: "",
    reason: "",
  });

  const handleChange = (e) =>{
    setInputs((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <Grid container className="wrapper1">
      <Grid className="sidebar1">
        <AppBar />
        <Drawer />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        className="leave-form"
        sx={{
          maxWidth: "1000px",
          Width: "100%",
          alignContent: "center",
          display: "block",
          margin: "150px auto auto 250px",

        }}
      >
        <Grid sx={{
          width:"80%",
        }}>
          <h1
            className="headerLeave"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Apply for a Leave
          </h1>
          <form className="leaveForm" onSubmit={handleSubmit}>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Employee ID"
                  name="emp_id"
                  variant="outlined"
                  value={inputs.emp_id}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  name="date"
                  variant="outlined"
                  value={inputs.date}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="leaveType-label">Leave Type</InputLabel>
                  <Select
                    labelId="leaveType-label"
                    name="type"
                    value={inputs.type}
                    onChange={handleChange}
                    label="Leave Type"
                    fullWidth
                    required
                  >
                    <MenuItem value="">Select Leave Type</MenuItem>
                    <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                    <MenuItem value="Vacation Leave">Vacation Leave</MenuItem>
                    <MenuItem value="Personal Leave">Personal Leave</MenuItem>
                    {/* Add more leave types as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  name="reason"
                  label="Reason for Leave"
                  value={inputs.reason}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ borderRadius: "5px" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LeaveForm;
