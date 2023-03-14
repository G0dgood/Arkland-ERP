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

const AdminAnnouncement = () => {
  const [announcements, setannouncements] = React.useState({} as any);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>();
  const [message, setMessage] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseannouncements = await fetch(
          `${process.env.REACT_APP_API}/hr/announcements`,
          getRequestOptions
        );
        const isJsonResponseannouncements = responseannouncements.headers
          ?.get("content-type")
          ?.includes("application/json");
        const dataProjects =
          isJsonResponseannouncements && (await responseannouncements.json());
        if (!responseannouncements.ok) {
          throw new Error(dataProjects.message || responseannouncements.status);
        }
        setannouncements(dataProjects.data);

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
  }, []);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: "99.8%",
    borderRadius: "50px",
  };
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
          <span>{/* <p>Today, 21 Jun 2022</p> */}</span>
        </div>
        <div>
          <p>Today, 21 Jun 2022</p>
          {/* <CreateAnnouncementModal /> */}
        </div>
      </div>

      <div>
        {isLoading === true ? (
          <div
            style={{
              marginTop: "20px",
              width: "40%",
              alignItems: "center",
            }}
          >
            <SyncLoader
              cssOverride={override}
              color={"#990000"}
              loading={isLoading}
            />
          </div>
        ) : (
          <>
            {announcements.length > 0 ? (
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
            ) : (
              ""
            )}
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
