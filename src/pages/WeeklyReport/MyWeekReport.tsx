/* eslint-disable react/jsx-no-undef */
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
import { allweeklyReport } from "../../features/WeeklyReport/WeeklyReportSlice";
import Pagination from "../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import Lightboxs from "../../components/Lightboxs";


const MyWeekReport = ({ setkpidata }: any) => {
 const dispatch = useAppDispatch();
 const { data, isLoading } = useAppSelector((state: any) => state.Weeklyreport)

 // --- Pagination --- //
 const [entriesPerPage, setEntriesPerPage] = useState(() => {
  return localStorage.getItem("reportsPerPage") || "10";
 });

 useEffect(() => {
  // @ts-ignore
  dispatch(allweeklyReport());
 }, [dispatch]);

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
        <td className="table-datacell  ">FULL NAME</td>
        <td className="table-datacell datatype-numeric">YEAR</td>
        <td className="table-datacell datatype-numeric">WEEK</td>
        <td className="table-datacell datatype-numeric">SELF ASSESSMENT</td>
        <td className="table-datacell datatype-numeric">FILE</td>
        <td className="table-datacell datatype-numeric">STATUS</td>
        <td className="table-datacell datatype-numeric">ACTION</td>
       </tr>
      </thead>
      <tbody className="data-table-content">
       {isLoading ? (
        <TableFetch colSpan={7} />
       ) : displayData?.length === 0 ||
        data === null ||
        displayData?.length === undefined ? (
        <NoRecordFound colSpan={7} />
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
           <span className="file-preview" style={{ width: "40px", height: "40px" }}>

            <Lightboxs img={item?.attachments} />
           </span>
          </td>
          <td className="table-datacell datatype-numeric">
           <div className={item?.status !== "submitted"
            ? "status is-green  move-svg-left"
            : "status is-wait move-svg-left"}  >
            {item?.status !== "submitted"
             ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5" />
             </svg>
             : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
             </svg>}
            {item?.status !== "submitted" ? "Completed" : item?.status}
           </div>
           {/* <Button
                        className={
                          item?.status === "submitted"
                            ? "table-link "
                            : "table-link-active"}>
                        {item?.status}
                      </Button> */}
          </td>
          <td className="table-datacell datatype-numeric">
           <Link to={`/weeklyreport/weeklyreport/${item?._id}`}>
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
