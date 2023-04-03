import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { fireAlert } from "../../utils/Alert";
import ReactSelectField from "../Inputs/ReactSelectField";
import { useAppSelector } from "../../hooks/useDispatch";
import SelectField from "../Inputs/SelectField";
import TextAreaField from "../Inputs/TextAreaField";

interface CreateWarningInterface {
  id?: string;
  onNewWarningCreated?: any;
}

const TerminateEmployeeModal = ({
  id,
  onNewWarningCreated,
}: CreateWarningInterface) => {
  const token = Cookies.get("token");
  const [isLoading, setLoading] = React.useState(false);
  const subordinationOptions = ["Type of misconduct", "insubordination"];
  const [lgShow, setLgShow] = useState(false);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    console.log(values);
    const employeeId = id ? id : values.employee;
    const createWarningValues = { ...values, employee: employeeId };
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/hr/warnings`, {
        method: "POST",
        body: JSON.stringify(createWarningValues),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const title = "Warning created successfully.";
        const html = `Warning created`;
        const icon = "success";
        resetForm(values);
        fireAlert(title, html, icon);
        setLgShow(false);
        onNewWarningCreated();
        // props.onNewWarningCreated();
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Warning creation failed";
      fireAlert(title, html, icon);
    }
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
        Terminate Employee
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <span></span>
          <span className="span-center-title"> Terminate Employee</span>
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
                    {!id ? (
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
                    ) : (
                      ""
                    )}

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

export default TerminateEmployeeModal;
