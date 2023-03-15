import React from "react";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BsCheckCircle, BsExclamationLg } from "react-icons/bs";
import { FiEdit, FiLock } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import TableLoader from "../../components/TableLoader";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import { useAppSelector } from "../../hooks/useDispatch";
import { checkForName } from "../../utils/checkForName";
import { getRequestOptions } from "../../utils/auth/header";

const AllEmployees = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([] as any);
  const [sortData, setSortData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

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

  const roles: any = useAppSelector((state) => state?.roles?.roles);
  const departments: any = useAppSelector(
    (state) => state?.department?.department
  );

  const [displayData, setDisplayData] = useState([]);

  const header = [
    { title: "EMPLOYEE ID", prop: "employee_id" },
    { title: "FULL NAME", prop: "full_name" },
    { title: "EMAIL", prop: "email" },
    { title: "ROLE", prop: "role" },
    { title: "DEPARTMENT", prop: "department" },
    { title: "CATEGORY", prop: "category" },
    // { title: "ACTIVE USER", prop: "active_user" },
    { title: "ACTIONS", prop: "actions" },
  ];
  React.useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setisLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API}/hr/employees`,
          getRequestOptions
        );
        const isJsonResponse = response.headers
          ?.get("content-type")
          ?.includes("application/json");
        const data = isJsonResponse && (await response.json());
        if (!response.ok) {
          throw new Error(data.message || response.status);
        }
        if (isMounted) {
          setEmployees(data.data);
          setisLoading(false);
          setError(false);
          setMessage("");
        }
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

    return () => {
      isMounted = false;
    };
  }, []);

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
        <div>
          <div className="allemployees-container">
            <div className="allemployees-container-main">
              <div className="allemployees-container-sup">
                <div className="allemployees-sup-item1">
                  <Button
                    variant="contained"
                    className="Add-btn"
                    onClick={() => navigate("/createemployee")}
                    // onClick={handleCreateEmployeeClick}
                  >
                    <GoPlus className="icon-space" />
                    Create Employee
                  </Button>
                </div>

                <div
                  className="allemployees-sup-item2"
                  onClick={() => navigate("/warninglist")}
                >
                  <Button variant="contained" className="Add-btn">
                    Warning List
                  </Button>
                </div>

                <div>
                  <EntriesPerPage
                    // data={data}
                    entriesPerPage={entriesPerPage}
                    setEntriesPerPage={setEntriesPerPage}
                  />
                </div>
              </div>
              <div>
                <MainSearch
                  setSearchItem={setSearchItem}
                  searchItem={searchItem}
                  placeholder={"Search...          All Employee"}
                />
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
                    ) : employees?.length === 0 || employees == null ? (
                      <NoRecordFound colSpan={8} />
                    ) : (
                      employees?.map((item: any, i: any) => (
                        <tr className="data-table-row">
                          <td className="table-datacell datatype-string">
                            {item?.employee_id}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {item?.full_name}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {item?.email}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {checkForName(item?.role, roles)}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {checkForName(item?.department, departments)}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {item?.category}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            <div className="table-active-items">
                              <span>
                                <BsCheckCircle
                                  size={25}
                                  color={"green"}
                                  onClick={() =>
                                    navigate(`/employees/${item.id}`)
                                  }
                                  title="View employee"
                                />
                              </span>
                              <span>
                                <span
                                  className="edit-icon-color"
                                  onClick={() => navigate("/admineditUser")}
                                  title="Edit employee"
                                >
                                  <FiEdit size={25} />
                                </span>
                                {"  "}
                                <span
                                  className="lock-icon-color"
                                  title="Lock employee account"
                                >
                                  <FiLock size={25} />
                                </span>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          <footer className="main-table-footer">
            <Pagination
              setDisplayData={setDisplayData}
              data={sortData}
              entriesPerPage={entriesPerPage}
              Total={"Employee"}
            />
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AllEmployees;
