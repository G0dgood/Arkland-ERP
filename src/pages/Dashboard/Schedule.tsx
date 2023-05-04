import React, { CSSProperties } from "react";
import Cookies from "js-cookie";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { Button } from "@mui/material";
import { SyncLoader } from "react-spinners";
import moment from "moment";
import { Modal, Spinner } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import InputField from "../../components/Inputs/InputField";
import ReactSelectField from "../../components/Inputs/ReactSelectField";
import { fireAlert } from "../../utils/Alert";
import { difficultyOptions, priorityOptions } from "../../functions/helpers";
import CustomInputField from "../../components/Inputs/CustomInputField";
import { formatDate } from "../../utils/formatDate";
import { useAppSelector } from "../../hooks/useDispatch";
import { useFetchTasks, useScheduleById } from "../../hooks/useSchedule";
import { DialogState } from "../../interfaces/base";
import { getUserPrivileges } from "../../functions/auth";
import { checkForOptions } from "../../utils/checkForName";

const Schedule = () => {
  const token = Cookies.get("token");
  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin, isTeamLead } =
    getUserPrivileges();

  const [taskAction, setTaskAction] = React.useState({} as any);
  const [viewAction, setViewAction] = React.useState([] as any);
  const [taskCreateShow, setTaskCreateShow] = React.useState(false);
  const [viewShow, setViewShow] = React.useState(false);

  const [deleteShow, setDeleteShow] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState<DialogState>({});
  const [showView, setShowView] = React.useState<DialogState>({});

  const { tasks, isLoading, error, message, setLoading } =
    useFetchTasks(taskAction);

  const { schedule, isScheduleLoading } = useScheduleById(viewAction);

  const handleDelete = (id: any) => {
    setShowDialog({ [id]: true });
    setDeleteShow(true);
  };
  const handleView = (id: any) => {
    setViewAction([id]);
    setShowView({ [id]: true });
    setViewShow(true);
  };
  const deleteTask = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const title = "Task deleted.";
        const html = `Task deleted`;
        const icon = "success";
        fireAlert(title, html, icon);
        setTaskAction(true);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Task deletion failed";
      fireAlert(title, html, icon);
    }
  };
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);

    const createTaskValues = { ...values };
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/tasks`, {
        method: "POST",
        body: JSON.stringify(createTaskValues),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const title = "Task created successfully.";
        const html = `Task created`;
        const icon = "success";
        fireAlert(title, html, icon);
        setTaskAction(true);

        setTaskCreateShow(false);
        resetForm(values);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Task creation failed";
      fireAlert(title, html, icon);
    }
  };

  const employees: any = useAppSelector((state) => state?.employees?.employees);
  const availablleEmployees = [] as any;

  employees &&
    employees.forEach((employee: any) =>
      availablleEmployees.push({
        value: employee?.user,
        label: employee?.full_name,
      })
    );
  return (
    <div className="main-div-col-2">
      <div className="main-todo-1">
        <div className="main-todo-title">
          <h6>{"UPCOMING SCHEDULE"}</h6>
          <span>Today, {moment(Date.now()).format("DD-MMMM-YYYY")}</span>
        </div>

        {isLoading === true ? (
          <div className="table-loader-announcement1">
            <SyncLoader color={"#990000"} loading={isLoading} />
          </div>
        ) : tasks?.length === 0 || tasks == null ? (
          <div className="table-loader-announcement1">
            <div>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src="https://img.icons8.com/external-outline-design-circle/66/null/external-Todo-List-shopping-and-ecommerce-outline-design-circle.png" />
              <p className="mt-3">No schedule found</p>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
            {tasks?.length > 0 ? (
              <div className="Announcement-container">
                {tasks?.map((item: any, i: any) => (
                  <div className="Announcement-sub-2" key={i}>
                    <div className="main-todo-Event" style={{ borderRadius: "4px" }} >
                      <div className="main-todo-container">
                        <div style={{ paddingLeft: "10px" }} >
                          <div className="main-todo-input-title"> {item?.title} due by{" "}
                            {moment(item?.expected_completion_date).format("DD-MMMM-YYYY")}{" "}
                          </div>

                          <div className="main-todo-input-time">
                            {tasks && tasks?.length > 0
                              ? item?.notes[0]?.text
                              : ""}
                          </div>
                        </div>
                      </div>

                      <div className="FiTrash2" style={{ display: "flex", }} >

                        <FiEye
                          size={20}
                          onClick={() => handleView(item?.id)}
                          cursor="pointer"
                          title="VIEW TODO"
                        />
                        {(isHRHead ||
                          isSuperAdmin ||
                          isAdmin ||
                          isHrAdmin ||
                          isTeamLead) && (
                            <FiTrash2
                              size={20}
                              onClick={() => handleDelete(item?.id)}
                              cursor="pointer"
                              title="DELETE TODO"
                            />
                          )}
                      </div>
                      {showView[item?.id] && (
                        <Modal
                          size="lg"
                          show={viewShow}
                          aria-labelledby="contained-modal-title-vcenter"
                          centered >

                          <Modal.Header>
                            <span></span>
                            <span className="span-center-title">View Schedule</span>
                            <Button style={{ color: "#fff" }} onClick={() => setViewShow(false)}>
                              <MdOutlineClose size={28} />
                            </Button>
                          </Modal.Header>

                          <Modal.Body>
                            {isScheduleLoading === true ? (
                              <div className="table-loader-announcement1">
                                <SyncLoader
                                  color={"#990000"}
                                  loading={isScheduleLoading}
                                />
                              </div>
                            ) : (
                              <div className="getjob-application-details">
                                <p>ASSIGNED TO</p>
                                <p>{schedule?.assigned_to?.full_name}</p>
                                <p>TITLE</p>
                                <p>{schedule?.title}</p>
                                <p>STATUS</p>
                                <p>{schedule?.status}</p>
                                <p>PRIORITY</p>
                                <p>
                                  {checkForOptions(
                                    schedule?.priority,
                                    priorityOptions
                                  )}
                                </p>
                                <p>NOTES</p>
                                <p>{schedule?.notes?.[0].text}</p>
                                <p>DATE OF COMPLETION</p>
                                <p>
                                  {" "}
                                  {moment(schedule?.expected_completion_date
                                  ).format("DD-MMMM-YYYY")}
                                </p>
                              </div>
                            )}
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              className="btn btn-secondary"
                              onClick={() => setShowView({ [item?.id]: false })}
                            >
                              Cancel
                            </button>
                          </Modal.Footer>
                        </Modal>
                      )}
                      {showDialog[item?.id] && (
                        <Modal
                          size="lg"
                          show={deleteShow}
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton id="displayTermination">
                            <Modal.Title>Delete Task</Modal.Title>
                            <Button
                              style={{ color: "#fff" }}
                              onClick={() => setDeleteShow(false)}
                            >
                              <MdOutlineClose size={28} />
                            </Button>
                          </Modal.Header>
                          <Modal.Body>
                            <p>Are you sure you want to delete this task?</p>
                            <p>{item?.title}</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                deleteTask(item?.id);
                                setShowDialog({ [item?.id]: false });
                              }}
                            >
                              Yes
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() =>
                                setShowDialog({ [item?.id]: false })
                              }
                            >
                              Cancel
                            </button>
                          </Modal.Footer>
                        </Modal>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <Button
        variant="outlined"
        className="show-btn-schedule"
        onClick={() => setTaskCreateShow(true)}
      >
        Create a New Schedule
      </Button>
      <div>
        <Modal
          size="lg"
          show={taskCreateShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <span></span>
            <span className="span-center-title">Create Task</span>
            <Button
              style={{ color: "#fff" }}
              onClick={() => setTaskCreateShow(false)}
            >
              <MdOutlineClose size={28} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                title: "",
                assigned_to: "",
                points: "",
                priority: "",
                expected_completion_date: "",
                note: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => {
                return (
                  <Form>
                    <div className="Modal-Body">
                      <div className="col">
                        <div className="form-group">
                          <InputField
                            label="Title"
                            placeholder="Enter task title"
                            name="title"
                            className="form-group__gender"
                            onChange={(event: any) => {
                              setFieldValue("title", event?.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="Modal-textarea-middle">
                        <div className="col">
                          <div className="form-group">
                            <InputField
                              label="Note"
                              placeholder="Enter task note"
                              name="note"
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("note", event?.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-input-sub-space">
                        <div className="col">
                          <div className="form-group">
                            <ReactSelectField
                              options={priorityOptions}
                              label="How important is this task?"
                              name="priority"
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("priority", event?.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-input-sub-space">
                        <div className="col">
                          <div className="form-group">
                            <ReactSelectField
                              options={difficultyOptions}
                              label="How difficult is this task?"
                              name="points"
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("points", event?.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-input-sub-space">
                        <div className="col">
                          <div className="form-group">
                            <ReactSelectField
                              options={availablleEmployees}
                              label="Who is this task assigned to?"
                              name="assigned_to"
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("assigned_to", event?.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-input-sub-space">
                        <div className="col">
                          <div className="form-group">
                            <CustomInputField
                              style={{
                                lineHeight: 1,
                              }}
                              type="date"
                              label="Proposed Completion Date"
                              name="expected_completion_date"
                              onChange={(event: any) => {
                                setFieldValue(
                                  "expected_completion_date",
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
                          {isLoading ? (
                            <Spinner animation="border" />
                          ) : (
                            "Create"
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
    </div>
  );
};

export default Schedule;
