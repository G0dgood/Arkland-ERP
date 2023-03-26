import moment from "moment";
import React, { CSSProperties } from "react";

import { BsFillPinAngleFill, BsThreeDots } from "react-icons/bs";
import SyncLoader from "react-spinners/SyncLoader";
import CreateAnnouncementModal from "../../components/Modals/CreateAnnouncementModal";
import { getRequestOptions } from "../../utils/auth/header";
import { GrAnnounce } from "react-icons/gr";

const Announcement = () => {
  const [announcements, setAnnouncements] = React.useState([] as any);
  const [isLoading, setLoading] = React.useState(false);
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
          throw new Error(dataProjects?.message || responseAnnouncements.status);
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
          <CreateAnnouncementModal
            onNewAnnouncementCreated={handleNewAnnouncementCreated}
          />
        </div>
      </div>
      <div>
        {

          isLoading ? (
            <div className="table-loader-announcement" >
              <SyncLoader
                cssOverride={override}
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
          )
        }
      </div>
    </div>
  );
};

export default Announcement;
