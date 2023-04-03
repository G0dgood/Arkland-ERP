import React from "react";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BsCheckCircle, BsExclamationLg, BsEyeFill } from "react-icons/bs";
import { FiEdit, FiLock } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import TableLoader from "../../components/TableLoader";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { checkForName } from "../../utils/checkForName";
import { getRoles } from "../../store/reducers/roles";
import { getDepartment } from "../../store/reducers/department";
import { useEmployees } from "../../hooks/useEmployees";

const AllEmployees = ({ setEmployee }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employees, isLoading, error, message } = useEmployees();
  const roles: any = useAppSelector((state) => state?.roles?.roles);
  const departments: any = useAppSelector(
    (state) => state?.department?.department
  );

  const [displayData, setDisplayData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [showToast, setShowToast] = useState(false);

  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  useEffect(() => {
    localStorage.setItem("reportsPerPage", entriesPerPage);
  }, [entriesPerPage]);

  React.useEffect(() => {
    if (!roles || roles.length === 0) {
      dispatch(getRoles());
    }
    if (!departments || departments.length === 0) {
      dispatch(getDepartment());
    }
    // setEmployee(employees?.length);
  }, [dispatch, roles, departments, setEmployee, employees.length]);

  const header = [
    { title: "EMPLOYEE ID", prop: "employee_id" },
    { title: "FULL NAME", prop: "full_name" },
    { title: "EMAIL", prop: "email" },
    { title: "ROLE", prop: "role" },
    { title: "DEPARTMENT", prop: "department" },
    { title: "VIEW EMPLOYEE", prop: "view" },
    { title: "ACTION" },
  ];

  return (
    <div>
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

              <div
                className="allemployees-sup-item2"
                onClick={() => navigate("/terminations")}
              >
                <Button variant="contained" className="Add-btn">
                  Terminations
                </Button>
              </div>

              <div>
                <EntriesPerPage
                  data={displayData}
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
                    <TableFetch colSpan={9} />
                  ) : displayData?.length === 0 || displayData === null ? (
                    <NoRecordFound colSpan={9} />
                  ) : (
                    displayData?.map((item: any, i: any) => (
                      <tr className="data-table-row" key={i}>
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
                          <span>
                            <BsCheckCircle
                              size={25}
                              color={"green"}
                              onClick={() => navigate(`/employees/${item.id}`)}
                              title="View employee"
                            />
                          </span>
                        </td>

                        <td className="table-datacell datatype-numeric">
                          <div className="table-active-items">
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
            data={employees}
            entriesPerPage={entriesPerPage}
            Total={"Employee"}
          />
        </footer>
      </div>
    </div>
  );
};

export default AllEmployees;
