import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import axios, { AxiosResponse } from "axios";
import moment from "moment";
import TableLoader from "../../components/TableLoader";
import { Link } from "react-router-dom";
import storage from "../../utils/storage";
import { fireAlert } from "../../utils/Alert";

const MyKPIAssessment = ({ setkpidata }: any) => {
  // @ts-ignore
  const userInfo: any = JSON.parse(storage?.get("user"));

  const [data, setData] = useState<any>([]);
  const [sortData, setSortData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false)
  const [message, setMessage] = useState("");


  const title1 = "KPI error";
  const html1 = message;
  const icon1 = "error";

  useEffect(() => {
    if (isError) {
      fireAlert(title1, html1, icon1);
      setTimeout(() => {
        setisError(false)
      }, 10000);
    }
  }, [isError, html1]);

  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  useEffect(() => {
    localStorage.setItem("reportsPerPage", entriesPerPage);
  }, [entriesPerPage]);

  useEffect(() => {
    if (data) {
      const result = data?.filter((object: any) => {
        // @ts-ignore
        return JSON?.stringify(object)?.toString()?.includes(searchItem);
      });
      setSortData(result);
    }
  }, [data, searchItem]);

  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    setisLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API}/hr/appraisals?employee=${userInfo?.data?.employee?._id}`
      )
      .then((res: AxiosResponse) => {
        if (res?.data?.success === false) {
          setMessage(res?.data?.message)
          setisError(true)
        } else {
          setData(res?.data?.data);
          setkpidata(res?.data?.data?.length);
        }

        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, [setkpidata, userInfo?.data?.employee?._id]);

  return (
    <div>
      <div className="SiteWorkermaindiv">
        <div className="SiteWorkermaindivsub">
          {/* <Button variant="contained"
						className="back-btn-icon"
						id="Add-btn-sub"
						onClick={() => navigate("/leave")}>
						<FaArrowLeft size={25} />
					</Button> */}

          <span className="SupportmainTitleh3">KPI Assessment</span>
        </div>
        <div>
          <EntriesPerPage
            data={sortData}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
        </div>
        <div>
          <MainSearch placeholder={"Search...          KPI Assessment"} />
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
                <td className="table-datacell datatype-numeric">MONTH</td>
                <td className="table-datacell datatype-numeric">AVERAGE</td>
                <td className="table-datacell datatype-numeric">STATUS</td>
                <td className="table-datacell datatype-numeric">ACTION</td>
              </tr>
            </thead>
            <tbody className="data-table-content">
              {isLoading ? (
                <TableFetch colSpan={8} />
              ) : displayData?.length === 0 || displayData == null ? (
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
                            : "table-link"
                        }
                      >
                        {item?.status === "active" ? "Completed" : item?.status}
                      </Button>
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <Link to={`/kpidetails/${item?._id}`}>
                        <Button id="team-applicatiom-update">View</Button>
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

export default MyKPIAssessment;
