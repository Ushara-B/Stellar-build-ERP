import React from 'react';
import { UserProvider } from './Context/UserContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import Dash from "./Pages/Dash";
import AllUsers from "./Pages/AllUsers";
import AddUsers from "./Pages/AddUsers";
import ViewUser from "./Pages/ViewUser";
import UpdateUser from "./Pages/UpdateUser";
import UserProfile from "../src/Components/UserProfile";
import UserDash from "./Pages/UserDash";
import NoPages from "./Pages/NoPages";
import EmpManagement from "./Pages/EmpManagement";
import PaySlip from "./Pages/PaySlip";
import LeaveMng from "./Pages/leavemng";
import Attendance from "./Pages/Attendance-mng";
import LeaveForm from "./Pages/LeaveForm";
import ActiveLeaves from "./Pages/ActiveLeaves";
import UpdateLeave from "./Pages/UpdateLeave";
import Login from "./Pages/Login";

import AddVehicle from "./Pages/AddVehicle";
import Vehicles from './Pages/Vehicles';
import Vehicle from './Pages/ViewVehicle';
import UpdateVehicles from './Pages/UpdateVehicle'
import VehicleDash from './Pages/VehicleDashBoard';
import AssignDriver from './Pages/AssignDriver';

import Projects from "./Pages/projects";
import Allprojects from "./Pages/Allprojects";
import Newprojects from "./Pages/Newprojects";
import Updateprojects from "./Pages/Updateprojects";
import ProjectCategories from "./Pages/ProjectCategories";
import Projectdetails from "./Pages/Projectdetails";
import AddCategory from "./Pages/AddCategory";

import ViewInventoryList from "./Pages/ViewInventoryList";
import Viewinventory from "./Pages/ViewInventory";
import Inventory from "./Pages/Inventory";
import AddInventory from "./Pages/AddInventory";
import Expense from "./Pages/Finance/Expense";
import Income from "./Pages/Finance/Income";

//Avishka's
import AddLoans from "./Pages/AddLoans";
import ViewLoans from "./Pages/ViewLoans";
import UpdateLoan from "./Pages/UpdateLoan";
import AllLoans from "./Pages/AllLoans";
import LoanDashBoard from "./Pages/LoanDashBoard";

import UpdateInventory from "./Pages/UpdateInventory";
import IncomeForm from "./Pages/Finance/Form";
import ExpenseForm from "./Pages/Finance/expenseForm";
import FinanceDashboard from "../src/Pages/Finance/finDashboard";
import UpdateExpense from "./Pages/Finance/updateExpense";
import UpdateIncome from "./Pages/Finance/updateIncome";
import Project from "./Pages/Finance/project";

import ViewAttendance from "./Pages/ViewAttendance";

import Finance from "./Pages/Finance";
import InventoryCategory from "./Pages/InventoryCategory";

import AddClient from "../src/Components/Client/Add-Client/AddClient";
import ClientDetails from "../src/Components/Client/Client/ClientDetails";
import ClientUpdateDetails from "../src/Components/Client/Client/UpdateDetails";
import SHome from "../src/Components/SHome";
import AddSupplier from "../src/Components/Supplier/Add-Supplier/AddSupplier";
import SupplierDetails from "../src/Components/Supplier/Supplier/SupplierDetails";
import SupplierUpdateDetails from "../src/Components/Supplier/Supplier/UpdateDetails";

