import { useState } from "react";
import { Grid } from "@mui/material";
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
    history('/ActiveLeaves');
  };

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
        <Grid
          sx={{
            maxWidth: "1000px",
            Width: "100%",
            alignContent: "center",
            display: "block",
            margin: "auto auto auto auto",
            backgroundColor: "#D9D9D9",
            borderRadius: "50px",
            padding: "30px",
          }}
        >
          <h1
            className="headerLeave"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Apply for a Leave
          </h1>
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
              style={{ backgroundColor:"#535C91"  }}
            >
              Submit
            </button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LeaveForm;
