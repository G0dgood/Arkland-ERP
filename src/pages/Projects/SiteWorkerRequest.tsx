import { Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { MainSearch } from "../../components/TableOptions";

const SiteWorkerRequest = () => {
  const [isLoading, setisLoading] = useState(false);
  const [requestWorkersList, setRequestWorkersList] = useState([] as any);

  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  React.useEffect(() => {
    const source = axios.CancelToken.source();
    setisLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/hr/workers-requests`)
      .then((res: AxiosResponse) => {
        setRequestWorkersList([...res.data.data]);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
    return () => {
      source.cancel();
    };
  }, []);
  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };

  return (
    <div id="screen-wrapper">
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
          {/* <header className="main-table-header">
							<h1 className="table-header--title">Nutrition</h1>
							<span className="table-header--icons"><i className="material-icons">filter_list</i><i className="material-icons">more_vert</i>
							</span>
						</header> */}
          <div className="main-table-wrapper">
            <table className="main-table-content">
              <thead className="data-table-header">
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">FROM</td>
                  <td className="table-datacell datatype-numeric">DATE SENT</td>
                  <td className="table-datacell datatype-numeric">REQUEST</td>
                </tr>
              </thead>
              <tbody className="data-table-content">
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    A&A TOWERS
                  </td>
                  <td className="table-datacell datatype-numeric">
                    25-08-2022
                  </td>
                  <td className="table-datacell datatype-numeric">
                    SITE WORKERS AT A&A
                  </td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    A&A TOWERS
                  </td>
                  <td className="table-datacell datatype-numeric">
                    25-08-2022
                  </td>
                  <td className="table-datacell datatype-numeric">
                    SITE WORKERS AT A&A
                  </td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    A&A TOWERS
                  </td>
                  <td className="table-datacell datatype-numeric">
                    25-08-2022
                  </td>
                  <td className="table-datacell datatype-numeric">
                    SITE WORKERS AT A&A
                  </td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    A&A TOWERS
                  </td>
                  <td className="table-datacell datatype-numeric">
                    25-08-2022
                  </td>
                  <td className="table-datacell datatype-numeric">
                    SITE WORKERS AT A&A
                  </td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    A&A TOWERS
                  </td>
                  <td className="table-datacell datatype-numeric">
                    25-08-2022
                  </td>
                  <td className="table-datacell datatype-numeric">
                    SITE WORKERS AT A&A
                  </td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    A&A TOWERS
                  </td>
                  <td className="table-datacell datatype-numeric">
                    25-08-2022
                  </td>
                  <td className="table-datacell datatype-numeric">
                    SITE WORKERS AT A&A
                  </td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    A&A TOWERS
                  </td>
                  <td className="table-datacell datatype-numeric">
                    25-08-2022
                  </td>
                  <td className="table-datacell datatype-numeric">
                    SITE WORKERS AT A&A
                  </td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    A&A TOWERS
                  </td>
                  <td className="table-datacell datatype-numeric">
                    25-08-2022
                  </td>
                  <td className="table-datacell datatype-numeric">
                    SITE WORKERS AT A&A
                  </td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    A&A TOWERS
                  </td>
                  <td className="table-datacell datatype-numeric">
                    25-08-2022
                  </td>
                  <td className="table-datacell datatype-numeric">
                    SITE WORKERS AT A&A
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SiteWorkerRequest;
