import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { BiUser } from "react-icons/bi";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EditProfile from "./components/EditProfile";
import ResetPassword from "./components/ResetPassword";
import { useAppSelector } from "../../hooks/useDispatch";
import { checkForName } from "../../utils/checkForName";
import storage from "../../utils/storage";
import { useEmployeeById } from "../../hooks/useEmployees";

const AdminEditUser = () => {
  const { id } = useParams<{ id: string }>();
  const { employee, salary, isLoading, updateloading, handleSubmit } =
    useEmployeeById(id ? id : "");

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
          employee={employee}
          salary={salary}
          isLoading={isLoading}
          updateloading={updateloading}
          handleSubmit={handleSubmit}
          departmentOptions={availablleDepartments}
          roleOptions={availablleRoles}
        />
      ),
    },
    { component: <ResetPassword email={employee?.email} /> },
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
              <h3> {employee?.full_name} </h3>
              <p>{employee?.email} </p>
              <p>{employee?.role?.name} </p>
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
