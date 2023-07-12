import moment from "moment";
import { BounceLoader } from "react-spinners";
import ViewAnnouncementModal from "../../components/Modals/ViewAnnouncementModal";
import ClockIn from "../../components/ClockIn";



const AdminAnnouncement = ({ announcements, isLoading }: any) => {




  return (
    <div className="admin-main-div-col-2-sub">
      <div className="Announcement-sub-1">
        <div className="Announcement-sub-text">
          <h5>Announcement</h5>
        </div>
        <ClockIn />
      </div>

      <div>
        {isLoading ? (
          <div className="table-loader-announcement">
            <BounceLoader color={"#990000"} loading={isLoading} />
          </div>
        ) : announcements?.length === 0 || announcements == null ? (
          <div className="table-loader-announcement">
            <div>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src="https://img.icons8.com/external-others-phat-plus/64/000000/external-announcement-marketing-outline-others-phat-plus.png" />
              <p className="mt-3">No announcement found</p>
            </div>
          </div>
        ) : (
          <>
            <div className="Admin-Announcement-container">
              {announcements?.map((item: any, i: any) => (
                <div className="Announcement-sub-2" key={i}>
                  <div className="main-todo-Event" style={{ borderRadius: "4px" }} >
                    <div className="main-todo-container">
                      <div className="main-todo-note">
                        <div>{item.message.slice(0, 80) + "..."}</div>
                        <div className="main-todo-note-minutes">
                          {moment.duration(moment().diff(item.created_at)).humanize()}{" "}
                          ago
                        </div>
                      </div>
                    </div>
                    <div className="FiTrash2">
                      <span>
                        <ViewAnnouncementModal id={item?._id} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* <Button variant="outlined" className="show-btn-schedule" onClick={() => navigate("/announcements")}>
        See All Announcement
      </Button> */}
    </div>
  );
};

export default AdminAnnouncement;
