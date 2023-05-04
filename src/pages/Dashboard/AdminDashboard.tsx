import Schedule from "./Schedule";
import AdminAnnouncement from "./AdminAnnouncement";
import { useAppSelector } from "../../hooks/useDispatch";
import { RiUser6Fill } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { GiStahlhelm } from "react-icons/gi";
import DonutChat from "../../components/AdminDashboardChat/DonutChat";
import Barchat from "../../components/AdminDashboardChat/Barchat";
import { MdOpenInFull } from "react-icons/md";
// import Tooltip from 'react-bootstrap/Tooltip';
import FullBarChart from "../../components/AdminDashboardChat/FullBarChart";
import { useState } from "react";

const AdminDashboard = () => {
  const employees = useAppSelector((state) => state.employees.employees);
  const departments = useAppSelector((state) => state.department.department);
  const projects = useAppSelector((state) => state.projects.projects);

  const [show, setShow] = useState<any>(false);
  const [fullscreen, setFullscreen] = useState<any>(false);

  function handleShow() {
    setFullscreen(true);
    setShow(true);
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
              {!projects?.length ? 0 : projects?.length}
            </h2>
            <p className="AdminDashboard-third-p">
              <GiStahlhelm size={30} />
            </p>
          </div>
        </div>
        <div className="Average-container">
          <div className="Average-container-card">

            <MdOpenInFull className="barchat-OpenInFull" onClick={handleShow} />
            <Barchat departments={departments} employees={employees} />
            <FullBarChart departments={departments} employees={employees} show={show} fullscreen={fullscreen} setFullscreen={setFullscreen} setShow={setShow} />
          </div>
          <div className="Average-container-card">

            <DonutChat employees={employees} />
          </div>
        </div>
        <AdminAnnouncement />
        {/* <Announcement /> */}
      </div>

      {/* Todos start */}
      <Schedule />
      {/* Todos end */}

    </div>
  );
};

export default AdminDashboard;
