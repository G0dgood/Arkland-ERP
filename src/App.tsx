// import React, { useEffect, useState } from "react";

// import "./scss/main.scss";
// import "./App.scss";
// import Sidebar from "./components/SidebarAndDropdown/Sidebar";
// import Header from "./components/Header";

// const App: React.FC = (): JSX.Element => {


//   const [collapseNav, setCollapseNav] = useState(() => {
//     // @ts-ignore
//     return JSON.parse(localStorage.getItem("collapse")) || false;
//   });

//   useEffect(() => {
//     // --- Set state of collapseNav to localStorage on pageLoad --- //
//     localStorage.setItem("collapse", JSON.stringify(collapseNav));
//     // --- Set state of collapseNav to localStorage on pageLoad --- //
//   }, [collapseNav]);
//   const toggleSideNav = () => {
//     setCollapseNav(!collapseNav);
//   }

//   return (
//     <React.Suspense fallback={"App loading"}>
//       {/* <div id="screen-wrapper">
//         <Header toggleSideNav={toggleSideNav} />
//         <Sidebar collapseNav={collapseNav} />
//         <main>
//   
//         </main>
//       </div> */}


//     </React.Suspense>
//   );
// };

// export default App;





// new app route


import React from "react";
import "./scss/main.scss";
import "./App.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import KPIAssessment from "./pages/kpi_assessment/KPIAssessment";
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
import Profile from "./pages/Profile/Profile";
import EditUser from "./pages/EditUser/EditUser";
import AdminEditUser from "./pages/AdminEditUser/AdminEditUser";
import ForgotPassword from "./pages/auth/forgot-password/Forgot-Password";
import Departments from "./pages/Departments/Departments";
import Project from "./pages/Projects/Project";
import ViewProjects from "./pages/Projects/ViewProjects";
import TeamKPI from "./pages/kpi_assessment/TeamKPI";
import ViewKPAssessment from "./pages/kpi_assessment/ViewKPAssessment";
import KPIDetails from "./pages/kpi_assessment/KPIDetails";
import ViewEmployee from "./pages/all_employees/ViewEmployee";
import ViewDepartments from "./pages/Departments/ViewDepartments";
import WeeklyReportView from "./pages/WeeklyReport/WeeklyReportView";
import TeamWeeklyReport from "./pages/WeeklyReport/TeamWeeklyReport";
import TeamWeeklyReportUpdate from "./pages/WeeklyReport/TeamWeeklyReportUpdate";
import ViewSiteWorkerRequest from "./pages/Projects/ViewSiteWorkerRequest";
import AllLeave from "./pages/Leave/AllLeave";
import HRUpdateLeave from "./pages/Leave/HRUpdateLeave";
import FinalLeaveUpdate from "./pages/Leave/FinalLeaveUpdate";
import TerminationList from "./pages/all_employees/terminations/TerminationList";
import ViewWarning from "./pages/all_employees/warnings/ViewWarning";
import ViewLeave from "./pages/Leave/ViewLeave";
import HodLeaveView from "./pages/Leave/HodLeaveView";
import ViewTerminations from "./pages/all_employees/terminations/ViewTerminations";
import HumanResources from "./pages/HumanResources/HumanResources";
import AttendanceTable from "./pages/HumanResources/attendance/AttendanceTable";
import EmployeeAttendance from "./pages/EmployeeAttendance/EmployeeAttendance";
import EmployeeAttendanceTable from "./pages/EmployeeAttendance/table/EmployeeAttendanceTable";
import UpdatePassword from "./pages/auth/forgot-password/UpdatePassword";
import PageNotFound from "./pages/404/PageNotFound";
import CreateHOD from "./pages/HOD/HODList";
import CreateRole from "./pages/all_employees/CreateRole";
import Userprivileges from "./components/Userprivileges";
import Protected from "./functions/Protected";
import DataService from "./utils/dataService";
import Layout from "./components/Layout";
import AllEmployees from "./pages/all_employees/AllEmployees";
import MyKPIAssessment from "./pages/kpi_assessment/MyKPIAssessment";
import MyWeekReport from "./pages/WeeklyReport/MyWeekReport";
import AllKPIReport from "./pages/kpi_assessment/AllKPIReport";

