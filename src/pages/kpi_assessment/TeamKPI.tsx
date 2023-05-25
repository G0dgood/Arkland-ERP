import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from '../../components/SidebarAndDropdown/Sidebar';
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
import { Link } from "react-router-dom";
import storage from "../../utils/storage";
import { fireAlert } from "../../utils/Alert";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { teamAssessment } from "../../features/KPIAssessment/assessmentSlice";

const TeamKPI = () => {
  const dispatch = useAppDispatch();
  const { teamdata, teamisError, teamisLoading, teammessage } = useAppSelector((state: any) => state.assessment)

  // @ts-ignore
  const userInfo: any = JSON.parse(storage?.get("user"));


  const [sortData, setSortData] = useState([]);
  const [searchItem, setSearchItem] = useState("");


  const title1 = "KPI error";
  const html1 = teammessage;
  const icon1 = "error";


  useEffect(() => {
    if (teamisError) {
      fireAlert(title1, html1, icon1);
      // setTimeout(() => {
      //   setteamisError(false)
      // }, 10000);
    }
  }, [teamisError, html1]);

  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON?.parse(localStorage.getItem("collapse")) || false;
  });

  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });
  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };
  //

  useEffect(() => {
    if (teamdata) {
      const result = teamdata?.filter((object: any) => {
        // @ts-ignore
        return JSON?.stringify(object)?.toString()?.includes(searchItem);
      });
      setSortData(result);
    }
  }, [teamdata, searchItem]);

  const [displayData, setDisplayData] = useState([]);

  const id = userInfo?.data?.employee?._id

  useEffect(() => {
    // @ts-ignore
    dispatch(teamAssessment(id));
  }, [dispatch, id]);




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
                      <Button
                        className={
                          item?.status === "active"
                            ? "table-link-active"
                            : "table-link"}  >
                        {item?.status === "active"
                          ? "Completed"
                          : item?.status}
                      </Button>
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <Link to={`/viewkpiassessment/${item?._id}`}>
                        <Button id="team-applicatiom-update">
                          {item?.status === "active" ? "View" : "Update"}
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
          data={sortData}
          entriesPerPage={entriesPerPage}
          Total={"Assessment"}
        />
      </footer>
    </div>
  );
};

export default TeamKPI;
