import React, { useEffect } from "react";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import { getUserPrivileges } from "../../functions/auth";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import ViewAnnouncementModal from "../../components/Modals/ViewAnnouncementModal";
import ClockIn from "../../components/ClockIn";
import { getAnnouncement } from "../../features/Announcement/announcemetSlice";



const AdminAnnouncement = () => {
  const dispatch = useAppDispatch();
  const { data: announcements, isLoading } = useAppSelector((state: any) => state.announcement)

  useEffect(() => {
    if (!announcements) {
      dispatch(getAnnouncement());
    }
  }, [announcements, dispatch]);


  // const {
  //   isHRHead,
  //   isHeadOfDepartment,
  //   isTeamLead,
  //   isSuperAdmin,
  //   isAdmin,
  //   // isEmployee,
  //   isHrAdmin,
  // } = getUserPrivileges();




  return (
    <div className="admin-main-div-col-2-sub">
      <div className="Announcement-sub-1">
        <div className="Announcement-sub-text">
          <span className="sub-text-contained">
            <h4>Announcement</h4>
          </span>
        </div>
        {/* <Button
          variant="contained"
          className="Add-btn" */}
        {/* // onClick={() => handleSubmit()}
        // > */}
        {/* {clockInLoading ? <Spinner animation="border" /> : " Clock in"} */}
        {/* </Button> */}
        <ClockIn />
      </div>

      <div>
        {isLoading ? (
          <div className="table-loader-announcement">
            <SyncLoader color={"#990000"} loading={isLoading} />
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
                <div className="Announcement-sub-2">
                  <div className="main-todo-Event" style={{ borderRadius: "4px" }} >
                    <div className="main-todo-container">
                      <div className="main-todo-note">
                        <div>{item.message}</div>
                        <div className="main-todo-note-minutes">
                          {" "}
                          {moment
                            .duration(moment().diff(item.created_at))
                            .humanize()}{" "}
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

      {/* <Button variant="outlined" className="show-btn-schedule">
        See All Announcement
      </Button> */}
    </div>
  );
};

export default AdminAnnouncement;
