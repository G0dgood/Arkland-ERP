import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
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
  const genderOptions = [
    "Select employee gender",
    "male",
    "female",
    "I will rather not say",
  ];
  const disabilityOptions = ["Does employee have disability", "Yes", "No"];
  const isExpatriateOptions = ["Is employee an expatriate", "Yes", "No"];
  const martialStatusOptions = [
    "Select marital status",
    "single",
    "married",
    "divorced",
    "separated",
    "widowed",
    "other",
    "I will rather not say",
  ];
  const visaOptions = [
    "Select visa type",
    "F2A - Non-Accredited Diplomatic Visa",
    "F3B - Transit Without Visa",
    "F3C - Transit With Visa",
    "F4A - Business - Single Entry Visa",
    "F4B - Business - Multiple Entry Visa",
    "F4C - Business - Frequently Traveled Executives Visa",
    "F5A - Tourism Visa",
    "F6A - Visiting Visa",
    "F6B - Visiting Visa",
    "F7A - Journalist Visa",
    "F7B - Cleric Visa",
    "F7C - Medical Tourism Visa",
    "F7D - Religious Tourism Visa",
    "F7E - Sport Visa",
    "F7F - Entertainer Visa",
    "F7G - Study Tour Visa",
    "F7H - Academic Exchange Program (AEP) Visa",
    "F7I - International Culture Exchange Visa",
    "F7J - Humanitarian Service Visa",
    "F7K - Emergency/Relief Work Visa",
    "F7L - Staff of International NGO Visa",
    "F7M - Staff of NGO Visa",
    "F8A - Temporary Work Permit Visa",
    "F9A - Returning Nigerian by Birth Visa",
    "R11 - Temporary Work Permit Visa",
    "R1A - Accredited Diplomatic Visa",
    "R1B - Spouse of Accredited Diplomatic Visa",
    "R1C - Minor Dependant of Accredited Diplomatic Visa",
    "R1D - Adult Dependant of Accredited Diplomatic Visa",
    "R1E - Aged Dependant of Accredited Diplomatic Visa",
    "R2A - Expatriate Employment Visa",
    "R2B - Spouse of Expatriate Visa",
    "R2C - Minor Dependant of Expatriate Visa",
    "R2D - Adult Dependant of Expatriate Visa",
    "R2E - Aged Dependant of Expatriate Visa",
    "R3A - Free Zone Expatriate Employment Visa",
    "R3B - Spouse of Free Zone Expatriate Visa",
    "R3C - Minor Dependant of Free Zone Expatriate Visa",
    "R3D - Adult Dependant of Free Zone Expatriate Visa",
    "R3E - Aged Dependant of Free Zone Expatriate Visa",
    "R4A - Government Expatriate Employment Visa",
    "R4B - Spouse of Government Expatriate Visa",
    "R4C - Minor Dependant of Government Expatriate Visa",
    "R4D - Adult Dependant of Government Expatriate Visa",
    "R4E - Aged Dependant of Government Expatriate Visa",
    "R5A - International NGO Employment Visa",
    "R5B - Spouse of INGO Employment Visa",
    "R5C - Minor Dependant of INGO Employment Visa",
    "R5D - Adult Dependant of INGO Employment Visa",
    "R5E - Aged Dependant of INGO Employment Visa",
    "R6A - Cleric Employment Visa",
    "R6B - Spouse of Cleric Employment Visa",
    "R6C - Minor Dependant of Cleric Employment Visa",
    "R6D - Adult Dependant of Cleric Employment Visa",
    "R6E - Aged Dependant of Cleric Employment Visa",
    "R7A - Student Visa",
    "R7B - Spouse of Student Visa",
    "R8A - Academic Exchange Programme (AEP) Visa",
    "R8B - Spouse of AEP Visa",
    "R9A - Intern Visa",
    "N1A - Spouse of Nigerian Citizen Visa",
    "N2A - Nigerian by Birth who Renounced Nigerian Citizenship Visa",
    "N2B - Spouse of Nigerian by Birth who Renounced Nigerian Citizenship Visa",
    "N3A - Small Scale Enterprise Investor Visa",
    "N3B - Medium Scale Enterprise Investor Visa",
    "N3C - Large Scale Corporation Investor Visa",
    "N3D - Ultra Large Scale Corporation Investor Visa",
    "N3E - Oil, Gas and Power Sector Investor Visa",
    "N4A - Highly Skilled Immigrant Visa",
    "N5A - Retiree in Nigeria Visa",
    "N5B - Retiree From Abroad Visa",
    "N6A - Spouse of Permanent Residence Visa",
    "N6B - Minor Dependant of Permanent Residence Visa",
    "N6C - Adult Dependant of Permanent Residence Visa",
    "N6D - Aged Dependant of Permanent Residence Visa",
  ];
  const ACADEMIC_QUALIFICATIONS = [
    "Select qualification",
    "Doctorate",
    "Master's",
    "Post Graduate Diploma",
    "Bachelor's",
    "HND",
    "OND",
    "O Level",
    "A Level",
    "FSLC",
  ];

  const validate = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    middle_name: Yup.string(),
    last_name: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone number is required"),
  });
  const formatDate = (date: Date) => {
    const show = moment(date).format();
    return show;
  };
  const [is_expatriateValue, set_is_expatriateValue] = React.useState(false);
  const formatToTrue = (value?: any) => {
    if (value === "Yes") {
      return true;
    } else if (value === "No") {
      return false;
    }
  };
  const visaController = (value?: string) => {
    if (value === "Yes") {
      set_is_expatriateValue(true);
      return true;
    } else if (value === "No") {
      set_is_expatriateValue(false);
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
          personal_email: "",
          email: "",
          phone: "",
          gender: "",
          date_of_birth: "",
          has_disability: "",
          visa_type: "",
          is_expatriate: "",
          visa_duration: "",
          passport_number: "",
          institution_attended: "",
          nin: "",
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
                          label="Official Email"
                          name="email"
                          placeholder="Enter official email"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Personal Email"
                          name="personal_email"
                          placeholder="Enter personal email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <PhoneInput
                          value=""
                          inputProps={{
                            name: "phone",
                            required: true,
                          }}
                          inputStyle={{
                            background: "4f269f",
                            height: "40px",
                            width: "100%",
                            maxWidth: "100%",
                          }}
                          specialLabel="Employee Phone Number"
                          inputClass="w-100"
                          containerClass="mb-3 agent-project__owner"
                          onChange={(telephone) =>
                            setFieldValue("phone", `${telephone}`)
                          }
                          country={"ng"}
                          placeholder="Enter employee Phone Number"
                          defaultErrorMessage="required"
                          enableSearch={true}
                        />
                      </div>
                    </div>

                    <div className="imput-space" />
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
                  </div>
                  <div className="row-item">
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

                    <div className="imput-space" />
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
                        <SelectField
                          label="Qualification"
                          name="qualification"
                          options={ACADEMIC_QUALIFICATIONS}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue("qualification", event?.target.value);
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
                              visaController(event?.target.value)
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {is_expatriateValue ? (
                    <div className="row-item">
                      <div className="col">
                        <div className="form-group">
                          <SelectField
                            label="Choose visa type"
                            name="visa_type"
                            options={visaOptions}
                            className="form-group__gender"
                            onChange={(event: any) => {
                              setFieldValue("visa_type", event?.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="imput-space" />
                      <div className="col">
                        <div className="form-group">
                          <InputField
                            label="Passport Number"
                            name="passport_number"
                            placeholder="Enter employee's passport number"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row-item">
                      <div className="col">
                        <div
                          className="form-group"
                          style={{
                            width: "50%",
                          }}
                        >
                          <CustomInputField
                            type="number"
                            label="NIN"
                            name="nin"
                            placeholder="Enter National Identity Number"
                            onChange={(event: any) => {
                              setFieldValue("nin", event?.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="imput-space" />
                    </div>
                  )}
                  {is_expatriateValue ? (
                    <div className="row-item">
                      <div className="col">
                        <div
                          className="form-group"
                          style={{
                            width: "50%",
                          }}
                        >
                          <CustomInputField
                            type="number"
                            label="Visa Duration (Months)"
                            name="visa_duration"
                            placeholder="Enter employee's visa duration"
                            onChange={(event: any) => {
                              setFieldValue(
                                "visa_duration",
                                event?.target.value
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="imput-space" />
                    </div>
                  ) : (
                    ""
                  )}
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
