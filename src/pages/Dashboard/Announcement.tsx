import moment from "moment";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Spinner } from "react-bootstrap";
import SyncLoader from "react-spinners/SyncLoader";
import CreateAnnouncementModal from "../../components/Modals/CreateAnnouncementModal";
import { getUserPrivileges } from "../../functions/auth";
import { getAnnouncement } from "../../features/Announcement/announcemetSlice";
import ViewAnnouncementModal from "../../components/Modals/ViewAnnouncementModal";
import DeleteAnnouncementModal from "../../components/Modals/DeleteAnnouncementModal";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import ClockIn from "../../components/ClockIn";




const Announcement = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, createisSuccess, deleteisSuccess } = useAppSelector((state: any) => state.announcement)

  const {
    isHRHead,
    isHeadOfDepartment,
    isTeamLead,
    isSuperAdmin,
    isAdmin,
    isEmployee,
    isHrAdmin,
  } = getUserPrivileges();



  useEffect(() => {
    if (deleteisSuccess || createisSuccess) {
      // @ts-ignore
      dispatch(getAnnouncement());
    }
  }, [createisSuccess, deleteisSuccess, dispatch]);

  useEffect(() => {
    // @ts-ignore
    dispatch(getAnnouncement());
  }, [dispatch]);



  return (
    <div className="main-div-col-2-sub">
      <div className="Announcement-sub-1">
        <div className="Announcement-sub-text">
          <span className="sub-text-contained">
            <h4>Announcement</h4>
          </span>
        </div>
        {(isSuperAdmin ||
          isTeamLead ||
          isHeadOfDepartment ||
          isHRHead ||
          isHrAdmin) && (
            <div>
              <CreateAnnouncementModal

              />
            </div>
          )}
        <ClockIn />
      </div>
      <div>
        {isLoading ? (
          <div className="table-loader-announcement">
            <SyncLoader color={"#990000"} loading={isLoading} />
          </div>
        ) : data?.length === 0 || data === undefined ? (
          <div className="table-loader-announcement">
            <div>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src="https://img.icons8.com/external-others-phat-plus/64/000000/external-announcement-marketing-outline-others-phat-plus.png" />
              <p className="mt-3">No announcement found</p>
            </div>
          </div>
        ) : (
          <div className="Announcement-container">
            <div className="Announcement-sub-2">
              {data?.map((item: any, i: any) => (
                <div className="main-todo-Event" style={{ borderRadius: "4px" }} key={i}  >
                  <div className="main-todo-container">
                    <div className="main-todo-note">
                      <div>{item?.message?.slice(0, 65)}</div>
                      <div className="main-todo-note-minutes">
                        {moment.duration(moment().diff(item?.created_at)).humanize()}{" "} ago
                      </div>
                    </div>
                  </div>
                  <div className="FiTrash2">
                    <span>
                      <ViewAnnouncementModal id={item?._id} />
                    </span>
                    {(isSuperAdmin ||
                      isTeamLead ||
                      isHeadOfDepartment ||
                      isHRHead ||
                      isHrAdmin) && (
                        <span className="BsFillPinAngleFill">
                          <DeleteAnnouncementModal id={item?.id} />
                        </span>
                      )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
