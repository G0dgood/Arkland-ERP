import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
// import { useDepartments } from "../../hooks/useDepartments";
import { getUserPrivileges } from "../../functions/auth";

const EmployeeAttendance = () => {
  const navigate = useNavigate();

  const [newDepartmentCreated, setNewDepartmentCreated] = React.useState({} as any);



  const handleNewDepartmentCreated = () => {
    setNewDepartmentCreated(!newDepartmentCreated);
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
    <div  >
      <div className="ProjectViewContainer">
        <div className="ProjectViewContainer-subone">
          <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
            <h5>Employee Attendance</h5>
          </div>

          <div className="subone-col-3">
            <div
              className="ProjectView-card"
              onClick={() => navigate(`/attendance/employee/attendance/list`)}
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
    </div>
  );
};

export default EmployeeAttendance;
