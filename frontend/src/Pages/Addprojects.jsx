import React from "react";
import "../css/Addprojects.css";
import { Link } from 'react-router-dom';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");
};

function Addprojects(props) {
  // Example data for suppliers
  const {
   
    projectName,
    projectBudget,
    Employees,
    Status,
    startDate,
    endDate,
    projectType,
  } = props.Project;

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
  <button class="delete-button">Delete</button>
  <button class="report-button">Report</button>
</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
export default Addprojects;
