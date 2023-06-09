import Schedule from "./Schedule";
import AdminAnnouncement from "./AdminAnnouncement";
import { RiUser6Fill } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { GiStahlhelm } from "react-icons/gi";
import DonutChat from "../../components/AdminDashboardChat/DonutChat";
import Barchat from "../../components/AdminDashboardChat/Barchat";
import { MdOpenInFull } from "react-icons/md";
import FullBarChart from "../../components/AdminDashboardChat/FullBarChart";
import { useEffect, useState } from "react";
import HttpService from "../../components/HttpService";
import DataService from "../../utils/dataService";

const AdminDashboard = () => {
 const dataService = new DataService()
 const user = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
 const id = (user?.employee?._id)
 const [show, setShow] = useState<any>(false);
 const [project, setProject] = useState<any>([]);
 const [departments, setDepartments] = useState<any>([]);
 const [employees, setEmployees] = useState<any>([]);
 const [announcement, setAnnouncement] = useState<any>([]);
 const [tasks, setTask] = useState<any>([]);
 const [isLoading, setisLoading] = useState<any>([]);
 const [fullscreen, setFullscreen] = useState<any>(false);

 function handleShow() {
  setFullscreen(true);
  setShow(true);
 }

 useEffect(() => {
  getData()
 }, [])


 const getData = async () => {
  setisLoading(true)
  try {
   const employeesUrl = "hr/employees"
   const employees: any = await HttpService.get(employeesUrl)
   setEmployees(employees?.data?.data)

   const departmentsUrl = "hr/departments"
   const departments: any = await HttpService.get(departmentsUrl)
   setDepartments(departments?.data?.data)

   const projectsUrl = "hr/projects"
   const projects: any = await HttpService.get(projectsUrl)
   setProject(projects?.data?.data)

   const announcementsUrl = "hr/announcements"
   const announcement: any = await HttpService.get(announcementsUrl)
   setAnnouncement(announcement?.data?.data)

   const tasksUrl = `tasks/${id}`
   const tasks: any = await HttpService.get(tasksUrl)
   setTask(tasks?.data?.data)

   setisLoading(false)

  } catch (error) {
   setisLoading(false)
  }
 }

 return (
  <div className="main-div">
   <div className="main-div-col-1">
    <div className="AdminDashboard-first-3-card">
     <div className="AdminDashboard-first-3-card-color-1">
      <h5 className="AdminDashboard-first-h5">Total Employees</h5>
      <h2 className="AdminDashboard-first-h3">
       {!employees?.length ? 0 : employees?.length}
      </h2>
      <p className="AdminDashboard-first-p">
       <RiUser6Fill size={30} />
      </p>
     </div>
     <div className="AdminDashboard-first-3-card-color-2">
      <h5 className="AdminDashboard-second-h5">Departments</h5>
      <h2 className="AdminDashboard-second-h3">
       {!departments?.length ? 0 : departments?.length}
      </h2>
      <p className="AdminDashboard-second-p">
       <BiBuildingHouse size={30} />
      </p>
     </div>
     <div className="AdminDashboard-first-3-card-color-3">
      <h5 className="AdminDashboard-third-h5">Projects</h5>
      <h2 className="AdminDashboard-third-h3">
       {!project?.length ? 0 : project?.length}
      </h2>
      <p className="AdminDashboard-third-p">
       <GiStahlhelm size={30} />
      </p>
     </div>
    </div>

    {/* </div> */}
    <div className="row" >
     <div className="Average-container-card" style={{ width: "34vw", margin: "1rem" }} >
      <MdOpenInFull className="barchat-OpenInFull" onClick={handleShow} />
      <Barchat departments={!departments?.length ? [] : departments} employees={!employees?.length ? [] : employees} />
      <FullBarChart departments={!departments?.length ? [] : departments} employees={!employees?.length ? [] : employees} show={show} fullscreen={fullscreen} setFullscreen={setFullscreen} setShow={setShow} />
     </div>
     <div className="Average-container-card" style={{ width: "15vw", margin: "1rem" }}>
      <DonutChat employees={!employees?.length ? 0 : employees} />
     </div>
    </div>
    <AdminAnnouncement announcements={announcement} isLoading={isLoading} />
    {/* <Announcement /> */}
   </div>

   {/* Todos start */}
   <Schedule tasks={tasks} isLoading={isLoading} />
   {/* Todos end */}

  </div>
 );
};

export default AdminDashboard;
