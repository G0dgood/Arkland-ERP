import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDepartments } from "../../hooks/useDepartments";
import { getUserPrivileges } from "../../functions/auth";
import HrAssistedAttendanceModal from "../../components/Modals/HrAssistedAttendanceModal";

const HumanResources = () => {
  const navigate = useNavigate();
  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();
  const [newDepartmentCreated, setNewDepartmentCreated] = React.useState({} as any);

  const { departments, isLoading, error, message } =
    useDepartments(newDepartmentCreated);

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
            <h5>Human Resources</h5>
            {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
              <div className="Request-btn-modal-container">
                <div className="Request-btn">
                  <HrAssistedAttendanceModal
                    onNewDepartmentCreated={handleNewDepartmentCreated}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="subone-col-3">
            <div
              className="ProjectView-card"
              onClick={() => navigate(`/humanresources/attendances`)}
            >
              <div className="iDotsHorizontalRounded">
                <Button className="iDotsRounded1">View Attendance</Button>
                <BiDotsHorizontalRounded color="#97979B" />
              </div>
              <div className="iDotsRounded-text">
                View employees attendance
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanResources;
