import React, {  useState } from "react";
import "../css/Addprojects.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");
};

function Addprojects(props) {
  // Example data for suppliers
  const {
    _id,
    projectName,
    projectBudget,
    Employees,
    Status,
    startDate,
    endDate,
    projectType,
  } = props.Project;

  const navigate = useNavigate();

  const [deleteMessage, setDeleteMessage] = useState("");

  const deleteHandler = async () => {
    try {
   
      await axios.delete(`http://localhost:5000/projects/${_id}`);
      setDeleteMessage("project deleted successfully!");
      setTimeout(() => {
        navigate('/Allprojects');
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error deleting project:", error);
      setDeleteMessage("Failed to delete project");
    } 
  };
  
  

  return (
    <div>
      <div style={{ marginLeft: "10px", paddingTop: "50px" }}>
        <table>
          <tr>
            
            <th>Project Name</th>
            <th>Project Budget</th>
            <th>Employees</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Project Type</th>
            <th>Action</th>
          </tr>
          <tr>
           
            <td>{projectName}</td>
            <td>{projectBudget}</td>
            <td>{Employees}</td>
            <td>{Status}</td>
            <td>{formatDate(startDate)}</td>
            <td>{formatDate(endDate)}</td>
            <td>{projectType}</td>
            <td class="action-buttons">
  <button class="update-button">Update</button>
  <button onClick={deleteHandler} class="delete-button">Delete</button>
  <button class="report-button">Report</button>
  {deleteMessage && <p>{deleteMessage}</p>}
</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
export default Addprojects;
