import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineClose } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import Cookies from "js-cookie";
import { fireAlert } from "../../utils/Alert";
import InputField from "../Inputs/InputField";
import ReactSelectField from "../Inputs/ReactSelectField";

import TextAreaField from "../Inputs/TextAreaField";
import CountrySelectField from "../Inputs/CountrySelectField";
import CustomInputField from "../Inputs/CustomInputField";
import { formatDate } from "../../utils/formatDate";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { useNavigate } from "react-router-dom";
import { createProject, reset } from "../../features/Project/projectSlice";
import { allDepartments } from "../../features/Department/departmentSlice";

const CreateProjectModal = (props: any) => {
  const { data: departments } = useAppSelector((state: any) => state.department)
  const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.project)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validate = Yup.object().shape({
    name: Yup.string().required("Name of project is required"),
  });
  const [lgShow, setLgShow] = useState(false);


  useEffect(() => {
    // @ts-ignore
    dispatch(allDepartments());
  }, [dispatch]);


  useEffect(() => {
    if (createisSuccess) {
      fireAlert("Successful", "Project Created Successfully", "success");
      setLgShow(false)
      navigate(-1)
      dispatch(reset());
    } else if (createisError) {
      fireAlert("Project creation error", createmessage, "error");
      dispatch(reset());
    }
  }, [createisError, createisSuccess, createmessage, dispatch, navigate])




  const handleSubmit = async (values: any, { resetForm }: any) => {
    const inputs = { ...values };
    // @ts-ignore
    dispatch(createProject(inputs));
  };


  const availablleDepartments = [] as any;

  departments &&
    departments.forEach((team: any) =>
      availablleDepartments.push({
        value: team.id,
        label: team.name,
      })
    );
  // const teams: any = useAppSelector((state) => state.team.team);
  const availablleTeam = [] as any;

  // teams &&
  //   teams.forEach((team: any) =>
  //     availablleTeam.push({
  //       value: team.id,
  //       label: team.name,
  //     })
  //   );

  // const teamLeads: any = useAppSelector((state) => state.teamLeads.teamLeads);
  // const availablleTeamLeads = [] as any;

  // teamLeads &&
  //   teamLeads.forEach((team: any) =>
  //     availablleTeamLeads.push({
  //       value: team.id,
  //       label: team.name,
  //     })
  //   );
  return (
    <div>
      <Button
        className="subone-header-flex-btn"
        onClick={() => setLgShow(true)}
      >
        <BsPlusLg size={10} color="#fff" className="Create-plue-account" />{" "}
        Create Project
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <span></span>
          <span className="span-center-title">Create Project</span>
          <Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
            <MdOutlineClose size={28} />
          </Button>
        </Modal.Header>
        <Modal.Body>
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
            {({ setFieldValue }) => {
              return (
                <Form>
                  <div className="Modal-Body">
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Project Name"
                          name="name"
                          placeholder="Enter name of project"
                        />
                      </div>
                    </div>
                    <div
                      className="Modal-textarea-middle"
                      style={{
                        marginTop: "2rem",
                      }}
                    >
                      <div className="col">
                        <div className="form-group">
                          <TextAreaField
                            style={{
                              height: "12rem",
                              lineHeight: "1",
                            }}
                            label="Description"
                            name="description"
                            placeholder="Enter project description"
                            onChange={(event: any) => {
                              setFieldValue("description", event?.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="Modal-data-time">
                      <div className="Modal-two-input">
                        <div className="col">
                          <div className="form-group">
                            <ReactSelectField
                              label="Department"
                              name="department"
                              options={availablleDepartments}
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("department", event?.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="div-space" />
                      <div className="Modal-two-input">
                        <div className="col">
                          <div className="form-group">
                            {/* <ReactSelectField
                              label="Team"
                              name="team"
                              options={availablleTeam}
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("team", event?.value);
                              }}
                            /> */}
                          </div>
                        </div>
                      </div>
                      <div className="div-space" />
                      <div className="Modal-two-input">
                        <div className="col">
                          <div className="form-group">
                            {/* <ReactSelectField
                              label="Project lead"
                              name="lead"
                              options={availablleTeamLeads}
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("lead", event?.value);
                              }}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="Modal-data-time">
                      <div className="Modal-two-input">
                        <div className="col">
                          <div className="form-group">
                            <InputField
                              label="Location"
                              name="location"
                              placeholder="Enter project location"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="div-space" />
                      <div className="Modal-two-input">
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
                      </div>
                    </div>
                    <div className="Modal-data-time">
                      <div className="Modal-two-input">
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
                      <div className="div-space" />
                      <div className="Modal-two-input">
                        <div className="col">
                          <div className="form-group">
                            <InputField
                              label="Local Government Area"
                              name="lga"
                              placeholder="Enter project's lga"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Modal-textarea-middle">
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
                    <div className="btn-modal-container">
                      <Button
                        variant="contained"
                        className="Add-btn-modal"
                        type="submit"
                      >
                        {createisLoading ? (
                          <Spinner animation="border" />
                        ) : (
                          "Create Project"
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateProjectModal;
