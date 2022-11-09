import React from 'react';
import { Routes, Route } from "react-router-dom";

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import KPIAssessment from './pages/KPIAssessment/KPIAssessment';
import AllEmployees from './pages/AllEmployees/AllEmployees';
import Departments from './pages/Departments/Departments';
import Projects from './pages/Projects/Projects';
import Leave from './pages/Leave/Leave';
import Support from './pages/Support/Support';
import Policy from './pages/Policy/Policy';




const AppRoutes: React.FC<any> = () => {


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/kpiassessment" element={<KPIAssessment />} />
      <Route path="/allemployees" element={<AllEmployees />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/support" element={<Support />} />
      <Route path="/policy" element={<Policy />} />
    </Routes>
  )
}

export default AppRoutes;

