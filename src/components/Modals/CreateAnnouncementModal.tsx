import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Form, Modal, Spinner } from "react-bootstrap";
import { fireAlert } from "../../utils/Alert";
import { createAnnouncement, reset } from "../../features/Announcement/announcemetSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
// import SelectField from "../Inputs/SelectField";
import SelectInput from "../SelectInput";
import createHttpService from "../HttpService";
import { ModalHeader } from "./ModalOptions";
import { TfiAnnouncement } from "react-icons/tfi";


const CreateAnnouncementModal = () => {
 const dispatch = useAppDispatch();
 const { createisLoading, createisSuccess } = useAppSelector((state: any) => state.announcement)
 const [lgShow, setLgShow] = useState(false);
 const [isLoading, setisLoading] = useState(false);
 const [inputs, setInputs] = useState<any>({
  message: "",
  audience_scope: "",
  employee_role: "",
  team: "",
  department: "",
  project: "",
 })
 const [input, setInput] = useState<any>({
  message: "",
  audience_scope: "",
  employee_role: "",
  team: "",
  department: "",
  project: "",
 })
 const [projects, setProject] = useState<any>([]);
 const [departments, setDepartments] = useState<any>([]);
 const [roles, setEmployees] = useState<any>([]);
 const [teams, setTeams] = useState([]);



 const announcementOptions = [
  "",
  "general",
  "employee role",
  "team",
  "department",
  "project",
 ];

 const getData = async () => {
  const HttpService = createHttpService();
  setisLoading(true)
  try {
   const employeesUrl = "hr/employee-roles"
   const employees: any = await HttpService.get(employeesUrl)
   setEmployees(employees?.data?.data)

   const departmentsUrl = "hr/departments"
   const departments: any = await HttpService.get(departmentsUrl)
   setDepartments(departments?.data?.data)

   const projectsUrl = "hr/projects"
   const projects: any = await HttpService.get(projectsUrl)
   setProject(projects?.data?.data)

   const teamsUrl = `hr/teams`
   const teams: any = await HttpService.get(teamsUrl)
   setTeams(teams?.data?.data)
   setisLoading(false)

  } catch (error) {
   setisLoading(false)
  }
 }

 const availablleRoles = [] as any;
 roles &&
  roles.forEach((role: any) =>
   availablleRoles?.push({
    value: role?.id,
    label: role?.name,
   })
  );





 const availablleTeams = [] as any;

 teams &&
  teams.forEach((team: any) =>
   availablleTeams?.push({
    value: team?.id,
    label: team?.name,
   })
  );




 const availablleDepartments = [] as any;
 departments &&
  departments.forEach((department: any) =>
   availablleDepartments?.push({
    value: department?.id,
    label: department?.name,
   })
  );


 const availablleProject = [] as any;
 projects &&
  projects.forEach((project: any) =>
   availablleProject?.push({
    value: project?.id,
    label: project?.name,
   })
  );


 const handleOnChange = (input: any, value: any) => {
  setInput((prevState: any) => ({
   ...prevState,
   [input]: value,
  }));
 };
 useEffect(() => {
  setInputs((prevState: any) => {
   return {
    ...prevState,
    message: input.message,
    audience_scope: input.audience_scope,
    employee_role: input.employee_role?.value,
    team: input.team?.value,
    department: input.department?.value,
    project: input.project?.value,

   };
  });
 }, [input.audience_scope, input.department, input.employee_role, input.message, input.project, input.team]);

 const title = "Successful";
 const html = "Announcement Created!";
 const icon = "success";



 useEffect(() => {
  if (createisSuccess) {
   fireAlert(title, html, icon);
   setInputs({
    message: "",
    audience_scope: ""
   })
   setLgShow(false)

   dispatch(reset());
  }
 }, [createisSuccess, dispatch, html])

 // const handleOnChange = (input: any, value: any) => {
 //   setInputs((prevState: any) => ({
 //     ...prevState,
 //     [input]: value,
 //   }));
 // };

 const createAnnouncementValues = Object.entries(inputs)
  .filter(([key, value]) => value !== "")
  .reduce((acc, [key, value]) => {
   return {
    ...acc,
    [key]: value,
   };
  }, {});





 const handleCreate = (e: any) => {
  e.preventDefault();
  // @ts-ignore
  dispatch(createAnnouncement(createAnnouncementValues));

 }



 return (
  <div>
   <ul className="nav-tabs-btn mb-3">
    <li className={"active"} onClick={() => { setLgShow(true); getData() }}> Create Announcement</li>
   </ul>
   <Modal
    size="lg"
    show={lgShow}
    aria-labelledby="contained-modal-title-vcenter"
    centered
   >
    <ModalHeader setLgShow={setLgShow} icon={<TfiAnnouncement size={30} />} title={"Create Announcement"} subtitle={"Create An Announcement"} />
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

       <div className="btn-modal-container" style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
         variant="contained"
         className="add-experience"
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
