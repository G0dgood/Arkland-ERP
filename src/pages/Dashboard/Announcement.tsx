import moment from "moment";
import React, { CSSProperties } from "react";

import { BsFillPinAngleFill, BsThreeDots } from "react-icons/bs";
import SyncLoader from "react-spinners/SyncLoader";
import CreateAnnouncementModal from "../../components/Modals/CreateAnnouncementModal";
import { getRequestOptions } from "../../utils/auth/header";

const Announcement = () => {
  const [announcements, setAnnouncements] = React.useState({} as any);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>();
  const [message, setMessage] = React.useState("");
  const [newAnnouncementCreated, setNewAnnouncementCreated] =
    React.useState(false);

  React.useEffect(() => {
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
          throw new Error(dataProjects.message || responseAnnouncements.status);
        }
        setAnnouncements(dataProjects.data);

        setLoading(false);
        setError(false);
        setMessage("");
      } catch (error: any) {
        setLoading(false);
        // setError(true);
        setTimeout(() => {
          fetchData();
        }, 3000);
        setMessage(error.message || "Something went wrong");
      }
    };
    fetchData();
  }, [newAnnouncementCreated]);
  const handleNewAnnouncementCreated = () => {
    setNewAnnouncementCreated(!newAnnouncementCreated);
  };
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: "99.8%",
    borderRadius: "50px",
  };
  return (
    <div className="main-div-col-2-sub">
      <div className="Announcement-sub-1">
        <div className="Announcement-sub-text">
          <span className="sub-text-contained">
            <h4>Announcement</h4>
          </span>
          <span>
            <p>Today, 21 Jun 2022</p>
          </span>
        </div>
        <div>
          {" "}
          <CreateAnnouncementModal
            onNewAnnouncementCreated={handleNewAnnouncementCreated}
          />
        </div>
      </div>
      <div>
        {isLoading === true ? (
          <div
            style={{
              margin: "auto",
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
              <div className="Announcement-container">
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
                            {/* {moment().diff(item.created_at)} */}
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
    </div>
  );
};

export default Announcement;
