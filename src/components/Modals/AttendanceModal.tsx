import React, { useState } from "react";
import { Button } from "@mui/material";
import { Modal, Spinner } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { fireAlert } from "../../utils/Alert";
import InputField from "../Inputs/InputField";
import SelectField from "../Inputs/SelectField";

const AttendanceModal = (props: any) => {
  const [lgShow, setLgShow] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const announcementOptions = ["Select audience scope", "general"];

  const [newAnnouncementCreated, setNewAnnouncementCreated] =
    React.useState(false);

  const token = Cookies.get("token");
  const handleNewAnnouncementCreated = () => {
    setNewAnnouncementCreated(!newAnnouncementCreated);
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    console.log("values", values);

    const createAnnouncementValues = { ...values };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/announcements`,
        {
          method: "POST",
          body: JSON.stringify(createAnnouncementValues),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const title = "Announcement created successfully.";
        const html = `Announcement created`;
        const icon = "success";
        fireAlert(title, html, icon);
        handleNewAnnouncementCreated();
        setLgShow(false);
        props.onNewAnnouncementCreated();
        resetForm(values);
        setLoading(false);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Announcement creation failed";
      fireAlert(title, html, icon);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        className="Add-btn"
        onClick={() => setLgShow(true)}
      >
        Clock in
      </Button>

      <Modal
        size="lg"
        show={lgShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <span></span>
          <span className="span-center-title">Clock in</span>
          <Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
            <MdOutlineClose size={28} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              message: "",
              audience_scope: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue, submitForm }) => {
              return (
                <Form>
                  <div className="Modal-Body">
                    <div className="Modal-textarea-middle">
                      <div className="col">
                        <div className="form-group">
                          <InputField
                            label="Enter broadcast message"
                            name="message"
                            placeholder="Enter broadcast message"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-input-sub-space">
                      <div className="col">
                        <div className="form-group">
                          <SelectField
                            options={announcementOptions}
                            label="Select audience"
                            name="audience_scope"
                            className="form-group__gender"
                            onChange={(event: any) => {
                              setFieldValue(
                                "audience_scope",
                                event?.target.value
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="Modal-data-time">
                      <div className="Modal-two-input">
                        <h6>Date</h6>
                        <input
                          id="Modal-textarea-input-sub"
                          placeholder="Select start date of leave"
                          type={"date"}
                        />
                      </div>
                      <div className="div-space" />
                      <div className="Modal-two-input">
                        <h6>Time</h6>
                        <input
                          id="Modal-textarea-input-sub"
                          placeholder="Select end date of leave"
                          type={"time"}
                        />
                      </div>
                    </div> */}
                    <div className="btn-modal-container">
                      <Button
                        variant="contained"
                        className="Add-btn-modal"
                        type="submit"
                      >
                        {loading ? <Spinner animation="border" /> : "Create"}
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
  );
};

export default AttendanceModal;
