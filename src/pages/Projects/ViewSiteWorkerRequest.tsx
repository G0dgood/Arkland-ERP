import React, { CSSProperties } from "react";
import { Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
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

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  width: "99.8%",
  borderRadius: "50px",
};
type SelectedOptions = Record<string, string[]>;

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

const MemoizedEmployeeSelect = React.memo(EmployeeSelect);

const MemoizedEmployeeSelectWrapper = ({
  roleId,
  selectedRoleEmployees,
}: // onChange,
// selectedOptions,
// requestId,
any) => {
  const [selectedOptions, setSelectedOptions] = React.useState<SelectedOptions>(
    {}
  );

  const handleChange = (requestId: string, selectedValues: any) => {
    setSelectedOptions({
      ...selectedOptions,
      [requestId]: selectedValues,
    });
  };

  const employees =
    selectedRoleEmployees.filter((item: any) => item.id === roleId)[0]
      ?.employees?.data || [];
  return (
    <MemoizedEmployeeSelect
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
  const { rolesWithEmployee } = useGetEmployeesWithRole();
  console.log("rolesWithEmployee", rolesWithEmployee);
  // --- Get current state of collapseNav from localStorage --- //
  const [collapseNav, setCollapseNav] = React.useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  const [selectedOptions, setSelectedOptions] = React.useState<SelectedOptions>(
    {}
  );

  const handleSelectChange = (requestId: string, selectedValues: any) => {
    console.log(selectedValues);
    setSelectedOptions({
      ...selectedOptions,
      [requestId]: selectedValues,
    });
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
    { title: "QUANTITY", prop: "requested_quantity" },
    { title: "CHOOSE EMPLOYEE TO ASSIGN" },
    // { title: "ASSIGNED EMPLOYEES" },
  ];

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      {isLoading ? (
        <div
          style={{
            margin: "auto",
            width: "20%",
          }}
        >
          <SyncLoader
            cssOverride={override}
            color={"#990000"}
            loading={isLoading}
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
                        // onClick={() => handleApproval()}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        className="Create-event-Calender"
                      >
                        Decline
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
                        <p>Request</p>
                        <section className="md-ui component-data-table">
                          {isLoading ? (
                            <TableLoader isLoading={isLoading} />
                          ) : (
                            ""
                          )}
                          {/* <div className="main-table-wrapper"> */}
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
                                        />
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                          {/* </div> */}
                        </section>
                        <p>Assign Workers</p>
                      </div>
                    </div>
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
