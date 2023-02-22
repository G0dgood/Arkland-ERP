import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/Inputs/InputField";
import CustomInputField from "../../../components/Inputs/CustomInputField";
import { ProjectFormProps } from "../../../interfaces/project";
import ReactSelectField from "../../../components/Inputs/ReactSelectField";
import CountrySelectField from "../../../components/Inputs/CountrySelectField";
import { formatDate } from "../../../utils/formatDate";

const ProjectEssentials = ({
  active,
  project,
  setProject,
  setActive,
  department,
  team,
  teamLeads,
  bindSubmitForm,
}: ProjectFormProps) => {
  const validate = Yup.object().shape({
    name: Yup.string().required("Name of project is required"),
  });

  const handleSubmit = (values?: any) => {
    console.log("Values", values);
    setProject({ ...project, ...values });
    setActive(2);
  };
  return (
    <div className={active === 1 ? "EssentialsContainer" : "d-none"}>
      <Formik
        initialValues={{
          name: "",
          department: "",
          team: "",
          lead: "",
          description: "",
          location: "",
          lga: "",
          state: "",
          country: "",
          proposed_completion_date: "",
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
                          label="Project Name"
                          name="name"
                          placeholder="Enter name of project"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <ReactSelectField
                          label="Department"
                          name="department"
                          options={department}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue("department", event?.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <ReactSelectField
                          label="Team"
                          name="team"
                          options={team}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue("team", event?.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <ReactSelectField
                          label="Team Lead"
                          name="lead"
                          options={teamLeads}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue("lead", event?.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Description"
                          name="description"
                          placeholder="Enter project description"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Location"
                          name="location"
                          placeholder="Enter project location"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />

                    <div className="col">
                      <div className="form-group">
                        <CountrySelectField
                          className="agent-project__owner"
                          label="Country"
                          name="country"
                          placeholder="Select country"
                          onChange={(value: any) =>
                            setFieldValue("country", { value }.value.label)
                          }
                        />
                      </div>
                    </div>
                    <div className="imput-space" />

                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Enter State"
                          name="state"
                          placeholder="Enter project's state"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Local Government Area"
                          name="lga"
                          placeholder="Enter project's lga"
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
                          label="Proposed Completion Date"
                          name="proposed_completion_date"
                          onChange={(event: any) => {
                            setFieldValue(
                              "proposed_completion_date",
                              formatDate(event?.target.value)
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

export default ProjectEssentials;
