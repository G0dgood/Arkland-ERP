import { useEffect } from "react";
import { Calendars } from "../../components/Calender/Calender";

import { myAttendance } from "../../features/Attendances/attendanceSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";

const EmployeeAttendance = () => {

  const dispatch = useAppDispatch();

  const { mydata } = useAppSelector((state: any) => state.attendance)

  useEffect(() => {
    dispatch(myAttendance())
  }, [dispatch])




  return (
    <div  >
      <div className="ProjectViewContainer">
        <div className="ProjectViewContainer-subone">
          <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
            <h5>Employee Attendance</h5>
          </div>

          <div className="subone-col-12">

            <Calendars mydata={mydata} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
