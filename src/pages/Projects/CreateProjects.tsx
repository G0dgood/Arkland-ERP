import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ProjectEssentials from "./projectInputs/ProjectEssentials";
import CreateProjectView from "./projectInputs/CreateProjectView";
import AddProjectTitle from "./components/AddProjectTitle";
import AddProjectNav from "./components/AddProjectNav";

const CreateProjects = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: "",
    department: "",
    team: "",
    lead: "",
    description: "",
    location: "",
    lga: "",
    state: "",
    country: "",
    proposed_completion_date: "",
  });
  // State to store count value
  const [active, setActive] = useState<number>(1);

  useEffect(() => {
    setActive(active);
  }, [active]);

  const submitMyFormRef: any = React.useRef(null);

  const handleSubmitMyForm = (e: Event) => {
    if (submitMyFormRef.current) {
      submitMyFormRef.current(e);
    }
  };

  const bindSubmitForm = React.useCallback((submitForm: any) => {
    submitMyFormRef.current = submitForm;
  }, []);
  // const department: any = useAppSelector(
  //   (state) => state.department.department
  // );
  const availablleDepartments = [] as any;

  // department &&
  //   department.forEach((department: any) =>
  //     availablleDepartments.push({
  //       value: department.id,
  //       label: department.name,
  //     })
  //   );

  // const teams: any = useAppSelector((state) => state?.team?.team);
  const availablleTeams = [] as any;
  // teams &&
  //   teams.forEach((team: any) =>
  //     availablleTeams.push({
  //       value: team?.id,
  //       label: team?.name,
  //     })
  //   );

  // const teamLeads: any = useAppSelector((state) => state?.teamLeads?.teamLeads);
  const availablleTeamLeads = [] as any;

  // teamLeads &&
  //   teamLeads.forEach((teamLead: any) =>
  //     availablleTeamLeads.push({
  //       value: teamLead.id,
  //       label: teamLead.name,
  //     })
  //   );

  return (
    <>
      <Helmet>
        <title>Create project | Arkland ERP</title>
      </Helmet>
      <div id="screen-wrapper">
        <div className="back-to-employee-container">
          <Button
            onClick={() => navigate("/projects")}
            variant="outlined"
            className="back-to-employee-button"
          >
            <GoArrowLeft className="back-to-employee-icon" size={20} />
          </Button>
        </div>
        <div className="addemployeecontainer">
          <AddProjectTitle
            setActive={setActive}
            active={active}
            click={handleSubmitMyForm}
          />
          {active === 6 ? (
            ""
          ) : (
            <AddProjectNav active={active} setActive={setActive} />
          )}

          <div className="all-inputs-container">
            <ProjectEssentials
              active={active}
              project={project}
              setProject={setProject}
              setActive={setActive}
              department={availablleDepartments}
              team={availablleTeams}
              teamLeads={availablleTeamLeads}
              bindSubmitForm={bindSubmitForm}
            />

            {/* <CreateProjectView
                active={active}
                project={project}
                department={department}
                teams={teams}
                teamLeads={teamLeads}
                setProject={setProject}
                setActive={setActive}
                bindSubmitForm={bindSubmitForm}
              /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProjects;
