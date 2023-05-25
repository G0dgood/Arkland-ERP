import { Button } from "@material-ui/core";
import { useState } from "react";
import TableLoader from "../../../components/TableLoader";
import { NoRecordFound, TableFetch } from "../../../components/TableOptions";
import { useAttendance } from "../../../hooks/useAttendance";
import { checkForName } from "../../../utils/checkForName";
import { useAppSelector } from "../../../hooks/useDispatch";

const AttendanceTable = () => {
  // @ts-ignore
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { attenances, isLoading, error, message } = useAttendance(
    startDate,
    endDate
  );

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });


  const departments: any = useAppSelector(
    (state) => state?.department?.department
  );
  const header = [
    { title: "NAME", prop: "employee_name" },
    { title: "DEPARTMENT", prop: "employee_department" },
    { title: "ARRIVAL", prop: "time_in" },
    { title: "CHECKED-IN OFFICE", prop: "ip_checked" },
    { title: "HR ASSISTED CHECK-IN", prop: "is_hr_assisted" },
    // { title: "DATE", prop: "created_at" },
    // { title: "ACTION" },
  ];

  return (
    <div  >
      <div className="SiteWorkermaindiv">
        <div className="SiteWorkermaindivsub">
          <span className="SupportmainTitleh3">EMPLOYEE ATTENDANCE</span>
        </div>
        <div className="entries-perpage">
          {/* Date range picker */}
          <form
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <div className="input">
              <label htmlFor="startDate" className="input__label">
                Start Date
              </label>
              <input
                className="input__field"
                style={{
                  lineHeight: "1",
                }}
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="endDate" className="input__label">
                End Date
              </label>
              <input
                className="input__field"
                style={{
                  lineHeight: "1",
                }}
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={handleChange}
              />
            </div>
          </form>
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
      </section>
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

export default AttendanceTable;
