import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit, FiLock } from "react-icons/fi";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { Toast } from "react-bootstrap";
import { BsCheckCircle, BsExclamationLg } from "react-icons/bs";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../../components/TableOptions";
import { checkForName } from "../../../utils/checkForName";
import { useAppDispatch, useAppSelector } from "../../../hooks/useDispatch";
import { useDepartmentById } from "../../../hooks/useDepartments";
import { getDepartment } from "../../../store/reducers/department";
import { getRoles } from "../../../store/reducers/roles";
import TableLoader from "../../../components/TableLoader";

const ViewDepartments = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const {
    department,
    departmentMembers,
    isLoading,
    membersLoading,
    error,
    message,
  } = useDepartmentById(id ? id : "");
  const [showToast, setShowToast] = useState(false);

  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });

  const roles: any = useAppSelector((state) => state?.roles?.roles);
  const departmentState: any = useAppSelector(
    (state) => state?.department?.department
  );
  React.useEffect(() => {
    if (
      !roles ||
      roles.length === 0 ||
      !departmentState ||
      departmentState.length === 0
    ) {
      dispatch(getDepartment());
      dispatch(getRoles());
    }
  }, [dispatch, roles, departmentState]);
  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };
  const header = [
    { title: "EMPLOYEE ID", prop: "employee_id" },
    { title: "FULL NAME", prop: "full_name" },
    { title: "EMAIL", prop: "email" },
    { title: "ROLE", prop: "role" },
    { title: "DEPARTMENT", prop: "department" },
    { title: "CATEGORY", prop: "category" },
    { title: "STATUS", prop: "status" },
    { title: "ACTIONS", prop: "actions" },
  ];

  return (
    <div id="screen-wrapper">
      {/* {error && (
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
      )} */}
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div className="SiteWorkermaindiv">
          <div className="SiteWorkermaindivsub">
            <Button
              variant="contained"
              className="back-btn-icon"
              id="Add-btn-sub"
              onClick={() => navigate("/departments")}
            >
              <FaArrowLeft size={25} />
            </Button>

            <span className="SupportmainTitleh3">{department?.name}</span>
          </div>
          <div>
            <MainSearch
              placeholder={`Search...          ${department?.name}`}
            />
          </div>
        </div>
        <section className="md-ui component-data-table">
          {membersLoading ? <TableLoader isLoading={membersLoading} /> : ""}
          {/* <header className="main-table-header">
							<h1 className="table-header--title">Nutrition</h1>
							<span className="table-header--icons"><i className="material-icons">filter_list</i><i className="material-icons">more_vert</i>
							</span>
						</header> */}
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
                {membersLoading ? (
                  <TableFetch colSpan={8} />
                ) : departmentMembers?.length === 0 ||
                  departmentMembers == null ? (
                  <NoRecordFound colSpan={8} />
                ) : (
                  departmentMembers.length > 0 &&
                  departmentMembers?.map((item: any, i: any) => (
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
                        {checkForName(item?.department, departmentState)}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item?.category}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item?.status}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        <div className="table-active-items">
                          <span>
                            <BsCheckCircle
                              size={25}
                              color={"green"}
                              onClick={() => navigate(`/employees/${item.id}`)}
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
      </main>
    </div>
  );
};

export default ViewDepartments;
