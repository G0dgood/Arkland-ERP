import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";
import storage from "../../utils/storage";

const Dashboard = () => {





  // console.log('socket', socket)
  // // send a message to the server
  // // socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

  // // receive a message from the server



  // @ts-ignore
  const userInfo: any = JSON?.parse(storage?.get("user"));

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
        {userInfo?.data?.department?.name === "HR" ? (
          <AdminDashboard />
        ) : (
          <StaffDashboard />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
