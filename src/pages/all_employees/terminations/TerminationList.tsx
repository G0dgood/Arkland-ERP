import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { BsCheckCircle, BsClock, BsExclamationLg } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../../components/TableOptions";
import Pagination from "../../../components/Pagination";

import { getRequestOptions } from "../../../utils/auth/header";
import TableLoader from "../../../components/TableLoader";

const TerminationList = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [terminations, setTerminations] = useState([] as any);
  const [data, setData] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [newWarningCreated, setNewWarningCreated] = React.useState(false);
  const [showToast, setShowToast] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API}/hr/terminations`,
          getRequestOptions
        );
        const isJsonResponse = response.headers
          ?.get("content-type")
          ?.includes("application/json");
        const data = isJsonResponse && (await response.json());
        if (!response.ok) {
          throw new Error(data.message || response.status);
        }
        setTerminations([...data.data]);
        setisLoading(false);
        setMessage("");
      } catch (error: any) {
        setisLoading(false);
        setShowToast(true);
        setMessage(error.message || "Something went wrong");
        setTimeout(() => {
          fetchData();
        }, 3000);
      }
    };
    fetchData();
  }, [newWarningCreated]);


  const header = [
    { title: "EMPLOYEE NAME", prop: "employee" },
    { title: "REASON", prop: "reason" },
    { title: "DESCRIPTION", prop: "description" },
    { title: "STATUS", prop: "status" },
    { title: "CREATED BY", prop: "created_by" },
  ];



  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  useEffect(() => {
    localStorage.setItem("reportsPerPage", entriesPerPage);
  }, [entriesPerPage]);

  useEffect(() => {
    if (data) {
      const result = data?.filter((object) => {
        // @ts-ignore
        return JSON?.stringify(object)?.toString()?.includes(searchItem);
      });
      setSortData(result);
    }
  }, [data, searchItem]);

  const [displayData, setDisplayData] = useState([]);

  return (
    <div >
      {showToast && (
        <Toast
          onClose={() => setShowToast(false)}
          show={true}
          delay={4000}
          autohide
        >
          <Toast.Body>
            <span>
              <BsExclamationLg />
            </span>
            <p>{message}</p>
            <span onClick={() => setShowToast(false)}>
              <FaTimes />
            </span>
          </Toast.Body>
        </Toast>
      )}
      <div className="SiteWorkermaindiv">
        <div className="SiteWorkermaindivsub">
          <Button
            variant="contained"
            className="back-btn-icon"
            id="Add-btn-sub"
            onClick={() => navigate("/employeecontainer")}
          >
            <FaArrowLeft size={25} />
          </Button>
          <span className="SupportmainTitleh3">TERMINATIONS</span>
        </div>
        <div>
          <EntriesPerPage
            data={data}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
        </div>
        <div>
          <MainSearch placeholder={"Search...          terminations"} />
        </div>
      </div>
      <section className="md-ui component-data-table">
        <div className="main-table-wrapper">
          {isLoading ? <TableLoader isLoading={isLoading} /> : ""}
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
                        {i?.title}
                      </td>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody className="data-table-content">
              {isLoading ? (
                <TableFetch colSpan={8} />
              ) : displayData?.length === 0 || displayData == null ? (
                <NoRecordFound colSpan={8} />
              ) : (
                displayData.map((item: any, i: any) => (
                  <tr
                    className="data-table-row"
                    onClick={() => navigate(`/terminations/${item._id}`)}
                  >
                    <td className="table-datacell datatype-numeric">
                      {item?.employee?.full_name}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.reason}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.description}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.status === "pending" ? (
                        <BsClock
                          size={25}
                          color={"#bf8412"}
                          className="icon-bold"
                        />
                      ) : item?.status === "rejected" ? (
                        <SlClose
                          size={25}
                          color={"red"}
                          className="icon-bold"
                        />
                      ) : (
                        <BsCheckCircle size={25} color={"green"} />
                      )}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.created_by?.full_name}
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
          data={terminations}
          entriesPerPage={entriesPerPage}
          Total={"Employee"}
        />
      </footer>
    </div>
  );
};

export default TerminationList;
