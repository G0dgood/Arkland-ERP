import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

import { Spinner } from "react-bootstrap";
import InputField from "../../../components/Inputs/InputField";
import SelectField from "../../../components/Inputs/SelectField";
import {
  ACADEMIC_QUALIFICATIONS,
  categoryOptions,
  disabilityOptions,
  genderOptions,
  martialStatusOptions,
  workLocationOptions,
} from "../../../functions/helpers";
import ReactSelectField from "../../../components/Inputs/ReactSelectField";
import CustomInputField from "../../../components/Inputs/CustomInputField";
import { formatDate } from "../../../utils/formatDate";
import { typeOfEmploymentOptions } from "../../../functions/helpers";
import CountrySelectField from "../../../components/Inputs/CountrySelectField";
import { fireAlert } from "../../../utils/Alert";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { reset, updateEmployee } from "../../../features/Employee/employeeSlice";


const EditProfile = ({
  employee,
  salary,
  departmentOptions,
  roleOptions,
  id
}: any) => {
  const { updateemployeeisLoading, updateemployeeisSuccess } = useAppSelector((state: any) => state.employee)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (updateemployeeisSuccess) {
      dispatch(reset());
      fireAlert("Employee Update", "Employee Update Successful", "success");
      navigate("/employees");
    }
  }, [dispatch, navigate, updateemployeeisSuccess,]);


  const [disability, setDisability] = useState(false);
  const formatToTrue = (value?: any) => {
    if (value === "Yes") {
      setDisability(!false);
      return true;
    } else if (value === "No" || "Does employee have disability?") {
      setDisability(!true);
      return false;
    }
  };
  const [workLocations, setWorkLocations] = useState(false);
  const formatWorkLocations = (value?: any) => {
    if (value === "Yes") {
      setWorkLocations(!false);
      return true;
    } else if (value === "No" || "Do you have any work location objection?") {
      setWorkLocations(!true);
      return false;
    }
  };

  const handleSubmit = (values: any) => {
    const inputs = { ...values }
    const input = { inputs: inputs, id: id }
    dispatch(updateEmployee(input));
  }



  return (
    <div>

      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          gender: "",
          institution_attended: "",
          course_studied: "",
          qualification: "",
          department: "",
          role: "",

          bank_name: "",
          bank_account_number: "",
          bank_account_name: "",
          basic_salary: "",
          meal_allowance: "",
          utility_allowance: "",
          medical_allowance: "",
          housing_allowance: "",
          transportation_allowance: "",

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
          work_location_objection: false,
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
        }}
        onSubmit={handleSubmit}
      >
        {({ values, submitForm, setFieldValue }) => {
          return (
            <Form id="my-form">
              <div className="form-cont">
                <form>
                  <div className="profile-form-form">
                    <div className="form-grp">
                      <InputField
                        label="First Name"
                        name="first_name"
                        placeholder="Enter first name"
                        defaultValue={
                          employee?.first_name || values.first_name
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Last Name"
                        name="last_name"
                        placeholder="Enter last name"
                        defaultValue={employee?.last_name || values.last_name}
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Email"
                        name="email"
                        placeholder="Enter email"
                        defaultValue={employee?.email || values.email}
                      />
                    </div>
                  </div>
                  <div className="profile-form-form">
                    <div className="form-grp">
                      <PhoneInput
                        value={employee?.phone || values.phone}
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
                    <div className="form-grp">
                      <SelectField
                        label="Gender"
                        name="gender"
                        options={genderOptions}
                        className="form-group__gender"
                        onChange={(event: any) => {
                          setFieldValue("gender", event?.target.value);
                        }}
                        defaultValue={employee?.gender || values.gender}
                      />
                    </div>
                    <div className="form-grp">
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
                    <div className="form-grp">
                      <CustomInputField
                        type="number"
                        label="NIN"
                        name="nin"
                        placeholder="Enter National Identity Number"
                        onChange={(event: any) => {
                          setFieldValue("nin", event?.target.value);
                        }}
                        defaultValue={employee?.nin || values.nin}
                      />
                    </div>
                    <div className="form-grp">
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
                        defaultValue={
                          employee?.marital_status || values.marital_status
                        }
                      />
                    </div>
                  </div>
                  <div className="profile-form-form">
                    <div className="form-grp">
                      <InputField
                        label="Institution Attended"
                        name="institution_attended"
                        placeholder="Enter Institution Attended"
                        defaultValue={
                          employee?.institution_attended ||
                          values.institution_attended
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Course Studied"
                        name="course_studied"
                        placeholder="Enter Course Studied"
                        defaultValue={
                          employee?.course_studied || values.course_studied
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <SelectField
                        label="Qualification"
                        name="qualification"
                        options={ACADEMIC_QUALIFICATIONS}
                        className="form-group__gender"
                        onChange={(event: any) => {
                          setFieldValue("qualification", event?.target.value);
                        }}
                        defaultValue={
                          employee?.qualification || values.qualification
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <ReactSelectField
                        options={departmentOptions}
                        label="Department"
                        name="department"
                        className="form-group__gender"
                        onChange={(event: any) => {
                          setFieldValue("department", event?.value);
                        }}
                      />
                    </div>
                    <div className="form-grp">
                      <ReactSelectField
                        label="Role"
                        name="role"
                        options={roleOptions}
                        className="form-group__gender"
                        onChange={(event: any) => {
                          setFieldValue("role", event?.value);
                        }}
                      />
                    </div>
                    <div className="form-grp">
                      <SelectField
                        label="Staff Category"
                        name="category"
                        options={categoryOptions}
                        className="form-group__gender"
                        onChange={(event: any) => {
                          setFieldValue("category", event?.target.value);
                        }}
                        defaultValue={employee?.category || values.category}
                      />
                    </div>
                  </div>
                  <div className="profile-form-form">
                    <div className="form-grp">
                      <InputField
                        label="Bank Name"
                        name="bank_name"
                        placeholder="Enter bank name"
                        defaultValue={salary?.bank_name || values.bank_name}
                      />
                    </div>

                    <div className="form-grp">
                      <CustomInputField
                        type="number"
                        maxLength={10}
                        label="Bank Account Number"
                        name="bank_account_number"
                        placeholder="Enter bank account number"
                        onChange={(event: any) => {
                          setFieldValue(
                            "bank_account_number",
                            event?.target.value
                          );
                        }}
                        defaultValue={
                          salary?.bank_account_number ||
                          values.bank_account_number
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Bank Account Name"
                        name="bank_account_name"
                        placeholder="Enter bank account name"
                        defaultValue={
                          salary?.bank_account_name ||
                          values.bank_account_name
                        }
                      />
                    </div>
                  </div>

                  <div className="profile-form-form">
                    <div className="form-grp">
                      <InputField
                        label="Next of Kin"
                        name="next_of_kin"
                        placeholder="Enter name of next of kin"
                        defaultValue={
                          employee?.next_of_kin || values.next_of_kin
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <PhoneInput
                        value={
                          employee?.next_of_kin_phone ||
                          values.next_of_kin_phone
                        }
                        inputProps={{
                          name: "next_of_kin_phone",
                          required: true,
                        }}
                        inputStyle={{
                          background: "4f269f",
                          height: "40px",
                          width: "100%",
                          maxWidth: "31.25rem",
                        }}
                        specialLabel="Next of Kin Phone Number"
                        inputClass="w-100"
                        containerClass="mb-3 agent-project__owner"
                        onChange={(telephone) =>
                          setFieldValue(
                            "next_of_kin_phone",
                            `${"+" + telephone}`
                          )
                        }
                        country={"ng"}
                        placeholder="Enter Next of Kin Phone Number"
                        defaultErrorMessage="required"
                        enableSearch={true}
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Next of Kin Email"
                        name="next_of_kin_email"
                        placeholder="Enter email of next of kin"
                        defaultValue={
                          employee?.next_of_kin_email ||
                          values.next_of_kin_email
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Next of Kin Address"
                        name="next_of_kin_address"
                        placeholder="Enter home address of next of kin"
                        defaultValue={
                          employee?.next_of_kin_address ||
                          values.next_of_kin_address
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Referee Name"
                        name="referee_name"
                        placeholder="Enter referee name"
                        defaultValue={
                          employee?.referee_name || values.referee_name
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <PhoneInput
                        value={
                          employee?.referee_phone || values.referee_phone
                        }
                        inputProps={{
                          name: "referee_phone",
                          required: true,
                        }}
                        inputStyle={{
                          background: "4f269f",
                          height: "40px",
                          width: "100%",
                          maxWidth: "31.25rem",
                        }}
                        specialLabel="Referee Phone Number"
                        inputClass="w-100"
                        containerClass="mb-3 agent-project__owner"
                        onChange={(telephone) =>
                          setFieldValue("referee_phone", `${"+" + telephone}`)
                        }
                        country={"ng"}
                        placeholder="Enter Referee Phone Number"
                        defaultErrorMessage="required"
                        enableSearch={true}
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Emergency Contact Name"
                        name="emergency_contact_name"
                        placeholder="Enter name of emergency contact"
                        defaultValue={
                          employee?.emergency_contact_name ||
                          values.emergency_contact_name
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <PhoneInput
                        value={
                          employee?.emergency_contact_phone ||
                          values.emergency_contact_phone
                        }
                        inputProps={{
                          name: "emergency_contact_phone",
                          required: true,
                        }}
                        inputStyle={{
                          background: "4f269f",
                          height: "40px",
                          width: "100%",
                          maxWidth: "31.25rem",
                        }}
                        specialLabel="Emergency Contact Phone"
                        inputClass="w-100"
                        containerClass="mb-3 agent-project__owner"
                        onChange={(telephone) =>
                          setFieldValue(
                            "emergency_contact_phone",
                            `${"+" + telephone}`
                          )
                        }
                        country={"ng"}
                        placeholder="Enter phone number of emergency contact"
                        defaultErrorMessage="required"
                        enableSearch={true}
                      />
                    </div>
                  </div>

                  <div className="profile-form-form">
                    <div className="form-grp">
                      <SelectField
                        label="Does Employee have disability"
                        name="has_disability"
                        options={disabilityOptions}
                        className="form-group__gender"
                        onChange={(event: any) => {
                          setFieldValue(
                            "has_disability",
                            formatToTrue(event?.target.value)
                          );
                        }}
                        defaultValue={
                          employee?.emergency_contact_name ||
                          values.emergency_contact_name
                        }
                      />
                    </div>
                    {disability ? (
                      <div className="form-grp">
                        <InputField
                          label="Enter Disability"
                          name="disability"
                          placeholder="Enter type of disability"
                          defaultValue={
                            employee?.disability || values.disability
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="form-grp">
                      <SelectField
                        label="Work Location Objection"
                        name="has_work_location_objection"
                        options={workLocationOptions}
                        className="form-group__gender"
                        onChange={(event: any) => {
                          setFieldValue(
                            "has_work_location_objection",
                            formatWorkLocations(event?.target.value)
                          );
                        }}
                        defaultValue={
                          employee?.has_work_location_objection ||
                          values.has_work_location_objection
                        }
                      />
                    </div>
                    {workLocations ? (
                      <div className="form-grp">
                        <InputField
                          label="Enter work location objection"
                          name="work_location_objection"
                          placeholder="Enter work location object"
                          defaultValue={
                            employee?.work_location_objection ||
                            values.work_location_objection
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="form-grp">
                      <CustomInputField
                        style={{
                          lineHeight: 1,
                        }}
                        type="date"
                        label="Employment Date"
                        name="employment_date"
                        onChange={(event: any) => {
                          setFieldValue(
                            "employment_date",
                            formatDate(event?.target.value)
                          );
                        }}
                        defaultValue={
                          employee?.employment_date || values.employment_date
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <SelectField
                        label="Employment Type"
                        name="employment_type"
                        options={typeOfEmploymentOptions}
                        className="form-group__gender"
                        onChange={(event: any) => {
                          setFieldValue(
                            "employment_type",
                            event?.target.value
                          );
                        }}
                        defaultValue={
                          employee?.employment_type || values.employment_type
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <CustomInputField
                        type="number"
                        label="Employment Duration (Months)"
                        name="employment_duration"
                        placeholder="Enter duration of employment"
                        onChange={(event: any) => {
                          setFieldValue(
                            "employment_duration",
                            event?.target.value
                          );
                        }}
                        defaultValue={
                          employee?.employment_duration ||
                          values.employment_duration
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Employment ID"
                        name="employee_id"
                        placeholder="Enter employment ID"
                        defaultValue={
                          employee?.employee_id || values.employee_id
                        }
                      />
                    </div>
                  </div>
                  <div className="profile-form-form">
                    <div className="form-grp">
                      <InputField
                        label="Tally Number"
                        name="tally_number"
                        placeholder="Enter tally number"
                        defaultValue={
                          employee?.tally_number || values.tally_number
                        }
                      />
                    </div>

                    <div className="form-grp">
                      <CountrySelectField
                        className="agent-project__owner"
                        label="Country"
                        name="country"
                        placeholder="Select country"
                        onChange={(value: any) =>
                          setFieldValue("country", { value }.value.label)
                        }
                        defaultValue={employee?.country || values.country}
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="State of Origin"
                        name="state_of_origin"
                        placeholder="Enter state of origin"
                        defaultValue={
                          employee?.state_of_origin || values.state_of_origin
                        }
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Employee Address"
                        name="address"
                        placeholder="Enter employee's address"
                        defaultValue={employee?.address || values.address}
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="City"
                        name="city"
                        placeholder="Enter employee's city"
                        defaultValue={employee?.city || values.city}
                      />
                    </div>
                    <div className="form-grp">
                      <InputField
                        label="Zip Code"
                        name="zip_code"
                        placeholder="Enter employee's zip code"
                        defaultValue={employee?.zip_code || values.zip_code}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="form_btn">
                <Button
                  variant="outlined"
                  type="submit"
                  className={"Add-btn-edit"}
                >
                  {updateemployeeisLoading ? <Spinner animation="border" /> : "Update"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>

    </div>
  );
};

export default EditProfile;
