import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";
import { getUserPrivileges } from "../../functions/auth";

const Dashboard = () => {

  const {
    isHRHead,
    isSuperAdmin,
    isHrAdmin,
  } = getUserPrivileges();









  // --- Get current state of collapseNav from localStorage --- //
  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });

  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };



  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        {(isSuperAdmin ||
          isHRHead ||
          isHrAdmin) ? (
          <AdminDashboard />
        ) : (
          <StaffDashboard />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
