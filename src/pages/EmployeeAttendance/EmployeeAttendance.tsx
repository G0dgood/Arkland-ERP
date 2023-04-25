import React, { useEffect, useState, CSSProperties } from "react";
import { BiDotsHorizontalRounded, BiEditAlt, BiTime } from "react-icons/bi";
import SyncLoader from "react-spinners/SyncLoader";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CreateDepartmentModal from "../../components/Modals/CreateDepartmentModal";
import { getRequestOptions } from "../../utils/auth/header";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useDepartments } from "../../hooks/useDepartments";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { getUserPrivileges } from "../../functions/auth";
import HrAssistedAttendanceModal from "../../components/Modals/HrAssistedAttendanceModal";

const EmployeeAttendance = () => {
  const navigate = useNavigate();
  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();
  const [newDepartmentCreated, setNewDepartmentCreated] = React.useState(
    {} as any
  );
  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  const { departments, isLoading, error, message } =
    useDepartments(newDepartmentCreated);

  const handleNewDepartmentCreated = () => {
    setNewDepartmentCreated(!newDepartmentCreated);
  };
  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };
  const randColor = () => {
    const realColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase();
    console.log("realColor", realColor);
    return realColor;
  };

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div className="ProjectViewContainer">
          <div className="ProjectViewContainer-subone">
            <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
              <h5>Employee Attendance</h5>
            </div>

            <div className="subone-col-3">
              <div
                className="ProjectView-card"
                onClick={() => navigate(`/attendance/list`)}
              >
                <div className="iDotsHorizontalRounded">
                  <Button className="iDotsRounded1">
                    View Attendance Report
                  </Button>
                  <BiDotsHorizontalRounded color="#97979B" />
                </div>
                <div className="iDotsRounded-text">
                  View your attendance report
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeAttendance;
