import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { BsBriefcase, BsShield } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { AiOutlineBank } from "react-icons/ai";
import { FiPieChart, FiUser, FiFolder, FiLogOut } from "react-icons/fi";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { GoFile } from "react-icons/go";

const Sidebar = ({ collapseNav }: any) => {
  // --- SideNav Bubble (States) --- //
  const [dashboard, setDashboard] = useState(false);
  const [kipassessment, setKPIAssessment] = useState(false);
  const [allemployees, setallEmployees] = useState(false);
  const [departments, setDepartments] = useState(false);
  const [projects, setProjects] = useState(false);
  const [leave, setLeave] = useState(false);
  const [support, setSupport] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [logout, setLogout] = useState(false);
  const [weeklyreport, setWeeklyreport] = useState(false);

  return (
    <div id={collapseNav ? "collapse-sidenavbar" : "open-sidenavbar"}>
      <Nav className="flex-column nav-menu">
        <NavLink
          to="/home"
          // exact
          className={
            window.location.pathname === "/home" ? "active-here" : "nav-link"
          }
          onMouseEnter={() => setDashboard(true)}
          onMouseLeave={() => setDashboard(false)}
        >
          <TfiLayoutGrid2 size={20} />
          <span className="nav-name">Dashboard</span>
          {dashboard && collapseNav && (
            <div className="sidenav-bubble">
              <p>Dashboard</p>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/kpiassessment"
          // exact
          className={
            window.location.pathname === "/kpiassessment"
              ? "active-here"
              : "nav-link"
          }
          onMouseEnter={() => setKPIAssessment(true)}
          onMouseLeave={() => setKPIAssessment(false)}
        >
          <FiPieChart size={20} />
          <span className="nav-name">KPI Assessment</span>
          {kipassessment && collapseNav && (
            <div className="sidenav-bubble">
              <p>KPI Assessment</p>
            </div>
          )}
        </NavLink>
        <NavLink
          to="/weeklyreport"
          // exact
          className={
            window.location.pathname === "/weeklyreport"
              ? "active-here"
              : "nav-link"
          }
          onMouseEnter={() => setWeeklyreport(true)}
          onMouseLeave={() => setWeeklyreport(false)}
        >
          <GoFile size={23} />
          <span className="nav-name">Weekly Report</span>
          {weeklyreport && collapseNav && (
            <div className="sidenav-bubble">
              <p>Weekly Report</p>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/allemployees"
          // exact
          className={
            window.location.pathname === "/allemployees"
              ? "active-here"
              : "nav-link"
          }
          onMouseEnter={() => setallEmployees(true)}
          onMouseLeave={() => setallEmployees(false)}
        >
          <FiUser size={24} />
          <span className="nav-name">All Employees</span>
          {allemployees && collapseNav && (
            <div className="sidenav-bubble">
              <p>All Employees</p>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/departments"
          // exact
          className={
            window.location.pathname === "/departments"
              ? "active-here"
              : "nav-link"
          }
          onMouseEnter={() => setDepartments(true)}
          onMouseLeave={() => setDepartments(false)}
        >
          <FiFolder size={20} />
          <span className="nav-name">Departments</span>
          {departments && collapseNav && (
            <div className="sidenav-bubble">
              <p>Departments</p>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/projectview"
          // exact
          className={
            window.location.pathname === "/projects"
              ? "active-here"
              : "nav-link"
          }
          onMouseEnter={() => setProjects(true)}
          onMouseLeave={() => setProjects(false)}
        >
          <AiOutlineBank size={25} />
          <span className="nav-name">Projects</span>
          {projects && collapseNav && (
            <div className="sidenav-bubble">
              <p>Projects</p>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/leave"
          // exact
          className={
            window.location.pathname === "/leave" ? "active-here" : "nav-link"
          }
          onMouseEnter={() => setLeave(true)}
          onMouseLeave={() => setLeave(false)}
        >
          <BsBriefcase size={22} />
          <span className="nav-name">Leave</span>
          {leave && collapseNav && (
            <div className="sidenav-bubble">
              <p>Leave</p>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/support"
          // exact
          className={
            window.location.pathname === "/support" ? "active-here" : "nav-link"
          }
          onMouseEnter={() => setSupport(true)}
          onMouseLeave={() => setSupport(false)}
        >
          <BiSupport size={22} />
          <span className="nav-name">Support</span>
          {support && collapseNav && (
            <div className="sidenav-bubble">
              <p>Support</p>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/policy"
          // exact
          className={
            window.location.pathname === "/policy" ? "active-here" : "nav-link"
          }
          onMouseEnter={() => setPolicy(true)}
          onMouseLeave={() => setPolicy(false)}
        >
          <BsShield size={22} />
          <span className="nav-name">Policy</span>
          {policy && collapseNav && (
            <div className="sidenav-bubble">
              <p>Policy</p>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/"
          // exact
          className={
            window.location.pathname === "/logout" ? "active-here" : "nav-link"
          }
          onMouseEnter={() => setLogout(true)}
          onMouseLeave={() => setLogout(false)}
        >
          <FiLogOut size={22} />
          <span className="nav-name">Log out</span>
          {logout && collapseNav && (
            <div className="sidenav-bubble">
              <p>Log out</p>
            </div>
          )}
        </NavLink>
      </Nav>
    </div>
  );
};

export default Sidebar;
