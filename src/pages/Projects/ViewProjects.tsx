import React, { useEffect, useState, CSSProperties } from "react";
import { Button } from "@mui/material";
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartVoronoiContainer,
  ChartDonut,
} from "@patternfly/react-charts";
import moment from "moment";
import Calendar from "react-calendar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import projectAvatar from "../../assets/vectors/project-avatar.svg";
import projectBack from "../../assets/vectors/project-back.svg";
import redPlus from "../../assets/vectors/red-plus.svg";
import projectProfile from "../../assets/vectors/project-profile.svg";
import { checkForTeams } from "../../utils/checkForName";
import { useAppSelector } from "../../hooks/useDispatch";
import { BarLoader } from "react-spinners";
import CreateProjectModal from "../../components/Modals/CreateProjectModal";
import RequestWorkerModal from "../../components/Modals/RequestWorkerModal";

const ViewProject = () => {
  const { id }: any = useParams();
  const navigate = useNavigate();

  const [value, onChange] = useState(new Date());
  const [projects, setProjects] = React.useState({} as any);
  const [teamMembers, setTeamMembers] = React.useState({} as any);
  const [isLoading, setLoading] = React.useState(false);
  const [dataFetch, setDataFetch] = React.useState(false);
  const [isTeamLoading, setTeamLoading] = React.useState(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: "99.8%",
    borderRadius: "50px",
  };

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_API}/hr/projects/${id}`)
      .then((res) => {
        setProjects(res.data.data);
        setLoading(false);
        setDataFetch(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return () => {
      source.cancel();
    };
  }, [id]);
  React.useEffect(() => {
    const source = axios.CancelToken.source();
    setTeamLoading(true);
    if (dataFetch === true) {
      axios
        .get(
          `${process.env.REACT_APP_API}/hr/teams/${projects?.team}/employees`
        )
        .then((res) => {
          setTeamMembers(res.data.data);
          setTeamLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setTeamLoading(false);
        });
    }

    return () => {
      source.cancel();
    };
  }, [dataFetch === true]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const handleChange = (event: any) => {
  // 	setChecked(event.target.checked);
  // };
  // --- Get current state of collapseNav from localStorage --- //
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

  const locale = "en";
  const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

  React.useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  const objectDate = new Date();

  const month = objectDate.getMonth();

  const year = objectDate.getFullYear();

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = ` ${today.toLocaleDateString(locale, { month: "long" })} `;
  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  const teamLeads: any = useAppSelector((state) => state.teamLeads.teamLeads);

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
          <div className="project-main-div">
            <div className="project-main-div-col-1">
              <div className="project-main-div-col-1-sub">
                <div className="project-main-div-col-1-sub-min">
                  <img
                    src={projectBack}
                    alt="User"
                    className="project-back-img"
                    onClick={() => navigate("/projectview")}
                  />
                  <img
                    src={projectAvatar}
                    alt="User"
                    className="project-sub-img"
                  />
                  <p className="project-sub-img__name">
                    {checkForTeams(projects?.lead, teamLeads)}
                  </p>
                  <p className="project-sub-img__title">SITE MANAGER</p>
                </div>
                <div className="project-main-div-col-2-sub-min project-main-div-col-2-sub-min-main">
                  <div className="project-main-div-col-2-sub-container">
                    <div>
                      <p className="project-main-div-col-2-sub-container-title">
                        PROJECT TITLE:
                      </p>
                      <p className="project-main-div-col-2-sub-container-subTitle">
                        {projects?.name}
                      </p>
                    </div>
                    <div>
                      <p className="project-main-div-col-2-sub-container-title">
                        NUMBER OF EMPLOYEES:
                      </p>
                      <p className="project-main-div-col-2-sub-container-subTitle">
                        {teamMembers.length > 0 ? teamMembers.length : ""}
                      </p>
                    </div>
                  </div>
                  <div className="project-main-div-col-2-sub-container">
                    <div>
                      <p className="project-main-div-col-2-sub-container-title">
                        START DATE:
                      </p>
                      <p className="project-main-div-col-2-sub-container-subTitle">
                        {moment(projects?.created_at).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div>
                      <p className="project-main-div-col-2-sub-container-title">
                        DUE DATE
                      </p>
                      <p className="project-main-div-col-2-sub-container-subTitle">
                        {moment(projects?.proposed_completion_date).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="project-main-div-col-1-sub-min">
                  <p className="project-main-div-col-1-sub-min-text">
                    PROGRESS:
                  </p>
                  <div
                    style={{ height: "100px", width: "100px", margin: "auto" }}
                  >
                    <ChartDonut
                      ariaDesc="Progress"
                      ariaTitle="Progress"
                      constrainToVisibleArea={true}
                      data={[
                        { x: "Completed", y: 100 },
                        { x: "Pending", y: `${projects.progress_percentage}%` },
                      ]}
                      title={`${projects.progress_percentage}%`}
                      colorScale={["#48AB62", "#116327"]}
                      height={200}
                      width={200}
                      padAngle={0}
                      innerRadius={50}
                    />
                  </div>
                </div>
                <div className="project-main-div-col-2-sub-min project-main-div-col-2-sub-min-secondary">
                  <div style={{ height: "346px", width: "346px" }}>
                    <Chart
                      ariaDesc="Average number of pets"
                      ariaTitle="Line chart example"
                      containerComponent={
                        <ChartVoronoiContainer
                          labels={({ datum }) => `${datum.name}: ${datum.y}`}
                          constrainToVisibleArea
                        />
                      }
                      legendData={[
                        { name: "Expenditure" },
                        { name: "Revenue", symbol: { type: "dash" } },
                        { name: "Profit" },
                      ]}
                      legendOrientation="vertical"
                      legendPosition="right"
                      height={250}
                      maxDomain={{ y: 10 }}
                      minDomain={{ y: 0 }}
                      padding={{
                        bottom: 50,
                        left: 50,
                        right: 200, // Adjusted to accommodate legend
                        top: 50,
                      }}
                      width={600}
                    >
                      <ChartAxis tickValues={[2, 3, 4]} />
                      <ChartAxis
                        dependentAxis
                        showGrid
                        tickValues={[10, 20, 30, 40, 50]}
                      />
                      <ChartGroup>
                        <ChartLine
                          data={[
                            { name: "Expenditure", x: "Jan", y: 1 },
                            { name: "Expenditure", x: "Feb", y: 2 },
                            { name: "Expenditure", x: "Mar", y: 5 },
                          ]}
                        />
                        <ChartLine
                          data={[
                            { name: "Revenue", x: "Jan", y: 2 },
                            { name: "Revenue", x: "Feb", y: 1 },
                            { name: "Revenue", x: "Mar", y: 7 },
                          ]}
                          style={{
                            data: {
                              strokeDasharray: "3,3",
                            },
                          }}
                        />
                        <ChartLine
                          data={[
                            { name: "Profit", x: "Jan", y: 3 },
                            { name: "Profit", x: "Feb", y: 4 },
                            { name: "Profit", x: "Mar", y: 9 },
                          ]}
                        />
                      </ChartGroup>
                    </Chart>
                  </div>
                </div>
              </div>
              <div className="project-main-div-col-2-sub">
                <div>
                  <div className="project-main-div-col-2-sub-min-main__header">
                    <h5>Team Members</h5>
                    <img
                      src={redPlus}
                      alt="User"
                      className="project-main-div-col-2-sub-min-main__header-plus"
                    />
                  </div>

                  <div className="project-main-div-col-2-sub-max project-main-div-col-2-sub-min-main">
                    {isTeamLoading === true ? (
                      <div>
                        <SyncLoader
                          cssOverride={override}
                          color={"#990000"}
                          loading={isTeamLoading}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr",
                        }}
                      >
                        {teamMembers?.length > 0 ? (
                          <div className="project-main-div-col-2-sub-container1">
                            {teamMembers?.map((item: any, i: any) => (
                              <div className="project-main-div-col-2-sub-container1-flex">
                                <img
                                  src={projectProfile}
                                  alt="User"
                                  className="project-main-div-col-2-sub-container1-image"
                                />
                                <div className="project-main-div-col-2-sub-container1-flexMargin">
                                  <p className="project-main-div-col-2-sub-container1-title">
                                    {item.employee_name}
                                  </p>
                                  <p
                                    className="project-main-div-col-2-sub-container1-subTitle"
                                    style={{ textTransform: "uppercase" }}
                                  >
                                    {item.team_name}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="project-main-div-col-2-sub-min-main__header">
                    <h5>Ongoing Tasks</h5>
                    <img
                      src={redPlus}
                      alt="User"
                      className="project-main-div-col-2-sub-min-main__header-plus"
                    />
                  </div>
                  <div className="project-main-div-col-2-sub-max1 project-main-div-col-2-sub-min-main">
                    <div className="Announcement-container">
                      <div className="Announcement-sub-2">
                        <div
                          className="project-main-todo-Event"
                          style={{ borderRadius: "4px" }}
                        >
                          <div className="main-todo-container">
                            <div className="main-todo-note">
                              <div className="project-main-todo-note-big">
                                Vel est mattis purus.
                              </div>
                              <div className="project-main-todo-note">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Tellus curabitur amet, sed
                                ornare facilisis dictum. Sed cursus turpis diam,
                                id volutpat sit vel. Dui aenean euismod nisi
                                blandit purus dignissim. Justo mattis nulla.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="Announcement-sub-2">
                        <div
                          className="project-main-todo-Event"
                          style={{ borderRadius: "4px" }}
                        >
                          <div className="main-todo-container">
                            <div className="main-todo-note">
                              <div className="project-main-todo-note-big">
                                Vel est mattis purus.
                              </div>
                              <div className="project-main-todo-note">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Tellus curabitur amet, sed
                                ornare facilisis dictum. Sed cursus turpis diam,
                                id volutpat sit vel. Dui aenean euismod nisi
                                blandit purus dignissim. Justo mattis nulla.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="Announcement-sub-2">
                        <div
                          className="project-main-todo-Event"
                          style={{ borderRadius: "4px" }}
                        >
                          <div className="main-todo-container">
                            <div className="main-todo-note">
                              <div className="project-main-todo-note-big">
                                Vel est mattis purus.
                              </div>
                              <div className="project-main-todo-note">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Tellus curabitur amet, sed
                                ornare facilisis dictum. Sed cursus turpis diam,
                                id volutpat sit vel. Dui aenean euismod nisi
                                blandit purus dignissim. Justo mattis nulla.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="Announcement-sub-2">
                        <div
                          className="project-main-todo-Event"
                          style={{ borderRadius: "4px" }}
                        >
                          <div className="main-todo-container">
                            <div className="main-todo-note">
                              <div className="project-main-todo-note-big">
                                Vel est mattis purus.
                              </div>
                              <div className="project-main-todo-note">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Tellus curabitur amet, sed
                                ornare facilisis dictum. Sed cursus turpis diam,
                                id volutpat sit vel. Dui aenean euismod nisi
                                blandit purus dignissim. Justo mattis nulla.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="Announcement-sub-2">
                        <div
                          className="project-main-todo-Event"
                          style={{ borderRadius: "4px" }}
                        >
                          <div className="main-todo-container">
                            <div className="main-todo-note">
                              <div className="project-main-todo-note-big">
                                Vel est mattis purus.
                              </div>
                              <div className="project-main-todo-note">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Tellus curabitur amet, sed
                                ornare facilisis dictum. Sed cursus turpis diam,
                                id volutpat sit vel. Dui aenean euismod nisi
                                blandit purus dignissim. Justo mattis nulla.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="Announcement-sub-2">
                        <div
                          className="project-main-todo-Event"
                          style={{ borderRadius: "4px" }}
                        >
                          <div className="main-todo-container">
                            <div className="main-todo-note">
                              <div className="project-main-todo-note-big">
                                Vel est mattis purus.
                              </div>
                              <div className="project-main-todo-note">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Tellus curabitur amet, sed
                                ornare facilisis dictum. Sed cursus turpis diam,
                                id volutpat sit vel. Dui aenean euismod nisi
                                blandit purus dignissim. Justo mattis nulla.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="project-main-div-col-2-sub-max2 project-main-div-col-2-sub-min-calendar">
                    <Calendar onChange={onChange} value={value} />
                  </div>
                  <Button
                    variant="contained"
                    className="project-main-div-col-2-sub-max2-request-button"
                  >
                    <RequestWorkerModal />
                  </Button>
                </div>
              </div>
            </div>

            {/* Todos end */}
          </div>
        </main>
      )}
    </div>
  );
};

export default ViewProject;
