import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { number } from "yup";
import AddEmployeeNav from "./AddEmployeeNav";
import AddEmployeeTitle from "./AddEmployeeTitle";
import Address from "./employeeInputs/Address";
import Employment from "./employeeInputs/Employment";
import Essentials from "./employeeInputs/Essentials";
import Finance from "./employeeInputs/Finance";
import Reference from "./employeeInputs/Reference";
import CreateEmployeeView from "./employeeInputs/CreateEmployeeView";
import { useAppSelector } from "../../hooks/useDispatch";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    personal_email: "",
    email: "",
    phone: "",
    gender: "",
    institution_attended: "",
    visa_type: "",
    course_studied: "",
    qualification: "",
    department: "",
    role: "",
    is_expatriate: false,
    passport_number: "",
    visa_duration: "",

    bank_name: "",
    bank_account_number: "",
    bank_account_name: "",
    basic_salary: number,
    meal_allowance: number,
    utility_allowance: number,
    medical_allowance: number,
    housing_allowance: number,
    transportation_allowance: number,

    date_of_birth: "",
    next_of_kin: "",
    next_of_kin_phone: "",
    next_of_kin_email: "",
    next_of_kin_address: "",
    referee_name: "",
    referee_phone: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    has_disability: false,
    disability: "",
    has_work_location_objection: false,
    work_location_objection: "",
    employment_date: "",
    employment_duration: "",
    employment_type: "",
    employee_id: "",
    category: "",

    tally_number: "",
    address: "",
    city: "",
    zip_code: "",
    state_of_origin: "",
    country: "",
    nin: "",
    marital_status: "",
  });
  // State to store count value
  const [active, setActive] = useState<number>(1);

  useEffect(() => {
    setActive(active);
  }, [active]);


  const submitMyFormRef: any = React.useRef(null);

  const handleSubmitMyForm = (e: Event) => {
    if (submitMyFormRef.current) {
      submitMyFormRef.current(e);
    }
  };

  const bindSubmitForm = React.useCallback((submitForm: any) => {
    submitMyFormRef.current = submitForm;
  }, []);

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

  return (
    <>
      <Helmet>
        <title>Create employee | Arkland ERP</title>
      </Helmet>
      <div  >
        <main>
          <div className="addemployeecontainer">
            <AddEmployeeTitle
              setActive={setActive}
              active={active}
              click={handleSubmitMyForm}
            />
            {active === 6 ? (
              ""
            ) : (
              <AddEmployeeNav active={active} setActive={setActive} />
            )}
            <div className="all-inputs-container">
              <Essentials
                active={active}
                employee={employee}
                setEmployee={setEmployee}
                setActive={setActive}
                bindSubmitForm={bindSubmitForm}
              />
              <Finance
                active={active}
                employee={employee}
                setEmployee={setEmployee}
                setActive={setActive}
                bindSubmitForm={bindSubmitForm}
              />
              <Reference
                active={active}
                employee={employee}
                setEmployee={setEmployee}
                setActive={setActive}
                bindSubmitForm={bindSubmitForm}
              />
              <Employment
                active={active}
                employee={employee}
                setEmployee={setEmployee}
                setActive={setActive}
                bindSubmitForm={bindSubmitForm}
                options={availablleDepartments}
                roleOptions={availablleRoles}
              />
              <Address
                active={active}
                employee={employee}
                setEmployee={setEmployee}
                setActive={setActive}
                bindSubmitForm={bindSubmitForm}
              />
              <CreateEmployeeView
                active={active}
                employee={employee}
                departments={departments}
                roles={roles}
              // setActive={setActive}
              // bindSubmitForm={bindSubmitForm}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateEmployee;
