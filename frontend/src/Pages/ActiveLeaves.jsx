import { useState } from "react";
import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import "../css/ActiveLeave.css"

function ActiveLeave() {
    const [emps] = useState([{
        ID: "1111", Name: "Mihiranga", Type: "abcd", Reason: "abcd"
    }])
    const handleEditClick = () => {
        // Navigate to the update page
        window.location.href ='/UpdateLeave'; // Replace '/update' with the path of your update page
      };
  return (
    <div>
      <div>
      <AppBar />
        <Drawer />
      </div>
      <div className="container-all">
      <div className="container-table">
        <table className="table" >
            <thead>
                <tr className="tr">
                    <th>Id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Reason</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    // eslint-disable-next-line
                    emps.map((emp) => {
                        return(
                        <tr key={emp.ID}>
                            <td>{emp.ID}</td>
                            <td>{emp.Name}</td>
                            <td>{emp.Type}</td>
                            <td>{emp.Reason}</td>
                            <td>
                                <button className="editbtn" onClick={handleEditClick}>Edit</button>
                                <button className="delbtn">Delete</button>
                            </td>
                        </tr>
                        );
                    })
                }
            </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
export default ActiveLeave;
