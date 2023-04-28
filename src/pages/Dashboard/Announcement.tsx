import moment from "moment";
import React, { CSSProperties } from "react";
import { Button } from "@mui/material";

import { BsFillPinAngleFill, BsThreeDots } from "react-icons/bs";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { Modal, Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import { MdOutlineClose } from "react-icons/md";
import SyncLoader from "react-spinners/SyncLoader";
import CreateAnnouncementModal from "../../components/Modals/CreateAnnouncementModal";
import { getRequestOptions } from "../../utils/auth/header";
import { getUserPrivileges } from "../../functions/auth";
import { fireAlert } from "../../utils/Alert";
import { DialogState } from "../../interfaces/base";
import { useAnnouncementsById } from "../../hooks/useAnnouncements";
const token = Cookies.get("token");

const Announcement = () => {
  const {
    isHRHead,
    isHeadOfDepartment,
    isTeamLead,
    isSuperAdmin,
    isAdmin,
    isEmployee,
    isHrAdmin,
  } = getUserPrivileges();

  const [announcements, setAnnouncements] = React.useState([] as any);
  const [announcementAction, setAnnouncementAction] = React.useState([] as any);

  const [isLoading, setLoading] = React.useState(false);
  const [clockInLoading, setClockInLoading] = React.useState(false);
  const [error, setError] = React.useState<any>();
  const [message, setMessage] = React.useState("");
  const [newAnnouncementCreated, setNewAnnouncementCreated] =
    React.useState(false);
  const [viewAction, setViewAction] = React.useState([] as any);
  const [showView, setShowView] = React.useState<DialogState>({});
  const [showDialog, setShowDialog] = React.useState<DialogState>({});
  const [deleteShow, setDeleteShow] = React.useState(false);

  const [viewShow, setViewShow] = React.useState(false);
  const { ViewAnnouncements, isAnnouncementsLoading } =
    useAnnouncementsById(viewAction);

  React.useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseAnnouncements = await fetch(
          `${process.env.REACT_APP_API}/hr/announcements`,
          getRequestOptions
        );
        const isJsonResponseAnnouncements = responseAnnouncements.headers
          ?.get("content-type")
          ?.includes("application/json");
        const dataProjects =
          isJsonResponseAnnouncements && (await responseAnnouncements.json());
        if (!responseAnnouncements.ok) {
          throw new Error(
            dataProjects?.message || responseAnnouncements.status
          );
        }
        setAnnouncements(dataProjects?.data);

        setLoading(false);
        setError(false);
        setMessage("");
      } catch (error: any) {
        setLoading(false);
        setMessage(error.message || "Something went wrong");
        if (retryCount < 5) {
          setTimeout(() => {
            retryCount++;
            fetchData();
          }, 5000);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [newAnnouncementCreated, announcementAction]);
  const handleNewAnnouncementCreated = () => {
    setNewAnnouncementCreated(!newAnnouncementCreated);
  };
  const handleSubmit = async () => {
    setClockInLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/attendances`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setClockInLoading(false);
      if (response.ok) {
        const title = "Clocked in successfully.";
        const html = `Clocked in`;
        const icon = "success";
        fireAlert(title, html, icon);
        setClockInLoading(false);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setClockInLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Unable to clock in";
      fireAlert(title, html, icon);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    console.log("idDee", id);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/announcements/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const title = "Announcement deleted.";
        const html = `Announcement deleted`;
        const icon = "success";
        fireAlert(title, html, icon);
        setAnnouncementAction(true);
        setShowDialog({ [id]: false });
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Announcement deletion failed";
      fireAlert(title, html, icon);
    }
  };
  const handleView = (id: any) => {
    setViewAction([id]);
    setShowView({ [id]: true });
    setViewShow(true);
  };

  const handleDelete = (id: any) => {
    setShowDialog({ [id]: true });
    setDeleteShow(true);
  };
  return (
    <div
      className="main-div-col-2-sub" >
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
                onNewAnnouncementCreated={handleNewAnnouncementCreated}
              />
            </div>
          )}
        <Button
          variant="contained"
          className="Add-btn"
          onClick={() => handleSubmit()}
        >
          {clockInLoading ? <Spinner animation="border" /> : " Clock in"}
        </Button>
      </div>
      <div>
        {isLoading ? (
          <div className="table-loader-announcement">
            <SyncLoader color={"#990000"} loading={isLoading} />
          </div>
        ) : announcements?.length === 0 || announcements === undefined ? (
          <div className="table-loader-announcement">
            <div>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src="https://img.icons8.com/external-others-phat-plus/64/000000/external-announcement-marketing-outline-others-phat-plus.png" />
              <p className="mt-3">No announcement found</p>
            </div>
          </div>
        ) : (
          <div className="Announcement-container">
            <div className="Announcement-sub-2" >
              {announcements?.map((item: any, i: any) => (
                <div className="main-todo-Event" style={{ borderRadius: "4px" }} key={i} >
                  <div className="main-todo-container">
                    <div className="main-todo-note">
                      <div>{item?.message}</div>
                      <div className="main-todo-note-minutes">
                        {moment
                          .duration(moment().diff(item?.created_at))
                          .humanize()}{" "}
                        ago
                      </div>
                    </div>
                  </div>
                  <div className="FiTrash2">
                    <span>
                      <FiEye
                        size={25}
                        onClick={() => handleView(item?.id)}
                        cursor="pointer"
                        title="VIEW ANNOUNCEMENT"
                      />
                    </span>
                    <span className="BsFillPinAngleFill">
                      <FiTrash2
                        size={25}
                        onClick={() => handleDelete(item?.id)}
                        cursor="pointer"
                        title="DELETE TODO"
                      />
                    </span>
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




