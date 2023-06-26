import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";
import { getUserPrivileges } from "../../functions/auth";

const Dashboard = () => {

  const {
    isHRHead,
    isSuperAdmin,
    isHrAdmin,
  } = getUserPrivileges();



  return (
    <div className="h-100">
      {(isSuperAdmin ||
        isHRHead ||
        isHrAdmin) ? (
        <AdminDashboard />
      ) : (
        <StaffDashboard />
      )}
    </div>
  );
};

export default Dashboard;
