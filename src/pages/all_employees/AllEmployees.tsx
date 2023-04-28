import React from "react";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BsCheckCircle, BsExclamationLg, BsEyeFill } from "react-icons/bs";
import { FiCheckCircle, FiEdit, FiEye, FiLock } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Modal, Spinner, Toast } from "react-bootstrap";
import Cookies from "js-cookie";
import { FaTimes } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import TableLoader from "../../components/TableLoader";
import {
  EmployeeStatus,
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
import { getUserPrivileges } from "../../functions/auth";
import { DialogState } from "../../interfaces/base";
import { MdOutlineClose } from "react-icons/md";
import { fireAlert } from "../../utils/Alert";

const token = Cookies.get("token");

const AllEmployees = ({ setEmployee }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("");

  const { employees, isLoading, error, message } = useEmployees(status);
  const roles: any = useAppSelector((state) => state?.roles?.roles);
  const departments: any = useAppSelector(
    (state) => state?.department?.department
  );
  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();

  const [displayData, setDisplayData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showDialog, setShowDialog] = React.useState<DialogState>({});
  const [deleteShow, setDeleteShow] = React.useState(false);

  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  useEffect(() => {
    localStorage.setItem("reportsPerPage", entriesPerPage);
  }, [entriesPerPage]);

  React.useEffect(() => {
    if (!roles || roles?.length === 0) {
      dispatch(getRoles());
    }
    if (!departments || departments?.length === 0) {
      dispatch(getDepartment());
    }
    // setEmployee(employees?.length);
  }, [dispatch, roles, departments, setEmployee, employees?.length]);

  const header = [
    { title: "FULL NAME", prop: "full_name" },
    { title: "EMAIL", prop: "email" },
    { title: "ROLE", prop: "role" },
    { title: "DEPARTMENT", prop: "department" },
    { title: "CATEGORY", prop: "category" },
    { title: "STATUS", prop: "status" },
    { title: "ACTION" },
  ];

  const handleApproval = (id: any) => {
    setShowDialog({ [id]: true });
    setDeleteShow(true);
  };

  const handleSubmit = async (id: any) => {
    setApprovalLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/employees/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setApprovalLoading(false);
      if (response.ok) {
        const title = "Employee approved successful";
        const html = `Employee approved`;
        const icon = "success";
        fireAlert(title, html, icon);
        // navigate(`/employeecontainer`);
        setShowDialog({ [id]: false });
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      // console.log(error);
      setApprovalLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Employee approval failed";
      fireAlert(title, html, icon);
      setShowDialog({ [id]: false });
    }
  };

  console.log('displayData?.length', displayData?.length)

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
              {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
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
              )}

              {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
                <div
                  className="allemployees-sup-item2"
                  onClick={() => navigate("/warninglist")}
                >
                  <Button variant="contained" className="Add-btn">
                    Warnings
                  </Button>
                </div>
              )}

              {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
                <div
                  className="allemployees-sup-item2"
                  onClick={() => navigate("/terminations")}
                >
                  <Button variant="contained" className="Add-btn">
                    Terminations
                  </Button>
                </div>
              )}
            </div>
            <div className="allemployees-sup-item2">
              <div>
                <EmployeeStatus
                  data={displayData}
                  status={status}
                  setStatus={setStatus}
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
            {/* <div>
              <MainSearch
                setSearchItem={setSearchItem}
                searchItem={searchItem}
                placeholder={"Search...          All Employee"}
              />
            </div> */}
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
                          {checkForName(item?.role, roles)}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          {checkForName(item?.department, departments)}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          {item?.category}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          {item?.status}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          <div className="table-active-items">
                            {/* <span> */}
                            {item?.status === "in review" ? (
                              <span
                                className="edit-icon-color"
                                title="Approve employee"
                                color="#d32f2f"
                                onClick={() => handleApproval(item?.id)}
                              >
                                <FiCheckCircle
                                  size={25}
                                  title="Approve Employee"
                                  color="green"
                                />
                              </span>
                            ) : (
                              ""
                            )}

                            <span
                              className="lock-icon-color"
                              title="View employee "
                              style={{
                                marginLeft: "10px",
                              }}
                              onClick={() => navigate(`/employees/${item.id}`)}
                            >
                              <FiEye
                                size={25}
                                title="View Employee"
                                color="green"
                              />
                            </span>
                            {/* </span> */}
                          </div>
                        </td>
                        {showDialog[item?.id] && (
                          <Modal
                            size="lg"
                            show={deleteShow}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton id="displayTermination">
                              <Modal.Title>Delete Task</Modal.Title>
                              <Button
                                style={{ color: "#fff" }}
                                onClick={() => setDeleteShow(false)}
                              >
                                <MdOutlineClose size={28} />
                              </Button>
                            </Modal.Header>
                            <Modal.Body>
                              <p>
                                Are you sure you want to approve this employee?
                              </p>
                              <p>{item?.title}</p>
                            </Modal.Body>
                            <Modal.Footer>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  handleSubmit(item?.id);
                                }}
                              >
                                {approvalLoading ? (
                                  <Spinner animation="border" />
                                ) : (
                                  "Yes"
                                )}
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={() =>
                                  setShowDialog({ [item?.id]: false })
                                }
                              >
                                Cancel
                              </button>
                            </Modal.Footer>
                          </Modal>
                        )}
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
