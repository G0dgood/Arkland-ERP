import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import KPIAssessment from "./pages/kpi_assessment/KPIAssessment";
import AllEmployees from "./pages/all_employees/AllEmployees";
import Departments from "./pages/departments/Departments";
import Projects from "./pages/projects/Projects";
import Leave from "./pages/leave/Leave";
import Support from "./pages/support/Support";
import Policy from "./pages/policy/Policy";
import SiteWorkerRequest from "./pages/projects/SiteWorkerRequest";
import ViewProjects from "./pages/projects/ViewProjects";

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
      <Route path="/SiteWorkerRequest" element={<SiteWorkerRequest />} />
    </Routes>
  );
};

export default AppRoutes;
