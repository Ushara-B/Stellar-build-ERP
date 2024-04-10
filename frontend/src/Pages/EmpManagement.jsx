import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import "../css/EmpManagement.css";

function EmpManagement() {
  const payslip = () => {
    window.location.href = "/employee-management/PaySlip";
  };
  const leave = () => {
    window.location.href = "/employee-management/Leaves";
  };
  const att = () => {
    window.location.href = "/employee-management/Attendance";
  };
  return (
    <div className="wrapper">
      <div className="sidebar">
        <AppBar />
        <Drawer />
      </div>
      <div className="content">
        <section>
          <div className="container">
            <div className="cards">
              <div className="card" onClick={payslip}>
                <h3>Pay slips</h3>
                <p></p>
              </div>
              <div className="card" onClick={leave}>
                <h3>Leave Management</h3>
                <p></p>
              </div>
              <div className="card" onClick={att}>
                <h3>Attendance </h3>
                <p>.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EmpManagement;
