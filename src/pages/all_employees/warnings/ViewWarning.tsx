import React, { CSSProperties } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";
import { SyncLoader } from "react-spinners";
import { Formik, Form } from "formik";
import { Modal, Spinner } from "react-bootstrap";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import projectBack from "../../../assets/vectors/project-back.svg";
import { useEmployeeById } from "../../../hooks/useEmployees";
import CreateWarningModal from "../../../components/Modals/CreateWarningModal";
import { useWarningEmployeeById } from "../../../hooks/useWarning";
import InputField from "../../../components/Inputs/InputField";
import TextAreaField from "../../../components/Inputs/TextAreaField";
import SelectField from "../../../components/Inputs/SelectField";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  width: "99.8%",
  borderRadius: "50px",
};

const ViewWarning = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { warning, isLoading, isTerminateLoading, handleEmployeeTermination } =
    useWarningEmployeeById(id ? id : "");

  const [deleteShow, setDeleteShow] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState<any>({});
  const [isEssentialDetailsOpen, setIsEssentialDetailsOpen] =
    React.useState(false);

  const reasonOptions = [
    "Select reason",
    "misconduct",
    "resignation",
    "redundancy",
  ];

  // --- Get current state of collapseNav from localStorage --- //
  const [collapseNav, setCollapseNav] = React.useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  React.useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };
  const handleDelete = () => {
    setShowDialog(true);
    setDeleteShow(true);
  };
  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      {isLoading ? (
        <div
          style={{
            margin: "auto",
            width: "20%",
          }}
        >
          <SyncLoader
            cssOverride={override}
            color={"#990000"}
            loading={isLoading}
          />
        </div>
      ) : (
        <main>
          <div className="EssentialsContainer">
            <div className="project-main-div">
              <div className="project-main-div-col-1">
                <div className="employee-main-div-col">
                  <div className="employee-main-div-col-header">
                    <div>
                      <img
                        src={projectBack}
                        alt="User"
                        className="project-back-img"
                        onClick={() => navigate(-1)}
                        title="Return"
                      />
                    </div>
                    <div className="employee-main-div-col-header-buttons">
                      <Button
                        variant="contained"
                        className="Add-btn"
                        onClick={() => handleDelete()}
                      >
                        Request Employee Termination
                      </Button>
                    </div>
                    {showDialog && (
                      <Modal
                        size="lg"
                        show={deleteShow}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton id="displayTermination">
                          <span></span>
                          <Modal.Title>
                            Request Employee Termination
                          </Modal.Title>
                          <Button
                            style={{ color: "#fff" }}
                            onClick={() => setDeleteShow(false)}
                          >
                            <MdOutlineClose size={28} />
                          </Button>
                        </Modal.Header>
                        <Modal.Body>
                          {/* <p>Are you sure you want to request termination?</p>
                           */}
                          <Modal.Body>
                            <Formik
                              initialValues={{
                                reason: "",
                                description: "",
                              }}
                              onSubmit={handleEmployeeTermination}
                            >
                              {({ setFieldValue }) => {
                                return (
                                  <Form>
                                    <div className="Modal-Body">
                                      <div className="col">
                                        <div className="form-group">
                                          <SelectField
                                            options={reasonOptions}
                                            label="Reason"
                                            name="reason"
                                            className="form-group__gender"
                                            onChange={(event: any) => {
                                              setFieldValue(
                                                "reason",
                                                event?.target.value
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="form-group">
                                          <TextAreaField
                                            style={{
                                              height: "12rem",
                                              lineHeight: "1",
                                            }}
                                            type="textarea"
                                            label="Description"
                                            placeholder="Enter description"
                                            name="description"
                                            className="form-group__gender"
                                            onChange={(event: any) => {
                                              setFieldValue(
                                                "description",
                                                event?.target.value
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="btn-modal-container">
                                        <Button
                                          variant="contained"
                                          className="Add-btn-modal"
                                          type="submit"
                                        >
                                          {isTerminateLoading ? (
                                            <Spinner animation="border" />
                                          ) : (
                                            "Request Termination"
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                  </Form>
                                );
                              }}
                            </Formik>
                          </Modal.Body>
                        </Modal.Body>
                        {/* <Modal.Footer>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setShowDialog(false);
                            }}
                          >
                            {isTerminateLoading ? (
                              <Spinner animation="border" />
                            ) : (
                              "Yes"
                            )}
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setShowDialog(false)}
                          >
                            Cancel
                          </button>
                        </Modal.Footer> */}
                      </Modal>
                    )}
                  </div>

                  <h4 style={{ marginTop: "3rem" }}>Review Warning</h4>
                  <h6
                    style={{ marginTop: "3rem", cursor: "pointer" }}
                    onClick={() =>
                      setIsEssentialDetailsOpen(!isEssentialDetailsOpen)
                    }
                  >
                    Warning Details {isEssentialDetailsOpen ? "▼" : "►"}
                  </h6>
                  {isEssentialDetailsOpen && (
                    <div
                      className="viewprofile-container"
                      style={{ marginTop: "2rem" }}
                    >
                      <div>
                        <div className="getjob-application-details">
                          <p>Misconduct</p>
                          <p>{warning?.misconduct}</p>
                          <p>Employee</p>
                          <p>{warning?.employee}</p>
                          <p>Message</p>
                          <p>{warning?.message} </p>

                          {warning.has_response ? (
                            <>
                              <p>Response</p>
                              <p> {warning?.response}</p>
                            </>
                          ) : (
                            ""
                          )}

                          <p>Count</p>
                          <p>{warning?.count}</p>
                          <p>Status</p>
                          <p> {warning?.status} </p>
                          <p>Created by</p>
                          <p>{warning?.created_by}</p>
                          <p>Created at</p>
                          <p>{warning?.created_at}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ViewWarning;
