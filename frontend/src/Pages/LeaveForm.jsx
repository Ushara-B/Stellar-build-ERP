import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";

function newLeave() {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <AppBar />
        <Drawer />
      </div>
      <div className="content">
        <section>

        </section>
      </div>
    </div>
  );
}
export default newLeave;
