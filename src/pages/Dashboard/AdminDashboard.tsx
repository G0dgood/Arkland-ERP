import Schedule from "./Schedule";
import AdminAnnouncement from "./AdminAnnouncement";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { RiUser6Fill } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { GiStahlhelm } from "react-icons/gi";
import DonutChat from "../../components/AdminDashboardChat/DonutChat";
import Barchat from "../../components/AdminDashboardChat/Barchat";
import { MdOpenInFull } from "react-icons/md";
// import Tooltip from 'react-bootstrap/Tooltip';
import FullBarChart from "../../components/AdminDashboardChat/FullBarChart";
import { useEffect, useState } from "react";
import { allEmployee } from "../../features/Employee/employeeSlice";
import { allProject } from "../../features/Project/projectSlice";
import { allDepartments } from "../../features/Department/departmentSlice";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { data: employees } = useAppSelector((state: any) => state.employee)
  const { data: departments } = useAppSelector((state: any) => state.department)
  const { data: projects } = useAppSelector((state: any) => state.project)




  // const employees = useAppSelector((state) => state.employees.employees);
  // const departments = useAppSelector((state) => state.department.department);
  // const projects = useAppSelector((state) => state.projects.projects);

  const [show, setShow] = useState<any>(false);
  const [fullscreen, setFullscreen] = useState<any>(false);

  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }


  useEffect(() => {
    if (!departments) {
      // @ts-ignore
      dispatch(allDepartments());
    }
    if (!employees) {
      // @ts-ignore
      dispatch(allEmployee());
    }
    if (!projects) {
      // @ts-ignore
      dispatch(allProject());
    }

  }, [departments, dispatch, employees, projects]);


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
              {!projects?.length ? 0 : projects?.length}
            </h2>
            <p className="AdminDashboard-third-p">
              <GiStahlhelm size={30} />
            </p>
          </div>
        </div>
        {/* <div className="rad-body-wrapper"> */}
        {/* <div style={{ width: "52vw" }}>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-xs-12">
              <div className="panel panel-default">
                {/* <div className="panel-heading">
                  <h3 className="panel-title">Line Chart</h3>
                </div> */}
        {/* <div className="panel-body">
                  <div id="lineChart" className="rad-chart">
                    <MdOpenInFull className="barchat-OpenInFull" onClick={handleShow} />
                    <Barchat departments={departments} employees={employees} />
                    <FullBarChart departments={departments} employees={employees} show={show} fullscreen={fullscreen} setFullscreen={setFullscreen} setShow={setShow} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-xs-12">
              <div className="panel panel-default"> */}
        {/* <div className="panel-heading">
                  <h3 className="panel-title">Area Chart</h3>
                </div> */}
        {/* <div className="panel-body">
                  <div id="areaChart" className="rad-chart">
                    <DonutChat employees={employees} />
                  </div>
                </div>
              </div>
            </div>

          </div>


        </div> */}
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
        {/* <AdminAnnouncement /> */}
        {/* <Announcement /> */}
      </div>

      {/* Todos start */}
      {/* <Schedule /> */}
      {/* Todos end */}

    </div>
  );
};

export default AdminDashboard;
