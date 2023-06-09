import { useEffect, useState } from "react";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import moment from "moment";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import TableLoader from "../../components/TableLoader";
import { fireAlert } from "../../utils/Alert";

import { allweeklyReport, reset } from "../../features/WeeklyReport/WeeklyReportSlice";
import Pagination from "../../components/Pagination";
import DataService from "../../utils/dataService";
import { useAppDispatch, useAppSelector } from "../../store/useStore";

const dataService = new DataService()

const MyWeekReport = ({ setkpidata }: any) => {
  const userInfo = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, message, isSuccess } = useAppSelector((state: any) => state.Weeklyreport)

  const title = "Week Report error";
  const html = message;
  const icon = "error";



  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  const id = userInfo?.data?.employee?._id

  useEffect(() => {
    // @ts-ignore
    dispatch(allweeklyReport(id));
  }, [dispatch, id]);


  useEffect(() => {
    if (isError) {
      fireAlert(title, html, icon);
      reset()
    }
  }, [html, isError, isSuccess]);

  const [displayData, setDisplayData] = useState([]);



  return (
    <div>
      <div className="SiteWorkermaindiv">
        <div className="SiteWorkermaindivsub">
          <span className="SupportmainTitleh3">Weekly Report</span>
        </div>
        <div>
          <EntriesPerPage
            data={data}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
        </div>
        <div>
          <MainSearch placeholder={"Search...          Week Report"} />
        </div>
      </div>
      <section className="md-ui component-data-table">
        {isLoading ? <TableLoader isLoading={isLoading} /> : ""}
        <div className="main-table-wrapper">
          <table className="main-table-content">
            <thead className="data-table-header">
              <tr className="data-table-row">
                <td className="table-datacell datatype-name">FULL NAME</td>
                <td className="table-datacell datatype-numeric">YEAR</td>
                <td className="table-datacell datatype-numeric">WEEK</td>
                <td className="table-datacell datatype-numeric">
                  SELF ASSESSMENT
                </td>
                <td className="table-datacell datatype-numeric">STATUS</td>
                <td className="table-datacell datatype-numeric">ACTION</td>
              </tr>
            </thead>
            <tbody className="data-table-content">
              {isLoading ? (
                <TableFetch colSpan={8} />
              ) : displayData?.length === 0 ||
                data === null ||
                displayData?.length === undefined ? (
                <NoRecordFound colSpan={8} />
              ) : (
                displayData?.map((item: any, i: any) => (
                  <tr className="data-table-row" key={i}>
                    <td className="table-datacell datatype-numeric">
                      {" "}
                      {item?.employee_name}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {moment(item?.created_at).format("DD-MM-YYYY")}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.week}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.self_assessment}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <Button
                        className={
                          item?.status === "submitted"
                            ? "table-link "
                            : "table-link-active"
                        }
                      >
                        {item?.status}
                      </Button>
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <Link to={`/weeklyreportview/${item?._id}`}>
                        <Button id="team-applicatiom-update">
                          {" "}
                          {item?.status === "acknowledged" ? "View" : "Update"}
                        </Button>
                      </Link>
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
          data={data}
          entriesPerPage={entriesPerPage}
          Total={"Week Report"}
        />
      </footer>
    </div>
  );
};

export default MyWeekReport;
