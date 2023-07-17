import { useEffect, useState } from "react";
import { Link, useLocation, useParams, } from "react-router-dom";
import { Button } from "@material-ui/core";
import { BiUser } from "react-icons/bi";
import EditProfile from "./components/EditProfile";
import ResetPassword from "./components/ResetPassword";
import HttpService from "../../components/HttpService";

const AdminEditUser = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation()
  const { employee, salary } = state?.data // Read values passed on state

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);




  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {
      const rolesUrl = "hr/employee-roles"
      const roles: any = await HttpService.get(rolesUrl)
      setRoles(roles?.data?.data)

      const departmentsUrl = "hr/departments"
      const departments: any = await HttpService.get(departmentsUrl)
      setDepartments(departments?.data?.data)

    } catch (error) {

    }
  }


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
                className={activeTab === i ? "add-experience m-2" : "edit-password-btn"}
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
