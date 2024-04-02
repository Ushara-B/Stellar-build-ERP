import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import "../ActiveLeaves.css"

function ActiveLeaves() {
  return (
    <div class="app-container">
      <div class="side-bar">
      <AppBar />
        <Drawer />
      </div>
      <div className="content-lv">
        <div>1dadadadadada</div>
        <div>2adadadadaada</div>
        <div>3adaddadadadad</div>
      </div>
    </div>
    
  );
}
export default ActiveLeaves;
