import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";
import { getUserPrivileges } from "../../functions/auth";
import AdminDashboards from "../Admin/AdminDashboards";

const Dashboard = () => {

  const {
    isHRHead,
    isSuperAdmin,
    isHrAdmin,
    isMaster,
    isAdmin
  } = getUserPrivileges();



  return (
    <div className="h-100">
      {(isSuperAdmin ||
        isHRHead ||
        isHrAdmin ||
        isMaster) ? (
        <AdminDashboard />
      ) : (
        <StaffDashboard />
      )}
    </div>
  );
};

export default Dashboard;

// : isAdmin ? (
//   <AdminDashboards />
// )
