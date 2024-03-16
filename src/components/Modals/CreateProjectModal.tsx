import { Button } from "@material-ui/core";
import { SetStateAction, useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { BsPlusLg } from "react-icons/bs";
import { fireAlert } from "../../utils/Alert";
import InputField from "../Inputs/InputField";
import ReactSelectField from "../Inputs/ReactSelectField";
import TextAreaField from "../Inputs/TextAreaField";
import CountrySelectField from "../Inputs/CountrySelectField";
import CustomInputField from "../Inputs/CustomInputField";
import { formatDate } from "../../utils/formatDate";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { useNavigate } from "react-router-dom";
import { createProject, reset } from "../../features/Project/projectSlice";
import createHttpService from "../HttpService";
import { ModalHeader } from "./ModalOptions";
import { BiBuildingHouse } from "react-icons/bi";

const CreateProjectModal = () => {
 const { createisLoading, createisSuccess } = useAppSelector((state: any) => state.project)
 const navigate = useNavigate();
 const dispatch = useAppDispatch();

 const validate = Yup.object().shape({
  name: Yup.string().required("Name of project is required"),
 });
 const [lgShow, setLgShow] = useState(false);
 const [departments, setDepartments] = useState([]);
 const [teamLeads, setTeamslead] = useState([]);
 const [teams, setTeams] = useState([]);


 useEffect(() => {
  if (createisSuccess) {
   fireAlert("Successful", "Project Created Successfully", "success");
   setLgShow(false)
   dispatch(reset());
  }
 }, [createisSuccess, dispatch, navigate])




 const handleSubmit = async (values: any, { resetForm }: any) => {

  const inputs = { ...values };
  // @ts-ignore
  dispatch(createProject(inputs));
 };


 // const getData = async () => {
 //  const HttpService = createHttpService();
 //  try {

 //   const departmentsUrl = "hr/departments"
 //   const departments: any = await HttpService.get(departmentsUrl)
 //   setDepartments(departments?.data?.data)

 //   const teamleadsUrl = "hr/team-leads"
 //   const teamlead: any = await HttpService.get(teamleadsUrl)
 //   setTeamslead(teamlead?.data?.data)

 //   const teamsUrl = `hr/teams`
 //   const teams: any = await HttpService.get(teamsUrl)
 //   setTeams(teams?.data?.data)

 //  } catch (error) {
 //  }
 // }

 const getData = async () => {
  const HttpService = createHttpService();

  try {
   const fetchData = async (url: string, setDataFunction: { (value: SetStateAction<never[]>): void; (arg0: any): void; }) => {
    const response = await HttpService.get(url);
    setDataFunction(response?.data?.data);
   };

   const endpoints = [
    { url: "hr/departments", setter: setDepartments },
    { url: "hr/team-leads", setter: setTeamslead },
    { url: "hr/teams", setter: setTeams },
   ];

   await Promise.all(endpoints.map(({ url, setter }) => fetchData(url, setter)));
  } catch (error) {
   console.error("An error occurred while fetching data:", error);
  }
 };


 // const availablleDepartments = [] as any;
 // departments &&
 //  departments?.forEach((team: any) =>
 //   availablleDepartments.push({
 //    value: team.id,
 //    label: team.name,
 //   })
 //  );

 const availableDepartments = departments?.map((departments: any) => ({
  value: departments.id,
  label: departments.name,
 })) || [];
 const availableTeam = teams?.map((team: any) => ({
  value: team.id,
  label: team.name,
 })) || [];

 const availableTeamLeads = teamLeads?.map((teamLeads: any) => ({
  value: teamLeads?.id,
  label: teamLeads?.name,
 })) || [];


 // const availableTeam = [] as any;
 // teams &&
 //  teams?.forEach((team: any) =>
 //   availableTeam.push({
 //    value: team.id,
 //    label: team.name,
 //   })
 //  );


 // const availableTeamLeads = [] as any;
 // teamLeads &&
 //  teamLeads?.forEach((team: any) =>
 //   availableTeamLeads.push({
 //    value: team.id,
 //    label: team.name,
 //   })
 //  );

 return (
  <div>
   <Button
    className="subone-header-flex-btn"
    onClick={() => { setLgShow(true); getData() }} >
    <BsPlusLg size={10} color="#fff" className="Create-plue-account" />{" "}
    Create Project
   </Button>
   <Modal
    size="lg"
    show={lgShow}
    aria-labelledby="contained-modal-title-vcenter"
    centered >
    <ModalHeader setLgShow={setLgShow} icon={<BiBuildingHouse size={30} />} title={"Create Project"} subtitle={"Create a new project"} />
    <Modal.Body>
     <Formik
      initialValues={{
       name: "",
       team: "",
       description: "",
       location: "",
       lga: "",
       state: "",
       country: "",
       commenced_on: "",
       proposed_completion_date: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validate}
     >
      {({ setFieldValue }) => {
       return (
        <Form>
         <div className="Modal-Body">
          <div className="col">
           <div className="form-group">
            <InputField
             label="Project Name"
             name="name"
             placeholder="Enter name of project"
            />
           </div>
          </div>
          <div
           className="Modal-textarea-middle"
           style={{
            marginTop: "2rem",
           }}
          >
           <div className="col">
            <div className="form-group">
             <TextAreaField
              style={{
               height: "5rem",
               lineHeight: "1",
              }}
              label="Description"
              name="description"
              placeholder="Enter project description"
              onChange={(event: any) => {
               setFieldValue("description", event?.value);
              }}
             />
            </div>
           </div>
          </div>
          <div className="Modal-data-time">

           <div className="Modal-two-input">
            <div className="col">
             <div className="form-group">
              <ReactSelectField
               label="Team"
               name="team"
               options={availableTeam}
               className="form-group__gender"
               onChange={(event: any) => {
                setFieldValue("team", event?.value);
               }}
              />
             </div>
            </div>
           </div>
           <div className="div-space" />

           <div className="Modal-two-input">
            <div className="col">
             <div className="form-group">
              <CountrySelectField
               className="agent-project__owner"
               label="Country"
               name="country"
               placeholder="Select country"
               onChange={(value: any) =>
                setFieldValue("country", { value }.value.label)
               }
              />
             </div>
            </div>
           </div>
           <div className="div-space" />

           <div className="Modal-two-input">
            <div className="col">
             <div className="form-group">
              <InputField
               label="Location"
               name="location"
               placeholder="Enter project location"
              />
             </div>
            </div>
           </div>
          </div>

          <div className="Modal-data-time">
           <div className="Modal-two-input">
            <div className="col">
             <div className="form-group">
              <InputField
               label="Enter State"
               name="state"
               placeholder="Enter project's state"
              />
             </div>
            </div>
           </div>
           <div className="div-space" />
           <div className="Modal-two-input">
            <div className="col">
             <div className="form-group">
              <InputField
               label="Local Government Area"
               name="lga"
               placeholder="Enter project's lga"
              />
             </div>
            </div>
           </div>
          </div>
          <div className="Modal-data-time">
           <div className="col">
            <div className="form-group">
             <CustomInputField
              style={{
               lineHeight: 1,
              }}
              type="date"
              label="Commenced on"
              name="commenced_on"
              onChange={(event: any) => {
               setFieldValue(
                "commenced_on",
                formatDate(event?.target.value)
               );
              }}
             />
            </div>
           </div>
           <div className="div-space" />
           <div className="col">
            <div className="form-group">
             <CustomInputField
              style={{
               lineHeight: 1,
              }}
              type="date"
              label="Proposed Completion Date"
              name="proposed_completion_date"
              onChange={(event: any) => {
               setFieldValue(
                "proposed_completion_date",
                formatDate(event?.target.value)
               );
              }}
             />
            </div>
           </div>
          </div>

          <div className="btn-modal-container">
           <Button
            variant="contained"
            className="add-experience"
            type="submit" >
            {createisLoading ? (
             <Spinner animation="border" size="sm" />
            ) : ("Create Project")}
           </Button>
          </div>
         </div>
        </Form>
       );
      }}
     </Formik>
    </Modal.Body>
   </Modal>
  </div>
 );
};

export default CreateProjectModal;
