import React, { useEffect, useState } from "react";
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartVoronoiContainer,
  ChartDonut,
} from "@patternfly/react-charts";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import projectAvatar from "../../assets/vectors/project-avatar.svg";
import redPlus from "../../assets/vectors/red-plus.svg";

const ViewProject = () => {
  // const [checked, setChecked] = React.useState(false);
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

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div className="project-main-div">
          <div className="project-main-div-col-1">
            <div className="project-main-div-col-1-sub">
              <div className="project-main-div-col-1-sub-min">
                <img
                  src={projectAvatar}
                  alt="User"
                  className="project-sub-img"
                />
                <p className="project-sub-img__name">John Doe</p>
                <p className="project-sub-img__title">SITE MANAGER</p>
              </div>
              <div className="project-main-div-col-2-sub-min project-main-div-col-2-sub-min-main">
                <div className="project-main-div-col-2-sub-container">
                  <div>
                    <p className="project-main-div-col-2-sub-container-title">
                      PROJECT TITLE:
                    </p>
                    <p className="project-main-div-col-2-sub-container-subTitle">
                      A&A
                    </p>
                  </div>
                  <div>
                    <p className="project-main-div-col-2-sub-container-title">
                      NUMBER OF EMPLOYEES:
                    </p>
                    <p className="project-main-div-col-2-sub-container-subTitle">
                      253
                    </p>
                  </div>
                </div>
                <div className="project-main-div-col-2-sub-container">
                  <div>
                    <p className="project-main-div-col-2-sub-container-title">
                      START DATE:
                    </p>
                    <p className="project-main-div-col-2-sub-container-subTitle">
                      29 NOV 2020
                    </p>
                  </div>
                  <div>
                    <p className="project-main-div-col-2-sub-container-title">
                      DUE DATE
                    </p>
                    <p className="project-main-div-col-2-sub-container-subTitle">
                      29 FEB 2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="project-main-div-col-1-sub-min">
                <p className="project-main-div-col-1-sub-min-text">PROGRESS:</p>
                <div
                  style={{ height: "100px", width: "100px", margin: "auto" }}
                >
                  <ChartDonut
                    ariaDesc="Progress"
                    ariaTitle="Progress"
                    constrainToVisibleArea={true}
                    data={[
                      { x: "Completed", y: 100 },
                      { x: "Pending", y: 100 - +10 },
                    ]}
                    title="35%"
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
              <div className="project-main-div-col-2-sub-min-main__header">
                <h5>Team Members</h5>
                <img
                  src={redPlus}
                  alt="User"
                  className="project-main-div-col-2-sub-min-main__header-plus"
                />
              </div>
              <div className="project-main-div-col-2-sub-min project-main-div-col-2-sub-min-main"></div>
              <div className="project-main-div-col-2-sub-min project-main-div-col-2-sub-min-main">
                <img
                  src={projectAvatar}
                  alt="User"
                  className="project-sub-img"
                />
                <p className="project-sub-img__name">John Doe</p>
                <p className="project-sub-img__title">SITE MANAGER</p>
              </div>
              <div className="project-main-div-col-2-sub-min project-main-div-col-2-sub-min-secondary">
                <img
                  src={projectAvatar}
                  alt="User"
                  className="project-sub-img"
                />
                <p className="project-sub-img__name">John Doe</p>
                <p className="project-sub-img__title">SITE MANAGER</p>
              </div>
            </div>
          </div>

          {/* Todos end */}
        </div>
      </main>
    </div>
  );
};

export default ViewProject;
