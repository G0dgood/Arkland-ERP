import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import AddEmployeeNav from "./AddEmployeeNav";
import AddEmployeeTitle from "./AddEmployeeTitle";
import Address from "./employeeInputs/Address";
import Employment from "./employeeInputs/Employment";
import Essentials from "./employeeInputs/Essentials";
import Finance from "./employeeInputs/Finance";
import Reference from "./employeeInputs/Reference";
import CreateEmployeeView from "./employeeInputs/CreateEmployeeView";
import { number } from "yup";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    institution_attended: "",
    course_studied: "",
    qualification: "",
    department: "",
    role: "",
    is_expatriate: false,

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
    has_work_location_objection: false,
    employment_date: "",
    employment_duration: "",
    employment_type: "",
    employee_id: "",

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
  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };

  const submitMyFormRef: any = React.useRef(null);

  const handleSubmitMyForm = (e: Event) => {
    if (submitMyFormRef.current) {
      submitMyFormRef.current(e);
      console.log("submitMyFormRef.current(e);", submitMyFormRef.current(e));
    }
  };

  const bindSubmitForm = React.useCallback((submitForm: any) => {
    submitMyFormRef.current = submitForm;
  }, []);

  return (
    <>
      <Helmet>
        <title>Create employee | Arkland ERP</title>
      </Helmet>
      <div id="screen-wrapper">
        <Header toggleSideNav={toggleSideNav} />
        <Sidebar collapseNav={collapseNav} />
        <main>
          <div className="back-to-employee-container">
            <Button
              onClick={() => navigate("/allemployees")}
              variant="outlined"
              className="back-to-employee-button"
            >
              <GoArrowLeft className="back-to-employee-icon" size={20} />
            </Button>
          </div>
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
                setEmployee={setEmployee}
                setActive={setActive}
                bindSubmitForm={bindSubmitForm}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateEmployee;
