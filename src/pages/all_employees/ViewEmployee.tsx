import React, { CSSProperties } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { SyncLoader } from "react-spinners";
import { Modal, Spinner } from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import projectBack from "../../assets/vectors/project-back.svg";
import { useEmployeeById } from "../../hooks/useEmployees";
import { DialogState } from "../../interfaces/base";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  width: "99.8%",
  borderRadius: "50px",
};

const ViewEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    employee,
    salary,
    isLoading,
    isDeleteLoading,
    handleEmployeeDeletion,
  } = useEmployeeById(id ? id : "");
  const [deleteShow, setDeleteShow] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState<any>({});

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
                    <div>
                      <Button
                        variant="contained"
                        className="Create-event-Calender"
                        onClick={() => handleDelete()}
                      >
                        {/* {isDeleteLoading ? (
                          <Spinner animation="border" />
                        ) : ( */}
                        Delete Employee
                        {/* )} */}
                      </Button>
                    </div>
                    {showDialog && (
                      <Modal
                        size="lg"
                        show={deleteShow}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Employee Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>Are you sure you want to delete employee data?</p>
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleEmployeeDeletion();
                              setShowDialog(false);
                            }}
                          >
                            Yes
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

                  <h4 style={{ marginTop: "3rem" }}>Review Employee Details</h4>
                  <h6 style={{ marginTop: "3rem" }}>
                    Employee Essential Details
                  </h6>
                  <div
                    className="viewprofile-container"
                    style={{ marginTop: "2rem" }}
                  >
                    <div>
                      <div className="getjob-application-details">
                        <p>Full Name</p>
                        <p>
                          <p>{employee?.full_name}</p>
                        </p>
                        <p>Email</p>
                        <p>{employee?.personal_email}</p>
                        <p>Phone</p>
                        <p>{employee?.phone} </p>
                        <p>Date of Birth (DD-MM-YYYY)</p>
                        <p>
                          {" "}
                          {moment(employee?.date_of_birth).format("DD-MM-YYYY")}
                        </p>
                        <p>Age</p>
                        <p>
                          {" "}
                          {
                            moment(employee?.date_of_birth)
                              .fromNow()
                              .split(" ")[0]
                          }{" "}
                          years old
                        </p>

                        <p>Gender</p>
                        <p> {employee?.gender}</p>
                        <p>Marital Status</p>
                        <p> {employee?.marital_status}</p>
                        <p>Country</p>
                        <p>{employee?.country}</p>
                        <p>State</p>
                        <p> {employee?.state_of_origin} </p>
                        <p>Address</p>
                        <p>{employee?.address}</p>
                        <p>City</p>
                        <p>{employee?.city}</p>
                      </div>
                    </div>
                    <div>
                      <div className="getjob-application-details">
                        <p>Expatriate</p>
                        <p>{employee.is_expatriate === true ? "Yes" : "No"}</p>
                        {employee.is_expatriate === true ? (
                          <>
                            <>
                              <p>Passport Number</p>
                              <p>{employee?.passport_number}</p>
                            </>
                            <>
                              <p>Visa Type</p>
                              <p>{employee?.visa_type}</p>
                            </>
                            <>
                              <p>Visa Duration</p>
                              <p>{employee?.visa_duration} months </p>
                            </>
                          </>
                        ) : (
                          <>
                            <p>NIN</p>
                            <p>{employee?.nin}</p>
                          </>
                        )}

                        <p>Instiution attended</p>
                        <p>{employee?.institution_attended}</p>
                        <p>Course studied</p>
                        <p>{employee.course_studied}</p>
                        <p>Qualification</p>
                        <p>{employee.qualification}</p>
                      </div>
                    </div>
                  </div>
                  <h6 style={{ marginTop: "3rem" }}>
                    Employee Financial Details
                  </h6>
                  <div
                    className="viewprofile-container"
                    style={{ marginTop: "2rem" }}
                  >
                    <div>
                      <div className="getjob-application-details">
                        <p>Bank Name</p>
                        <p>{employee?.bank_name}</p>
                        <p>Bank Account Number</p>
                        <p>{employee?.bank_account_number}</p>
                        <p>Bank Account Name</p>
                        <p>{employee?.bank_account_name} </p>
                        <p> Basic Salary</p>
                        <p> ₦ {salary?.basic_salary}</p>
                        <p> Meal Allowance</p>
                        <p> ₦ {salary?.meal_allowance}</p>
                      </div>
                    </div>
                    <div>
                      <div className="getjob-application-details">
                        <p> Medical Allowance</p>
                        <p> ₦ {salary?.medical_allowance}</p>
                        <p> Housing Allowance</p>
                        <p>₦ {salary?.housing_allowance}</p>
                        <p> Transportation Allowance</p>
                        <p>₦ {salary?.transportation_allowance} </p>
                        <p> Utility Allowance</p>
                        <p>₦ {salary?.utility_allowance}</p>
                      </div>
                    </div>
                  </div>
                  <h6 style={{ marginTop: "3rem" }}>Employee References</h6>
                  <div
                    className="viewprofile-container"
                    style={{ marginTop: "2rem" }}
                  >
                    <div>
                      <div className="getjob-application-details">
                        <p>Next of Kin</p>
                        <p>{employee?.next_of_kin}</p>
                        <p>Next of Kin Phone Number</p>
                        <p>{employee?.next_of_kin_phone}</p>
                        <p>Next of Kin Email</p>
                        <p>{employee?.next_of_kin_email} </p>
                        <p> Next of Kin Address</p>
                        <p> ₦ {employee?.next_of_kin_address}</p>
                      </div>
                    </div>
                    <div>
                      <div className="getjob-application-details">
                        <p>Referee Name</p>
                        <p>{employee?.referee_name}</p>
                        <p>Referee Phone Number</p>
                        <p>{employee?.referee_phone}</p>
                        <p>Emergency Contact Name</p>
                        <p>{employee?.emergency_contact_name} </p>
                        <p>Emergency Contact Phone</p>
                        <p>{employee?.emergency_contact_phone}</p>
                      </div>
                    </div>
                  </div>

                  <h6 style={{ marginTop: "3rem" }}>Details of employment</h6>
                  <div
                    className="viewprofile-container"
                    style={{ marginTop: "2rem" }}
                  >
                    <div>
                      <div className="getjob-application-details">
                        <p>Department</p>
                        <p>{employee?.department?.name}</p>
                        <p>Role</p>
                        <p>{employee?.role?.name}</p>
                        <p>Work Location Objection</p>
                        <p>
                          {employee.has_work_location_objection === true
                            ? "Yes"
                            : "No"}
                        </p>
                        <p>Tally Number</p>
                        <p>{employee?.tally_number}</p>
                      </div>
                    </div>
                    <div>
                      <div className="getjob-application-details">
                        <p>Employment ID</p>
                        <p>{employee?.employee_id} </p>
                        <p>Employment Type</p>
                        <p>{employee?.employment_type}</p>
                        <p>Employment Date (DD-MM-YYYY)</p>
                        <p>
                          {moment(employee?.employment_date).format(
                            "DD-MM-YYYY"
                          )}
                        </p>
                        <p>Employment Duration (Months)</p>
                        <p>{employee?.employment_duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ViewEmployee;
