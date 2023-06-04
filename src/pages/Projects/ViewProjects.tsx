import { useEffect, useState, CSSProperties } from "react";
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
import SyncLoader from "react-spinners/SyncLoader";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import { Modal, Toast } from "react-bootstrap";
import { BsExclamationLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

import projectAvatar from "../../assets/vectors/project-avatar.svg";
import projectBack from "../../assets/vectors/project-back.svg";
import redPlus from "../../assets/vectors/red-plus.svg";
import projectProfile from "../../assets/vectors/project-profile.svg";
import { checkForTeams, checkForEmployeeName } from "../../utils/checkForName";

import RequestWorkerModal from "../../components/Modals/RequestWorkerModal";
import InputField from "../../components/Inputs/InputField";
import ReactSelectField from "../../components/Inputs/ReactSelectField";
import CustomInputField from "../../components/Inputs/CustomInputField";
import { formatDate } from "../../utils/formatDate";
import { difficultyOptions, priorityOptions } from "../../functions/helpers";
import { useProjectById } from "../../hooks/useProjects";
import { DialogState } from "../../interfaces/base";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { reset, viewProject } from "../../features/Project/projectSlice";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

import UpdateProjectModal from "./UpdateProjectModal";
import SuspendProjectModal from "./SuspendProjectModal";
import CompleteProjectModal from "./CompleteProjectModal";
import CommenceProjectModal from "./CommenceProjectModal";
import { fireAlert } from "../../utils/Alert";
import CreateTaskModal from "../Tasks/CreateTaskModal";


// const ViewProject = () => {


//   const [value, onChange] = useState(new Date());
//   const [showToast, setShowToast] = useState(false);
//   const [showDialog, setShowDialog] = useState<DialogState>({});
//   const [deleteShow, setDeleteShow] = useState(false);

//   const override: CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//     width: "99.8%",
//     borderRadius: "50px",
//   };
//   const {
//     projects,
//     projectsTasks,
//     teamMembers,
//     isLoading,
//     error,
//     message,
//     isProjectTasksLoading,
//     taskCreateShow,
//     isTeamLoading,
//     setTaskCreateShow,
//     deleteTask,
//     handleSubmit,
//   } = useProjectById(id ? id : "");

//   const handleDeleteTask = (taskId: string) => {
//     deleteTask(taskId);
//   };

//   const handleDelete = (id: any) => {
//     setShowDialog({ [id]: true });
//     setDeleteShow(true);
//   };



//   // const teamLeads: any = useAppSelector((state) => state.teamLeads.teamLeads);
//   // const availablleTeamMembers = [] as any;
//   // if (teamMembers.length < 0) {
//   //   return null;
//   // } else {
//   //   teamMembers.length > 0 &&
//   //     teamMembers.forEach((teamMember: any) =>
//   //       availablleTeamMembers.push({
//   //         value: teamMember.employee?.user,
//   //         label: teamMember.employee_name,
//   //       })
//   //     );
//   // }
//   return (
//     <div >
//       {error && (
//         <Toast
//           onClose={() => setShowToast(false)}
//           show={true}
//           delay={4000}
//           autohide
//         >
//           <Toast.Body>
//             <span>
//               <BsExclamationLg />
//             </span>
//             <p>{message}</p>
//             <span onClick={() => setShowToast(false)}>
//               <FaTimes />
//             </span>
//           </Toast.Body>
//         </Toast>
//       )}
//       {isLoading ? (
//         <div
//           style={{
//             margin: "auto",
//             width: "20%",
//           }}
//         >
//           <SyncLoader
//             cssOverride={override}
//             color={"#990000"}
//             loading={isLoading}
//           />
//         </div>
//       ) : (
//         <div className="project-main-div">
//           <div className="project-main-div-col-1">
//             <div className="project-main-div-col-1-sub">
//               <div className="project-main-div-col-1-sub-min">
//                 <img id="img"
//                   src={projectBack}
//                   alt="User"
//                   className="project-back-img id="img""
//                   onClick={() => navigate(-1)}
//                 />
//                 <img id="img"
//                   src={projectAvatar}
//                   alt="User"
//                   className="project-sub-img id="img""
//                   style={{ color: "black" }}
//                 />
//                 <p className="project-sub-img id="img"__name">
//                   {/* {projects &&
//                       teamLeads &&
//                       checkForTeams(projects?.lead, teamLeads)} */}
//                 </p>
//                 <p className="project-sub-img id="img"__title">PROJECT MANAGER</p>
//               </div>
//               {/* <div className="project-main-div-col-2-sub-min project-main-div-col-2-sub-min-main">
//                 <div className="project-main-div-col-2-sub-container">
//                   <div>
//                     <p className="project-main-div-col-2-sub-container-title">
//                       PROJECT TITLE:
//                     </p>
//                     <p className="project-main-div-col-2-sub-container-subTitle">
//                       {projects?.name}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="project-main-div-col-2-sub-container-title">
//                       NUMBER OF EMPLOYEES:
//                     </p>
//                     <p className="project-main-div-col-2-sub-container-subTitle">
//                       {teamMembers.length > 0
//                         ? teamMembers.length
//                         : "No employees assigned to project"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="project-main-div-col-2-sub-container">
//                   <div>
//                     <p className="project-main-div-col-2-sub-container-title">
//                       START DATE:
//                     </p>
//                     <p className="project-main-div-col-2-sub-container-subTitle">
//                       {moment(projects?.created_at).format("DD-MM-YYYY")}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="project-main-div-col-2-sub-container-title">
//                       DUE DATE
//                     </p>
//                     <p className="project-main-div-col-2-sub-container-subTitle">
//                       {moment(projects?.proposed_completion_date).format(
//                         "DD-MM-YYYY"
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div> */}
//               {/* <div className="project-main-div-col-1-sub-min">
//                 <p className="project-main-div-col-1-sub-min-text">
//                   PROGRESS:
//                 </p>
//                 <div
//                   style={{ height: "100px", width: "100px", margin: "auto" }}
//                 >
//                   <ChartDonut
//                     ariaDesc="Progress"
//                     ariaTitle="Progress"
//                     constrainToVisibleArea={true}
//                     data={[
//                       { x: "Completed", y: 100 },
//                       {
//                         x: "Pending",
//                         y: `${projects?.progress_percentage}%`,
//                       },
//                     ]}
//                     title={`${projects?.progress_percentage}%`}
//                     colorScale={["#48AB62", "#116327"]}
//                     height={200}
//                     width={200}
//                     padAngle={0}
//                     innerRadius={50}
//                   />
//                 </div>
//               </div> */}
//               {/* <div className="project-main-div-col-2-sub-min project-main-div-col-2-sub-min-secondary">
//                 <div style={{ height: "346px", width: "346px" }}>
//                   <Chart
//                     ariaDesc="Average number of pets"
//                     ariaTitle="Line chart example"
//                     containerComponent={
//                       <ChartVoronoiContainer
//                         labels={({ datum }) => `${datum?.name}: ${datum?.y}`}
//                         constrainToVisibleArea
//                       />
//                     }
//                     legendData={[
//                       { name: "Expenditure" },
//                       { name: "Revenue", symbol: { type: "dash" } },
//                       { name: "Profit" },
//                     ]}
//                     legendOrientation="vertical"
//                     legendPosition="right"
//                     height={250}
//                     maxDomain={{ y: 10 }}
//                     minDomain={{ y: 0 }}
//                     padding={{
//                       bottom: 50,
//                       left: 50,
//                       right: 200, // Adjusted to accommodate legend
//                       top: 50,
//                     }}
//                     width={600}
//                   >
//                     <ChartAxis tickValues={[2, 3, 4]} />
//                     <ChartAxis
//                       dependentAxis
//                       showGrid
//                       tickValues={[10, 20, 30, 40, 50]}
//                     />
//                     <ChartGroup>
//                       <ChartLine
//                         data={[
//                           { name: "Expenditure", x: "Jan", y: 1 },
//                           { name: "Expenditure", x: "Feb", y: 2 },
//                           { name: "Expenditure", x: "Mar", y: 5 },
//                         ]}
//                       />
//                       <ChartLine
//                         data={[
//                           { name: "Revenue", x: "Jan", y: 2 },
//                           { name: "Revenue", x: "Feb", y: 1 },
//                           { name: "Revenue", x: "Mar", y: 7 },
//                         ]}
//                         style={{
//                           data: {
//                             strokeDasharray: "3,3",
//                           },
//                         }}
//                       />
//                       <ChartLine
//                         data={[
//                           { name: "Profit", x: "Jan", y: 3 },
//                           { name: "Profit", x: "Feb", y: 4 },
//                           { name: "Profit", x: "Mar", y: 9 },
//                         ]}
//                       />
//                     </ChartGroup>
//                   </Chart>
//                 </div>
//               </div> */}
//             </div>
//             <div className="project-main-div-col-2-sub">
//               {/* <div>
//                 <div className="project-main-div-col-2-sub-min-main__header">
//                   <h5>Team Members</h5>
//                 </div>

