import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import KPIAssessment from "./pages/kpi_assessment/KPIAssessment";
import AllEmployees from "./pages/all_employees/AllEmployees";
import Departments from "./pages/Departments/Departments";
import Projects from "./pages/Projects/Projects";
import Leave from "./pages/Leave/Leave";
import Support from "./pages/Support/Support";
import Policy from "./pages/Policy/Policy";
import SiteWorkerRequest from "./pages/Projects/SiteWorkerRequest";
import ViewProjects from "./pages/Projects/ViewProjects";
import TeamLeaveApplications from "./pages/Leave/TeamLeaveApplications";

const AppRoutes: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/kpiassessment" element={<KPIAssessment />} />
      <Route path="/allemployees" element={<AllEmployees />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/viewproject" element={<ViewProjects />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/support" element={<Support />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/siteWorkerrequest" element={<SiteWorkerRequest />} />
      <Route path="/teamleaveapplications" element={<TeamLeaveApplications />} />
    </Routes>
  );
};

export default AppRoutes;
