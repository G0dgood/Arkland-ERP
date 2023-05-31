import React from "react";
import Cookies from "js-cookie";
import { Modal } from "react-bootstrap";
import { SyncLoader } from "react-spinners";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import { FiEye, FiTrash2 } from "react-icons/fi";
// import { RiTodoLine } from "react-icons/ri";
import { Button } from "@mui/material";
// import { getRequestOptions } from "../../utils/auth/header";
import AddTodo from "../../components/Modals/AddTodo";
import { fireAlert } from "../../utils/Alert";
// import { useAppSelector } from "../../hooks/useDispatch";
// import { NoRecordFound } from "../../components/TableOptions";
import { useFetchTasks, useScheduleById } from "../../hooks/useSchedule";
import { DialogState } from "../../interfaces/base";
// import announcement from "../../assets/images/announcement.png";
import { MdOutlineClose } from "react-icons/md";
import DataService from "../../utils/dataService";

const Todos = ({ showDrawer, setShowDrawer }: any) => {
  const dataService = new DataService()
  const token = dataService.getToken()



  const [taskAction, setTaskAction] = React.useState([] as any);
  const [viewAction, setViewAction] = React.useState([] as any);
  // const [taskCreateShow, setTaskCreateShow] = React.useState(false);
  const [newTodoCreated, setNewTodoCreated] = React.useState(false);
  const [deleteShow, setDeleteShow] = React.useState(false);
  const [viewShow, setViewShow] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState<DialogState>({});
  const [showView, setShowView] = React.useState<DialogState>({});
  // error, message,
  const { tasks, isLoading, setLoading } =
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
  const handleNewTodoCreated = () => {
    setNewTodoCreated(!newTodoCreated);
  };
  const handleShow = () => {
    if (!showDrawer) {
      setShowDrawer(true);
    } else {
      setShowDrawer(!showDrawer);
    }
  };
  return (
    <div className="main-div-col-2">
      <div className="main-todo-1">
        <div className="main-todo-title">
          <h4>To Do</h4>
        </div>

        {isLoading ? (
          <div className="table-loader-announcement1">
            <SyncLoader color={"#990000"} loading={isLoading} />
          </div>
        ) : tasks?.length === 0 || tasks === undefined ? (
          <div className="table-loader-announcement1">
            <div>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src="https://img.icons8.com/external-outline-design-circle/66/null/external-Todo-List-shopping-and-ecommerce-outline-design-circle.png" />
              <p className="mt-3">No task found</p>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            {tasks?.length > 0 ? (
              <div>
                {tasks?.map((item: any, i: any) => (
                  <div
                    className="main-todo-Event"
                    style={{ borderRadius: "4px" }}
                    key={i}
                  >
                    <div className="main-todo-container">
                      <div className="main-todo-input">
                        <Checkbox />
                      </div>
                      <div>
                        <div> {item?.title}</div>
                        <div className="main-todo-input-time">
                          {moment(item?.expected_completion_date).format(
                            "DD-MMMM-YYYY"
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="FiTrash2"
                      style={{
                        display: "flex",
                      }}
                    >
                      <FiEye
                        size={25}
                        onClick={() => handleView(item?.id)}
                        cursor="pointer"
                        title="VIEW TODO"
                      />
                      <FiTrash2
                        size={25}
                        onClick={() => handleDelete(item?.id)}
                        cursor="pointer"
                        title="DELETE TODO"
                      />
                    </div>

                    {showView[item?.id] && (
                      <Modal
                        size="lg"
                        show={viewShow}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header>
                          <span>{/*  */}</span>
                          <span className="span-center-title">View Todo</span>
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
                              <p>{schedule?.priority}</p>
                              <p>NOTES</p>
                              <p>{schedule?.notes?.[0]?.text}</p>
                              <p>DATE OF COMPLETION</p>
                              <p>
                                {" "}
                                {moment(
                                  schedule?.expected_completion_date
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
                        centered >
                        <Modal.Header>
                          <span>{/*  */}</span>
                          <span className="span-center-title">Delete Task</span>
                          <Button style={{ color: "#fff" }} onClick={() => setDeleteShow(false)}>
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
                            onClick={() => setShowDialog({ [item?.id]: false })}
                          >
                            Cancel
                          </button>
                        </Modal.Footer>
                      </Modal>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>

      <div className="main-todo-2-btn">
        <Button variant="outlined" className="show-btn" onClick={handleShow}>
          Show All
        </Button>
        <AddTodo onNewTodoCreated={handleNewTodoCreated} />
      </div>
    </div>
  );
};

export default Todos;
