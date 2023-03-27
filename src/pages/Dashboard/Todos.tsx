import React, { CSSProperties } from "react";
import Cookies from "js-cookie";
import AddTodo from "../../components/Modals/AddTodo";
import Checkbox from "@material-ui/core/Checkbox";
import { FiTrash2 } from "react-icons/fi";
import { RiTodoLine } from "react-icons/ri";
import { Button } from "@mui/material";
import { getRequestOptions } from "../../utils/auth/header";
import { fireAlert } from "../../utils/Alert";
import { useAppSelector } from "../../hooks/useDispatch";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import { NoRecordFound } from "../../components/TableOptions";

const Todos = ({ showDrawer, setShowDrawer }: any) => {
  const token = Cookies.get("token");
  const [isLoading, setLoading] = React.useState(false);
  const [tasks, setTasks] = React.useState([] as any);
  const [taskAction, setTaskAction] = React.useState([] as any);
  const [error, setError] = React.useState<any>();
  const [message, setMessage] = React.useState("");
  const [taskCreateShow, setTaskCreateShow] = React.useState(false);
  const [newTodoCreated, setNewTodoCreated] = React.useState(false);


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
  }, [taskAction, newTodoCreated]);

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

        {
          isLoading ? (
            <div className="table-loader-announcement1">
              <SyncLoader
                color={"#990000"}
                loading={isLoading}
              />
            </div>
          ) : tasks?.length === 0 || tasks == null ? (
            <div className="table-loader-announcement1">
              {/* <RiTodoLine size={100} className="todo-RiTodoLine" /> */}
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
                    <div className="FiTrash2">
                      <FiTrash2
                        size={25}
                        onClick={() => deleteTask(item?.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
