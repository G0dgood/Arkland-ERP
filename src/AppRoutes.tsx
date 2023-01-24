import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import KPIAssessment from "./pages/kpi_assessment/KPIAssessment";
import AllEmployees from "./pages/all_employees/AllEmployees";
import Departments from "./pages/Departments/Departments";
import Projects from "./pages/Projects/Projects";
import Leave from "./pages/Leave/Leave";
import AllLeaveApplications from "./pages/Leave/AllLeaveApplications";
import Support from "./pages/Support/Support";
import Policy from "./pages/Policy/Policy";
import SiteWorkerRequest from "./pages/Projects/SiteWorkerRequest";
import ViewProjects from "./pages/Projects/ViewProjects";
import TeamLeaveApplications from "./pages/Leave/TeamLeaveApplications";
import CreateEmployee from "./pages/all_employees/CreateEmployee";
import WarningList from "./pages/all_employees/WarningList";
import WeeklyReport from "./pages/WeeklyReport/WeeklyReport";
import WeeklyReportTable from "./components/table_component/WeeklyReportTable";
import DashboardCalender from "./components/DashboardCalender";
import Profile from "./pages/Profile/Profile";
import EditUser from "./pages/EditUser/EditUser";
import Procurement from "./pages/Departments/SubDepartments/Procurement";
import Engineering from "./pages/Departments/SubDepartments/Engineering";
import HumanResource from "./pages/Departments/SubDepartments/HumanResource";
import Inventory from "./pages/Departments/SubDepartments/Inventory";
import Informationtech from "./pages/Departments/SubDepartments/Informationtech";
import Budget from "./pages/Departments/SubDepartments/Budget";
import Finance from "./pages/Departments/SubDepartments/Finance";
import AdminEditUser from "./pages/AdminEditUser/AdminEditUser";
import ForgotPassword from "./pages/auth/forgot-password/Forgot-Password";

const AppRoutes: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/kpiassessment" element={<KPIAssessment />} />
      <Route path="/weeklyreporttable" element={<WeeklyReportTable />} />
      <Route path="/allemployees" element={<AllEmployees />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/viewproject" element={<ViewProjects />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/allleaveapplications" element={<AllLeaveApplications />} />
      <Route path="/support" element={<Support />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/siteWorkerrequest" element={<SiteWorkerRequest />} />
      <Route path="/createemployee" element={<CreateEmployee />} />
      <Route path="/warninglist" element={<WarningList />} />
      <Route path="/weeklyreport" element={<WeeklyReport />} />
      <Route path="/dashboardcalender" element={<DashboardCalender />} />
      <Route
        path="/teamleaveapplications"
        element={<TeamLeaveApplications />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<EditUser />} />
      {/* Departments */}
      <Route path="/departments" element={<Departments />} />
      <Route path="/procurement" element={<Procurement />} />
      <Route path="/engineering" element={<Engineering />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/humanresource" element={<HumanResource />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/informationtech" element={<Informationtech />} />
      <Route path="/budget" element={<Budget />} />
      {/* AdminEditUser */}
      <Route path="/admineditUser" element={<AdminEditUser />} />
    </Routes>
  );
};

export default AppRoutes;
