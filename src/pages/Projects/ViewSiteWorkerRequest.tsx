import React, { CSSProperties } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import projectBack from "../../assets/vectors/project-back.svg";
import { useWorkersRequestById } from "../../hooks/useWorkersRequest";
import { useAppSelector } from "../../hooks/useDispatch";
import { checkForName } from "../../utils/checkForName";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  width: "99.8%",
  borderRadius: "50px",
};

const ViewSiteWorkerRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { requestWorkersList, isLoading } = useWorkersRequestById(id ? id : "");
  // --- Get current state of collapseNav from localStorage --- //
  const [collapseNav, setCollapseNav] = React.useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
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
                  <img
                    src={projectBack}
                    alt="User"
                    className="project-back-img"
                    onClick={() => navigate(-1)}
                    title="Return"
                  />
                  <h4 style={{ marginTop: "3rem" }}>Site Worker Request</h4>
                  <h6 style={{ marginTop: "3rem" }}>Request Details</h6>
                  <div
                    className="viewprofile-container"
                    style={{ marginTop: "2rem" }}
                  >
                    <div>
                      <div className="getjob-application-details">
                        <p>Project</p>
                        <p>
                          {checkForName(requestWorkersList.project, projects)}
                        </p>
                        <p>Team</p>
                        <p>
                          <p>{checkForName(requestWorkersList.team, team)}</p>
                        </p>
                        <p>Team Lead</p>
                        <p>
                          {checkForName(
                            requestWorkersList?.team_lead,
                            teamLeads
                          )}
                        </p>
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
