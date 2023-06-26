import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import InputField from "../../../components/Inputs/InputField";
import SelectField from "../../../components/Inputs/SelectField";
import { EmployeeFormProps } from "../../../interfaces/employee";
import CustomInputField from "../../../components/Inputs/CustomInputField";
import {
  ACADEMIC_QUALIFICATIONS,
  disabilityOptions,
  genderOptions,
  isExpatriateOptions,
  martialStatusOptions,
  visaOptions,
} from "../../../functions/helpers";

const Essentials = ({
  active,
  employee,
  setEmployee,
  setActive,
  bindSubmitForm,
}: EmployeeFormProps) => {
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
  // const [disability, setDisability] = React.useState(false);
  // const formatToTrue = (value?: any) => {
  //   if (value === "Yes") {
  //     setDisability(!false);
  //     return true;
  //   } else if (value === "No" || "Does employee have disability?") {
  //     setDisability(!true);
  //     return false;
  //   }
  // };
  const visaController = (value?: string) => {
    if (value === "Yes") {
      set_is_expatriateValue(true);
      return true;
    } else if (value === "No") {
      set_is_expatriateValue(false);
      return false;
    }
  };
  const [inputs, setInputs] = useState<any>({
    has_disability: false

  })
  const [isInputs, setisInputs] = useState<boolean>(false)



  useEffect(() => {
    setInputs((prevState: any) => ({

      ...prevState,
      has_disability: isInputs,

    }));
  }, [isInputs])
  const handleSubmit = (values?: any) => {
    // console.log("Values", values);
    setEmployee({ ...employee, ...values, ...inputs });
    setActive(2);
  };





  const handleOnChange = (input: string, value: any) => {
    setisInputs(!isInputs)
  };

  return (
    <div className={active === 1 ? "EssentialsContainer" : "d-none"}>
      <Formik
        enableReinitialize={true}
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
          // isInputs: isinputs,
          disability: "",
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
              <div className="testbox pb-5">
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
                        {/* <SelectField
                          label="Disability"
                          name="disability"
                          options={disabilityOptions}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue(
                              "isInputs",
                              formatToTrue(event?.target.value)
                            );
                          }}
                        /> */}
                        <label htmlFor="YES" style={{ marginBottom: "1rem" }}>Disability</label>
                        <div className="radio-contain">
                          <div style={{ marginRight: "2rem" }}>
                            <input type="radio" id="YES" name="name"
                              disabled={isInputs === true}
                              checked={isInputs === true}
                              // onChange={(event: any) => {
                              //   handleOnChange(
                              //     "disable",
                              //     formatToTrue(event?.target.checked)
                              //   )
                              // }}
                              onChange={(e) => handleOnChange("isInputs", e)}
                            />
                            <label htmlFor="YES">YES</label>
                          </div>

                          <div>
                            <input type="radio" id="NO" name="name"
                              disabled={isInputs === false}
                              checked={isInputs === false}
                              // onChange={(event: any) => {
                              //   handleOnChange(
                              //     "disable",
                              //     formatToTrue(event?.target.checked)
                              //   )
                              // }}
                              onChange={(e) => handleOnChange("isInputs", e)} />
                            <label htmlFor="NO">NO</label>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="imput-space" />
                    {isInputs ? (
                      <div className="col">
                        <div className="form-group">
                          <InputField
                            label="Enter Disability"
                            name="disability"
                            placeholder="Enter type of disability"
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
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
