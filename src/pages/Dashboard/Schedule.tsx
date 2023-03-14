import React, { CSSProperties } from "react";
import Cookies from "js-cookie";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "@mui/material";
import { SyncLoader } from "react-spinners";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import InputField from "../../components/Inputs/InputField";
import ReactSelectField from "../../components/Inputs/ReactSelectField";
import { getRequestOptions } from "../../utils/auth/header";
import { fireAlert } from "../../utils/Alert";
import { difficultyOptions, priorityOptions } from "../../functions/helpers";
import CustomInputField from "../../components/Inputs/CustomInputField";
import { formatDate } from "../../utils/formatDate";
import { useAppSelector } from "../../hooks/useDispatch";

const Schedule = () => {
  const token = Cookies.get("token");

  const [isLoading, setLoading] = React.useState(false);
  const [tasks, setTasks] = React.useState({} as any);
  const [taskAction, setTaskAction] = React.useState({} as any);
  const [error, setError] = React.useState<any>();
  const [message, setMessage] = React.useState("");
  const [taskCreateShow, setTaskCreateShow] = React.useState(false);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: "99.8%",
    borderRadius: "50px",
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseTasks = await fetch(
          `${process.env.REACT_APP_API}/tasks`,
          getRequestOptions
        );
        const isJsonResponseTasks = responseTasks.headers
          ?.get("content-type")
          ?.includes("application/json");
        const dataTasks = isJsonResponseTasks && (await responseTasks.json());
        if (!responseTasks.ok) {
          throw new Error(dataTasks.message || responseTasks.status);
        }
        setTasks(dataTasks.data);
        setLoading(false);
        setError(false);
        setMessage("");
      } catch (error: any) {
        setLoading(false);
        // setError(true);
        setMessage(error.message || "Something went wrong");
        setTimeout(() => {
          fetchData();
        }, 5000);
      }
    };
    fetchData();
  }, [taskAction]);

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
        value: employee?.id,
        label: employee?.full_name,
      })
    );
  return (
    <div className="main-div-col-2">
      <div className="main-todo-1">
        <div className="main-todo-title">
          <h4>Upcoming Schedule</h4> <span>Today, 21 Jun 2022</span>
        </div>

        {isLoading === true ? (
          <div
            style={{
              margin: "auto",
              width: "40%",
              alignItems: "center",
            }}
          >
            <SyncLoader
              cssOverride={override}
              color={"#990000"}
              loading={isLoading}
            />
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            {tasks?.length > 0 ? (
              <div className="Announcement-container">
                {tasks?.map((item: any, i: any) => (
                  <div className="Announcement-sub-2">
                    <div
                      className="main-todo-Event"
                      style={{ borderRadius: "4px" }}
                    >
                      <div className="main-todo-container">
                        <div
                          style={{
                            paddingLeft: "10px",
                          }}
                        >
                          <div>
                            {item.title} on{" "}
                            {moment(item?.expected_completion_date).format(
                              "DD-MMMM-YYYY"
                            )}{" "}
                          </div>

                          <div className="main-todo-input-time">
                            {" "}
                            {tasks.length > 0 ? item.notes[0]?.text : ""}
                          </div>
                        </div>
                      </div>
                      <div className="FiTrash2">
                        <FiTrash2
                          size={25}
                          onClick={() => deleteTask(item?.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div
                  className="main-todo-Event"
                  style={{ borderRadius: "4px" }}
                >
                  <div className="main-todo-container">
                    <div
                      style={{
                        paddingLeft: "10px",
                      }}
                    >
                      <div className="main-todo-input-time"> No task</div>
                    </div>
                  </div>
                </div>
              </div>
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
            <span className="span-center-title"> Create Task</span>
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
                          {isLoading ? "Please wait..." : "Create"}
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
