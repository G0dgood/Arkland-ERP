import React from "react";
import { Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import moment from "moment";
import InputField from "../../../components/Inputs/InputField";
import SelectField from "../../../components/Inputs/SelectField";

const Essentials = () => {
  const handleSubmit = (values: any) => {};
  const genderOptions = ["Select your gender", "Male", "Female"];
  const validate = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    middle_name: Yup.string(),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    date_of_birth: Yup.string().required("Date of birth is required"),
  });
  const formatDate = (date: Date) => moment(date).format("YYYY-MM-DD");
  const dateChange = (date: Date, dateType: any) => {
    if (dateType === "dob") {
    }
  };
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
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <span className="input__label">Date of Birth</span>
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        onChange={(value: any) =>
                          formik.setFieldValue(
                            "dob",
                            formatDate({ value }.value)
                          )
                        }
                        className="select-input form-group__datepicker "
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Disability"
                        name="disability"
                        placeholder="Enter Disability"
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
              </form>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Essentials;
