import { BounceLoader } from "react-spinners";
import moment from "moment";
import { getUserPrivileges } from "../../functions/auth";
import ViewScheduleModal from "../../components/Modals/ViewScheduleModal";

const Schedule = ({ tasks, isLoading }: any) => {


  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin, isTeamLead } = getUserPrivileges();




  return (
    <div className="main-div-col-2">
      <div className="main-todo-1">
        <div className="main-todo-title">
          <h6>{"UPCOMING SCHEDULE"}</h6>
          <span>Today, {moment(Date.now()).format("DD-MMMM-YYYY")}</span>
        </div>

        {isLoading ? (
          <div className="table-loader-announcement1">
            <BounceLoader color={"#990000"} loading={isLoading} />
          </div>
        ) : tasks?.length === 0 || tasks === undefined || tasks === null ? (
          <div className="table-loader-announcement1">
            <div>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src="https://img.icons8.com/external-outline-design-circle/66/null/external-Todo-List-shopping-and-ecommerce-outline-design-circle.png" />
              <p className="mt-3">No schedule found</p>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
            {tasks?.length > 0 ? (
              <div className="Announcement-container">
                {tasks?.map((item: any, i: any) => (
                  <div key={i}>
                    <div className="main-todo-Event" style={{ borderRadius: "4px" }} >
                      <div className="main-todo-container">
                        <div style={{ paddingLeft: "10px" }} >
                          <div className="main-todo-input-title"> {item?.title} due by{" "}
                            {moment(item?.expected_completion_date).format("DD-MMMM-YYYY")}{" "}
                          </div>

                          <div className="main-todo-input-time">
                            {tasks && tasks?.length > 0
                              ? item?.notes[0]?.text
                              : ""}
                          </div>
                        </div>
                      </div>

                      <div className="FiTrash2" style={{ display: "flex", paddingRight: "10px" }} >
                        < ViewScheduleModal id={item?.id} />


                      </div>


                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {/* <Button
        variant="outlined"
        className="show-btn-schedule"
        onClick={() => setTaskCreateShow(true)}
      >
        Create a New Schedule
      </Button> */}
      {/* <div>
        <Modal
          size="lg"
          show={taskCreateShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <span></span>
            <span className="span-center-title">Create Task</span>
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
                                setFieldValue("priority", event?.value);
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
                                setFieldValue("points", event?.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-input-sub-space">
                        <div className="col">
                          <div className="form-group">
                            {/* <ReactSelectField
                              options={availablleEmployees}
                              label="Who is this task assigned to?"
                              name="assigned_to"
                              className="form-group__gender"
                              onChange={(event: any) => {
                                setFieldValue("assigned_to", event?.value);
                              }}
                            /> */}
      {/* </div>
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
                          {isLoading ? (
                            <Spinner animation="border" />
                          ) : (
                            "Create"
                          )}
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Modal.Body>
        </Modal>
      </div> */}
    </div>
  );
};

export default Schedule;