const dataService = new DataService();


const App: React.FC<any> = () => {


  const user = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
  const token = dataService.getToken()
  const auth = <Protected loggedIn={user && token}><Layout /></Protected>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* protected routes for auth */}
        <Route path="/" element={auth} >
          <Route index element={<Dashboard />} />

          <Route path="employees">
            <Route index element={<AllEmployees />} />
            <Route path="employees/:id" element={<ViewEmployee />} />
            <Route path="employees/edit/:id" element={<AdminEditUser />} />
            <Route path="employees/create" element={<CreateEmployee />} />
          </Route>

          <Route path="attendance" >
            <Route index element={<EmployeeAttendance />} />
            {/* <Route index element={<EmployeeAttendance />} /> */}
            <Route path="employee/attendance/list" element={<EmployeeAttendanceTable />} />
            <Route path="attendance/hr" element={<HumanResources />} />
            <Route path="attendance/list/hr" element={<AttendanceTable />} />
          </Route>

          <Route path="kpiassessment">
            <Route index element={<MyKPIAssessment />} />
            <Route path="kpiassessment/:id" element={<KPIDetails />} />
            <Route path="kpiassessment/teamkpi" element={<TeamKPI />} />
            <Route path="kpiassessment/teamkpi/view/:id" element={<ViewKPAssessment />} />
            <Route path="kpiassessment/admin" element={<AllKPIReport />} />
          </Route>

          <Route path="leave">
            <Route index element={<Leave />} />
            <Route path="leave/:id" element={<ViewLeave />} />
            <Route path="leave/hod/:id" element={<HodLeaveView />} />
            <Route path="leave/team" element={<TeamLeaveApplications />} />
            <Route path="leave/hr" element={<AllLeaveApplications />} />
            <Route path="leave/admin" element={<AllLeave />} />
            <Route path="leave/hr/:id" element={<HRUpdateLeave />} />
            <Route path="leave/final/:id" element={<FinalLeaveUpdate />} />
          </Route>

          <Route path="weeklyreport">
            {/* <Route index element={<MyWeekReport />} /> */}
            <Route index element={<WeeklyReport />} />
            <Route path="weeklyreport/team" element={<TeamWeeklyReport />} />
            <Route path="weeklyreport/:id" element={<WeeklyReportView />} />
            <Route path="weeklyreport/update/:id" element={<TeamWeeklyReportUpdate />} />
            <Route path="weeklyreport/myweeklyreport" element={<MyWeekReport />} />
          </Route>

          <Route path="projects">
            <Route index element={<Project />} />
            <Route path="projects/:id" element={<ViewProjects />} />
            <Route path="projects/create" element={<CreateProjects />} />
          </Route>

          <Route path="departments">
            <Route index element={<Departments />} />
            <Route path="departments/:id" element={<ViewDepartments />} />
          </Route>

          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="profile/view" element={<EditUser />} />
          </Route>

          <Route path="termination">
            <Route index element={<TerminationList />} />
            <Route path="termination/:id" element={<ViewTerminations />} />
          </Route>

          <Route path="warning">
            <Route index element={<WarningList />} />
            <Route path="warning/:id" element={<ViewWarning />} />
          </Route>

          <Route path="workers_request">
            <Route index element={<SiteWorkerRequest />} />
            <Route path="/workers_request/:id" element={<ViewSiteWorkerRequest />} />
          </Route>

          <Route path="/createnewhod" element={<CreateHOD />} />
          <Route path="/createnewrole" element={<CreateRole />} />
          <Route path="/userprivileges" element={<Userprivileges />} />
          <Route path="/support" element={<Support />} />
          <Route path="/policy" element={<Policy />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

