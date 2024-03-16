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
import DataService from "../../utils/dataService";

import createHttpService from "../../components/HttpService";

const dataService = new DataService()

const AdminDashboard = () => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 // @ts-ignore
 const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)


 const getData = async () => {
  const HttpService = createHttpService();
  setisLoading(true)
  try {
   const employeesUrl = "hr/employees"
   const employees: any = await HttpService.get(employeesUrl)
   setEmployees(employees?.data?.data)
   console.log('employees', employees)
   const departmentsUrl = "hr/departments"
   const departments: any = await HttpService.get(departmentsUrl)
   setDepartments(departments?.data?.data)

   const projectsUrl = "hr/projects"
   const projects: any = await HttpService.get(projectsUrl)
   setProject(projects?.data?.data)

   const announcementsUrl = "hr/announcements"
   const announcement: any = await HttpService.get(announcementsUrl)
   setAnnouncement(announcement?.data?.data)

   const tasksUrl = `tasks`
   const tasks: any = await HttpService.get(tasksUrl)
   setTask(tasks?.data?.data)

   const warningUrl = `me/warnings`
   const warning: any = await HttpService.get(warningUrl)
   localStorage.setItem(userInfo?.employee?.email, !warning?.data?.data.length ? 0 : warning?.data?.data.length);

   setisLoading(false)

  } catch (error) {
   setisLoading(false)
  }
 }



 console.log('departments', departments)

 return (
  <div className="main-div">
   <div className="main-div-col-1">
    <div className="AdminDashboard-first-3-card">
     <div className="AdminDashboard-first-3-card-color-1">
      <h5 className="AdminDashboard-first-h5">Total Employees</h5>
      <h2 className="AdminDashboard-first-h3">
       {!employees?.data?.length ? 0 : employees?.data?.length}
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
    <div className="container">
     <div className="row" >
      <div className="Average-container-card col-8  w-65"  >
       <MdOpenInFull className="barchat-OpenInFull" onClick={handleShow} />
       <Barchat departments={!departments?.length ? [] : departments} employees={!employees?.data?.length ? [] : employees?.data} />
       <FullBarChart departments={!departments?.length ? [] : departments} employees={!employees?.data?.length ? [] : employees?.data} show={show} fullscreen={fullscreen} setFullscreen={setFullscreen} setShow={setShow} />
      </div>
      <div className="Average-container-card col-3 ms-4 w-5"  >
       <DonutChat employees={!employees?.length ? 0 : employees} />
      </div>
     </div>
    </div>
    <div >
     <AdminAnnouncement announcements={announcement} isLoading={isLoading} />
    </div>
   </div>
   <div>
    {/* Todos start */}
    <Schedule tasks={tasks} isLoading={isLoading} />
    {/* Todos end */}
   </div>
  </div>
 );
};

export default AdminDashboard;
