import moment from "moment";
import React from "react";
import { Button } from "@mui/material";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { Modal, Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import { MdOutlineClose } from "react-icons/md";
import SyncLoader from "react-spinners/SyncLoader";
import CreateAnnouncementModal from "../../components/Modals/CreateAnnouncementModal";
import { getUserPrivileges } from "../../functions/auth";
import { fireAlert } from "../../utils/Alert";
import { DialogState } from "../../interfaces/base";
import {
  useAnnouncements,
  useAnnouncementsById,
  useUsersAnnouncements,
  useUsersAnnouncementsById,
} from "../../hooks/useAnnouncements";

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

  const [announcementAction, setAnnouncementAction] = React.useState([] as any);
  const [isDeleteLoading, setLoading] = React.useState(false);
  const [clockInLoading, setClockInLoading] = React.useState(false);
  const [newAnnouncementCreated, setNewAnnouncementCreated] =
    React.useState(false);
  const [viewAction, setViewAction] = React.useState([] as any);
  const [showView, setShowView] = React.useState<DialogState>({});
  const [showDialog, setShowDialog] = React.useState<DialogState>({});
  const [deleteShow, setDeleteShow] = React.useState(false);
  const [viewShow, setViewShow] = React.useState(false);

  const { announcements, isLoading, error, message } =
    useUsersAnnouncements(announcementAction);
  const { ViewAnnouncements, isAnnouncementsLoading } =
    useUsersAnnouncementsById(viewAction);

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
            <div className="Announcement-sub-2">
              {announcements?.map((item: any, i: any) => (
                <div
                  className="main-todo-Event"
                  style={{ borderRadius: "4px" }}
                  key={i}
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
                    <span>
                      <FiEye
                        size={25}
                        onClick={() => handleView(item?.id)}
                        cursor="pointer"
                        title="VIEW ANNOUNCEMENT"
                      />
                    </span>
                    {(isSuperAdmin ||
                      isTeamLead ||
                      isHeadOfDepartment ||
                      isHRHead ||
                      isHrAdmin) && (
                        <span className="BsFillPinAngleFill">
                          <FiTrash2
                            size={25}
                            onClick={() => handleDelete(item?.id)}
                            cursor="pointer"
                            title="DELETE ANNOUNCEMENT"
                          />
                        </span>
                      )}
                  </div>
                  {showView[item?.id] && (
                    <Modal
                      size="lg"
                      show={viewShow}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header>
                        <span></span>
                        <span className="span-center-title">View Announcement</span>
                        <Button style={{ color: "#fff" }} onClick={() => setViewShow(false)}>
                          <MdOutlineClose size={28} />
                        </Button>
                      </Modal.Header>
                      <Modal.Body>
                        {isAnnouncementsLoading === true ? (
                          <div className="table-loader-announcement1">
                            <SyncLoader
                              color={"#990000"}
                              loading={isAnnouncementsLoading}
                            />
                          </div>
                        ) : (
                          <div className="getjob-application-details">
                            <p>MESSAGE</p>
                            <p>{ViewAnnouncements?.message}</p>
                            <p>AUDIENCE</p>
                            <p>{ViewAnnouncements?.audience_scope}</p>
                            <p>STATUS</p>
                            <p>{ViewAnnouncements?.status}</p>
                            <p>DATE OF CREATION</p>
                            <p>
                              {moment(ViewAnnouncements?.created_at).format(
                                "DD-MMMM-YYYY"
                              )}
                            </p>
                          </div>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setShowView({ [item?.id]: false })}
                        >
                          Cancel
                        </button>
                      </Modal.Footer>
                    </Modal>
                  )}

                  {showDialog[item?.id] && (
                    <Modal
                      size="lg"
                      show={deleteShow}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Announcement</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          Are you sure you want to delete this announcement?
                        </p>
                        <p>{item?.title}</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteAnnouncement(item?.id);
                            // setShowDialog({ [item?.id]: false });
                          }}
                        >
                          {isDeleteLoading ? (
                            <Spinner animation="border" />
                          ) : (
                            "Yes"
                          )}
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setShowDialog({ [item?.id]: false })}
                        >
                          Cancel
                        </button>
                      </Modal.Footer>
                    </Modal>
                  )}
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
