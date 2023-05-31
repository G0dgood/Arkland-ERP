import React from "react";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import Pagination from "../../components/Pagination";
import TableLoader from "../../components/TableLoader";
import {
  EmployeeStatus,
  EntriesPerPage,
  MainSearch,
  // MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import { getUserPrivileges } from "../../functions/auth";
import { fireAlert } from "../../utils/Alert";
import EmployeesDownloader from "../../components/Downloader/EmployeesDownloader";
import { allEmployee } from "../../features/Employee/employeeSlice";
import ApproveEmployeeModal from "../../components/Modals/ApproveEmployeeModal";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import DataService from "../../utils/dataService";


const dataService = new DataService()
const AllEmployees = () => {

  const dispatch = useAppDispatch();
  const { data, isError, isLoading, message } = useAppSelector((state: any) => state.employee)
  const { approvedata, approveisError, approveisLoading, approvemessage } = useAppSelector((state: any) => state.employee)
  const { approveisSuccess } = useAppSelector((state: any) => state.employee)
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    dispatch(allEmployee());
  }, [dispatch]);


  useEffect(() => {
    if (approveisSuccess || reset) {
      // @ts-ignore
      dispatch(allEmployee());
    }
  }, [approveisSuccess, dispatch, reset]);

  const [status, setStatus] = useState("in review");
  const [roles, setRoles] = useState("");


  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();


  const [displayData, setDisplayData] = useState([]);
  const [searchItem, setSearchItem] = useState("");


  useEffect(() => {
    if (isError) {
      fireAlert("error", message, "error");
    } else if (approveisError) {
      fireAlert(" KPI error", approvemessage, "error");
    }
  }, [navigate, isError, approveisError, message, approvemessage]);


  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  useEffect(() => {
    localStorage.setItem("reportsPerPage", entriesPerPage);
  }, [entriesPerPage]);



  const header = [
    { title: "FULL NAME", prop: "full_name" },
    { title: "EMAIL", prop: "email" },
    { title: "ROLE", prop: "role" },
    { title: "DEPARTMENT", prop: "department" },
    { title: "CATEGORY", prop: "category" },
    { title: "STATUS", prop: "status" },
    { title: "APPROVE", prop: "status" },
    { title: "ACTION" },
  ];




  return (
    <div>

      <div>
        <div className="allemployees-container">
          <div className="allemployees-container-main">
            <div className="allemployees-container-sup">
              {/* {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && ( */}
              <div className="allemployees-sup-item1">
                <Button
                  variant="contained"
                  className="Add-btn"
                  onClick={() => navigate("/employeesemployees/create")}
                // onClick={handleCreateEmployeeClick}
                >
                  <GoPlus className="icon-space" />
                  Create Employee
                </Button>
              </div>
              {/* )} */}

              {/* {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
                <div
                  className="allemployees-sup-item2"
                  onClick={() => navigate("/warninglist")}
                >
                  <Button variant="contained" className="Add-btn">
                    Warnings
                  </Button>
                </div>
              )} */}
              {/* <UploadEmployee /> */}
              {/* {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
                <div
                  className="allemployees-sup-item2"
                  onClick={() => navigate("/terminations")}
                >
                  <Button variant="contained" className="Add-btn">
                    Terminations
                  </Button>
                </div>
              )} */}
            </div>
            <div className="allemployees-sup-item2">
              <div>
                <EmployeeStatus
                  data={displayData}
                  status={status}
                  setStatus={setStatus}
                  // roles={rolesData}
                  setRoles={setRoles}
                />
              </div>
            </div>
            <div className="allemployees-sup-item2">
              <EntriesPerPage
                data={displayData}
                entriesPerPage={entriesPerPage}
                setEntriesPerPage={setEntriesPerPage}
              />
            </div>
            <div>
              <MainSearch
                setSearchItem={setSearchItem}
                searchItem={searchItem}
                placeholder={"Search...          All Employee"}
              />
            </div>
            <div>
              {data && <EmployeesDownloader data={data} />}

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
                  ) : displayData?.length === 0 || displayData === undefined ? (
                    <NoRecordFound colSpan={9} />
                  ) : (
                    displayData?.map((item: any, i: any) => (
                      <tr className="data-table-row" key={i}>
                        <td className="table-datacell datatype-numeric">
                          {item?.full_name}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          {item?.email}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          {/* {checkForName(item?.role, roles)} */}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          {item?.department?.name}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          {item?.category}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          {item?.status}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          {item?.status === "in review" ? (
                            <ApproveEmployeeModal id={item?.id} data={item} setReset={setReset} />
                          ) : (
                            <Button className="table-link-active"  >
                              Approved
                            </Button>
                          )}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          <div className="table-active-items">
                            <span
                              className="lock-icon-color"
                              title="View employee "
                              style={{ marginLeft: "10px" }}
                              onClick={() => navigate(`/employees/employees/${item.id}`)} >
                              <FiEye
                                size={25}
                                title="View Employee"
                                color="green"
                              />
                            </span>
                            {/* </span> */}
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
            data={data}
            entriesPerPage={entriesPerPage}
            Total={"Employee"}
          />
        </footer>
      </div>
    </div>
  );
};

export default AllEmployees;
