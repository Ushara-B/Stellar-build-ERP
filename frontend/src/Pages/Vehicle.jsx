import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import "../css/Vehicle.css";

function Vehicle(props) {
  const { _id, RegNo, Vname,Type, VIN, lic_expDay, ins_expDay, last_serviceDay, mileage, dname, vstatus } = props.Vehicle;

  const navigate = useNavigate();
  const [deleteMessage, setDeleteMessage] = useState("");

  const deleteHandler = async () => {
    try {
   
      await axios.delete(`http://localhost:5000/vehicles/${_id}`);
      setDeleteMessage("Vehicle deleted successfully!");
      setTimeout(() => {
        navigate('/viewvehicles');
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      setDeleteMessage("Failed to delete vehicle");
    } 
  };

  const handleUpdateClick = () => {
    navigate(`/viewvehicles/${_id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const ComponentsRef2 = useRef();
  const handlePrintsingle = useReactToPrint({
    content: () => ComponentsRef2.current,
    documentTitle: 'Vehicle Report',
    onAfterPrint: () => alert("Vehicle Report successfully Download !"),
  });

  return (
    <div className="vehicle-container">
      <div ref={ComponentsRef2}>
        <br />
        <h1>ID: {_id}</h1>
        <h1>RegisterNo: {RegNo}</h1>
        <h1>Vehicle Name: {Vname}</h1>
        <h1>Type: {Type}</h1>
        <h1>VIN: {VIN}</h1>
        <h1>License Expiry Day: {formatDate(lic_expDay)}</h1>
        <h1>Insurance Expiry Day: {formatDate(ins_expDay)}</h1>
        <h1>Last Service Day: {formatDate(last_serviceDay)}</h1>
        <h1>Mileage: {mileage}</h1>
        <h1>Driver Name: {dname}</h1>
        <h1>Vehicle Status: {vstatus}</h1>
      </div>
      <button onClick={handleUpdateClick} className="update-button">Update</button>
      <button onClick={deleteHandler} className="delete-button">Delete</button>
      <button onClick={handlePrintsingle} className="report-button">Report</button>
      {deleteMessage && <p>{deleteMessage}</p>}
    </div>
  );
}

export default Vehicle;
