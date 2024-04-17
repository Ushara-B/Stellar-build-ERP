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
    <div >
      <div  ref={ComponentsRef2} style={{ marginLeft: "10px", paddingTop: "50px" }}>
        
            Project Name = {projectName}<br/><br/>
            Project Budget = {projectBudget}<br/><br/>
            Employees = {Employees}<br/><br/>
            Status = {Status}<br/><br/>
            Start Date = {formatDate(startDate)}<br/><br/>
            End Date = {formatDate(endDate)}<br/><br/>
            Project Type = {projectType}<br/><br/>
     
        
      </div>
    <div>Actions = 
      
              <button onClick= {handleUpdateClick} >
                 Update
              </button>
              <button onClick={deleteHandler}>
                Delete
              </button>
              <button onClick={handlePrintsingle} >
                Report
              </button>
              {deleteMessage && <p>{deleteMessage}</p>}
              </div>
    </div>
    
  );
}
export default Addprojects;
