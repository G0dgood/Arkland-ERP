import React, { CSSProperties } from "react";
import { Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { Spinner } from "react-bootstrap";

import Cookies from "js-cookie";
import Select from "react-select";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import projectBack from "../../assets/vectors/project-back.svg";
import {
  useGetEmployeesWithRole,
  useWorkersRequestById,
} from "../../hooks/useWorkersRequest";
import { useAppSelector } from "../../hooks/useDispatch";
import { checkForName } from "../../utils/checkForName";
import TableLoader from "../../components/TableLoader";
import { fireAlert } from "../../utils/Alert";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  width: "99.8%",
  borderRadius: "50px",
};
const token = Cookies.get("token");

const EmployeeSelect = ({ onChange, value, options }: any) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const employeeOptions = options.map((employee: any) => ({
    value: employee.id,
    label: `${employee.first_name} ${employee.last_name}`,
  }));
  return (
    <Select
      options={employeeOptions}
      isMulti
      onChange={onChange}
      value={value}
      isLoading={isLoading}
    />
  );
};

const MemoizedEmployeeSelectWrapper = ({
  roleId,
  selectedRoleEmployees,
  onSelectedOptionsChange,
}: any) => {
  const [selectedOptions, setSelectedOptions] = React.useState<any>({});

  React.useEffect(() => {
    // Call the onSelectedOptionsChange callback function with the updated selectedOptions
    onSelectedOptionsChange(selectedOptions);
  }, [selectedOptions, onSelectedOptionsChange]);

  const handleChange = (requestId: string, selectedValues: any) => {
    const assignedEmployees = selectedValues.map(
      (employee: any) => employee.value
    );
    const selectedRequest = {
      approved_quantity: assignedEmployees.length,
      assigned_employees: assignedEmployees,
    };
    setSelectedOptions((prevState: any) => ({
      ...prevState,
      approved_requests: {
        ...prevState.approved_requests,
        [requestId]: selectedRequest,
      },
    }));
  };

  const employees =
    selectedRoleEmployees.filter((item: any) => item.id === roleId)[0]
      ?.employees?.data || [];
  return (
    <EmployeeSelect
      onChange={(selectedValues: any) => handleChange(roleId, selectedValues)}
      value={selectedOptions[roleId]}
      options={employees}
    />
  );
};

const ViewSiteWorkerRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { requestWorkersList, isLoading } = useWorkersRequestById(id ? id : "");
  const { rolesWithEmployee, isEmployeeWithRoleLoading } =
    useGetEmployeesWithRole();
  const [approvedData, setApprovedData] = React.useState<any>({});
  const [isApprovedLoading, setLoading] = React.useState(false);
  const [isDelinedLoading, setDeclinedLoading] = React.useState(false);

  // --- Get current state of collapseNav from localStorage --- //
  const [collapseNav, setCollapseNav] = React.useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  const handleSelectedOptionsChange = (selectedOptions: any) => {
    // Do something with the updated selectedOptions
    setApprovedData(selectedOptions);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/workers-requests/${id}/approve`,
        {
          method: "PATCH",
          body: JSON.stringify(approvedData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const title = "Request approved.";
        const html = `Request approved`;
        const icon = "success";
        fireAlert(title, html, icon);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Request approval failed";
      fireAlert(title, html, icon);
    }
  };

  const declineSubmit = async () => {
    setDeclinedLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/workers-requests/${id}/reject`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const title = "Request declined.";
        const html = `Request declined`;
        const icon = "success";
        fireAlert(title, html, icon);
        navigate(-1);
        setDeclinedLoading(false);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setDeclinedLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Request approval failed";
      fireAlert(title, html, icon);
    }
  };
  React.useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };

  const teamLeads: any = useAppSelector((state) => state.teamLeads.teamLeads);
  const team: any = useAppSelector((state) => state.team.team);
  const projects: any = useAppSelector((state) => state.projects.projects);

  const header = [
    { title: "ROLE NAME", prop: "role_name" },
    { title: "REQUESTED QUANTITY", prop: "requested_quantity" },
    { title: "CHOOSE EMPLOYEE TO ASSIGN" },
  ];

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      {isLoading && isEmployeeWithRoleLoading ? (
        <div
          style={{
            margin: "auto",
            width: "20%",
          }}
        >
          <SyncLoader
            cssOverride={override}
            color={"#990000"}
            loading={isLoading && isEmployeeWithRoleLoading}
          />
        </div>
      ) : (
        <main>
          <div className="EssentialsContainer">
            <div className="project-main-div">
              <div className="project-main-div-col-1">
                <div className="employee-main-div-col">
                  <div className="employee-main-div-col-header">
                    <div>
                      <img
                        src={projectBack}
                        alt="User"
                        className="project-back-img"
                        onClick={() => navigate(-1)}
                        title="Return"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        className="Create-event-Calender"
                        onClick={() => handleSubmit()}
                      >
                        {isApprovedLoading ? (
                          <Spinner animation="border" />
                        ) : (
                          "APPROVE"
                        )}
                      </Button>
                      <Button
                        variant="contained"
                        className="Create-event-Calender"
                        onClick={() => declineSubmit()}
                      >
                        {isDelinedLoading ? (
                          <Spinner animation="border" />
                        ) : (
                          "Decline"
                        )}
                      </Button>
                    </div>
                  </div>

                  <img
                    src={projectBack}
                    alt="User"
                    className="project-back-img"
                    onClick={() => navigate(-1)}
                    title="Return"
                  />
                  <h4 style={{ marginTop: "3rem" }}>Site Worker Request</h4>
                  <div className="viewprofile-container">
                    <div>
                      <div className="getjob-application-details">
                        <p>Project</p>
                        <p>
                          {checkForName(requestWorkersList.project, projects)}
                        </p>
                        <p>Team</p>
                        <p>{checkForName(requestWorkersList.team, team)}</p>
                        <p>Team Lead</p>
                        <p>
                          {checkForName(
                            requestWorkersList?.team_lead,
                            teamLeads
                          )}
                        </p>
                      </div>
                    </div>
                    <p></p>
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
                            {requestWorkersList?.requests?.map(
                              (item: any, i: any) => {
                                return (
                                  <tr className="data-table-row" key={i}>
                                    <td className="table-datacell datatype-string">
                                      {item?.role_name}
                                    </td>
                                    <td className="table-datacell datatype-string">
                                      {item?.requested_quantity}
                                    </td>
                                    <td className="table-datacell datatype-numeric">
                                      <MemoizedEmployeeSelectWrapper
                                        roleId={item.role}
                                        selectedRoleEmployees={
                                          rolesWithEmployee
                                        }
                                        onSelectedOptionsChange={
                                          handleSelectedOptionsChange
                                        }
                                      />
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ViewSiteWorkerRequest;
