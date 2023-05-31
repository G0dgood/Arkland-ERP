import React from "react";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import { Button } from "@material-ui/core";
import { Modal, Spinner } from "react-bootstrap";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { useAnnouncements, useAnnouncementsById } from "../../hooks/useAnnouncements";
import { getUserPrivileges } from "../../functions/auth";
import { DialogState } from "../../interfaces/base";



const AdminAnnouncement = () => {
  const [viewAction, setViewAction] = React.useState([] as any);
  const [showView, setShowView] = React.useState<DialogState>({});
  const [showDialog, setShowDialog] = React.useState<DialogState>({});
  const [deleteShow, setDeleteShow] = React.useState(false);
  const [viewShow, setViewShow] = React.useState(false);
  const [isDeleteLoading, setLoading] = React.useState(false);
  const [announcementAction, setAnnouncementAction] = React.useState(false);
  const [clockInLoading, setClockInLoading] = React.useState(false);

  const { announcements, isLoading, } =
    useAnnouncements(announcementAction);
  const { ViewAnnouncements, isAnnouncementsLoading } =
    useAnnouncementsById(viewAction);

  const {
    isHRHead,
    isHeadOfDepartment,
    isTeamLead,
    isSuperAdmin,
    isAdmin,
    // isEmployee,
    isHrAdmin,
  } = getUserPrivileges();




  return (
    <div className="admin-main-div-col-2-sub">
      <div className="Announcement-sub-1">
        <div className="Announcement-sub-text">
          <span className="sub-text-contained">
            <h4>Announcement</h4>
          </span>
        </div>
        <Button
          variant="contained"
          className="Add-btn"
        // onClick={() => handleSubmit()}
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
                        <FiEye
                          size={20}
                          // onClick={() => handleView(item?.id)}
                          cursor="pointer"
                          title="VIEW ANNOUNCEMENT"
                        />
                      </span>
                      {(isSuperAdmin ||
                        isTeamLead ||
                        isHeadOfDepartment ||
                        isAdmin ||
                        isHRHead ||
                        isHrAdmin) && (
                          <span className="BsFillPinAngleFill">
                            <FiTrash2
                              size={20}
                              // onClick={() => handleDelete(item?.id)}
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
                              // deleteAnnouncement(item?.id);
                            }}
                          >
                            {isDeleteLoading ? (
                              <Spinner animation="border" />
                            ) : (
                              " Yes"
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
