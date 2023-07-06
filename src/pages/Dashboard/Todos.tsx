import { BounceLoader } from "react-spinners";
import moment from "moment";
import { Button } from "@mui/material";
import ViewScheduleModal from "../../components/Modals/ViewScheduleModal";


const Todos = ({ showDrawer, setShowDrawer, tasks, isLoading }: any) => {



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
          <h6>To Do</h6>
        </div>

        {isLoading ? (
          <div className="table-loader-announcement1">
            <BounceLoader color={"#990000"} loading={isLoading} />
          </div>
        ) : tasks?.length === 0 || tasks === undefined ? (
          <div className="table-loader-announcement1">
            <div>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src="https://img.icons8.com/external-outline-design-circle/66/null/external-Todo-List-shopping-and-ecommerce-outline-design-circle.png" />
              <p className="mt-3">No task found</p>
            </div>
          </div>
        ) : (<div
          style={{ display: "grid", gridTemplateColumns: "1fr" }} >
          <div>
            {tasks?.map((item: any, i: any) => (
              <div
                className="main-todo-Event"
                style={{ borderRadius: "4px" }}
                key={i} >
                {/* <div className="main-todo-container">
                  <div className="main-todo-input">
                  </div>
                  <div>
                    <div> {item?.title}</div>
                    <div className="main-todo-input-time">
                      {moment(item?.expected_completion_date).format(
                        "DD-MMMM-YYYY"
                      )}
                    </div>
                  </div>
                </div> */}
                <div className="main-todo-container">
                  <div className="main-todo-note">
                    <div>{item?.title?.slice(0, 65)}</div>
                    <div className="main-todo-note-minutes">
                      {moment.duration(moment().diff(item?.created_at)).humanize()}{" "} ago
                    </div>
                  </div>
                </div>
                <div
                  className="FiTrash2"
                  style={{ display: "flex" }} >

                  <span style={{ marginRight: "1rem" }}>
                    < ViewScheduleModal id={item?.id} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>

      <div className="main-todo-2-btn">
        {/* <Button variant="outlined" className="show-btn" onClick={handleShow}>
          Show All
        </Button> */}
        {/* <AddTodo onNewTodoCreated={handleNewTodoCreated} /> */}
      </div>
    </div>
  );
};

export default Todos;
