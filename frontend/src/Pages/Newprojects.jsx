import React, { useState } from "react";
import AppBar from "../Components/Appbar";
import Menu from "../Components/menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Newprojects.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");
}

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(projects);
    try {
      await sendRequest();
      navigate("/Allprojects");
    } catch (err) {
      console.log(err);
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/projects", projects);
  };

  return (
    
      <div  style={{ marginLeft: "255px", paddingTop: "70px" }}>
         <div className="image" style={{ marginLeft: "255px", paddingTop: "70px" }}></div>
        <div className="container">
      <div className="form-container">
      <AppBar />
      <Menu />
      <h1>Add new project</h1>
      <form onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input
          type="text"
          name="projectName"
          onChange={handleChange}
          value={projects.projectName}
          required
        />
        <br />
        <label>Project Budget</label>
        <input
          type="number"
          name="projectBudget"
          onChange={handleChange}
          value={projects.projectBudget}
          required
        />
        <br />
        <label>Employees</label>
        <input
          type="text"
          name="Employees"
          onChange={handleChange}
          value={projects.Employees}
          required
        />
        <br />
        <label>Status</label>
        <input
          type="text"
          name="Status"
          onChange={handleChange}
          value={projects.Status}
          required
        />
        <br />
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          value={projects.startDate}
          required
        />
        <br />
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          value={projects.endDate}
          required
        />
        <br />
        <label>Project Type</label>
        <input
          type="text"
          name="projectType"
          onChange={handleChange}
          value={projects.projectType}
          required
        />
        <br />
        <br />
        <button className="create-button" type="submit">Create Project</button>
      </form>
      </div>
     
    </div>
    </div>
   
  );
}

export default Newprojects;
