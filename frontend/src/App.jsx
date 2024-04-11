
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import UserManage from "./Pages/UserManage";
import AllUsers from "./Pages/AllUsers";
import AddUsers from "./Pages/AddUsers";
import NoPages from "./Pages/NoPages";
import Supplier from "./Pages/Supplier";
import EmpManagement from "./Pages/EmpManagement";
import PaySlip from "./Pages/PaySlip";
import LeaveMng from "./Pages/leavemng";
import Attendance from "./Pages/Attendance-mng";
import LeaveForm from "./Pages/LeaveForm";
import ActiveLeaves from "./Pages/ActiveLeaves";
import UpdateLeave from "./Pages/UpdateLeave";
import Login from "./Pages/Login";
import Projects from "./Pages/Projects";
import AddVehicle from './Pages/AddVehicle';
import Vehicles from './Pages/Vehicles';
import UpdateVehicles from './Pages/UpdateVehicle'
import VehicleDash from './Pages/VehicleDashBoard';
import Login from "./Pages/Login";


function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserManage />} />
          <Route path="/user/addusers" element={<AddUsers />} />
          <Route path="/user/allusers" element={<AllUsers />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="*" element={<NoPages />} />
          <Route path="/employee-management" element={<EmpManagement />} />
          <Route path="/employee-management/PaySlip" element={<PaySlip />} />
          <Route path="/employee-management/Leaves" element={<LeaveMng />} />
          <Route path="/employee-management/Attendance"element={<Attendance />}/>
          <Route path="/LeaveForm"element={<LeaveForm />}/>
          <Route path="/ActiveLeaves"element={<ActiveLeaves />}/>
          <Route path="/updateLeave" element={<UpdateLeave/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path = '/vehicle' element = {<VehicleDash/>}/>
          <Route path = '/addvehicle' element = {<AddVehicle/>}/>
          <Route path = '/viewvehicles' element = {<Vehicles/>}/>
          <Route path = '/viewvehicles/:id' element = {<UpdateVehicles/>}/>
          <Route path="/projects" element={<Projects/>}/>



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
