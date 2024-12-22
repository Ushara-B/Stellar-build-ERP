import React from 'react';
import { UserProvider } from './Context/UserContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import ProtectedRoute from './ProtectedRoute';

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
import ViewAttendance from "./Pages/ViewAttendance";

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
import InventoryCategory from "./Pages/InventoryCategory";
import UpdateInventory from "./Pages/UpdateInventory";

import AddLoans from "./Pages/AddLoans";
import ViewLoans from "./Pages/ViewLoans";
import UpdateLoan from "./Pages/UpdateLoan";
import AllLoans from "./Pages/AllLoans";
import LoanDashBoard from "./Pages/LoanDashBoard";

import Expense from "./Pages/Finance/Expense";
import Income from "./Pages/Finance/Income";
import IncomeForm from "./Pages/Finance/Form";
import ExpenseForm from "./Pages/Finance/expenseForm";
import FinanceDashboard from "../src/Pages/Finance/finDashboard";
import UpdateExpense from "./Pages/Finance/updateExpense";
import UpdateIncome from "./Pages/Finance/updateIncome";
import Project from "./Pages/Finance/project";

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
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<NoPages />} />

              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Dash />
                </ProtectedRoute>
              } />

              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dash />
                </ProtectedRoute>
              } />

              <Route path="/user/addusers" element={
                <ProtectedRoute>
                  <AddUsers />
                </ProtectedRoute>
              } />

              <Route path="/allusers" element={
                <ProtectedRoute>
                  <AllUsers />
                </ProtectedRoute>
              } />

              <Route path="/employee-management" element={
                <ProtectedRoute>
                  <EmpManagement />
                </ProtectedRoute>
              } />

              <Route path="/employee-management/Leaves" element={
                <ProtectedRoute>
                  <LeaveMng />
                </ProtectedRoute>
              } />

              <Route path="/employee-management/Attendance" element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              } />

              <Route path="/LeaveForm" element={
                <ProtectedRoute>
                  <LeaveForm />
                </ProtectedRoute>
              } />

              <Route path="/ActiveLeaves" element={
                <ProtectedRoute>
                  <ActiveLeaves />
                </ProtectedRoute>
              } />

              <Route path="/updateLeave" element={
                <ProtectedRoute>
                  <UpdateLeave />
                </ProtectedRoute>
              } />

              <Route path="/ActiveLeaves/:id" element={
                <ProtectedRoute>
                  <UpdateLeave />
                </ProtectedRoute>
              } />

              <Route path="/UpdateLeave/:id" element={
                <ProtectedRoute>
                  <UpdateLeave />
                </ProtectedRoute>
              } />

              <Route path="/viewAttendance/:id" element={
                <ProtectedRoute>
                  <ViewAttendance />
                </ProtectedRoute>
              } />

              <Route path="/inventorycategory" element={
                <ProtectedRoute>
                  <InventoryCategory />
                </ProtectedRoute>
              } />

              <Route path="/allprojects" element={
                <ProtectedRoute>
                  <Allprojects />
                </ProtectedRoute>
              } />

              <Route path="/Newprojects" element={
                <ProtectedRoute>
                  <Newprojects />
                </ProtectedRoute>
              } />

              <Route path="/Updateprojects/:id" element={
                <ProtectedRoute>
                  <Updateprojects />
                </ProtectedRoute>
              } />

              <Route path="/ProjectCategories" element={
                <ProtectedRoute>
                  <ProjectCategories />
                </ProtectedRoute>
              } />

              <Route path="/Projectdetails/:id" element={
                <ProtectedRoute>
                  <Projectdetails />
                </ProtectedRoute>
              } />

              <Route path="/add-category" element={
                <ProtectedRoute>
                  <AddCategory />
                </ProtectedRoute>
              } />

              <Route path="/projects" element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } />

              <Route path="/vehicle" element={
                <ProtectedRoute>
                  <VehicleDash />
                </ProtectedRoute>
              } />

              <Route path="/addvehicle" element={
                <ProtectedRoute>
                  <AddVehicle />
                </ProtectedRoute>
              } />

              <Route path="/viewvehicles" element={
                <ProtectedRoute>
                  <Vehicles />
                </ProtectedRoute>
              } />

              <Route path="/viewvehicle/:id" element={
                <ProtectedRoute>
                  <Vehicle />
                </ProtectedRoute>
              } />

              <Route path="/viewvehicles/:id" element={
                <ProtectedRoute>
                  <UpdateVehicles />
                </ProtectedRoute>
              } />

              <Route path="/assignDriver" element={
                <ProtectedRoute>
                  <AssignDriver />
                </ProtectedRoute>
              } />

              <Route path="/viewinventorylist" element={
                <ProtectedRoute>
                  <ViewInventoryList />
                </ProtectedRoute>
              } />

              <Route path="/inventory" element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              } />

              <Route path="/addinventory" element={
                <ProtectedRoute>
                  <AddInventory />
                </ProtectedRoute>
              } />

              <Route path="/updateinventory/:id" element={
                <ProtectedRoute>
                  <UpdateInventory />
                </ProtectedRoute>
              } />

              <Route path="/viewinventory/:id" element={
                <ProtectedRoute>
                  <Viewinventory />
                </ProtectedRoute>
              } />

              <Route path="/viewuser/:id" element={
                <ProtectedRoute>
                  <ViewUser />
                </ProtectedRoute>
              } />

              <Route path="/updateuser/:id" element={
                <ProtectedRoute>
                  <UpdateUser />
                </ProtectedRoute>
              } />

              <Route path="/adduser" element={
                <ProtectedRoute>
                  <AddUsers />
                </ProtectedRoute>
              } />

              <Route path="/finance" element={
                <ProtectedRoute>
                  <FinanceDashboard />
                </ProtectedRoute>
              } />

              <Route path="/finance/expense" element={
                <ProtectedRoute>
                  <Expense />
                </ProtectedRoute>
              } />

              <Route path="/finance/income" element={
                <ProtectedRoute>
                  <Income />
                </ProtectedRoute>
              } />

              <Route path="/finance/incomeform" element={
                <ProtectedRoute>
                  <IncomeForm />
                </ProtectedRoute>
              } />

              <Route path="/finance/expenseform" element={
                <ProtectedRoute>
                  <ExpenseForm />
                </ProtectedRoute>
              } />

              <Route path="/finance/updateincome/:id" element={
                <ProtectedRoute>
                  <UpdateIncome />
                </ProtectedRoute>
              } />

              <Route path="/finance/updateexpense/:id" element={
                <ProtectedRoute>
                  <UpdateExpense />
                </ProtectedRoute>
              } />

              <Route path="/finance/project" element={
                <ProtectedRoute>
                  <Project />
                </ProtectedRoute>
              } />

              <Route path="/loan-management/loandashboard" element={
                <ProtectedRoute>
                  <LoanDashBoard />
                </ProtectedRoute>
              } />

              <Route path="/loan-management" element={
                <ProtectedRoute>
                  <AllLoans />
                </ProtectedRoute>
              } />

              <Route path="/loan-management/addloans" element={
                <ProtectedRoute>
                  <AddLoans />
                </ProtectedRoute>
              } />

              <Route path="/loan-management/updateloans/:id" element={
                <ProtectedRoute>
                  <UpdateLoan />
                </ProtectedRoute>
              } />

              <Route path="/loan-management/viewloans" element={
                <ProtectedRoute>
                  <ViewLoans />
                </ProtectedRoute>
              } />

              <Route path="/PaySlip" element={
                <ProtectedRoute>
                  <PaySlip />
                </ProtectedRoute>
              } />

              <Route path="/contact" element={
                <ProtectedRoute>
                  <SHome />
                </ProtectedRoute>
              } />

              <Route path="/add-client" element={
                <ProtectedRoute>
                  <AddClient />
                </ProtectedRoute>
              } />

              <Route path="/client-details" element={
                <ProtectedRoute>
                  <ClientDetails />
                </ProtectedRoute>
              } />

              <Route path="/updateclient/:id" element={
                <ProtectedRoute>
                  <ClientUpdateDetails />
                </ProtectedRoute>
              } />

              <Route path="/add-supplier" element={
                <ProtectedRoute>
                  <AddSupplier />
                </ProtectedRoute>
              } />

              <Route path="/supplier-details" element={
                <ProtectedRoute>
                  <SupplierDetails />
                </ProtectedRoute>
              } />

              <Route path="/updatesuplier/:id" element={
                <ProtectedRoute>
                  <SupplierUpdateDetails />
                </ProtectedRoute>
              } />

              <Route path="/user-profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />

              <Route path="/userdash" element={
                <ProtectedRoute>
                  <UserDash />
                </ProtectedRoute>
              } />

            </Routes>
          </BrowserRouter>
        </div>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;