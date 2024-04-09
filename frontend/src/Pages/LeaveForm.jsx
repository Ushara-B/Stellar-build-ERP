import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
} from "@mui/material";
import "../css/LeaveForm.css";
import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";

function LeaveForm() {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reasonForLeave, setReasonForLeave] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data here
    console.log("Employee ID:", employeeId);
    console.log("Date:", date);
    console.log("Leave Type:", leaveType);
    console.log("Reason for Leave:", reasonForLeave);
  };

  return (
    <Grid container className="wrapper">
      <Grid className="sidebar">
        <AppBar />
        <Drawer />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        className="content-form"
        sx={{
          
          marginBottom: "30px",
          display: "block",
          margin:"auto"
        }}
      >
        <section>
          <h1>Apply for a leave</h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={6} >
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  value={employeeId}
                  onChange={(event) => setEmployeeId(event.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  variant="outlined"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="leaveType-label">Leave Type</InputLabel>
                  <Select
                    labelId="leaveType-label"
                    value={leaveType}
                    onChange={(event) => setLeaveType(event.target.value)}
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
                  minRows={5}
                  fullWidth
                  label="Reason for Leave"
                  value={reasonForLeave}
                  onChange={(event) => setReasonForLeave(event.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </section>
      </Grid>
    </Grid>
  );
}

export default LeaveForm;
