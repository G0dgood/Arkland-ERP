import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Form, Modal, Spinner } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { fireAlert } from "../../utils/Alert";
import { createAnnouncement, reset } from "../../features/Announcement/announcemetSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import ReactSelectField from "../Inputs/ReactSelectField";
import CustomSelectField from "../Inputs/CustomSelectField";
import { getRole } from "../../features/Employee/employeeSlice";
import { getTeam } from "../../features/Team/teamSlice";
import { allDepartments } from "../../features/Department/departmentSlice";
import { allProject } from "../../features/Project/projectSlice";
import SelectField from "../Inputs/SelectField";
import SelectInput from "../SelectInput";


const CreateAnnouncementModal = () => {
 const dispatch = useAppDispatch();
 const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.announcement)
 const [lgShow, setLgShow] = useState(false);
 const [inputs, setInputs] = useState<any>({
  message: "",
  audience_scope: "",
  // employee_role: "",
  // team: "",
  // department: "",
  // project: "",
 })




 const announcementOptions = [
  "",
  "general",
  // "employee role",
  // "team",
  // "department",
  // "project",
 ];



 const { getroledata: roles } = useAppSelector((state: any) => state.employee)
 const availablleRoles = [] as any;

 useEffect(() => {
  if (!roles) {
   dispatch(getRole());
  }
 }, [dispatch, roles]);



 roles &&
  roles.forEach((role: any) =>
   availablleRoles?.push({
    value: role?.id,
    label: role?.name,
   })
  );

 const { data: teams } = useAppSelector((state: any) => state.team)
 useEffect(() => {
  if (!teams) {
   dispatch(getTeam());
  }
 }, [dispatch, teams]);

 // console.log('availablleRoles', teams)

 const availablleTeams = [] as any;

 teams &&
  teams.forEach((team: any) =>
   availablleTeams?.push({
    value: team?.id,
    label: team?.name,
   })
  );


 const { data: departments } = useAppSelector((state: any) => state.department)

 const availablleDepartments = [] as any;

 useEffect(() => {
  if (!departments) {
   dispatch(allDepartments());
  }
 }, [dispatch, departments]);

 departments &&
  departments.forEach((department: any) =>
   availablleDepartments?.push({
    value: department?.id,
    label: department?.name,
   })
  );


 const availablleProject = [] as any;


 const { data: projects } = useAppSelector((state: any) => state.project)

 useEffect(() => {
  if (!projects) {
   dispatch(allProject());
  }
 }, [dispatch, projects]);

 projects &&
  projects.forEach((project: any) =>
   availablleProject?.push({
    value: project?.id,
    label: project?.name,
   })
  );





 const title = "Successful";
 const html = "Announcement Created!";
 const icon = "success";
 const title1 = "Announcement creation failed";
 const html1 = createmessage;
 const icon1 = "error";


 useEffect(() => {
  if (createisSuccess) {
   fireAlert(title, html, icon);
   setInputs({
    message: "",
    audience_scope: ""
   })
   setLgShow(false)

   dispatch(reset());
  } else if (createisError) {
   fireAlert(title1, html1, icon1);
   dispatch(reset());
  }
 }, [createisError, createisSuccess, dispatch, html, html1])

 const handleOnChange = (input: any, value: any) => {
  setInputs((prevState: any) => ({
   ...prevState,
   [input]: value,
  }));
 };

 // const createAnnouncementValues = Object.entries(inputs)
 //  .filter(([key, value]) => value !== "")
 //  .reduce((acc, [key, value]) => {
 //   return {
 //    ...acc,
 //    [key]: value,
 //   };
 //  }, {});

 console.log('createAnnouncementValues', inputs)

 const handleCreate = (e: any) => {
  e.preventDefault();
  // @ts-ignore
  dispatch(createAnnouncement(inputs));

 }



 return (
  <div>
   <Button
    variant="contained"
    className="Add-btn"
    onClick={() => setLgShow(true)} >
    Create Announcement
   </Button>

   <Modal
    size="lg"
    show={lgShow}
    aria-labelledby="contained-modal-title-vcenter"
    centered
   >
    <Modal.Header>
     <span></span>
     <span className="span-center-title">Create Announcement</span>
     <Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
      <MdOutlineClose size={28} />
     </Button>
    </Modal.Header>
    <Modal.Body>

     <Form onSubmit={handleCreate}>
      <div className="Modal-Body">
       <div className="Modal-textarea-middle">
        <div className="col">
         <div className="form-group">
          <textarea rows={6} className='Modal-textarea' placeholder='Enter broadcast message'
           value={inputs.message}
           onChange={(e) => handleOnChange("message", e.target.value)} />
         </div>


        </div>
       </div>
       <div className="input  mt-3">
        <label className={"input__label"} >
         {"Select audience scope"}
        </label>
        <select id="Modal-textarea-input-sub"
         value={inputs.audience_scope}
         onChange={(e) => handleOnChange("audience_scope", e.target.value)}>
         {announcementOptions?.map((employ: any) => (
          <option key={employ} value={employ}>
           {employ}
          </option>
         ))}
        </select >
       </div>

       <div className="modal-input-sub-space">
        {/* <div className="col">
         <div className="form-group">
          <SelectInput
           options={announcementOptions}
           label="Select audience"
           name="audience_scope"
           className="form-group__gender"
           onChange={(e: any) => handleOnChange("audience_scope", e?.employee_role?.value)}
          // onChange={(event: any) => {
          //   const newValue = handleOptionChange( event?.target.value);
          // @ts-ignore
          // setFieldValue("audience_scope", newValue);
          // }}
          // values={values.audience_scope}
          />
         </div>
        </div> */}

        {inputs?.audience_scope === "employee role" && (
         <div className="col">
          <div className="form-group">
           <SelectInput
            label="Select employee role to receive message"
            name="employee_role"
            options={availablleRoles}
            className="form-group__gender"
            onChange={(e: any) => handleOnChange("employee_role", e)}

           />
          </div>
         </div>
        )}

        {inputs?.audience_scope === "team" && (
         <div className="col">
          <div className="form-group">
           <SelectInput
            label="Select team to receive message"
            name="team"
            options={availablleTeams}
            className="form-group__gender"
            onChange={(e: any) => handleOnChange("team", e)}
           />
          </div>
         </div>
        )}

        {inputs?.audience_scope === "department" && (
         <div className="col">
          <div className="form-group">
           <SelectInput
            label="Select department to receive message"
            name="department"
            options={availablleDepartments}
            className="form-group__gender"
            onChange={(e: any) => handleOnChange("department", e)}
           />
          </div>
         </div>
        )}

        {inputs?.audience_scope === "project" && (
         <div className="col">
          <div className="form-group">
           <SelectInput
            label="Select project to receive message"
            name="project"
            options={availablleProject}
            className="form-group__gender"
            onChange={(e: any) => handleOnChange("project", e)}
           />
          </div>
         </div>
        )}
       </div>

       <div className="btn-modal-container" >
        <Button
         variant="contained"
         className="Add-btn-modal"
         type="submit"
         disabled={createisLoading}
        >
         {createisLoading ? <Spinner animation="border" /> : "Create"}
        </Button>
       </div>
      </div>
     </Form>

    </Modal.Body>
   </Modal>
  </div>
 );
};

export default CreateAnnouncementModal;
