import Schedule from "./Schedule";
import imgs from "../../assets/images/average.png";
import AdminAnnouncement from "./AdminAnnouncement";

const AdminDashboard = () => {
  return (
    <div className="main-div">
      <div className="main-div-col-1">
        <div className="AdminDashboard-first-3-card">
          <div className="AdminDashboard-first-3-card-color-1">
            <h5 className="AdminDashboard-first-h5">Available Position</h5>
            <h2 className="AdminDashboard-first-h3">24</h2>
            <p className="AdminDashboard-first-p">4 Urgently needed</p>
          </div>
          <div className="AdminDashboard-first-3-card-color-2">
            <h5 className="AdminDashboard-second-h5">Job Open</h5>
            <h2 className="AdminDashboard-second-h3">10</h2>
            <p className="AdminDashboard-second-p">106 Active hiring</p>
          </div>
          <div className="AdminDashboard-first-3-card-color-3">
            <h5 className="AdminDashboard-third-h5">New Employees</h5>
            <h2 className="AdminDashboard-third-h3">19</h2>
            <p className="AdminDashboard-third-p">8 Departments</p>
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
                <h3 className="Average-container-card-children">216</h3>
              </div>
              <p className="Avg-data">120 Men</p>
              <p className="Avg-data">96 Women</p>
            </div>
            <div>
              <div className="Average-container-card-view">
                <img src={imgs} alt="Average" className="graph-img" />
              </div>
              <div className="Average-container-card-month">
                <span className="Average-container-card-month-span">
                  +2% Past month
                </span>
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
