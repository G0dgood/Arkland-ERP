import { useEffect, useState } from "react";
import TableLoader from "../../components/TableLoader";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import Pagination from "../../components/Pagination";
import { Button } from "@material-ui/core";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { teamAssessment } from "../../features/KPIAssessment/assessmentSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import DataService from "../../utils/dataService";

const dataService = new DataService()
const TeamKPI = () => {
  const dispatch = useAppDispatch();
  const { teamdata, teamisLoading } = useAppSelector((state: any) => state.assessment)
  const { hodreviewisSuccess } = useAppSelector((state: any) => state.assessment)
  const navigate = useNavigate();

  const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)

  const [sortData, setSortData] = useState([]);









  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });


  useEffect(() => {
    if (teamdata) {
      const result = teamdata?.filter((object: any) => {
        // @ts-ignore
        return JSON?.stringify(object)?.toString()?.includes('');
      });
      setSortData(result);
    }
  }, [teamdata]);

  const [displayData, setDisplayData] = useState([]);

  const id = userInfo?.employee?._id



  useEffect(() => {
    // @ts-ignore
    dispatch(teamAssessment(id));
    // if (hodreviewisSuccess) {
    //   // @ts-ignore
    //   dispatch(teamAssessment(id));
    // }
  }, [dispatch, hodreviewisSuccess, id]);

  const handleView = (item: any) => {
    navigate(`/kpiassessment/kpiassessment/teamkpi/view/${item?._id}`, { state: { name: 'hod' } })
  }


  return (
    <div  >

      <div className="SiteWorkermaindiv">
        <div className="SiteWorkermaindivsub">
          <span className="SupportmainTitleh3">Team KPI Assessment</span>
        </div>
        <div>
          <EntriesPerPage
            data={sortData}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
        </div>
        <div>
          <MainSearch placeholder={"Search...          Assessment"} />
        </div>
      </div>
      <section className="md-ui component-data-table">
        {teamisLoading ? <TableLoader isLoading={teamisLoading} /> : ""}
        <div className="main-table-wrapper">
          <table className="main-table-content">
            <thead className="data-table-header">
              <tr className="data-table-row">
                <td className="table-datacell datatype-name">FULL NAME</td>
                <td className="table-datacell datatype-numeric">YEAR</td>
                <td className="table-datacell datatype-numeric">MONTH</td>
                <td className="table-datacell datatype-numeric">AVERAGE</td>
                <td className="table-datacell datatype-numeric">FILE</td>
                <td className="table-datacell datatype-numeric">STATUS</td>
                <td className="table-datacell datatype-numeric">ACTION</td>
              </tr>
            </thead>
            <tbody className="data-table-content">
              {teamisLoading ? (
                <TableFetch colSpan={8} />
              ) : displayData?.length === 0 || displayData === undefined ? (
                <NoRecordFound colSpan={8} />
              ) : (
                displayData.map((item: any, i: any) => (
                  <tr className="data-table-row" key={i}>
                    <td className="table-datacell datatype-numeric">
                      {item.employee_name}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {moment(item?.created_at).format("DD-MM-YYYY")}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.month === 1
                        ? "January"
                        : item?.month === 2
                          ? "February"
                          : item?.month === 3
                            ? "March"
                            : item?.month === 4
                              ? "April"
                              : item?.month === 5
                                ? "May"
                                : item?.month === 6
                                  ? "June"
                                  : item?.month === 7
                                    ? "July"
                                    : item?.month === 8
                                      ? "	August"
                                      : item?.month === 9
                                        ? "September"
                                        : item?.month === 10
                                          ? "October"
                                          : item?.month === 11
                                            ? "November"
                                            : item?.month === 12
                                              ? "December"
                                              : ""}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.performance_percentage_employee}%
                    </td>
                    <td className="table-datacell datatype-numeric">
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <div className={item?.status === "active"
                        ? "status is-green  move-svg-left"
                        : "status is-wait move-svg-left"}  >
                        {item?.status === "active"
                          ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>}
                        {item?.status === "active" ? "Completed" : item?.status}
                      </div>
                      {/* <Button
                        className={
                          item?.status === "active"
                            ? "table-link-active"
                            : "table-link"}  >
                        {item?.status === "active"
                          ? "Completed"
                          : item?.status}
                      </Button> */}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {/* <Link to={`/kpiassessment/kpiassessment/teamkpi/view/${item?._id}`}> */}
                      <Button id="team-applicatiom-update" onClick={() => handleView(item)}>
                        {item?.status === "active" ? "View" : "Update"}
                      </Button>
                      {/* </Link> */}
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
          data={sortData}
          entriesPerPage={entriesPerPage}
          Total={"Assessment"}
        />
      </footer>
    </div>
  );
};

export default TeamKPI;
