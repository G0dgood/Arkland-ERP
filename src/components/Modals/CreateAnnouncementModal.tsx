import React, { useState } from "react";
import { Button } from "@mui/material";
import { Modal, Spinner } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { fireAlert } from "../../utils/Alert";
import { useAppSelector } from "../../hooks/useDispatch";
import ReactSelectField from "../Inputs/ReactSelectField";
import TextAreaField from "../Inputs/TextAreaField";
import CustomSelectField from "../Inputs/CustomSelectField";

const token = Cookies.get("token");
const CreateAnnouncementModal = (props: any) => {
  const [lgShow, setLgShow] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const announcementOptions = [
    "Select audience scope",
    "general",
    // "user role",
    "employee role",
    "team",
    "department",
    "project",
  ];

  const [newAnnouncementCreated, setNewAnnouncementCreated] =
    React.useState(false);

  const roles: any = useAppSelector((state) => state?.roles?.roles);
  const availablleRoles = [] as any;

  roles &&
    roles.forEach((role: any) =>
      availablleRoles.push({
        value: role?.id,
        label: role?.name,
      })
    );

  const teams: any = useAppSelector((state) => state?.team?.team);
  const availablleTeams = [] as any;

  teams &&
    teams.forEach((team: any) =>
      availablleTeams.push({
        value: team?.id,
        label: team?.name,
      })
    );

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

  const projects: any = useAppSelector((state) => state?.projects?.projects);
  const availablleProject = [] as any;

  projects &&
    projects.forEach((project: any) =>
      availablleProject.push({
        value: project?.id,
        label: project?.name,
      })
    );
  const handleOptionChange = (event: any) => {
    setSelectedOption(event);
    return event;
  };

  const handleNewAnnouncementCreated = () => {
    setNewAnnouncementCreated(!newAnnouncementCreated);
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    console.log("values", values);

    const createAnnouncementValues = Object.entries(values)
      .filter(([key, value]) => value !== "")
      .reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: value,
        };
      }, {});
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/announcements`,
        {
          method: "POST",
          body: JSON.stringify(createAnnouncementValues),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const title = "Announcement created successfully.";
        const html = `Announcement created`;
        const icon = "success";
        fireAlert(title, html, icon);
        handleNewAnnouncementCreated();
        setLgShow(false);
        props.onNewAnnouncementCreated();
        resetForm(values);
        setLoading(false);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Announcement creation failed";
      fireAlert(title, html, icon);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        className="Add-btn"
        onClick={() => setLgShow(true)}
      >
        Create Announcement
      </Button>

      <Modal
        size="lg"
        show={lgShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <span></span>
          <span className="span-center-title">Create Announcement</span>
          <Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
            <MdOutlineClose size={28} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              message: "",
              audience_scope: "",
              employee_role: "",
              team: "",
              department: "",
              project: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue, submitForm }) => {
              return (
                <Form>
                  <div className="Modal-Body">
                    <div className="Modal-textarea-middle">
                      <div className="col">
                        <div className="form-group">
                          <TextAreaField
                            style={{
                              height: "8rem",
                              lineHeight: "1",
                            }}
                            type="textarea"
                            label="Enter broadcast message"
                            name="message"
                            placeholder="Enter broadcast message"
                            onChange={(event: any) => {
                              setFieldValue("message", event?.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-input-sub-space">
                      <div className="col">
                        <div className="form-group">
                          <CustomSelectField
                            options={announcementOptions}
                            label="Select audience"
                            name="audience_scope"
                            className="form-group__gender"
                            onChange={(event: any) => {
                              const newValue = handleOptionChange(
                                event?.target.value
                              );
                              setFieldValue("audience_scope", newValue);
                            }}
                            values={values.audience_scope}
                          />
                        </div>
                      </div>

                      {selectedOption === "employee role" && (
                        <div className="col">
                          <div className="form-group">
                            <ReactSelectField
                              label="Select employee role to receive message"
                              name="employee_role"
                              options={availablleRoles}
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("employee_role", event?.value);
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {selectedOption === "team" && (
                        <div className="col">
                          <div className="form-group">
                            <ReactSelectField
                              label="Select team to receive message"
                              name="team"
                              options={availablleTeams}
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("team", event?.value);
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {selectedOption === "department" && (
                        <div className="col">
                          <div className="form-group">
                            <ReactSelectField
                              label="Select department to receive message"
                              name="department"
                              options={availablleDepartments}
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("department", event?.value);
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {selectedOption === "project" && (
                        <div className="col">
                          <div className="form-group">
                            <ReactSelectField
                              label="Select project to receive message"
                              name="project"
                              options={availablleProject}
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("project", event?.value);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="btn-modal-container">
                      <Button
                        variant="contained"
                        className="Add-btn-modal"
                        type="submit"
                      >
                        {loading ? <Spinner animation="border" /> : "Create"}
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

export default CreateAnnouncementModal;
