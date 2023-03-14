import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import {
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../../components/TableOptions";
import { getRequestOptions } from "../../../utils/auth/header";
import { Toast } from "react-bootstrap";
import { BsCheckCircle, BsExclamationLg } from "react-icons/bs";
import { checkForName } from "../../../utils/checkForName";
import { useAppSelector } from "../../../hooks/useDispatch";
import { FiEdit, FiLock } from "react-icons/fi";

const ViewDepartments = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [isLoading, setLoading] = React.useState(false);
  const [departments, setDepartments] = React.useState({} as any);
  const [departmentMembers, setDepartmentMembers] = React.useState({} as any);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<any>();
  const [message, setMessage] = useState("");

  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseDepartments = await fetch(
          `${process.env.REACT_APP_API}/hr/departments/${id}`,
          getRequestOptions
        );
        const isJsonResponseDepartments = responseDepartments.headers
          ?.get("content-type")
          ?.includes("application/json");
        const dataDepartments =
          isJsonResponseDepartments && (await responseDepartments.json());
        if (!responseDepartments.ok) {
          throw new Error(
            dataDepartments.message || responseDepartments.status
          );
        }
        setDepartments(dataDepartments.data);

        setLoading(false);
        setError(false);
        setMessage("");
      } catch (error: any) {
        setLoading(false);
        setError(true);
        setMessage(error.message || "Something went wrong");
      }
    };
    fetchData();
  }, [id]);
  console.log(departments);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseDepartmentMembers = await fetch(
          `${process.env.REACT_APP_API}/hr/employees?department=${id}`,
          getRequestOptions
        );
        const isJsonResponseDepartmentMembers =
          responseDepartmentMembers.headers
            ?.get("content-type")
            ?.includes("application/json");
        const dataDepartments =
          isJsonResponseDepartmentMembers &&
          (await responseDepartmentMembers.json());
        if (!responseDepartmentMembers.ok) {
          throw new Error(
            dataDepartments.message || responseDepartmentMembers.status
          );
        }
        setDepartmentMembers(dataDepartments.data);

        setLoading(false);
        setError(false);
        setMessage("");
      } catch (error: any) {
        setLoading(false);
        // setError(true);
        setTimeout(() => {
          fetchData();
        }, 5000);
        setMessage(error.message || "Something went wrong");
      }
    };
    fetchData();
  }, [id]);
  const roles: any = useAppSelector((state) => state?.roles?.roles);
  const departmentState: any = useAppSelector(
    (state) => state?.department?.department
  );

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
    { title: "FIRST NAME", prop: "first_name" },
    { title: "MIDDLE NAME", prop: "middle_name" },
    { title: "LAST NAME", prop: "last_name" },
    { title: "EMAIL", prop: "email" },
    { title: "ROLE", prop: "role" },
    { title: "DEPARTMENT", prop: "department" },
    // { title: "ACTIVE USER", prop: "active_user" },
    { title: "VIEW", prop: "view" },
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
            <Button
              variant="contained"
              className="back-btn-icon"
              id="Add-btn-sub"
              onClick={() => navigate("/departments")}
            >
              <FaArrowLeft size={25} />
            </Button>

            <span className="SupportmainTitleh3">
              {departments?.department?.name}
            </span>
          </div>
          <div>
            <MainSearch
              placeholder={`Search...          ${departments?.department?.name}`}
            />
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
                ) : departmentMembers?.length === 0 ||
                  departmentMembers == null ? (
                  <NoRecordFound colSpan={8} />
                ) : (
                  departmentMembers.length > 0 &&
                  departmentMembers?.map((item: any, i: any) => (
                    <tr className="data-table-row">
                      <td className="table-datacell datatype-string">
                        {item?.id}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item?.first_name}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item?.middle_name}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item?.last_name}
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
                        <div className="table-active-items">
                          <span>
                            <BsCheckCircle size={25} color={"green"} />
                          </span>
                          <span>
                            <span
                              className="edit-icon-color"
                              onClick={() => navigate("/admineditUser")}
                            >
                              <FiEdit size={25} />
                            </span>
                            {"  "}
                            <span className="lock-icon-color">
                              <FiLock size={25} />
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {/* <tbody className="data-table-content">
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    asl/adm/264
                  </td>
                  <td className="table-datacell datatype-numeric">James</td>
                  <td className="table-datacell datatype-numeric">Segun</td>
                  <td className="table-datacell datatype-numeric">Abiodun</td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    asl/adm/264
                  </td>
                  <td className="table-datacell datatype-numeric">James</td>
                  <td className="table-datacell datatype-numeric">Segun</td>
                  <td className="table-datacell datatype-numeric">Abiodun</td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    asl/adm/264
                  </td>
                  <td className="table-datacell datatype-numeric">James</td>
                  <td className="table-datacell datatype-numeric">Segun</td>
                  <td className="table-datacell datatype-numeric">Abiodun</td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    asl/adm/264
                  </td>
                  <td className="table-datacell datatype-numeric">James</td>
                  <td className="table-datacell datatype-numeric">Segun</td>
                  <td className="table-datacell datatype-numeric">Abiodun</td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    asl/adm/264
                  </td>
                  <td className="table-datacell datatype-numeric">James</td>
                  <td className="table-datacell datatype-numeric">Segun</td>
                  <td className="table-datacell datatype-numeric">Abiodun</td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    asl/adm/264
                  </td>
                  <td className="table-datacell datatype-numeric">James</td>
                  <td className="table-datacell datatype-numeric">Segun</td>
                  <td className="table-datacell datatype-numeric">Abiodun</td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    asl/adm/264
                  </td>
                  <td className="table-datacell datatype-numeric">James</td>
                  <td className="table-datacell datatype-numeric">Segun</td>
                  <td className="table-datacell datatype-numeric">Abiodun</td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    asl/adm/264
                  </td>
                  <td className="table-datacell datatype-numeric">James</td>
                  <td className="table-datacell datatype-numeric">Segun</td>
                  <td className="table-datacell datatype-numeric">Abiodun</td>
                </tr>
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    asl/adm/264
                  </td>
                  <td className="table-datacell datatype-numeric">James</td>
                  <td className="table-datacell datatype-numeric">Segun</td>
                  <td className="table-datacell datatype-numeric">Abiodun</td>
                </tr>
              </tbody> */}
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ViewDepartments;
