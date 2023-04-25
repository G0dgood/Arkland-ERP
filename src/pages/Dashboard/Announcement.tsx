import moment from "moment";
import React, { CSSProperties } from "react";
import { Button } from "@mui/material";

import { BsFillPinAngleFill, BsThreeDots } from "react-icons/bs";
import SyncLoader from "react-spinners/SyncLoader";
import CreateAnnouncementModal from "../../components/Modals/CreateAnnouncementModal";
import { getRequestOptions } from "../../utils/auth/header";
import { getUserPrivileges } from "../../functions/auth";
import AttendanceModal from "../../components/Modals/AttendanceModal";
import Cookies from "js-cookie";
import { fireAlert } from "../../utils/Alert";
import { Spinner } from "react-bootstrap";
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
  const [isLoading, setLoading] = React.useState(false);
  const [clockInLoading, setClockInLoading] = React.useState(false);
  const [error, setError] = React.useState<any>();
  const [message, setMessage] = React.useState("");
  const [newAnnouncementCreated, setNewAnnouncementCreated] =
    React.useState(false);

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
  }, [newAnnouncementCreated]);
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
        ) : announcements?.length === 0 || announcements == null ? (
          <div className="table-loader-announcement">
            <div>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src="https://img.icons8.com/external-others-phat-plus/64/000000/external-announcement-marketing-outline-others-phat-plus.png" />
              <p className="mt-3">No announcement found</p>
            </div>
          </div>
        ) : (
          <div className="Announcement-container">
            {announcements?.map((item: any, i: any) => (
              <div className="Announcement-sub-2" key={i}>
                <div
                  className="main-todo-Event"
                  style={{ borderRadius: "4px" }}
                >
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
                    <span className="BsFillPinAngleFill">
                      {" "}
                      <BsFillPinAngleFill size={20} />
                    </span>
                    <span>
                      <BsThreeDots size={25} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
