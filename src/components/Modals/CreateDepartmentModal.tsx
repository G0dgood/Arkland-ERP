import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import { BsPlusLg } from "react-icons/bs";
import { fireAlert } from "../../utils/Alert";
import InputField from "../Inputs/InputField";
import TextAreaField from "../Inputs/TextAreaField";

const CreateDepartmentModal = (props: any) => {
  const [isLoading, setLoading] = React.useState(false);
  const token = Cookies.get("token");

  const [lgShow, setLgShow] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log("values", values);
    const createDepartmentValues = { ...values };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/departments`,
        {
          method: "POST",
          body: JSON.stringify(createDepartmentValues),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const title = "Department created successfully";
        const html = `Department created `;
        const icon = "success";
        fireAlert(title, html, icon);
        setLgShow(false);
        props.onNewDepartmentCreated();
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Department creation failed";
      fireAlert(title, html, icon);
    }
  };
  return (
    <div>
      <Button
        className="subone-header-flex-btn"
        onClick={() => setLgShow(true)}
      >
        <BsPlusLg size={10} color="#fff" className="Create-plue-account" />{" "}
        Create Department
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <span></span>
          <span className="span-center-title">Create Department</span>
          <Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
            <MdOutlineClose size={28} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue, submitForm }) => {
              return (
                <Form>
                  <div className="Modal-Body">
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Name of department"
                          name="name"
                          placeholder="Enter name of department"
                        />
                      </div>
                    </div>
                    <div className="Modal-textarea-middle">
                      <div className="col">
                        <div className="form-group">
                          <TextAreaField
                            style={{
                              height: "12rem",
                              lineHeight: "1",
                            }}
                            type="textarea"
                            label="Description of department"
                            name="description"
                            placeholder="Enter description of department"
                            onChange={(event: any) => {
                              setFieldValue("description", event?.target.value);
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
                        {isLoading ? "Please wait..." : "Create"}
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

export default CreateDepartmentModal;
