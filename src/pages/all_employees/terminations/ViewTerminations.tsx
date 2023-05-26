import React, { CSSProperties } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";
import { SyncLoader } from "react-spinners";
import { Modal, Spinner } from "react-bootstrap";
import projectBack from "../../../assets/vectors/project-back.svg";
import { useTerminationsById } from "../../../hooks/useTerminations";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  width: "99.8%",
  borderRadius: "50px",
};

const ViewTerminations = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    terminations,
    isLoading,
    isTerminateLoading,
    handleEmployeeTermination,
  } = useTerminationsById(id ? id : "");
  const [deleteShow, setDeleteShow] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState<any>({});


  const handleDelete = () => {
    setShowDialog(true);
    setDeleteShow(true);
  };
  return (
    <div  >
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
                      APPROVE TERMINATION
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
                        <Modal.Title>Terminate Employee</Modal.Title>
                        <Button
                          style={{ color: "#fff" }}
                          onClick={() => setDeleteShow(false)}
                        >
                          <MdOutlineClose size={28} />
                        </Button>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Are you sure you want to terminate employee?</p>

                        <Modal.Body></Modal.Body>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleEmployeeTermination();
                            //   setShowDialog(false);
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
                      </Modal.Footer>
                    </Modal>
                  )}
                </div>

                <h4 style={{ marginTop: "3rem" }}>
                  Review Termination request
                </h4>

                <div
                  className="viewprofile-container"
                  style={{ marginTop: "2rem" }}
                >
                  <div>
                    <div className="getjob-application-details">
                      <p>Misconduct</p>
                      <p>{terminations?.reason}</p>
                      <p>Employee</p>
                      <p
                        onClick={() =>
                          navigate(`/employees/${terminations?.employee?.id}`)
                        }
                        style={{
                          cursor: "pointer",
                          color: "blue",
                        }}
                      >
                        {terminations?.employee?.full_name}
                      </p>
                      <p>Description</p>
                      <p> {terminations?.description} </p>

                      <p>Status</p>
                      <p> {terminations?.status} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTerminations;
