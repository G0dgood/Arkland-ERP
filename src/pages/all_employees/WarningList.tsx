import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import Pagination from "../../components/Pagination";
import CreateWarningModal from "../../components/Modals/CreateWarningModal";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { checkForEmployee, checkForName } from "../../utils/checkForName";
import { getEmployees } from "../../store/reducers/employees";

const WarningList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const employees: any = useAppSelector((state) => state.employees.employees);

  const [warnings, setWarnings] = useState([] as any);
  const [data, setData] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setisLoading] = useState(false);

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    setisLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/hr/warnings`)
      .then((res: AxiosResponse) => {
        console.log(res);
        setWarnings([...res.data.data]);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);

  React.useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const header = [
    { title: "EMPLOYEE ID", prop: "employee" },
    { title: "FULL NAME", prop: "last_name" },
    { title: "MESSAGE", prop: "message" },
    { title: "MISCONDUCT", prop: "misconduct" },
    { title: "NUMBER OF WARNINGS", prop: "count" },
    { title: "STATUS", prop: "status" },
  ];

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
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div className="SiteWorkermaindiv">
          <div className="SiteWorkermaindivsub">
            <Button
              variant="contained"
              className="back-btn-icon"
              id="Add-btn-sub"
              onClick={() => navigate("/allemployees")}
            >
              <FaArrowLeft size={25} />
            </Button>

            <span className="SupportmainTitleh3">
              <CreateWarningModal />
            </span>
          </div>
          <div>
            <EntriesPerPage
              data={data}
              entriesPerPage={entriesPerPage}
              setEntriesPerPage={setEntriesPerPage}
            />
          </div>
          <div>
            <MainSearch placeholder={"Search...          Warnings"} />
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
                ) : warnings?.length === 0 || warnings == null ? (
                  <NoRecordFound colSpan={8} />
                ) : (
                  warnings.map((item: any, i: any) => (
                    <tr className="data-table-row">
                      <td className="table-datacell datatype-numeric">
                        {item.employee}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {checkForEmployee(item.employee, employees)}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item.message}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item.misconduct}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item.count}
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
        <footer className="main-table-footer">
          <Pagination
            setDisplayData={setDisplayData}
            data={sortData}
            entriesPerPage={entriesPerPage}
            Total={"Employee"}
          />
        </footer>
      </main>
    </div>
  );
};

export default WarningList;
