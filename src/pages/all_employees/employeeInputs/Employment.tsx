import React from "react";
import { Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import SelectField from "../../../components/Inputs/SelectField";
import InputField from "../../../components/Inputs/InputField";

const Employment = () => {
  const handleSubmit = (values: any) => {};
  const validate = Yup.object().shape({});
  const departmentOptions = [
    "Enter name of department",
    "Engineering",
    "Finance",
    "Architecture",
  ];
  const roleOptions = ["Enter role", "admin", "agent"];
  const workLocationOptions = [
    "Do you have any work location objection?",
    "yes",
    "no",
  ];
  const typeOfEmploymentOptions = [
    "Enter type of employment",
    "Full time",
    "Part time",
  ];
  return (
    <div className="EssentialsContainer">
      <Formik
        initialValues={{
          first_name: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validate}
      >
        {(formik) => (
          <Form>
            <div className="testbox">
              <form>
                <div className="imput-space" />
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <SelectField
                        label="Department"
                        name="department"
                        options={departmentOptions}
                        className="form-group__gender"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <SelectField
                        label="Role"
                        name="role"
                        options={roleOptions}
                        className="form-group__gender"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <SelectField
                        label="Work Location Objection"
                        name="has_work_location_objection"
                        options={workLocationOptions}
                        className="form-group__gender"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <span className="input__label">Employment Date</span>
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Enter date of employment"
                        onChange={(value: any) => console.log("value")}
                        className="select-input form-group__datepicker "
                      />{" "}
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Employment Duration"
                        name="employment_duration"
                        placeholder="Enter duration of employment"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <SelectField
                        label="Employment Type"
                        name="employment_type"
                        options={typeOfEmploymentOptions}
                        className="form-group__gender"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Employment ID"
                        name="employment_id"
                        placeholder="Enter employment ID"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Tally Number"
                        name="tall_number"
                        placeholder="Enter tally number"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Employment;
