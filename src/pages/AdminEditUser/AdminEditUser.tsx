import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { BiUser } from "react-icons/bi";
import EditProfile from "./components/EditProfile";
import EditEducation from "./components/EditEducation";
import EditNextKin from "./components/EditNextKin";
import ResetPassword from "./components/ResetPassword";
import { Button } from "@material-ui/core";

const AdminEditUser = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Profile", "Education", "Next of Kin", "Reset Password"];
  const tabPanels = [
    { component: <EditProfile /> },
    { component: <EditEducation /> },
    { component: <EditNextKin /> },
    { component: <ResetPassword /> },
  ];

  return (
    <div id="screen-wrapper">
      <Header />
      <Sidebar />
      <main id="edit-user">
        <h6 className="page-title">
          <Link to="/allemployees">Employees</Link> | Employee Profile
        </h6>
        <section>
          <div className="user-info">
            <BiUser size={80} />
            <div>
              <h3>Bito Unlimited</h3>
              <p>bito.unlimited@alc.com</p>
              <p>Frontend Developer</p>
            </div>
          </div>
          <div className="profile-container">
            <ul className="nav-tabs">
              {tabs.map((item, i) => (
                <Button
                  variant="outlined"
                  key={i}
                  className={activeTab === i ? "Add-btn-edit" : "show-btn-edit"}
                  onClick={() => setActiveTab(i)}>
                  {item}
                </Button>
              ))}
            </ul>
            {tabPanels[activeTab].component}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminEditUser;
