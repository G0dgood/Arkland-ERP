import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import TableLoader from "../../../components/TableLoader";
import { NoRecordFound, TableFetch } from "../../../components/TableOptions";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { hrgetAttendance } from "../../../features/Attendances/attendanceSlice";
import Pagination from "../../../components/Pagination";
import HRClockInModal from "../../../components/Modals/HRClockInModal";
import { FcOvertime, FcClock } from 'react-icons/fc';
import { BsCalendar2Week, BsDot } from "react-icons/bs";

const AttendanceTable = () => {
  const dispatch = useAppDispatch();
  const { hrgetattenddata, hrgetattendisLoading } = useAppSelector((state: any) => state.attendance)

  useEffect(() => {
    dispatch(hrgetAttendance())
  }, [dispatch])


  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });



  const header = [
    { title: "NAME", prop: "employee_name" },
    { title: "DEPARTMENT", prop: "employee_department" },
    { title: "ARRIVAL", prop: "time_in" },
    { title: "WEEK DAY", prop: "week_day_created" },
    { title: "CHECKED-IN OFFICE", prop: "ip_checked" },
    { title: "HR ASSISTED CHECK-IN", prop: "is_hr_assisted" },
  ];
  const [displayData, setDisplayData] = useState([]);
  return (
    <div  >

      <div id='main-space'>
        <div className="SiteWorkermaindivsub">
          <span className="SupportmainTitleh3">HR EMPLOYEE ATTENDANCE</span>
        </div>
        <div className="entries-perpage">
          <div>
            <HRClockInModal />
          </div>
        </div>
      </div>
      <section className="md-ui component-data-table">
        {hrgetattendisLoading ? <TableLoader isLoading={hrgetattendisLoading} /> : ""}
        <div className="main-table-wrapper">
          <table className="main-table-content">
            <thead className="data-table-header">
              <tr className="data-table-row">
                {header.map((i, index) => {
                  return (
                    <>
                      <td
                        className="table-datacell datatype-numeric"
                        key={index} >
                        {i.title}
                      </td>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody className="data-table-content">
              {hrgetattendisLoading ? (
                <TableFetch colSpan={8} />
              ) : displayData?.length === 0 || displayData == null ? (
                <NoRecordFound colSpan={8} />
              ) : (
                displayData?.map((item: any, i: any) => (
                  <tr className="data-table-row" key={i}>
                    <td className="table-datacell  ">
                      {item?.employee_name}
                    </td>
                    <td className="table-datacell  ">
                      {item?.employee_department?.description}

                    </td>
                    <td className="table-datacell datatype-numeric">

                      {new Date(item?.time_in).toLocaleString()}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.week_day_created}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <Button
                        className={
                          item?.ip_checked === true
                            ? "table-link"
                            : "table-link-active"
                        }
                      >
                        {item?.ip_checked === true ? "Yes" : "No"}
                      </Button>
                    </td>
                    <td className="table-datacell datatype-numeric" key={i}>
                      <Button
                        className={
                          item?.is_hr_assisted === true
                            ? "table-link"
                            : "table-link-active"
                        }
                      >
                        {item?.is_hr_assisted === true ? "Yes" : "No"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      <footer className="main-table-footer">
        <Pagination
          setDisplayData={setDisplayData}
          data={hrgetattenddata}
          entriesPerPage={entriesPerPage}
          Total={"Attendance"}
        />
      </footer>
    </div>
  );
};

export default AttendanceTable;
