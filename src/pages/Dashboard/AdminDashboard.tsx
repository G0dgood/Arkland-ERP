import Schedule from "./Schedule";
import imgs from "../../assets/images/average.png";
import AdminAnnouncement from "./AdminAnnouncement";
import { useAppSelector } from "../../hooks/useDispatch";
import { RiUser6Fill } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { GiStahlhelm } from "react-icons/gi";

const AdminDashboard = () => {
  const employees = useAppSelector((state) => state.employees.employees);
  const departments = useAppSelector((state) => state.department.department);
  const projects = useAppSelector((state) => state.projects.projects);

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
              <RiUser6Fill size={20} />
            </p>
          </div>
          <div className="AdminDashboard-first-3-card-color-2">
            <h5 className="AdminDashboard-second-h5">Departments</h5>
            <h2 className="AdminDashboard-second-h3">
              {!departments?.length ? 0 : departments?.length}
            </h2>
            <p className="AdminDashboard-second-p">
              <BiBuildingHouse size={20} />
            </p>
          </div>
          <div className="AdminDashboard-first-3-card-color-3">
            <h5 className="AdminDashboard-third-h5">Projects</h5>
            <h2 className="AdminDashboard-third-h3">
              {!projects?.length ? 0 : projects?.length}
            </h2>
            <p className="AdminDashboard-third-p">
              <GiStahlhelm size={20} />
            </p>
          </div>
        </div>
        <div className="Average-container">
          <div className="Average-container-card">
            <div className="Average-container-card-sup">
              <div>
                <h6 className="Average-container-card-headings">Average</h6>
                <h6 className="Average-container-card-headings">Performance</h6>
              </div>
              <div>
                <h3 className="Average-container-card-children">78%</h3>
              </div>
            </div>
            <div>
              <div className="Average-container-card-view">
                <img src={imgs} alt="Average" className="graph-img" />
              </div>
              <div className="Average-container-card-month">
                <span className="Average-container-card-month-span">
                  +5% Past month
                </span>
              </div>
            </div>
          </div>
          <div className="Average-container-card">
            <div className="Average-container-card-sup">
              <div>
                <h6 className="Average-container-card-headings">Total</h6>
                <h6 className="Average-container-card-headings">Employees</h6>
              </div>
              <div>
                <h3 className="Average-container-card-children">
                  {employees?.length}
                </h3>
              </div>
            </div>
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
