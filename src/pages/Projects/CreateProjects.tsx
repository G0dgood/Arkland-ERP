import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ProjectEssentials from "./projectInputs/ProjectEssentials";
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
              // department={availablleDepartments}
              // team={availablleTeams}
              // teamLeads={availablleTeamLeads}
              bindSubmitForm={bindSubmitForm}
            />


          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProjects;
