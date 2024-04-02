import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import "../leave-mng.css";

function LeaveMng() {
  const ActiveLeaves = () => {
    window.location.href = "/ActiveLeaves";
  };
  const AddLeave = () => {
    window.location.href = "/LeaveForm";
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
              <div className="card" onClick={ActiveLeaves}>
                <h3>Active Leaves</h3>
                <p></p>
              </div>
              <div className="card" onClick={AddLeave}>
                <h3>Apply for a leave</h3>
                <p>.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default LeaveMng;
