import React, { useState } from "react";
import AppBar from "../Components/Appbar";
import Menu from "../Components/menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Newprojects.css";

function Newprojects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState({
    
    projectName: "",
    projectBudget: "",
    Employees: "",
    Status: "",
    startDate: "",
    endDate: "",
    projectType: "",
  });
  const handleChange = (e) => {
    setProjects((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(projects);
    sendRequest()
      .then(() => navigate("/Allprojects"))
      .catch((err) => console.log(err));
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:5000/projects", {
     
      projectName: String(projects.projectName),
      projectBudget: Number(projects.projectBudget),
      Employees: String(projects.Employees),
      Status: String(projects.Status),
      startDate: Date(projects.startDate),
      endDate: Date(projects.endDate),
      projectType: String(projects.projectType),
    });
  };
  return (
    <div style={{ marginLeft: "255px", paddingTop: "80px" }}>
      <AppBar />
      <Menu />
      <h1>Add new projects</h1>
      <form onSubmit={handleSubmit}>
       

        <label>Project Name</label>

        <input
          type="text"
          name="projectName"
          onChange={handleChange}
          value={projects.projectName}
          required
        ></input>
        <br />

        <label>Project Budget</label>

        <input
          type="number"
          name="projectBudget"
          onChange={handleChange}
          value={projects.projectBudget}
          required
        ></input>
        <br />

        <label>Employees</label>

        <input
          type="text"
          name="Employees"
          onChange={handleChange}
          value={projects.Employees}
          required
        ></input>
        <br />

        <label>Status</label>

        <input
          type="text"
          name="Status"
          onChange={handleChange}
          value={projects.Status}
          required
        ></input>
        <br />

        <label>Start Date</label>

        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          value={projects.startDate}
          required
        ></input>
        <br />

        <label>End Date</label>

        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          value={projects.endDate}
          required
        ></input>
        <br />
       

        <label>Project Type</label>
        
        <input
          type="text"
          name="projectType"
          onChange={handleChange}
          value={projects.projectType}
          required
        ></input>
        <br />
        <br />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Newprojects;