//                 <div className="project-main-div-col-2-sub-max project-main-div-col-2-sub-min-main">
//                   {isTeamLoading === true ? (
//                     <div>
//                       <SyncLoader
//                         cssOverride={override}
//                         color={"#990000"}
//                         loading={isTeamLoading}
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       style={{
//                         display: "grid",
//                         gridTemplateColumns: "1fr",
//                       }}
//                     >
//                       {teamMembers?.length > 0 ? (
//                         <div className="project-main-div-col-2-sub-container1">
//                           {teamMembers?.map((item: any, i: any) => (
//                             <div className="project-main-div-col-2-sub-container1-flex">
//                               <img id="img"
//                                 src={projectProfile}
//                                 alt="User"
//                                 className="project-main-div-col-2-sub-container1-image"
//                               />
//                               <div className="project-main-div-col-2-sub-container1-flexMargin">
//                                 <p className="project-main-div-col-2-sub-container1-title">
//                                   {item?.employee_name}
//                                 </p>
//                                 <p
//                                   className="project-main-div-col-2-sub-container1-subTitle"
//                                   style={{ textTransform: "uppercase" }}
//                                 >
//                                   {item?.employee?.role?.name}
//                                 </p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         "No team members assigned to project"
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div> */}
//               <div>
//                 <div className="project-main-div-col-2-sub-min-main__header">
//                   <h5>Ongoing Tasks</h5>
//                   <img id="img"
//                     src={redPlus}
//                     alt="User"
//                     className="project-main-div-col-2-sub-min-main__header-plus"
//                     onClick={() => setTaskCreateShow(true)}
//                   />
//                 </div>
//                 <div>
//                   <Modal
//                     size="lg"
//                     show={taskCreateShow}
//                     aria-labelledby="contained-modal-title-vcenter"
//                     centered
//                   >
//                     <Modal.Header>
//                       <span></span>
//                       <span className="span-center-title"> Create Task</span>
//                       <Button
//                         style={{ color: "#fff" }}
//                         onClick={() => setTaskCreateShow(false)}
//                       >
//                         <MdOutlineClose size={28} />
//                       </Button>
//                     </Modal.Header>
//                     <Modal.Body>
//                       <Formik
//                         initialValues={{
//                           title: "",
//                           assigned_to: "",
//                           points: "",
//                           priority: "",
//                           expected_completion_date: "",
//                           note: "",
//                         }}
//                         onSubmit={handleSubmit}
//                       >
//                         {({ setFieldValue }) => {
//                           return (
//                             <Form>
//                               <div className="Modal-Body">
//                                 <div className="col">
//                                   <div className="form-group">
//                                     <InputField
//                                       label="Title"
//                                       placeholder="Enter task title"
//                                       name="title"
//                                       className="form-group__gender"
//                                       onChange={(event: any) => {
//                                         setFieldValue("title", event?.value);
//                                       }}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="Modal-textarea-middle">
//                                   <div className="col">
//                                     <div className="form-group">
//                                       <InputField
//                                         label="Note"
//                                         placeholder="Enter task note"
//                                         name="note"
//                                         className="form-group__gender"
//                                         onChange={(event: any) => {
//                                           setFieldValue("note", event?.value);
//                                         }}
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="modal-input-sub-space">
//                                   <div className="col">
//                                     <div className="form-group">
//                                       <ReactSelectField
//                                         options={priorityOptions}
//                                         label="How important is this task?"
//                                         name="priority"
//                                         className="form-group__gender"
//                                         onChange={(event: any) => {
//                                           setFieldValue(
//                                             "priority",
//                                             event?.value
//                                           );
//                                         }}
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="modal-input-sub-space">
//                                   <div className="col">
//                                     <div className="form-group">
//                                       <ReactSelectField
//                                         options={difficultyOptions}
//                                         label="How difficult is this task?"
//                                         name="points"
//                                         className="form-group__gender"
//                                         onChange={(event: any) => {
//                                           setFieldValue(
//                                             "points",
//                                             event?.value
//                                           );
//                                         }}
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="modal-input-sub-space">
//                                   <div className="col">
//                                     <div className="form-group">
//                                       {/* <ReactSelectField
//                                           options={availablleTeamMembers}
//                                           label="Who is this task assigned to?"
//                                           name="assigned_to"
//                                           className="form-group__gender"
//                                           onChange={(event: any) => {
//                                             setFieldValue(
//                                               "assigned_to",
//                                               event?.value
//                                             );
//                                           }}
//                                         /> */}
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="modal-input-sub-space">
//                                   <div className="col">
//                                     <div className="form-group">
//                                       <CustomInputField
//                                         style={{
//                                           lineHeight: 1,
//                                         }}
//                                         type="date"
//                                         label="Proposed Completion Date"
//                                         name="expected_completion_date"
//                                         onChange={(event: any) => {
//                                           setFieldValue(
//                                             "expected_completion_date",
//                                             formatDate(event?.target.value)
//                                           );
//                                         }}
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div className="btn-modal-container">
//                                   <Button
//                                     variant="contained"
//                                     className="Add-btn-modal"
//                                     type="submit"
//                                   >
//                                     {isProjectTasksLoading
//                                       ? "Please wait..."
//                                       : "Create"}
//                                   </Button>
//                                 </div>
//                               </div>
//                             </Form>
//                           );
//                         }}
//                       </Formik>
//                     </Modal.Body>
//                   </Modal>
//                 </div>

//                 <div className="project-main-div-col-2-sub-max1 project-main-div-col-2-sub-min-main">
//                   {isProjectTasksLoading === true ? (
//                     <div>
//                       <SyncLoader
//                         cssOverride={override}
//                         color={"#990000"}
//                         loading={isProjectTasksLoading}
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       style={{
//                         display: "grid",
//                         gridTemplateColumns: "1fr",
//                       }}
//                     >
//                       {projectsTasks?.length > 0 ? (
//                         <div className="Announcement-container">
//                           {projectsTasks?.map((item: any, i: any) => (
//                             <div className="Announcement-sub-2">
//                               <div
//                                 className="project-main-todo-Event"
//                                 style={{ borderRadius: "4px" }}
//                               >
//                                 <div className="main-todo-container">
//                                   <div>
//                                     <div>
//                                       {item.title} on{" "}
//                                       {moment(
//                                         item?.expected_completion_date
//                                       ).format("DD-MM-YYYY")}{" "}
//                                     </div>

//                                     <div className="main-todo-input-time">
//                                       {" "}
//                                       {projectsTasks.length > 0
//                                         ? item.notes[0]?.text
//                                         : ""}
//                                     </div>
//                                     <div className="main-todo-input-time">
//                                       {"Assigned to : "}
//                                       {projects &&
//                                         teamMembers &&
//                                         checkForEmployeeName(
//                                           item?.assigned_to,
//                                           teamMembers
//                                         )}
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="FiTrash2">
//                                   <FiTrash2
//                                     size={25}
//                                     onClick={() => handleDelete(item?.id)}
//                                   />
//                                 </div>
//                                 {showDialog[item?.id] && (
//                                   <Modal
//                                     size="lg"
//                                     show={deleteShow}
//                                     aria-labelledby="contained-modal-title-vcenter"
//                                     centered
//                                   >
//                                     <Modal.Header closeButton>
//                                       <Modal.Title>Delete Task</Modal.Title>
//                                     </Modal.Header>
//                                     <Modal.Body>
//                                       <p>
//                                         Are you sure you want to delete this
//                                         task?
//                                       </p>
//                                       <p>{item?.title}</p>
//                                     </Modal.Body>
//                                     <Modal.Footer>
//                                       <button
//                                         className="btn btn-danger"
//                                         onClick={() => {
//                                           deleteTask(item?.id);
//                                           setShowDialog({
//                                             [item?.id]: false,
//                                           });
//                                         }}
//                                       >
//                                         Yes
//                                       </button>
//                                       <button
//                                         className="btn btn-secondary"
//                                         onClick={() =>
//                                           setShowDialog({ [item?.id]: false })
//                                         }
//                                       >
//                                         Cancel
//                                       </button>
//                                     </Modal.Footer>
//                                   </Modal>
//                                 )}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         "Project tasks not assigned"
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <div className="project-main-div-col-2-sub-max2 project-main-div-col-2-sub-min-calendar">
//                   <Calendar onChange={onChange} value={value} />
//                 </div>
//                 <Button
//                   variant="contained"
//                   className="project-main-div-col-2-sub-max2-request-button"
//                 >
//                   <RequestWorkerModal />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewProject;



const ViewProjects = () => {
 const dispatch = useAppDispatch();
 const navigate = useNavigate();
 const { viewdata, viewisError, viewisLoading, viewmessage } = useAppSelector((state: any) => state.project)
 const { commenceisSuccess } = useAppSelector((state: any) => state.project)
 const { updateisSuccess } = useAppSelector((state: any) => state.project)
 const { completeisSuccess } = useAppSelector((state: any) => state.project)
 const { suspendisSuccess } = useAppSelector((state: any) => state.project)
 const { id } = useParams<{ id: string }>();

 console.log('viewdata', viewdata)

 useEffect(() => {
  if (viewisError) {
   fireAlert("View Project  failed", viewmessage, "error");
   dispatch(reset());
  }
 }, [updateisSuccess, viewmessage, dispatch, viewisError, id]);

 useEffect(() => {
  // @ts-ignore
  dispatch(viewProject(id));
  if (updateisSuccess || commenceisSuccess || completeisSuccess || suspendisSuccess) {
   // @ts-ignore
   dispatch(viewProject(id));
  }
 }, [commenceisSuccess, completeisSuccess, dispatch, id, suspendisSuccess, updateisSuccess]);

 return (
  <div>
   {viewisLoading ? (
    <div className="isLoading-container-view" >
     <SyncLoader color={"#990000"} loading={viewisLoading} />
    </div>
   ) : !viewdata || viewdata === undefined ? (
    <div className="table-loader-image">
     <div>
      <AiOutlineFundProjectionScreen size={80} color="grey" className="loader-image" />
      <p className="mt-3">No Project details</p>
     </div>
    </div>
   ) : (
    <div className="container-profile-view">
     <div className="user-profile-area">
      <div className="task-manager">task manager</div>
      <div className="side-wrapper">
       <div className="user-profile1">
        <img id="img" src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="user-photo" />
        <div className="user-name">{viewdata?.name}</div>
        <div className="user-mail">{viewdata?.location}</div>
       </div>
       <div className="user-notification">
        <div className="notify">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor">
          <path d="M13.533 5.6h-.961a.894.894 0 01-.834-.57.906.906 0 01.197-.985l.675-.675a.466.466 0 000-.66l-1.32-1.32a.466.466 0 00-.66 0l-.676.677a.9.9 0 01-.994.191.906.906 0 01-.56-.837V.467A.467.467 0 007.933 0H6.067A.467.467 0 005.6.467v.961c0 .35-.199.68-.57.834a.902.902 0 01-.983-.195L3.37 1.39a.466.466 0 00-.66 0L1.39 2.71a.466.466 0 000 .66l.675.675c.25.25.343.63.193.995a.902.902 0 01-.834.56H.467A.467.467 0 000 6.067v1.866c0 .258.21.467.467.467h.961c.35 0 .683.202.834.57a.904.904 0 01-.197.984l-.675.676a.466.466 0 000 .66l1.32 1.32a.466.466 0 00.66 0l.68-.68a.894.894 0 01.994-.187.897.897 0 01.556.829v.961c0 .258.21.467.467.467h1.866c.258 0 .467-.21.467-.467v-.961c0-.35.202-.683.57-.834a.904.904 0 01.984.197l.676.675a.466.466 0 00.66 0l1.32-1.32a.466.466 0 000-.66l-.68-.68a.894.894 0 01-.187-.994.897.897 0 01.829-.556h.961c.258 0 .467-.21.467-.467V6.067a.467.467 0 00-.467-.467zM7 9.333C5.713 9.333 4.667 8.287 4.667 7S5.713 4.667 7 4.667 9.333 5.713 9.333 7 8.287 9.333 7 9.333z" />
         </svg>
        </div>
        <div className="notify alert">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
          <path d="M10.688 95.156C80.958 154.667 204.26 259.365 240.5 292.01c4.865 4.406 10.083 6.646 15.5 6.646 5.406 0 10.615-2.219 15.469-6.604 36.271-32.677 159.573-137.385 229.844-196.896 4.375-3.698 5.042-10.198 1.5-14.719C494.625 69.99 482.417 64 469.333 64H42.667c-13.083 0-25.292 5.99-33.479 16.438-3.542 4.52-2.875 11.02 1.5 14.718z" />
          <path d="M505.813 127.406a10.618 10.618 0 00-11.375 1.542C416.51 195.01 317.052 279.688 285.76 307.885c-17.563 15.854-41.938 15.854-59.542-.021-33.354-30.052-145.042-125-208.656-178.917a10.674 10.674 0 00-11.375-1.542A10.674 10.674 0 000 137.083v268.25C0 428.865 19.135 448 42.667 448h426.667C492.865 448 512 428.865 512 405.333v-268.25a10.66 10.66 0 00-6.187-9.677z" />
         </svg>
        </div>
        <div className="notify alert">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
          <path d="M467.812 431.851l-36.629-61.056a181.363 181.363 0 01-25.856-93.312V224c0-67.52-45.056-124.629-106.667-143.04V42.667C298.66 19.136 279.524 0 255.993 0s-42.667 19.136-42.667 42.667V80.96C151.716 99.371 106.66 156.48 106.66 224v53.483c0 32.853-8.939 65.109-25.835 93.291L44.196 431.83a10.653 10.653 0 00-.128 10.752c1.899 3.349 5.419 5.419 9.259 5.419H458.66c3.84 0 7.381-2.069 9.28-5.397 1.899-3.329 1.835-7.468-.128-10.753zM188.815 469.333C200.847 494.464 226.319 512 255.993 512s55.147-17.536 67.179-42.667H188.815z" />
         </svg>
        </div>
       </div>
       {/* <div className="progress-status">12/34</div> */}
       <div className="progress">
        <div className="progress-bar"></div>
       </div>
       <div className="task-status">
        <div className="task-stat">
         <div className="task-number">12</div>
         <div className="task-condition">Completed</div>
         <div className="task-tasks">tasks</div>
        </div>
        <div className="task-stat">
         <div className="task-number">22</div>
         <div className="task-condition">To do</div>
         <div className="task-tasks">tasks</div>
        </div>
        <div className="task-stat">
         <div className="task-number">243</div>
         <div className="task-condition">All</div>
         <div className="task-tasks">completed</div>
        </div>
       </div>
      </div>
      <div className="side-wrapper">
       <div className="project-title">Project</div>
       <div className="project-name">
        <div className="project-department">Country : {viewdata?.country}</div>
        <div className="project-department">LGA : {viewdata?.lga}</div>
        <div className="project-department">State : {viewdata?.state}</div>
        <div className="project-department">Status: {viewdata?.status}</div>
       </div>
      </div>
      <div className="side-wrapper">
       <div className="project-title">Team</div>
       <div className="team-member">
        <img id="img" src="https://images.unsplash.com/flagged/photo-1574282893982-ff1675ba4900?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="" className="members" />
        <img id="img" src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="members" />
        <img id="img" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" className="members" />
        <img id="img" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=998&q=80" alt="" className="members" />
        <img id="img" src="https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80" alt="" className="members" />
       </div>
      </div>
     </div>
     <div className="main-area">
      <div className="header">
       <div className="search-bar">
        {/* <input type="text" placeholder="Search..." /> */}
       </div>
       {/* <div className="inbox-calendar">
      <input type="checkbox" className="inbox-calendar-checkbox" />
      <div className="toggle-page">
       <span>Inbox</span>
      </div>
      <div className="layer"></div>
     </div> */}

       <img
        src={projectBack}
        alt="User"
        className="project-back-img"
        onClick={() => navigate(-1)}
        title="Return"
       />

      </div>
      <div className="main-container">
       <div className="inbox-container">
        <div className="inbox">
         <div className="msg msg-department anim-y">
          Project Members
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 492 492">
           <path d="M484.13 124.99l-16.11-16.23a26.72 26.72 0 00-19.04-7.86c-7.2 0-13.96 2.79-19.03 7.86L246.1 292.6 62.06 108.55c-5.07-5.06-11.82-7.85-19.03-7.85s-13.97 2.79-19.04 7.85L7.87 124.68a26.94 26.94 0 000 38.06l219.14 219.93c5.06 5.06 11.81 8.63 19.08 8.63h.09c7.2 0 13.96-3.57 19.02-8.63l218.93-219.33A27.18 27.18 0 00492 144.1c0-7.2-2.8-14.06-7.87-19.12z"></path>
          </svg>
         </div>
         <div className="msg selected-bg anim-y">
          <input type="checkbox" name="msg" id="mail1" className="mail-choice" checked />
          <label htmlFor="mail1"></label>
          <div className="msg-content">
           <div className="msg-title">Write an articke about design</div>
           <div className="msg-date">22 Feb, 2019</div>
          </div>
          <img id="img" src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="members mail-members" />
         </div>
         <div className="msg anim-y">
          <input type="checkbox" name="msg" id="mail2" className="mail-choice" />
          <label htmlFor="mail2"></label>
          <div className="msg-content">
           <div className="msg-title">Disrupt next level aesthetic raw</div>
           <div className="msg-date">22 Feb, 2019</div>
          </div>
          <img id="img" src="https://images.unsplash.com/flagged/photo-1574282893982-ff1675ba4900?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="" className="members mail-members" />
         </div>
         <div className="msg selected-bg anim-y">
          <input type="checkbox" name="msg" id="mail3" className="mail-choice" checked />
          <label htmlFor="mail3"></label>
          <div className="msg-content">
           <div className="msg-title">Chicharrones craft beer tattooed</div>
           <div className="msg-date">22 Feb, 2019</div>
          </div>
          <img id="img" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=998&q=80" alt="" className="members mail-members" />
         </div>
         <div className="msg anim-y">
          <input type="checkbox" name="msg" id="mail4" className="mail-choice" />
          <label htmlFor="mail4"></label>
          <div className="msg-content">
           <div className="msg-title">Vaporware readymade shabby</div>
           <div className="msg-date">22 Feb, 2019</div>
          </div>
          <img id="img" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" className="members mail-members" />
         </div>
         <div className="msg anim-y">
          <input type="checkbox" name="msg" id="mail5" className="mail-choice" />
          <label htmlFor="mail5"></label>
          <div className="msg-content">
           <div className="msg-title"> Four dollar toast taxidermy</div>
           <div className="msg-date">22 Feb, 2019</div>
          </div>
          <img id="img" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" alt="" className="members mail-members" />
         </div>
         <div className="msg anim-y">
          <input type="checkbox" name="msg" id="mail6" className="mail-choice" />
          <label htmlFor="mail6"></label>
          <div className="msg-content">
           <div className="msg-title">Slow-carb disrupt kogi tote bag</div>
           <div className="msg-date">22 Feb, 2019</div>
          </div>
          <img id="img" src="https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80" alt="" className="members mail-members" />
         </div>
         <div className="msg anim-y">
          <input type="checkbox" name="msg" id="mail7" className="mail-choice" />
          <label htmlFor="mail7"></label>
          <div className="msg-content">
           <div className="msg-title">Pour-over subway tile twee</div>
           <div className="msg-date">22 Feb, 2019</div>
          </div>
          <img id="img" src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="members mail-members" />
         </div>
         <div className="msg anim-y">
          <input type="checkbox" name="msg" id="mail8" className="mail-choice" />
          <label htmlFor="mail8"></label>
          <div className="msg-content">
           <div className="msg-title">Create AdWords campaign</div>
           <div className="msg-date">22 Feb, 2019</div>
          </div>
          <img id="img" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" className="members mail-members" />
         </div>
        </div>
        <div className="add-task">
         {/* <Button className="add-button">Add task</Button> */}
         <CreateTaskModal view={"team"} />
        </div>
       </div>
       <div className="mail-detail">
        <div className="mail-detail-header">
         <div className="mail-detail-profile">
          <img id="img" src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="members inbox-detail" />
          <div className="mail-detail-name">{viewdata?.name}</div>
         </div>
         <div className="mail-icons">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash-2">
           <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
          </svg>

         </div>
        </div>
        <div className="mail-contents">
         <div className="mail-contents-subject">
          <input type="checkbox" name="msg" id="mail20" className="mail-choice" checked />
          <label htmlFor="mail20"></label>
          <div className="mail-contents-title">{viewdata?.name} Project Description</div>
         </div>
         <div className="mail">
          <div className="mail-time">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-clock">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
           </svg>
           12 Mar, 2019
          </div>
          <div className="mail-inside">{viewdata?.description}</div>

          <div className="mail-checklist">
           <input type="checkbox" name="msg" id="mail30" className="mail-choice" checked />
           <label htmlFor="mail30">Project Update.</label>
           <div className="mail-checklist-date">{viewdata?.name}</div>
          </div>
          <div className="mail-doc">
           <div className="mail-doc-wrapper">
            <RiDeleteBin6Line size={20} />
            <div className="mail-doc-detail">
             <div className="mail-doc-name">Commence Project</div>
             <div className="mail-doc-date">added 17 May, 2020</div>
            </div>
           </div>
           <div className="mail-doc-icons">
            <div className="add-task">
             <CommenceProjectModal id={id} title={viewdata?.name} />
            </div>
           </div>
          </div>
          <div className="mail-doc">
           <div className="mail-doc-wrapper">
            <RiDeleteBin6Line size={20} />
            <div className="mail-doc-detail">
             <div className="mail-doc-name">Complete Project</div>
             <div className="mail-doc-date">added 17 May, 2020</div>
            </div>
           </div>
           <div className="mail-doc-icons">
            <div className="add-task">
             <CompleteProjectModal id={id} title={viewdata?.name} />
            </div>
           </div>
          </div>
          <div className="mail-doc">
           <div className="mail-doc-wrapper">
            <RiDeleteBin6Line size={20} />
            <div className="mail-doc-detail">
             <div className="mail-doc-name">Suspend Project</div>
             <div className="mail-doc-date">added 17 May, 2020</div>
            </div>
           </div>
           <div className="mail-doc-icons">
            <div className="add-task">
             <SuspendProjectModal id={id} title={viewdata?.name} />
            </div>
           </div>
          </div>
          <div className="mail-doc">
           <div className="mail-doc-wrapper">
            <RiDeleteBin6Line size={20} />
            <div className="mail-doc-detail">
             <div className="mail-doc-name">Suspend Project</div>
             <div className="mail-doc-date">added 17 May, 2020</div>
            </div>
           </div>
           <div className="mail-doc-icons">
            <div className="add-task">
             <UpdateProjectModal id={id} title={viewdata?.name} />
            </div>
           </div>
          </div>
         </div>
        </div>
        {/* <div className="mail-textarea">
         <input type="text" placeholder="Write a comment..." />
         <div className="textarea-icons">
          <div className="attach">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-paperclip">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
           </svg>
          </div>
          <div className="send">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-send">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
           </svg>
          </div>
         </div>
        </div> */}
       </div>
       {/* <div className="calendar-container"> */}
       {/* <div className="calender-tab anim-y">
       <div className="week-month">
        <button className=" button active">Week</button>
        <button className=" button button-month">Month</button>
       </div>
       <div className="month-change">
        <div className="current-month">October</div>
        <div className="current-year">2020</div>
       </div>
       <div className="week-month">
        <button className=" button button-weekends">Weekends</button>
        <button className=" button button-task active">Add task</button>
       </div>
      </div> */}
       {/* <div className="calendar-wrapper anim-y">
       <div className="calendar">
        <div className="days">Monday</div>
        <div className="days">Tuesday</div>
        <div className="days">Wednesday</div>
        <div className="days">Thursday</div>
        <div className="days">Friday</div>
        <div className="days">Saturday</div>
        <div className="days">Sunday</div>
        <div className="day not-work">31</div>
        <div className="day project-market">1
         <div className="hover-title">Marketing</div>
         <div className="project-detail">Sales report from last month</div>
         <div className="project-detail">Prepare offers for clients</div>
         <div className="popup-check">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-check-square">
           <path d="M9 11l3 3L22 4" />
           <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
         </div>
        </div>
        <div className="day">2</div>
        <div className="day project-design">3
         <div className="project-detail design">Create 3 illustrations for blog post about design trends</div>
        </div>
        <div className="day">4</div>
        <div className="day">5</div>
        <div className="day">6</div>
        <div className="day project-develop">7
         <div className="project-detail develop">Take part in course about future design trends and new technologies</div>
        </div>
        <div className="day">8</div>
        <div className="day">9</div>
        <div className="day">10</div>
        <div className="day">11</div>
        <div className="day">12</div>
        <div className="day">13</div>
        <div className="day">14</div>
        <div className="day project-market">15
         <div className="hover-title">Marketing</div>
         <div className="project-detail">Write an article about design trends</div>
         <div className="popup-check">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-check-square">
           <path d="M9 11l3 3L22 4" />
           <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
         </div>
        </div>
        <div className="day">16</div>
        <div className="day project-market">17
         <div className="hover-title">Marketing</div>
         <div className="project-detail">Create AdWords campaign</div>
         <div className="project-detail">Send newsletter to clients</div>
         <div className="popup-check">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-check-square">
           <path d="M9 11l3 3L22 4" />
           <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
         </div>
        </div>
        <div className="day">18</div>
        <div className="day">19</div>
        <div className="day">20</div>
        <div className="day">21</div>
        <div className="day">22</div>
        <div className="day project-finance">23
         <div className="hover-title">Management</div>
         <div className="project-detail finance">Redesign project ui interface for clients and get feedback</div>
         <div className="popup-check">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-check-square">
           <path d="M9 11l3 3L22 4" />
           <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
         </div>
        </div>
        <div className="day">24</div>
        <div className="day">25</div>
        <div className="day">26</div>
        <div className="day">27</div>
        <div className="day">28</div>
        <div className="day">29</div>
        <div className="day">30</div>
        <div className="day not-work">1</div>
        <div className="day not-work">2</div>
        <div className="day not-work">3</div>
        <div className="day not-work">4</div>
       </div>
      </div> */}
       {/* </div> */}
      </div>
     </div>
    </div>)}
  </div>
 )
}

export default ViewProjects
