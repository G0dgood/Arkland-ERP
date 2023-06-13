import { BounceLoader } from "react-spinners";
import moment from "moment";
import { getUserPrivileges } from "../../functions/auth";
import ViewScheduleModal from "../../components/Modals/ViewScheduleModal";

const Schedule = ({ tasks, isLoading }: any) => {


  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin, isTeamLead } = getUserPrivileges();




  return (
    <div className="main-div-col-2">
      <div className="main-todo-1">
        <div className="main-todo-title">
          <h6>{"UPCOMING ToDos"}</h6>
          <span>Today, {moment(Date.now()).format("DD-MMMM-YYYY")}</span>
        </div>

        {isLoading ? (
          <div className="table-loader-announcement1">
            <BounceLoader color={"#990000"} loading={isLoading} />
          </div>
        ) : tasks?.length === 0 || tasks === undefined || tasks === null ? (
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
                  <div key={i}>
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

                      <div className="FiTrash2" style={{ display: "flex", paddingRight: "10px" }} >
                        < ViewScheduleModal id={item?.id} />


                      </div>


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

    </div>
  );
};

export default Schedule;
