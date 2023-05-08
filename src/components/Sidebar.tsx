import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { BsBriefcase, BsShield } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { AiOutlineBank } from "react-icons/ai";
import { FiPieChart, FiUser, FiFolder, FiLogOut } from "react-icons/fi";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { GoFile } from "react-icons/go";
import { MdOutlineAssessment } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
// import storage from "../utils/storage";
import { getUserPrivileges } from "../functions/auth";
import { CgUserList } from "react-icons/cg";

const Sidebar = ({ collapseNav }: any) => {
  // @ts-ignore
  const {
    isHRHead,
    isHeadOfDepartment,
    isTeamLead,
    isSuperAdmin,
    isAdmin,
    isHrAdmin,
  } = getUserPrivileges();

  // const userString = storage?.get("user");

  // --- SideNav Bubble (States) --- //
  const [dashboard, setDashboard] = useState(false);
  const [kipassessment, setKPIAssessment] = useState(false);
  const [teamKPI, setTeamKPI] = useState(false);
  const [allemployees, setallEmployees] = useState(false);
  const [departments, setDepartments] = useState(false);
  const [projects, setProjects] = useState(false);
  const [leave, setLeave] = useState(false);
  const [allleave, setAllLeave] = useState(false);
  const [allleaveapplications, setAllleaveapplications] = useState(false);
  const [support, setSupport] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [weeklyreport, setWeeklyreport] = useState(false);
  const [teamleaveapplications, setTeamleaveapplications] = useState(false);
  const [teamweekly, setTeamWeekly] = useState(false);
  const [humanResources, setHumanResources] = useState(false);
  const [attendance, setAttendance] = useState(false);

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
          to="/kpicontainer"
          // exact
          className={
            window.location.pathname === "/kpicontainer"
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
        {(isSuperAdmin ||
          isTeamLead ||
          isHeadOfDepartment ||
          isHRHead ||
          isHrAdmin) && (
            <NavLink
              to="/teamkpi"
              // exact
              className={
                window.location.pathname === "/teamkpi"
                  ? "active-here"
                  : "nav-link"
              }
              onMouseEnter={() => setTeamKPI(true)}
              onMouseLeave={() => setTeamKPI(false)}
            >
              <MdOutlineAssessment size={20} />
              <span className="nav-name">Team KPI</span>
              {teamKPI && collapseNav && (
                <div className="sidenav-bubble">
                  <p>Team KPI</p>
                </div>
              )}
            </NavLink>
          )}

        <NavLink
          to="/weeklycontainer"
          // exact
          className={
            window.location.pathname === "/weeklycontainer"
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
        {(isSuperAdmin ||
          isTeamLead ||
          isHeadOfDepartment ||
          isHRHead ||
          isHrAdmin) && (
            <NavLink
              to="/teamweekly"
              // exact
              className={
                window.location.pathname === "/teamweekly"
                  ? "active-here"
                  : "nav-link"
              }
              onMouseEnter={() => setTeamWeekly(true)}
              onMouseLeave={() => setTeamWeekly(false)}
            >
              <GoFile size={23} />
              <span className="nav-name">Team Weekly Report</span>
              {teamweekly && collapseNav && (
                <div className="sidenav-bubble">
                  <p>Team Weekly Report</p>
                </div>
              )}
            </NavLink>
          )}
        {(isSuperAdmin || isAdmin || isHRHead || isHrAdmin) && (
          <NavLink
            to="/humanresources"
            // exact
            className={
              window.location.pathname === "/humanresources"
                ? "active-here"
                : "nav-link"
            }
            onMouseEnter={() => setHumanResources(true)}
            onMouseLeave={() => setHumanResources(false)}
          >
            <CgUserList size={23} />
            <span className="nav-name">Human Resources</span>
            {humanResources && collapseNav && (
              <div className="sidenav-bubble">
                <p>Human Resources</p>
              </div>
            )}
          </NavLink>
        )}

        <NavLink
          to="/attendance"
          className={
            window.location.pathname === "/attendance"
              ? "active-here"
              : "nav-link"
          }
          onMouseEnter={() => setAttendance(true)}
          onMouseLeave={() => setAttendance(false)}
        >
          <HiOutlineUserGroup size={23} />
          <span className="nav-name">Attendance</span>
          {attendance && collapseNav && (
            <div className="sidenav-bubble">
              <p>Attendance</p>
            </div>
          )}
        </NavLink>

        {(isSuperAdmin || isHRHead || isHrAdmin) && (
          <NavLink
            to="/employeecontainer"
            // exact
            className={
              window.location.pathname === "/employeecontainer"
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
        )}

        {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
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
        )}
        {(isHRHead || isSuperAdmin || isTeamLead || isHrAdmin) && (
          <NavLink
            to="/projects"
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
        )}

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
        {(isTeamLead || isHeadOfDepartment || isHRHead || isHrAdmin) && (
          <NavLink
            to="/teamleaveapplications"
            // exact
            className={
              window.location.pathname === "/teamleaveapplications"
                ? "active-here"
                : "nav-link"
            }
            onMouseEnter={() => setTeamleaveapplications(true)}
            onMouseLeave={() => setTeamleaveapplications(false)}
          >
            <BsBriefcase size={22} />
            <span className="nav-name">Team Leave</span>
            {teamleaveapplications && collapseNav && (
              <div className="sidenav-bubble">
                <p>Team Leave</p>
              </div>
            )}
          </NavLink>
        )}

        {isSuperAdmin && (
          <NavLink
            to="/allleave"
            // exact
            className={
              window.location.pathname === "/allieave"
                ? "active-here"
                : "nav-link"
            }
            onMouseEnter={() => setAllLeave(true)}
            onMouseLeave={() => setAllLeave(false)}
          >
            <BsBriefcase size={22} />
            <span className="nav-name">All Leave Applications</span>
            {allleave && collapseNav && (
              <div className="sidenav-bubble">
                <p>All Leave Applications</p>
              </div>
            )}
          </NavLink>
        )}
        {(isHRHead || isHrAdmin) && (
          <NavLink
            to="/allleaveapplications"
            // exact
            className={
              window.location.pathname === "/allleaveapplications"
                ? "active-here"
                : "nav-link"
            }
            onMouseEnter={() => setAllleaveapplications(true)}
            onMouseLeave={() => setAllleaveapplications(false)}
          >
            <BsBriefcase size={22} />
            <span className="nav-name">HR Approve Leave</span>
            {allleaveapplications && collapseNav && (
              <div className="sidenav-bubble">
                <p>HR Approve Applications</p>
              </div>
            )}
          </NavLink>
        )}

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


      </Nav>
    </div>
  );
};

export default Sidebar;
