import { useEffect, useState, CSSProperties } from "react";
import { Button } from "@mui/material";
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartVoronoiContainer,
  ChartDonut,
} from "@patternfly/react-charts";
import moment from "moment";
import Calendar from "react-calendar";
import { useParams, useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import { Modal, Toast } from "react-bootstrap";
import { BsExclamationLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import projectAvatar from "../../assets/vectors/project-avatar.svg";
import projectBack from "../../assets/vectors/project-back.svg";
import redPlus from "../../assets/vectors/red-plus.svg";
import projectProfile from "../../assets/vectors/project-profile.svg";
import { checkForTeams, checkForEmployeeName } from "../../utils/checkForName";
import { useAppSelector } from "../../hooks/useDispatch";
import RequestWorkerModal from "../../components/Modals/RequestWorkerModal";
import InputField from "../../components/Inputs/InputField";
import ReactSelectField from "../../components/Inputs/ReactSelectField";
import CustomInputField from "../../components/Inputs/CustomInputField";
import { formatDate } from "../../utils/formatDate";
import { difficultyOptions, priorityOptions } from "../../functions/helpers";
import { useProjectById } from "../../hooks/useProjects";
import { DialogState } from "../../interfaces/base";

const ViewProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [value, onChange] = useState(new Date());
  const [showToast, setShowToast] = useState(false);
  const [showDialog, setShowDialog] = useState<DialogState>({});
  const [deleteShow, setDeleteShow] = useState(false);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: "99.8%",
    borderRadius: "50px",
  };
  const {
    projects,
    projectsTasks,
    teamMembers,
    isLoading,
    error,
    message,
    isProjectTasksLoading,
    taskCreateShow,
    isTeamLoading,
    setTaskCreateShow,
    deleteTask,
    handleSubmit,
  } = useProjectById(id ? id : "");

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleDelete = (id: any) => {
    setShowDialog({ [id]: true });
    setDeleteShow(true);
  };

  // --- Get current state of collapseNav from localStorage --- //
  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };

  const teamLeads: any = useAppSelector((state) => state.teamLeads.teamLeads);
  const availablleTeamMembers = [] as any;
  if (teamMembers.length < 0) {
    return null;
  } else {
    teamMembers.length > 0 &&
      teamMembers.forEach((teamMember: any) =>
        availablleTeamMembers.push({
          value: teamMember.id,
          label: teamMember.employee_name,
        })
      );
  }

  return (
    <div id="screen-wrapper">
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
          <div className="project-main-div">
            <div className="project-main-div-col-1">
              <div className="project-main-div-col-1-sub">
                <div className="project-main-div-col-1-sub-min">
                  <img
                    src={projectBack}
                    alt="User"
                    className="project-back-img"
                    onClick={() => navigate(-1)}
                  />
                  <img
                    src={projectAvatar}
                    alt="User"
                    className="project-sub-img"
                    style={{ color: "black" }}
                  />
                  <p className="project-sub-img__name">
                    {projects &&
                      teamLeads &&
                      checkForTeams(projects?.lead, teamLeads)}
                  </p>
                  <p className="project-sub-img__title">PROJECT MANAGER</p>
                </div>
                <div className="project-main-div-col-2-sub-min project-main-div-col-2-sub-min-main">
                  <div className="project-main-div-col-2-sub-container">
                    <div>
                      <p className="project-main-div-col-2-sub-container-title">
                        PROJECT TITLE:
                      </p>
                      <p className="project-main-div-col-2-sub-container-subTitle">
                        {projects?.name}
                      </p>
                    </div>
                    <div>
                      <p className="project-main-div-col-2-sub-container-title">
                        NUMBER OF EMPLOYEES:
                      </p>
                      <p className="project-main-div-col-2-sub-container-subTitle">
                        {teamMembers.length > 0
                          ? teamMembers.length
                          : "No employees assigned to project"}
                      </p>
                    </div>
                  </div>
                  <div className="project-main-div-col-2-sub-container">
                    <div>
                      <p className="project-main-div-col-2-sub-container-title">
                        START DATE:
                      </p>
                      <p className="project-main-div-col-2-sub-container-subTitle">
                        {moment(projects?.created_at).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div>
                      <p className="project-main-div-col-2-sub-container-title">
                        DUE DATE
                      </p>
                      <p className="project-main-div-col-2-sub-container-subTitle">
                        {moment(projects?.proposed_completion_date).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="project-main-div-col-1-sub-min">
                  <p className="project-main-div-col-1-sub-min-text">
                    PROGRESS:
                  </p>
                  <div
                    style={{ height: "100px", width: "100px", margin: "auto" }}
                  >
                    <ChartDonut
                      ariaDesc="Progress"
                      ariaTitle="Progress"
                      constrainToVisibleArea={true}
                      data={[
                        { x: "Completed", y: 100 },
                        {
                          x: "Pending",
                          y: `${projects?.progress_percentage}%`,
                        },
                      ]}
                      title={`${projects?.progress_percentage}%`}
                      colorScale={["#48AB62", "#116327"]}
                      height={200}
                      width={200}
                      padAngle={0}
                      innerRadius={50}
                    />
                  </div>
                </div>
                <div className="project-main-div-col-2-sub-min project-main-div-col-2-sub-min-secondary">
                  <div style={{ height: "346px", width: "346px" }}>
                    <Chart
                      ariaDesc="Average number of pets"
                      ariaTitle="Line chart example"
                      containerComponent={
                        <ChartVoronoiContainer
                          labels={({ datum }) => `${datum?.name}: ${datum?.y}`}
                          constrainToVisibleArea
                        />
                      }
                      legendData={[
                        { name: "Expenditure" },
                        { name: "Revenue", symbol: { type: "dash" } },
                        { name: "Profit" },
                      ]}
                      legendOrientation="vertical"
                      legendPosition="right"
                      height={250}
                      maxDomain={{ y: 10 }}
                      minDomain={{ y: 0 }}
                      padding={{
                        bottom: 50,
                        left: 50,
                        right: 200, // Adjusted to accommodate legend
                        top: 50,
                      }}
                      width={600}
                    >
                      <ChartAxis tickValues={[2, 3, 4]} />
                      <ChartAxis
                        dependentAxis
                        showGrid
                        tickValues={[10, 20, 30, 40, 50]}
                      />
                      <ChartGroup>
                        <ChartLine
                          data={[
                            { name: "Expenditure", x: "Jan", y: 1 },
                            { name: "Expenditure", x: "Feb", y: 2 },
                            { name: "Expenditure", x: "Mar", y: 5 },
                          ]}
                        />
                        <ChartLine
                          data={[
                            { name: "Revenue", x: "Jan", y: 2 },
                            { name: "Revenue", x: "Feb", y: 1 },
                            { name: "Revenue", x: "Mar", y: 7 },
                          ]}
                          style={{
                            data: {
                              strokeDasharray: "3,3",
                            },
                          }}
                        />
                        <ChartLine
                          data={[
                            { name: "Profit", x: "Jan", y: 3 },
                            { name: "Profit", x: "Feb", y: 4 },
                            { name: "Profit", x: "Mar", y: 9 },
                          ]}
                        />
                      </ChartGroup>
                    </Chart>
                  </div>
                </div>
              </div>
              <div className="project-main-div-col-2-sub">
                <div>
                  <div className="project-main-div-col-2-sub-min-main__header">
                    <h5>Team Members</h5>
                  </div>

                  <div className="project-main-div-col-2-sub-max project-main-div-col-2-sub-min-main">
                    {isTeamLoading === true ? (
                      <div>
                        <SyncLoader
                          cssOverride={override}
                          color={"#990000"}
                          loading={isTeamLoading}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr",
                        }}
                      >
                        {teamMembers?.length > 0 ? (
                          <div className="project-main-div-col-2-sub-container1">
                            {teamMembers?.map((item: any, i: any) => (
                              <div className="project-main-div-col-2-sub-container1-flex">
                                <img
                                  src={projectProfile}
                                  alt="User"
                                  className="project-main-div-col-2-sub-container1-image"
                                />
                                <div className="project-main-div-col-2-sub-container1-flexMargin">
                                  <p className="project-main-div-col-2-sub-container1-title">
                                    {item?.employee_name}
                                  </p>
                                  <p
                                    className="project-main-div-col-2-sub-container1-subTitle"
                                    style={{ textTransform: "uppercase" }}
                                  >
                                    {item?.team_name}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          "No team members assigned to project"
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="project-main-div-col-2-sub-min-main__header">
                    <h5>Ongoing Tasks</h5>
                    <img
                      src={redPlus}
                      alt="User"
                      className="project-main-div-col-2-sub-min-main__header-plus"
                      onClick={() => setTaskCreateShow(true)}
                    />
                  </div>
                  <div>
                    <Modal
                      size="lg"
                      show={taskCreateShow}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header>
                        <span></span>
                        <span className="span-center-title"> Create Task</span>
                        <Button
                          style={{ color: "#fff" }}
                          onClick={() => setTaskCreateShow(false)}
                        >
                          <MdOutlineClose size={28} />
                        </Button>
                      </Modal.Header>
                      <Modal.Body>
                        <Formik
                          initialValues={{
                            title: "",
                            assigned_to: "",
                            points: "",
                            priority: "",
                            expected_completion_date: "",
                            note: "",
                          }}
                          onSubmit={handleSubmit}
                        >
                          {({ setFieldValue }) => {
                            return (
                              <Form>
                                <div className="Modal-Body">
                                  <div className="col">
                                    <div className="form-group">
                                      <InputField
                                        label="Title"
                                        placeholder="Enter task title"
                                        name="title"
                                        className="form-group__gender"
                                        onChange={(event: any) => {
                                          setFieldValue("title", event?.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="Modal-textarea-middle">
                                    <div className="col">
                                      <div className="form-group">
                                        <InputField
                                          label="Note"
                                          placeholder="Enter task note"
                                          name="note"
                                          className="form-group__gender"
                                          onChange={(event: any) => {
                                            setFieldValue("note", event?.value);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="modal-input-sub-space">
                                    <div className="col">
                                      <div className="form-group">
                                        <ReactSelectField
                                          options={priorityOptions}
                                          label="How important is this task?"
                                          name="priority"
                                          className="form-group__gender"
                                          onChange={(event: any) => {
                                            setFieldValue(
                                              "priority",
                                              event?.value
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="modal-input-sub-space">
                                    <div className="col">
                                      <div className="form-group">
                                        <ReactSelectField
                                          options={difficultyOptions}
                                          label="How difficult is this task?"
                                          name="points"
                                          className="form-group__gender"
                                          onChange={(event: any) => {
                                            setFieldValue(
                                              "points",
                                              event?.value
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="modal-input-sub-space">
                                    <div className="col">
                                      <div className="form-group">
                                        <ReactSelectField
                                          options={availablleTeamMembers}
                                          label="Who is this task assigned to?"
                                          name="assigned_to"
                                          className="form-group__gender"
                                          onChange={(event: any) => {
                                            setFieldValue(
                                              "assigned_to",
                                              event?.value
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="modal-input-sub-space">
                                    <div className="col">
                                      <div className="form-group">
                                        <CustomInputField
                                          style={{
                                            lineHeight: 1,
                                          }}
                                          type="date"
                                          label="Proposed Completion Date"
                                          name="expected_completion_date"
                                          onChange={(event: any) => {
                                            setFieldValue(
                                              "expected_completion_date",
                                              formatDate(event?.target.value)
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="btn-modal-container">
                                    <Button
                                      variant="contained"
                                      className="Add-btn-modal"
                                      type="submit"
                                    >
                                      {isProjectTasksLoading
                                        ? "Please wait..."
                                        : "Create"}
                                    </Button>
                                  </div>
                                </div>
                              </Form>
                            );
                          }}
                        </Formik>
                      </Modal.Body>
                    </Modal>
                  </div>

                  <div className="project-main-div-col-2-sub-max1 project-main-div-col-2-sub-min-main">
                    {isProjectTasksLoading === true ? (
                      <div>
                        <SyncLoader
                          cssOverride={override}
                          color={"#990000"}
                          loading={isProjectTasksLoading}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr",
                        }}
                      >
                        {projectsTasks?.length > 0 ? (
                          <div className="Announcement-container">
                            {projectsTasks?.map((item: any, i: any) => (
                              <div className="Announcement-sub-2">
                                <div
                                  className="project-main-todo-Event"
                                  style={{ borderRadius: "4px" }}
                                >
                                  <div className="main-todo-container">
                                    <div>
                                      <div>
                                        {item.title} on{" "}
                                        {moment(
                                          item?.expected_completion_date
                                        ).format("DD-MM-YYYY")}{" "}
                                      </div>

                                      <div className="main-todo-input-time">
                                        {" "}
                                        {projectsTasks.length > 0
                                          ? item.notes[0]?.text
                                          : ""}
                                      </div>
                                      <div className="main-todo-input-time">
                                        {"Assigned to : "}
                                        {projects &&
                                          teamMembers &&
                                          checkForEmployeeName(
                                            item?.assigned_to,
                                            teamMembers
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="FiTrash2">
                                    <FiTrash2
                                      size={25}
                                      onClick={() => handleDelete(item?.id)}
                                    />
                                  </div>
                                  {showDialog[item?.id] && (
                                    <Modal
                                      size="lg"
                                      show={deleteShow}
                                      aria-labelledby="contained-modal-title-vcenter"
                                      centered
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title>Delete Task</Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <p>
                                          Are you sure you want to delete this
                                          task?
                                        </p>
                                        <p>{item?.title}</p>
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <button
                                          className="btn btn-danger"
                                          onClick={() => {
                                            deleteTask(item?.id);
                                            setShowDialog({
                                              [item?.id]: false,
                                            });
                                          }}
                                        >
                                          Yes
                                        </button>
                                        <button
                                          className="btn btn-secondary"
                                          onClick={() =>
                                            setShowDialog({ [item?.id]: false })
                                          }
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
                        ) : (
                          "Project tasks not assigned"
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="project-main-div-col-2-sub-max2 project-main-div-col-2-sub-min-calendar">
                    <Calendar onChange={onChange} value={value} />
                  </div>
                  <Button
                    variant="contained"
                    className="project-main-div-col-2-sub-max2-request-button"
                  >
                    <RequestWorkerModal />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ViewProject;
