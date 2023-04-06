import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { BiUser } from "react-icons/bi";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EditProfile from "./components/EditProfile";
import ResetPassword from "./components/ResetPassword";
import { useAppSelector } from "../../hooks/useDispatch";
import { checkForName } from "../../utils/checkForName";
import storage from "../../utils/storage";

const AdminEditUser = () => {
  const userString = storage?.get("user");
  const userInfo = userString ? JSON.parse(userString) : null;
  const [activeTab, setActiveTab] = useState(0);
  const departments: any = useAppSelector(
    (state) => state?.department?.department
  );
  const availablleDepartments = [] as any;

  departments &&
    departments.forEach((department: any) =>
      availablleDepartments.push({
        value: department?.id,
        label: department?.name,
      })
    );

  const roles: any = useAppSelector((state) => state?.roles?.roles);
  const availablleRoles = [] as any;

  roles &&
    roles.forEach((role: any) =>
      availablleRoles.push({
        value: role?.id,
        label: role?.name,
      })
    );
  const tabs = ["Profile", "Reset Password"];

  const tabPanels = [
    {
      component: (
        <EditProfile
          departmentOptions={availablleDepartments}
          roleOptions={availablleRoles}
        />
      ),
    },
    { component: <ResetPassword /> },
  ];

  return (
    <div id="screen-wrapper">
      <Header />
      <Sidebar />
      <main id="edit-user">
        <h6 className="page-title">
          <Link to="/employeecontainer">Employees</Link> | Employee Profile
        </h6>
        <section>
          <div className="user-info">
            <BiUser size={80} />
            <div>
              <h3> {userInfo?.data?.employee?.full_name} </h3>
              <p>{userInfo?.data?.employee?.email} </p>
              <p>{checkForName(userInfo?.data?.employee?.role, roles)} </p>
            </div>
          </div>
          <div className="profile-container">
            <ul className="nav-tabs">
              {tabs.map((item, i) => (
                <Button
                  variant="outlined"
                  key={i}
                  className={activeTab === i ? "Add-btn-edit" : "show-btn-edit"}
                  onClick={() => setActiveTab(i)}
                >
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
