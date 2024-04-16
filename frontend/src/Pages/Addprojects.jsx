import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

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
        navigate("/Allprojects");
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error deleting project:", error);
      setDeleteMessage("Failed to delete project");
    }
  };
  const handleUpdateClick = () => {
    navigate(`/Updateprojects/${_id}`);
  };

  const ComponentsRef2 = useRef();
  const handlePrintsingle = useReactToPrint({
    content: () => ComponentsRef2.current,
    documentTitle: "Project Report",
    onAfterPrint: () => alert("Project Report successfully Download !"),
  });

  return (
    <div className="project-container">
      <div  ref={ComponentsRef2} style={{ marginLeft: "10px", paddingTop: "50px" }}>
        <table>
            
          
          <tr>
            <td>{projectName}</td>
            <td>{projectBudget}</td>
            <td>{Employees}</td>
            <td>{Status}</td>
            <td>{formatDate(startDate)}</td>
            <td>{formatDate(endDate)}</td>
            <td>{projectType}</td>
            
          </tr>
        </table>

        
      </div>
      <td class="action-buttons">
              <button onClick={handleUpdateClick} className="update-button">
                Update
              </button>
              <button onClick={deleteHandler} class="delete-button">
                Delete
              </button>
              <button onClick={handlePrintsingle} className="report-button">
                Report
              </button>
              {deleteMessage && <p>{deleteMessage}</p>}
            </td>
    </div>
    
  );
}
export default Addprojects;
