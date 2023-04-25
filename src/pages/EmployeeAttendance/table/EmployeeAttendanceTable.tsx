import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link, useParams } from "react-router-dom";
import TableLoader from "../../../components/TableLoader";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../../components/TableOptions";
import moment from "moment";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import storage from "../../../utils/storage";
import { useEmployeeAttendance } from "../../../hooks/useAttendance";
import { checkForName } from "../../../utils/checkForName";
import { useAppSelector } from "../../../hooks/useDispatch";

const EmployeeAttendanceTable = () => {
  // @ts-ignore

  const { attenances, isLoading, error, message } = useEmployeeAttendance();

  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });
  console.log("attemd 0", attenances);
  const [data, setData] = useState<any>([]);
  const [sortData, setSortData] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const [isError, setisError] = useState(false);

  const title = "Weekly Reports error";
  const html = message;
  const icon = "error";

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
  const departments: any = useAppSelector(
    (state) => state?.department?.department
  );
  const header = [
    { title: "EMPLOYEE ID", prop: "employee" },
    { title: "NAME", prop: "employee_name" },
    { title: "DEPARTMENT", prop: "employee_department" },
    { title: "ARRIVAL", prop: "time_in" },
    { title: "CONFIRMED", prop: "ip_checked" },
    { title: "HR CHECKING", prop: "is_hr_assisted" },
    // { title: "DATE", prop: "created_at" },
    // { title: "ACTION" },
  ];

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div className="SiteWorkermaindiv">
          <div className="SiteWorkermaindivsub">
            <span className="SupportmainTitleh3">EMPLOYEE ATTENDANCE</span>
          </div>
          <div>
            <EntriesPerPage
              data={data?.data}
              entriesPerPage={entriesPerPage}
              setEntriesPerPage={setEntriesPerPage}
            />
          </div>
          <div>
            <MainSearch placeholder={"Search...          Attendance"} />
          </div>
        </div>
        <section className="md-ui component-data-table">
          {isLoading ? <TableLoader isLoading={isLoading} /> : ""}
          <div className="main-table-wrapper">
            <table className="main-table-content">
              <thead className="data-table-header">
                <tr className="data-table-row">
                  {header.map((i, index) => {
                    return (
                      <>
                        <td
                          className="table-datacell datatype-numeric"
                          key={index}
                        >
                          {i.title}
                        </td>
                      </>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="data-table-content">
                {isLoading ? (
                  <TableFetch colSpan={8} />
                ) : attenances?.length === 0 || attenances == null ? (
                  <NoRecordFound colSpan={8} />
                ) : (
                  attenances?.map((item: any, i: any) => (
                    <tr className="data-table-row" key={i}>
                      <td className="table-datacell datatype-numeric">
                        {item?.employee}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item?.employee_name}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {checkForName(item.department, departments)}
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
                          {item?.ip_checked}
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
                          {item?.is_hr_assisted}
                        </Button>
                      </td>
                      {/* <td className="table-datacell datatype-numeric">
                        <Link to={`/teamWeeklyreportupdate/${item?._id}`}>
                          <Button id="team-applicatiom-update">
                            {" "}
                            {item?.status === "acknowledged"
                              ? "View"
                              : "Update"}
                          </Button>
                        </Link>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
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
