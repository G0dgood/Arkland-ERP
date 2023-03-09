import { Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { BsExclamationLg } from "react-icons/bs";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import { useAppSelector } from "../../hooks/useDispatch";
import { getRequestOptions } from "../../utils/auth/header";
import { checkForName } from "../../utils/checkForName";

const SiteWorkerRequest = () => {
  const [isLoading, setisLoading] = useState(false);
  const [requestWorkersList, setRequestWorkersList] = useState([] as any);
  const [error, setError] = useState<any>();
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API}/hr/workers-requests`,
          getRequestOptions
        );
        const isJsonResponse = response.headers
          ?.get("content-type")
          ?.includes("application/json");
        const data = isJsonResponse && (await response.json());
        if (!response.ok) {
          throw new Error(data.message || response.status);
        }
        setRequestWorkersList([...data.data]);
        setisLoading(false);
        setError(false);
        setMessage("");
      } catch (error: any) {
        setisLoading(false);
        setError(true);
        setMessage(error.message || "Something went wrong");
        setTimeout(() => {
          fetchData();
        }, 5000);
      }
    };
    fetchData();
  }, []);

  const teamLeads: any = useAppSelector((state) => state.teamLeads.teamLeads);

  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };

  const header = [
    { title: "FROM", prop: "team_lead" },
    { title: "DATE SENT", prop: "created_at" },
    { title: "IS URGENT", prop: "is_urgent" },
    { title: "STATUS", prop: "status" },
  ];

  return (
    <div id="screen-wrapper">
      {error && (
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
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div className="SiteWorkermaindiv">
          <div className="SiteWorkermaindivsub">
            <Button variant="contained" className="Add-btn" id="Add-btn-sub">
              <NavLink
                to="/projectview"
                className="drop-logout"
                id="white-btn-color"
              >
                <FaArrowLeft size={30} />
              </NavLink>
            </Button>
            <span className="SupportmainTitleh3">SITE WORKER REQUEST</span>
          </div>
          <div>
            <MainSearch placeholder={"Search...          Site Workers"} />
          </div>
        </div>
        <section className="md-ui component-data-table">
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
                ) : requestWorkersList?.length === 0 ||
                  requestWorkersList == null ? (
                  <NoRecordFound colSpan={8} />
                ) : (
                  requestWorkersList.map((item: any, i: any) => (
                    <tr className="data-table-row">
                      <td className="table-datacell datatype-numeric">
                        {checkForName(item.team_lead, teamLeads)}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {moment(item?.created_at).format("DD-MM-YYYY")}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item.is_urgent === false ? "No" : "Yes"}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SiteWorkerRequest;
