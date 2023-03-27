import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import KPIAssessment from "./pages/kpi_assessment/KPIAssessment";
import AllEmployees from "./pages/all_employees/AllEmployees";
import Cookies from "js-cookie";
import Leave from "./pages/Leave/Leave";
import AllLeaveApplications from "./pages/Leave/AllLeaveApplications";
import Support from "./pages/Support/Support";
import Policy from "./pages/Policy/Policy";
import SiteWorkerRequest from "./pages/Projects/SiteWorkerRequest";
import CreateProjects from "./pages/Projects/CreateProjects";
import TeamLeaveApplications from "./pages/Leave/TeamLeaveApplications";
import CreateEmployee from "./pages/all_employees/CreateEmployee";
import WarningList from "./pages/all_employees/WarningList";
import WeeklyReport from "./pages/WeeklyReport/WeeklyReport";
import WeeklyReportTable from "./components/table_component/WeeklyReportTable";
import DashboardCalender from "./components/DashboardCalender";
import Profile from "./pages/Profile/Profile";
import EditUser from "./pages/EditUser/EditUser";
import Engineering from "./pages/Departments/SubDepartments/Engineering";
import HumanResource from "./pages/Departments/SubDepartments/HumanResource";
import Inventory from "./pages/Departments/SubDepartments/Inventory";
import Informationtech from "./pages/Departments/SubDepartments/Informationtech";
import Budget from "./pages/Departments/SubDepartments/Budget";
import Finance from "./pages/Departments/SubDepartments/Finance";
import AdminEditUser from "./pages/AdminEditUser/AdminEditUser";
import ForgotPassword from "./pages/auth/forgot-password/Forgot-Password";
import PrivateRoute from "./components/PrivateRoute";
import storage from "./utils/storage";
import { useAppDispatch } from "./hooks/useDispatch";
import { getDepartment } from "./store/reducers/department";
import { getRoles } from "./store/reducers/roles";
import { sessionExpired } from "./utils/sessionExpires";
import { getEmployees } from "./store/reducers/employees";
import { getTeamLeads } from "./store/reducers/teamLeads";
import { getTeam } from "./store/reducers/team";
import Departments from "./pages/Departments/Departments";
import Project from "./pages/Projects/Project";
import KpiContainer from "./pages/kpi_assessment/KpiContainer";
import ViewProjects from "./pages/Projects/ViewProjects";
import TeamKPI from "./pages/kpi_assessment/TeamKPI";
import ViewKPAssessment from "./pages/kpi_assessment/ViewKPAssessment";
import KPIDetails from "./pages/kpi_assessment/KPIDetails";
import ProjectView from "./pages/Projects/Project";
import ViewEmployee from "./pages/all_employees/ViewEmployee";
import ViewDepartments from "./pages/Departments/SubDepartments/ViewDepartments";
import { getProjects } from "./store/reducers/project";
import { getTasks } from "./store/reducers/tasks";
import WeeklyContainer from "./pages/WeeklyReport/WeeklyContainer";
import WeeklyReportView from "./pages/WeeklyReport/WeeklyReportView";
import TeamWeeklyReport from "./pages/WeeklyReport/TeamWeeklyReport";
import TeamWeeklyReportUpdate from "./pages/WeeklyReport/TeamWeeklyReportUpdate";

const AppRoutes: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const removeData = () => {
    Cookies.remove("isAuthenticated");
    Cookies.remove("token");
    storage.remove("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const status = error?.response ? error?.response?.status : null;
      const url = error.response ? error.response?.config?.url : null;

      if (status === 401) {
        sessionExpired();
        removeData();
      }
    }
  );

  React.useEffect(() => {
    if (Cookies.get("token")) {
      dispatch(getDepartment());
      dispatch(getRoles());
      dispatch(getEmployees());
      dispatch(getTeamLeads());
      dispatch(getTeam());
      dispatch(getProjects());
    }
  }, [dispatch]);
  const user: any = storage?.get("user");
  const parsedUserData = JSON?.parse(user);

  return (
    <Routes>
      <Route
        path="/"
        element={parsedUserData ? <Navigate to="/home" /> : <Login />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* General user routes */}
      <Route element={<PrivateRoute isAllowed={!!parsedUserData} />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/kpiassessment" element={<KPIAssessment />} />
        <Route path="/kpicontainer" element={<KpiContainer />} />
        <Route path="/kpidetails/:id" element={<KPIDetails />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/support" element={<Support />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/weeklyreporttable" element={<WeeklyReportTable />} />
        <Route path="/weeklycontainer" element={<WeeklyContainer />} />
        <Route path="/teamleaveapplications" element={<TeamLeaveApplications />} />
        <Route path="/weeklyreport" element={<WeeklyReport />} />
        <Route path="/teamweekly" element={<TeamWeeklyReport />} />
        <Route path="/weeklyreportview/:id" element={<WeeklyReportView />} />
        <Route path="/teamWeeklyreportupdate/:id" element={<TeamWeeklyReportUpdate />} />
        {/* </Route> */}
        {/* Protected routes as admins, HR, Project managers and team leads */}
        <Route
          element={
            <PrivateRoute
              isAllowed={!!parsedUserData}
              // isAllowed={!!parsedUserData && !!parsedUserData.is_super_admin}
              redirectPath="/home"
            />
          }
        >
          <Route path="/projects" element={<Project />} />

          <Route path="/employees" element={<AllEmployees />} />
          <Route path="/employees/:id" element={<ViewEmployee />} />
          <Route path="/projects" element={<Project />} />

          <Route path="/viewproject/:id" element={<ViewProjects />} />
          <Route path="/allleaveapplications" element={<AllLeaveApplications />} />
          <Route path="/site-worker-request" element={<SiteWorkerRequest />} />
          <Route path="/createemployee" element={<CreateEmployee />} />
          <Route path="/createprojects" element={<CreateProjects />} />
          <Route path="/warninglist" element={<WarningList />} />
          <Route path="/dashboardcalender" element={<DashboardCalender />} />
          <Route path="/profile/edit" element={<EditUser />} />
          <Route path="/profile" element={<Profile />} />
          {/* Departments */}
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:id" element={<ViewDepartments />} />
          {/* <Route path="/procurement" element={<Procurement />} /> */}
          <Route path="/engineering" element={<Engineering />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/humanresource" element={<HumanResource />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/informationtech" element={<Informationtech />} />
          <Route path="/budget" element={<Budget />} />
          {/* AdminEditUser */}
          <Route path="/admineditUser" element={<AdminEditUser />} />
          {/* Project View */}
          <Route path="/kpicontainer" element={<KpiContainer />} />
          <Route path="/teamkpi" element={<TeamKPI />} />
          <Route path="/viewkpiassessment/:id" element={<ViewKPAssessment />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
