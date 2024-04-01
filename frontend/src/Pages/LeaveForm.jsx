import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import { useState } from "react";
import '../LeaveForm.css'

function LeaveForm() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reasonForLeave, setReasonForLeave] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data here
    console.log("Employee ID:", employeeId);
    console.log("Employee Name:", employeeName);
    console.log("Leave Type:", leaveType);
    console.log("Reason for Leave:", reasonForLeave);
  };
  return (
    <div className="wrapper">
      <div className="sidebar">
        <AppBar />
        <Drawer />
      </div>
      
      <div className="content-form">
      
        <section className="container-form">
        <h1>Apply for a leave</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="employeeId">Employee ID:</label>
              <input
                type="text"
                className="form-control"
                id="employeeId"
                value={employeeId}
                onChange={(event) => setEmployeeId(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeName">Employee Name:</label>
              <input
                type="text"
                className="form-control"
                id="employeeName"
                value={employeeName}
                onChange={(event) => setEmployeeName(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="leaveType">Leave Type:</label>
              <select
                id="leaveType"
                className="form-control"
                value={leaveType}
                onChange={(event) => setLeaveType(event.target.value)}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Vacation Leave">Vacation Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                {/* Add more leave types as needed */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="reasonForLeave">Reason for Leave:</label>
              <textarea
                id="reasonForLeave"
                className="form-control"
                rows="4"
                value={reasonForLeave}
                onChange={(event) => setReasonForLeave(event.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
export default LeaveForm;
