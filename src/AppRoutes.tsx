import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import KPIAssessment from "./pages/kpi_assessment/KPIAssessment";
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
import storage from "./utils/storage";
import { useAppDispatch } from "./hooks/useDispatch";
import Departments from "./pages/Departments/Departments";
import Project from "./pages/Projects/Project";
import KpiContainer from "./pages/kpi_assessment/KpiContainer";
import ViewProjects from "./pages/Projects/ViewProjects";
import TeamKPI from "./pages/kpi_assessment/TeamKPI";
import ViewKPAssessment from "./pages/kpi_assessment/ViewKPAssessment";
import KPIDetails from "./pages/kpi_assessment/KPIDetails";
import ViewEmployee from "./pages/all_employees/ViewEmployee";
import ViewDepartments from "./pages/Departments/SubDepartments/ViewDepartments";
import WeeklyContainer from "./pages/WeeklyReport/WeeklyContainer";
import WeeklyReportView from "./pages/WeeklyReport/WeeklyReportView";
import TeamWeeklyReport from "./pages/WeeklyReport/TeamWeeklyReport";
import TeamWeeklyReportUpdate from "./pages/WeeklyReport/TeamWeeklyReportUpdate";
import ViewSiteWorkerRequest from "./pages/Projects/ViewSiteWorkerRequest";
import EmployeeContainer from "./pages/all_employees/EmployeeContainer";
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
import { getUserPrivileges, handleUnauthorizedError } from "./functions/auth";
import UpdatePassword from "./pages/auth/forgot-password/UpdatePassword";
import PageNotFound from "./pages/404/PageNotFound";
import CreateHOD from "./pages/HOD/HODList";
import CreateRole from "./pages/all_employees/CreateRole";
import Userprivileges from "./components/Userprivileges";


export const removeData = () => {

  Cookies.remove("isAuthenticated");
  Cookies.remove("token");
  storage.remove("user");
  delete axios.defaults.headers.common["Authorization"];
};


const { isHRHead, isHeadOfDepartment, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();

const AppRoutes: React.FC<any> = () => {

  const dispatch = useAppDispatch();

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const status = error?.response ? error?.response?.status : null;
      // const url = error.response ? error.response?.config?.url : null;

      if (status === 401) {
        handleUnauthorizedError();
      }
    }
  );



  // React.useEffect(() => {
  //   if (
  //     (Cookies.get("token") && isHRHead) ||
  //     isHeadOfDepartment ||
  //     isSuperAdmin ||
  //     isAdmin ||
  //     isHrAdmin
  //   ) {
  //     dispatch(getEmployees());
  //   }
  // }, [dispatch]);

  // const user: any = storage?.get("user");
  // const parsedUserData = JSON?.parse(user);

  return (
    <Routes>
      {/* <Route
        path="/"
        element={parsedUserData ? <Navigate to="/home" /> : <Login />}
      /> */}

      <Route path="/home" element={<Dashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* General user routes */}
      {/* <Route element={<PrivateRoute isAllowed={!!parsedUserData} />}> */}
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/kpiassessment" element={<KPIAssessment />} />
      <Route path="/kpicontainer" element={<KpiContainer />} />
      <Route path="/kpidetails/:id" element={<KPIDetails />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/viewleave/:id" element={<ViewLeave />} />
      <Route path="/hodleaveview/:id" element={<HodLeaveView />} />
      <Route path="/support" element={<Support />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/weeklyreporttable" element={<WeeklyReportTable />} />
      <Route path="/weeklycontainer" element={<WeeklyContainer />} />
      <Route path="/teamleaveapplications" element={<TeamLeaveApplications />} />
      <Route path="/weeklyreport" element={<WeeklyReport />} />
      <Route path="/teamweekly" element={<TeamWeeklyReport />} />
      <Route path="/weeklyreportview/:id" element={<WeeklyReportView />} />
      <Route path="/teamWeeklyreportupdate/:id" element={<TeamWeeklyReportUpdate />}
      />
      {/* </Route> */}
      {/* Protected routes as admins, HR, Project managers and team leads */}

      {/* <Route
          element={
            <PrivateRoute
              isAllowed={!!parsedUserData}
              // isAllowed={!!parsedUserData && !!parsedUserData.is_super_admin}
              redirectPath="/home"
            />
          }
        > */}
      {/* Attendance */}
      <Route path="/attendance" element={<EmployeeAttendance />} />
      <Route path="/attendance/list" element={<EmployeeAttendanceTable />}
      />
      {/*View Employee Attendance */}

      {/*Projects View */}
      <Route path="/projects" element={<Project />} />
      <Route path="/viewproject/:id" element={<ViewProjects />} />
      <Route path="/createprojects" element={<CreateProjects />} />
      {/*End Projects View */}

      {/* KPI View */}
      <Route path="/kpicontainer" element={<KpiContainer />} />
      <Route path="/kpicontainer/teamkpi" element={<TeamKPI />} />
      <Route path="/viewkpiassessment/:id" element={<ViewKPAssessment />} />
      {/*END KPI View */}

      {/* Human Resources View */}
      <Route path="/humanresources" element={<HumanResources />} />
      <Route path="/humanresources/attendances" element={<AttendanceTable />}
      />
      {/* End Human Resources View */}

      {/*Employees View */}
      <Route path="/employees" element={<EmployeeContainer />} />
      <Route path="/employeecontainer" element={<EmployeeContainer />} />
      <Route path="/employees/:id" element={<ViewEmployee />} />
      <Route path="/employees/edit/:id" element={<AdminEditUser />} />
      <Route path="/createemployee" element={<CreateEmployee />} />
      {/*End Employees View */}
      {/*Create HOD */}
      <Route path="/createnewhod" element={<CreateHOD />} />
      <Route path="/createnewrole" element={<CreateRole />} />
      <Route path="/userprivileges" element={<Userprivileges />} />
      {/*End  Create HOD */}

      {/*Leave View */}
      <Route path="/allleaveapplications" element={<AllLeaveApplications />}
      />
      <Route path="/allleave" element={<AllLeave />} />
      <Route path="/finalleaveupdate/:id" element={<FinalLeaveUpdate />} />
      <Route path="/hrupdateleave/:id" element={<HRUpdateLeave />} />
      {/*End Leave View */}

      {/*Worker Request View */}
      <Route path="/site-worker-request" element={<SiteWorkerRequest />} />
      <Route path="/site-worker-request/:id" element={<ViewSiteWorkerRequest />}
      />
      {/*End Worker Request View */}

      {/*Warning View */}
      <Route path="/warninglist" element={<WarningList />} />
      <Route path="/warninglist/:id" element={<ViewWarning />} />
      {/*End warning View */}

      {/*Terminations View */}
      <Route path="/terminations" element={<TerminationList />} />
      <Route path="/terminations/:id" element={<ViewTerminations />} />
      {/*End terminations View */}

      {/* Departments */}
      <Route path="/departments" element={<Departments />} />
      <Route path="/departments/:id" element={<ViewDepartments />} />
      {/*End Departments */}

      <Route path="/profile/edit" element={<EditUser />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/engineering" element={<Engineering />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/humanresource" element={<HumanResource />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/informationtech" element={<Informationtech />} />
      <Route path="/budget" element={<Budget />} />
      {/* Not Found */}
      <Route path="*" element={<PageNotFound />} />

      {/* </Route> */}
      {/* </Route> */}
    </Routes>
  );
};

export default AppRoutes;
