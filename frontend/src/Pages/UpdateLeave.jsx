import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
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
      if (error.response && error.response.data && error.response.data.message) {
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
        item
        xs={12}
        sm={8}
        className="leave-form"
        sx={{
          maxWidth: "1000px",
          Width: "100%",
          alignContent: "center",
          display: "block",
          margin: "150px auto auto 350px",
          backgroundColor:"#D9D9D9",
          borderRadius:"50px"
        }}
      ><h1>Update your leave  </h1>
        <form onSubmit={handleSubmit}>
            <label>Employee ID</label>
            <br />
            <input
              type="text"
              name="emp_id"
              onChange={handleChange}
              value={inputs.emp_id}
              required
              style={{ borderRadius: "10px", padding: "8px", width: "100%", border:"0" }}
            />
            <br />
            <br />
            <label>Date</label>
            <br />
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={inputs.date}
              required
              style={{ borderRadius: "10px", padding: "8px", width: "100%",border:"0" }}
            />
            <br />
            <br />
            <label>Type</label>
            <br />
            <select
              name="type"
              value={inputs.type}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", padding: "8px", width: "100%" ,border:"0"}}
            >
              <option value="">Select Type</option>
              <option value="Sick Leave">Sick leave</option>
              <option value="Vacation Leave">Vacation leave</option>
              <option value="Personal Leave">Personal leave</option>
              {/* Add more options as needed */}
            </select>
            <br />
            <br />
            <label>Reason</label>
            <br />
            <input
              type="text"
              name="reason"
              onChange={handleChange}
              value={inputs.reason}
              required
              style={{ borderRadius: "10px", padding: "8px", width: "100%", border:"0" }}
            />
            <br />
            <br />
            <button
              type="submit"
              
            >
              Submit
            </button>
          </form>
      </Grid>
    </div>
  );
}

export default UpdateLeave;
