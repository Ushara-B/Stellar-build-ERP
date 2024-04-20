import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateLeave() {
  // Initialize inputs state with default values
  const [inputs, setInputs] = useState({
    emp_id: "",
    date: "",
    type: "",
    reason: "",
  });

  const history = useNavigate();
  const id = useParams().id;

  // Fetch leave data from the server
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/leaves/${id}`);
        // If data is successfully fetched, update the inputs state
        setInputs(response.data.leave);
      } catch (error) {
        console.error("Error fetching leave:", error);
      }
    };
    fetchHandler();
  }, [id]);

  // Function to send update request to the server
  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/leaves/${id}`, {
        emp_id: String(inputs.emp_id),
        date: String(inputs.date),
        type: String(inputs.type),
        reason: String(inputs.reason),
      });
    } catch (error) {
      console.error("Error updating leave:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      history("/ActiveLeaves");
    });
  };

  return (
    <div>
      <AppBar />
      <Drawer />
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
        <form onSubmit={handleSubmit}>
            <label>Employee ID</label><br/>
            <input
              type="text"
              name="emp_id"
              onChange={handleChange}
              value={inputs.emp_id}
              required
            /><br/><br/>
            <label>Date</label><br/>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={inputs.date}
              required
            /><br/><br/>
            <label>Type</label><br/>
            <select 
            name="type"
            value={inputs.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Sick Leave">Sick leave</option>
            <option value="Vacation Leave">Vacation leave</option>
            <option value="Personal Leave">Personal leave</option>
            {/* Add more options as needed */}
          </select><br/><br/>
            <label>Reason</label><br/>
            <input
              type="text"
              name="reason"
              onChange={handleChange}
              value={inputs.reason}
              required
            /><br/><br/>
            <button type="submit">Submit</button>
          </form>
      </Grid>
    </div>
  );
}

export default UpdateLeave;
