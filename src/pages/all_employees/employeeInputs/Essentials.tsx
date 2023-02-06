import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import InputField from "../../../components/Inputs/InputField";
import SelectField from "../../../components/Inputs/SelectField";
import { EmployeeFormProps } from "../../../interfaces/employee";
import CustomInputField from "../../../components/Inputs/CustomInputField";

const Essentials = ({
  active,
  employee,
  setEmployee,
  setActive,
  bindSubmitForm,
}: EmployeeFormProps) => {
  const genderOptions = ["Select employee gender", "Male", "Female"];
  const disabilityOptions = ["Does employee have disability", "Yes", "No"];
  const isExpatriateOptions = ["Is employee an expatriate", "Yes", "No"];
  const martialStatusOptions = [
    "Select marital status",
    "Married",
    "Single",
    "Divroced",
  ];

  const validate = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    middle_name: Yup.string(),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
  });
  const formatDate = (date: Date) => {
    const show = moment(date).format();
    return show;
  };
  const formatToTrue = (value?: any) => {
    if (value === "Yes") {
      return true;
    } else if (value === "No") {
      return false;
    }
  };
  const handleSubmit = (values?: any) => {
    console.log("Values", values);
    setEmployee({ ...employee, ...values });
    setActive(2);
  };
  return (
    <div className={active === 1 ? "EssentialsContainer" : "d-none"}>
      <Formik
        initialValues={{
          first_name: "",
          middle_name: "",
          last_name: "",
          marital_status: "",
          email: "",
          phone: "",
          gender: "",
          date_of_birth: "",
          has_disability: "",
          is_expatriate: "",
          institution_attended: "",
          course_studied: "",
          qualification: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validate}
      >
        {({ values, handleChange, setFieldValue, submitForm }) => {
          if (active === 1) {
            bindSubmitForm(submitForm);
          }
          return (
            <Form>
              <div className="testbox">
                <form>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="First Name"
                          name="first_name"
                          placeholder="Enter first name"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Middle Name"
                          name="middle_name"
                          placeholder="Enter middle name"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Last Name"
                          name="last_name"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Email"
                          name="email"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Phone"
                          name="phone"
                          placeholder="Enter Phone"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <SelectField
                          label="Gender"
                          name="gender"
                          options={genderOptions}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue("gender", event?.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <CustomInputField
                          style={{
                            lineHeight: 1,
                          }}
                          type="date"
                          label="Date of Birth"
                          name="date_of_birth"
                          onChange={(event: any) => {
                            setFieldValue(
                              "date_of_birth",
                              formatDate(event?.target.value)
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <SelectField
                          label="Disability"
                          name="disability"
                          options={disabilityOptions}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue(
                              "has_disability",
                              formatToTrue(event?.target.value)
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Institution Attended"
                          name="institution_attended"
                          placeholder="Enter Institution Attended"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Course Studied"
                          name="course_studied"
                          placeholder="Enter Course Studied"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Qualification"
                          name="qualification"
                          placeholder="Enter Qualification"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <SelectField
                          label="Marital Status"
                          name="marital_status"
                          options={martialStatusOptions}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue(
                              "marital_status",
                              event?.target.value
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <SelectField
                          label="Expatriate"
                          name="is_expatriate"
                          options={isExpatriateOptions}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue(
                              "is_expatriate",
                              formatToTrue(event?.target.value)
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Essentials;
