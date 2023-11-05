import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import TableLoader from "../../../components/TableLoader";
import {
  EntriesPerPage,
} from "../../../components/TableOptions";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { myAttendance } from "../../../features/Attendances/attendanceSlice";
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from "moment";
import { Calendars } from "../../../components/Calender/Calender";



const EmployeeAttendanceTable = () => {
  const dispatch = useAppDispatch();
  // @ts-ignore

  const { mydata, myisLoading } = useAppSelector((state: any) => state.attendance)
  useEffect(() => {
    dispatch(myAttendance())
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
    // { title: "DATE", prop: "created_at" },
    // { title: "ACTION" },
  ];

  const attendanceEvents = !mydata ? "" : mydata?.map((obj: any) => {
    return {
      title: obj?.employee_department?.description,  // You can add or modify properties here as needed
      start: moment(obj?.time_in).format("YYYY-MM-DD"),
      end: moment(obj?.time_in).format("YYYY-MM-DD"),
      color: '#2196F3',
    };
  });




  const holidayEvents = [
    {
      title: 'New Year',
      start: '2023-01-01',
      allDay: true,
      color: '#FF0000',
    },
    {
      title: 'Christmas',
      start: '2023-12-25',
      allDay: true,
      color: '#FF0000',
    },
    // Add more holiday events as needed
  ];
  function isHoliday(date: any) {
    // Implement your logic to check if the given date is a holiday
    // Return true if it is a holiday, false otherwise
    const holidays = ['2023-07-04', '2023-09-03', '2023-12-25'];
    const formattedDate = date.toISOString().split('T')[0];
    return holidays.includes(formattedDate);
  }
  const AttendanceCalendar = ({ attendanceEvents }: any) => {
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={attendanceEvents.concat(holidayEvents)}
        height={"70vh"}
      />
    );
  };




  return (
    <div  >
      <div className="SiteWorkermaindiv">
        <div className="SiteWorkermaindivsub">
          <span className="SupportmainTitleh3">Employee Attendance</span>
        </div>
        <div>
          <EntriesPerPage
            data={mydata}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
        </div>
        {/* <div>
          <MainSearch placeholder={"Search...          Attendance"} />
        </div> */}
      </div>
      <Calendars />
      {/* <div className="calendar-container">
        {myisLoading ? (
          <TableFetch colSpan={8} />
        ) : mydata?.length === 0 || mydata == null ? (
          <NoRecordFound colSpan={8} />
        ) : (
          <div>
            <AttendanceCalendar attendanceEvents={attendanceEvents} />
          </div>

        )}
      </div> */}
      {/* <section className="md-ui component-data-table">
        {myisLoading ? <TableLoader isLoading={myisLoading} /> : ""}
        <div className="main-table-wrapper">
          <table className="main-table-content">
            <thead className="data-table-header">
              <tr className="data-table-row">
                {header.map((i, index) => {
                  return (
                    <>
                      <td className="table-datacell datatype-numeric"
                        key={index}>
                        {i.title}
                      </td>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody className="data-table-content">
              {myisLoading ? (
                <TableFetch colSpan={8} />
              ) : mydata?.length === 0 || mydata == null ? (
                <NoRecordFound colSpan={8} />
              ) : (
                mydata?.map((item: any, i: any) => (
                  <tr className="data-table-row" key={i}>
                    <td className="table-datacell datatype-numeric">
                      {item?.employee_name}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.employee_department?.description}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.week_day_created}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {new Date(item?.time_in).toLocaleString()}
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
                    <td className="table-datacell datatype-numeric">
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
      </section> */}

      {/* <footer className="main-table-footer">
				<Pagination
					setDisplayData={setDisplayData}
					data={sortData}
					entriesPerPage={entriesPerPage}
					Total={"Assessment"}
				/>
			</footer> */}
    </div>
  );
};

export default EmployeeAttendanceTable;


