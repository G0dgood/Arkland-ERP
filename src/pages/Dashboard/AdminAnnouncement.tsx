import React, { CSSProperties } from "react";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import {
  BsExclamationLg,
  BsFillPinAngleFill,
  BsThreeDots,
} from "react-icons/bs";
import { Button } from "@material-ui/core";
import { Toast } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { getRequestOptions } from "../../utils/auth/header";
import useAnnouncements from "../../hooks/useAnnouncements";

const AdminAnnouncement = () => {
  const { announcements, isLoading, error, message } = useAnnouncements();
  const [showToast, setShowToast] = React.useState(false);


  return (
    <div className="admin-main-div-col-2-sub">
      {error && (
        <Toast
          onClose={() => setShowToast(false)}
          show={true}
          delay={4000}
          autohide
        >
          <Toast.Body>
            <span>
              <BsExclamationLg />
            </span>
            <p>{message}</p>
            <span onClick={() => setShowToast(false)}>
              <FaTimes />
            </span>
          </Toast.Body>
        </Toast>
      )}
      <div className="Announcement-sub-1">
        <div className="Announcement-sub-text">
          <span className="sub-text-contained">
            <h4>Announcement</h4>
          </span>
          <span> </span>
        </div>
        <div>
          <p>Today, {moment(Date.now()).format("DD-MMMM-YYYY")}</p>
        </div>
      </div>

      <div>
        {isLoading === true ? (
          <div className="table-loader-announcement" >
            <SyncLoader
              color={"#990000"}
              loading={isLoading}
            />
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
                  <div
                    className="main-todo-Event"
                    style={{ borderRadius: "4px" }}
                  >
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

          </>
        )}
      </div>

      <Button variant="outlined" className="show-btn-schedule">
        See All Announcement
      </Button>
    </div>
  );
};

export default AdminAnnouncement;
