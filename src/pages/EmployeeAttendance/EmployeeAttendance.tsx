import { useEffect } from "react";
import { Calendars } from "../../components/Calender/Calender";

import { myAttendance } from "../../features/Attendances/attendanceSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";

const EmployeeAttendance = () => {

  const dispatch = useAppDispatch();

  const { mydata, myisLoading } = useAppSelector((state: any) => state.attendance)

  useEffect(() => {
    dispatch(myAttendance())
  }, [dispatch])


  console.log('mydata', mydata)

  // const randColor = () => {
  //   const realColor =
  //     "#" +
  //     Math.floor(Math.random() * 16777215)
  //       .toString(16)
  //       .padStart(6, "0")
  //       .toUpperCase();
  //   console.log("realColor", realColor);
  //   return realColor;
  // };

  return (
    <div  >
      <div className="ProjectViewContainer">
        <div className="ProjectViewContainer-subone">
          <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
            <h5>Employee Attendance</h5>
          </div>

          <div className="subone-col-12">
            {/* <div
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
            </div> */}
            <Calendars mydata={mydata} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
