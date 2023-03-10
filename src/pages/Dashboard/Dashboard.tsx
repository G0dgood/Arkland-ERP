import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks/useDispatch";

const Dashboard = () => {
  // const { user, isError, isSuccess, isLoading, message, error } =
  //   useAppSelector((state: any) => state.auth);

  // @ts-ignore
  const userInfo: any = JSON.parse(localStorage.getItem("userinfo"));
  // @ts-ignore

  const name = JSON.parse(localStorage.getItem("name"));
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

  // window.onload = function () {
  //  const nav: any = document.getElementById('nav');
  //  const burger: any = document.getElementById('burger');
  //  const overlay: any = document.getElementById('overlay1');

  //  burger.addEventListener('click', () => {
  //   burger.classList.toggle('active');
  //   nav.classList.toggle('active');
  //   overlay.classList.toggle('active');
  //  });
  // }

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
