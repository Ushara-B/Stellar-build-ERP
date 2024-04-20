import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AllUsers from "./Pages/AllUsers";
import AddUsers from "./Pages/AddUsers";
import UpdateUser from './Pages/UpdateUser';
import UserProfile from './Pages/UserProfile';
import ViewUser from './Pages/ViewUser';
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
import Projects from "./Pages/projects";
import AddVehicle from './Pages/AddVehicle';
import Vehicles from './Pages/Vehicles';
import Vehicle from './Pages/ViewVehicle';
import UpdateVehicles from './Pages/UpdateVehicle'
import VehicleDash from './Pages/VehicleDashBoard';
import Allprojects from "./Pages/Allprojects";
import Newprojects from "./Pages/Newprojects";
import Updateprojects from "./Pages/Updateprojects";
import ViewInventoryList from "./Pages/ViewInventoryList";
import Inventory from "./Pages/Inventory";
import AddInventory from "./Pages/AddInventory";
import  Expense from "./Components/Finance/Finance/Expense";
import  Income from "./Components/Finance/Finance/Income";
import Finance from "./Pages/Finance";
import InventoryCategory from "./Pages/InventoryCategory";
import { useGlobalContext } from '../src/Context/globalContext';
import Addprojects from "./Pages/Addprojects"
import ViewAttendance from "./Pages/ViewAttendance";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
          <Route path = '/viewvehicle/:id' element = {<Vehicle/>}/>
          <Route path = '/viewvehicles/:id' element = {<UpdateVehicles/>}/>
          <Route path = '/allusers' element ={<AllUsers/>}/>
          <Route path = '/allprojects' element = {<Allprojects/>}/>
          <Route path = '/Newprojects' element = {<Newprojects/>}/>
          <Route path = '/Allprojects' element = {<Allprojects/>}/>
          <Route path = '/Newprojects' element = {<Newprojects/>}/> 
          <Route path = '/Updateprojects/:id' element = {<Updateprojects/>}/>
          <Route path = '/viewinventorylist' element = {<ViewInventoryList/>}/>
          <Route path = '/inventory' element = {<Inventory/>}/>
          <Route path = '/addinventory' element = {<AddInventory/>}/>
          <Route path="/viewuser/:id" element={<ViewUser />} />
          <Route path="/updateuser/:id" element={<UpdateUser />} />
          <Route path="/adduser" element={<AddUsers />} />
          <Route path="/user-profile" element={<UserProfile />} />

          <Route path="/finance" element={<Finance />} />
          <Route path="/finance/expense" element={<Expense />} />
          <Route path="/finance/income" element={<Income />} />
          <Route path = '/inventorycategory' element = {<InventoryCategory/>}/>


          <Route path="/ActiveLeaves/:id"element={<UpdateLeave />}/>
          <Route path="/UpdateLeave/:id"element={<UpdateLeave />}/>
          <Route path="/viewAttendance/:id"element={<ViewAttendance />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;