import ForgotPassword from '../src/Components/fogetPassword';
import ResetPassword from '../src/Components/ResetPassword';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/dashboard" element={<Dash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user/addusers" element={<AddUsers />} />
              <Route path="/user/allusers" element={<AllUsers />} />
              <Route path="*" element={<NoPages />} />
              <Route path="/employee-management" element={<EmpManagement />} />
              <Route path="/employee-management/Leaves" element={<LeaveMng />} />
              <Route path="/employee-management/Attendance" element={<Attendance />} />
              <Route path="/LeaveForm" element={<LeaveForm />} />
              <Route path="/ActiveLeaves" element={<ActiveLeaves />} />
              <Route path="/updateLeave" element={<UpdateLeave />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/vehicle" element={<VehicleDash />} />
              <Route path="/addvehicle" element={<AddVehicle />} />
              <Route path="/viewvehicles" element={<Vehicles />} />
              <Route path="/viewvehicles/:id" element={<UpdateVehicles />} />
              <Route path="/allusers" element={<AllUsers />} />
              <Route path="/allprojects" element={<Allprojects />} />
              <Route path="/Newprojects" element={<Newprojects />} />
              <Route path="/Updateprojects/:id" element={<Updateprojects />} />
              <Route path="/viewinventorylist" element={<ViewInventoryList />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/addinventory" element={<AddInventory />} />
              <Route path="/employee-management/Attendance" element={<Attendance />} />
              <Route path="/LeaveForm" element={<LeaveForm />} />
              <Route path="/ActiveLeaves" element={<ActiveLeaves />} />
              <Route path="/updateLeave" element={<UpdateLeave />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/vehicle" element={<VehicleDash />} />
              <Route path="/addvehicle" element={<AddVehicle />} />
              <Route path="/viewvehicles" element={<Vehicles />} />
              <Route path="/viewvehicle/:id" element={<Vehicle />} />
              <Route path="/viewvehicles/:id" element={<UpdateVehicles />} />
              <Route path="/allusers" element={<AllUsers />} />
              <Route path="/allprojects" element={<Allprojects />} />
              <Route path="/Newprojects" element={<Newprojects />} />
              <Route path="/Allprojects" element={<Allprojects />} />
              <Route path="/Newprojects" element={<Newprojects />} />
              <Route path="/Updateprojects/:id" element={<Updateprojects />} />
              <Route path="/viewinventorylist" element={<ViewInventoryList />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/addinventory" element={<AddInventory />} />
              <Route path="/employee-management/Attendance" element={<Attendance />} />
              <Route path="/LeaveForm" element={<LeaveForm />} />
              <Route path="/ActiveLeaves" element={<ActiveLeaves />} />
              <Route path="/updateLeave" element={<UpdateLeave />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/vehicle" element={<VehicleDash />} />
              <Route path="/addvehicle" element={<AddVehicle />} />
              <Route path="/viewvehicles" element={<Vehicles />} />
              <Route path="/viewvehicle/:id" element={<Vehicle />} />
              <Route path="/viewvehicles/:id" element={<UpdateVehicles />} />
              <Route path="/allusers" element={<AllUsers />} />
              <Route path="/allprojects" element={<Allprojects />} />
              <Route path="/Newprojects" element={<Newprojects />} />
              <Route path="/Allprojects" element={<Allprojects />} />
              <Route path="/Newprojects" element={<Newprojects />} />
              <Route path="/Updateprojects/:id" element={<Updateprojects />} />
              <Route path="/viewinventorylist" element={<ViewInventoryList />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/addinventory" element={<AddInventory />} />

              <Route path="/viewuser/:id" element={<ViewUser />} />
              <Route path="/viewinventory/:id" element={<Viewinventory />} />
              <Route path="/updateuser/:id" element={<UpdateUser />} />
              <Route path="/adduser" element={<AddUsers />} />

              <Route path="/finance" element={<FinanceDashboard />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/userdash" element={<UserDash />} />

              <Route path="/finance/expense" element={<Expense />} />
              <Route path="/finance/income" element={<Income />} />

              <Route path="/inventorycategory" element={<InventoryCategory />} />
              <Route path="/finance/incomeform" element={<IncomeForm />} />
              <Route path="/finance/expenseform" element={<ExpenseForm />} />

              <Route path="/ActiveLeaves/:id" element={<UpdateLeave />} />
              <Route path="/UpdateLeave/:id" element={<UpdateLeave />} />
              <Route path="/viewAttendance/:id" element={<ViewAttendance />} />
              <Route path="/inventorycategory" element={<InventoryCategory />} />
              <Route path="/finance/updateincome/:id" element={<UpdateIncome />} />
              <Route path="/finance/updateexpense/:id" element={<UpdateExpense />} />
              <Route path="/finance/project" element={<Project />} />

              <Route path="/loan-management" element={<AllLoans />} />
              <Route path="/loan-management/addloans" element={<AddLoans />} />
              <Route path="/loan-management/updateloans/:id" element={<UpdateLoan />} />
              <Route path="/loan-management/viewloans" element={<ViewLoans />} />
              <Route path="/loan-management/loandashboard" element={<LoanDashBoard />} />

              <Route path="/ActiveLeaves/:id" element={<UpdateLeave />} />
              <Route path="/UpdateLeave/:id" element={<UpdateLeave />} />
              <Route path="/viewAttendance/:id" element={<ViewAttendance />} />
              <Route path="/PaySlip" element={<PaySlip />} />

              <Route path="/contact" element={<SHome />} />
              <Route path="/add-client" element={<AddClient />} />
              <Route path="/client-details" element={<ClientDetails />} />
              <Route path="/updateclient/:id" element={<ClientUpdateDetails />} />

              <Route path="/add-supplier" element={<AddSupplier />} />
              <Route path="/supplier-details" element={<SupplierDetails />} />
              <Route path="/updatesupplier/:id" element={<SupplierUpdateDetails />} />

              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
        </div>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
