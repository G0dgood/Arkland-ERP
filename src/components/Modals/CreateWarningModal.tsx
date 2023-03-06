import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";

import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { fireAlert } from "../../utils/Alert";
import ReactSelectField from "../Inputs/ReactSelectField";
import { useAppSelector } from "../../hooks/useDispatch";
import SelectField from "../Inputs/SelectField";
import TextAreaField from "../Inputs/TextAreaField";

const CreateWarningModal = () => {
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const subordinationOptions = ["Type of misconduct", "insubordination"];
  const [lgShow, setLgShow] = useState(false);
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    const createDepartmentValues = { ...values };
    await axios
      .post(`${process.env.REACT_APP_API}/hr/warnings`, createDepartmentValues)
      .then((res: AxiosResponse) => {
        setLoading(false);
        if (res?.data?.success === true || res?.status === 200) {
          const title = "Warning created successfully.";
          const html = `Warning created`;
          const icon = "success";
          fireAlert(title, html, icon);
          resetForm(values);
          setLgShow(false);
          navigate(`/warninglist`);
        }
      })
      .catch((err) => {
        setLoading(false);
        const html = err?.response?.data?.message;
        const icon = "error";
        const title = "Warning creation failed";
        fireAlert(title, html, icon);
      });
  };
  const employees: any = useAppSelector((state) => state?.employees?.employees);
  const availablleEmployees = [] as any;

  employees &&
    employees.forEach((employee: any) =>
      availablleEmployees.push({
        value: employee?.id,
        label: employee?.full_name,
      })
    );
  return (
    <div>
      <Button
        variant="contained"
        className="Add-btn"
        onClick={() => setLgShow(true)}
      >
        Create Warning
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <span></span>
          <span className="span-center-title"> Create Warning</span>
          <Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
            <MdOutlineClose size={28} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              employee: "",
              misconduct: "",
              message: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue, submitForm }) => {
              return (
                <Form>
                  <div className="Modal-Body">
                    <div className="col">
                      <div className="form-group">
                        <ReactSelectField
                          options={availablleEmployees}
                          label="Employee ID"
                          name="employee"
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue("employee", event?.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="modal-input-sub-space">
                      <div className="col">
                        <div className="form-group">
                          <SelectField
                            options={subordinationOptions}
                            label="Misconduct"
                            name="misconduct"
                            className="form-group__gender"
                            onChange={(event: any) => {
                              setFieldValue("misconduct", event?.target.value);
                            }}
                          />
                        </div>
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
                            label="Message"
                            name="message"
                            placeholder="Comment on warning"
                            onChange={(event: any) => {
                              setFieldValue("message", event?.target.value);
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

export default CreateWarningModal;
