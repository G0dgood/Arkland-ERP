import React from "react";
import moment from "moment";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import logo from "../../../assets/images/ASLLOGO.svg";
import { fireAlert } from "../../../utils/Alert";
import { checkForTeams } from "../../../utils/checkForName";

const CreateProjectView = ({
  active,
  project,
  department,
  teams,
  teamLeads,
}: any) => {
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    setLoading(true);
    const allProjectValues = { ...project };
    axios
      .post(`${process.env.REACT_APP_API}/hr/projects`, allProjectValues)
      .then((res: AxiosResponse) => {
        setLoading(false);
        if (res.data.success === true || res.status === 200) {
          const title = "Project creation request successful";
          const html = `Project created successfully.`;
          const icon = "success";
          fireAlert(title, html, icon);
          navigate(`/projects`);
        }
      })
      .catch(function (error) {
        setLoading(false);
        const html = "Try again";
        const icon = "error";
        const title = "Project creation failed";
        fireAlert(title, html, icon);
      });
  };

  return (
    <div
      className={
        active === 2 ? "EssentialsContainer  demo-wrap more-view" : "d-none"
      }
    >
      <img className="demo-bg" src={logo} alt="" />
      <h4 style={{ marginTop: "3rem" }}>Review Project Details</h4>
      {/* <h6 style={{ marginTop: "3rem" }}>Employee Essential Details</h6> */}
      <div className="viewprofile-container" style={{ marginTop: "2rem" }}>
        <div>
          <div className="getjob-application-details">
            <p>Project Name</p>
            <p>{project.name}</p>
            <p>Project Description</p>
            <p>{project?.description}</p>
            <p>Department in charge</p>
            <p>{checkForTeams(project?.department, department)}</p>
            <p>Team in charge</p>
            <p>{checkForTeams(project?.team, teams)}</p>
            <p>Team Lead</p>
            <p>{checkForTeams(project?.lead, teamLeads)}</p>
            <p>Project Location</p>
            <p>{project?.location} </p>
            <p>Country</p>
            <p> {project?.country}</p>
            <p>State</p>
            <p>{project?.state}</p>
            <p>Local Government Area</p>
            <p> {project?.lga}</p>
          </div>
        </div>
      </div>

      <div id="Essential-btn" style={{ marginTop: "20rem" }}>
        <Button
          variant="outlined"
          className={"Add-btn-edit"}
          onClick={handleSubmit}
        >
          {isLoading ? "Processing..." : "Create Project"}
        </Button>
      </div>
    </div>
  );
};

export default CreateProjectView;
