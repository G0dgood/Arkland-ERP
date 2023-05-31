import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Form, Modal, Spinner } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { fireAlert } from "../../utils/Alert";

import { createAnnouncement, reset } from "../../features/Announcement/announcemetSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";


const CreateAnnouncementModal = () => {
  const dispatch = useAppDispatch();
  const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.announcement)
  const [lgShow, setLgShow] = useState(false);
  const [inputs, setInputs] = useState<any>({
    message: "",
    audience_scope: "",
  })

  const announcementOptions = [
    "general",
    "employee role",
    "team",
    "department",
    "project",
  ];

  // const [newAnnouncementCreated, setNewAnnouncementCreated] =
  //   React.useState(false);

  // const roles: any = useAppSelector((state) => state?.roles?.roles);
  // const availablleRoles = [] as any;

  // roles &&
  //   roles.forEach((role: any) =>
  //     availablleRoles.push({
  //       value: role?.id,
  //       label: role?.name,
  //     })
  //   );

  // const teams: any = useAppSelector((state) => state?.team?.team);
  // const availablleTeams = [] as any;

  // teams &&
  //   teams.forEach((team: any) =>
  //     availablleTeams.push({
  //       value: team?.id,
  //       label: team?.name,
  //     })
  //   );

  // const departments: any = useAppSelector(
  //   (state) => state?.department?.department
  // );
  // const availablleDepartments = [] as any;

  // departments &&
  //   departments.forEach((department: any) =>
  //     availablleDepartments.push({
  //       value: department?.id,
  //       label: department?.name,
  //     })
  //   );

  // const projects: any = useAppSelector((state) => state?.projects?.projects);
  // const availablleProject = [] as any;

  // projects &&
  //   projects.forEach((project: any) =>
  //     availablleProject.push({
  //       value: project?.id,
  //       label: project?.name,
  //     })
  //   );
  // const handleOptionChange = (event: any) => {
  //   setSelectedOption(event);
  //   return event;
  // };

  // const handleNewAnnouncementCreated = () => {
  //   setNewAnnouncementCreated(!newAnnouncementCreated);
  // };

  // const handleSubmit = async (values: any, { resetForm }: any) => {
  //   setLoading(true);
  //   console.log("values", values);

  //   const createAnnouncementValues = Object.entries(values)
  //     .filter(([key, value]) => value !== "")
  //     .reduce((acc, [key, value]) => {
  //       return {
  //         ...acc,
  //         [key]: value,
  //       };
  //     }, {});
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API}/hr/announcements`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify(createAnnouncementValues),
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     setLoading(false);
  //     if (response.ok) {
  //       const title = "Announcement created successfully.";
  //       const html = `Announcement created`;
  //       const icon = "success";
  //       fireAlert(title, html, icon);
  //       handleNewAnnouncementCreated();
  //       setLgShow(false);
  //       props.onNewAnnouncementCreated();
  //       resetForm(values);
  //       setLoading(false);
  //     } else {
  //       throw new Error(data.message || "Something went wrong!");
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     setLoading(false);
  //     const html = error.message || "Something went wrong!";
  //     const icon = "error";
  //     const title = "Announcement creation failed";
  //     fireAlert(title, html, icon);
  //   }
  // };

  const title = "Successful";
  const html = "Announcement Created!";
  const icon = "success";
  const title1 = "Announcement creation failed";
  const html1 = createmessage;
  const icon1 = "error";


  // useEffect(() => {
  //   if (createisSuccess) {
  //     fireAlert(title, html, icon);
  //     setInputs({
  //       message: "",
  //       audience_scope: ""
  //     })
  //     setLgShow(false)

  //     dispatch(reset());
  //   } else if (createisError) {
  //     fireAlert(title1, html1, icon1);
  //     dispatch(reset());
  //   }
  // }, [createisError, createisSuccess, dispatch, html, html1])

  const handleOnChange = (input: any, value: any) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const handleCreate = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(createAnnouncement(inputs));
  }



  return (
    <div>
      <Button
        variant="contained"
        className="Add-btn"
        onClick={() => setLgShow(true)} >
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

          <Form onSubmit={handleCreate}>
            <div className="Modal-Body">
              <div className="Modal-textarea-middle">
                <div className="col">
                  <div className="form-group">
                    <textarea rows={6} className='Modal-textarea' placeholder='Enter broadcast message'
                      value={inputs.message}
                      onChange={(e) => handleOnChange("message", e.target.value)} />
                  </div>


                </div>
              </div>
              <div className="modal-input-sub-space">
                <div className="col">
                  {/* <div className="form-group">
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
                        </div> */}
                </div>

                {/* {selectedOption === "employee role" && (
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
                      )} */}
                <select id="Modal-textarea-input-sub"

                  value={inputs.audience_scope}
                  onChange={(e) => handleOnChange("audience_scope", e.target.value)}>
                  <option>Select audience scope</option>
                  {announcementOptions?.map((employ: any) => (
                    <option key={employ} value={employ}>
                      {employ}
                    </option>
                  ))}
                </select >
              </div>

              <div className="btn-modal-container" >
                <Button
                  variant="contained"
                  className="Add-btn-modal"
                  type="submit"
                  disabled={createisLoading}
                >
                  {createisLoading ? <Spinner animation="border" /> : "Create"}
                </Button>
              </div>
            </div>
          </Form>

        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateAnnouncementModal;
