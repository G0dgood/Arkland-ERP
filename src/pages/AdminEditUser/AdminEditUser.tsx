import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useRoutes } from "react-router-dom";
import { Button } from "@material-ui/core";
import { BiUser } from "react-icons/bi";
import EditProfile from "./components/EditProfile";
import ResetPassword from "./components/ResetPassword";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { getRole } from "../../features/Employee/employeeSlice";
import { allDepartments } from "../../features/Department/departmentSlice";

const AdminEditUser = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: departments } = useAppSelector((state: any) => state.department)
  const { getroledata: roles } = useAppSelector((state: any) => state.employee)
  const { state } = useLocation()
  const { employee, salary } = state?.data // Read values passed on state



  useEffect(() => {
    dispatch(getRole());
    dispatch(allDepartments());
  }, [dispatch]);


  const [activeTab, setActiveTab] = useState(0);

  const availablleDepartments = [] as any;

  departments &&
    departments.forEach((department: any) =>
      availablleDepartments.push({
        value: department?.id,
        label: department?.name,
      })
    );


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
          departmentOptions={availablleDepartments}
          roleOptions={availablleRoles}
          id={id}
        />
      ),
    },
    { component: <ResetPassword email={employee?.email} /> },
  ];

  return (
    <div id="edit-user">
      <h6 className="page-title">
        <Link to="/employees">Employees</Link> | Employee Profile
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
    </div>
  );
};

export default AdminEditUser;
