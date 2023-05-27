import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import { BsPlusLg } from "react-icons/bs";
import { fireAlert } from "../../utils/Alert";
import ReactSelectField from "../Inputs/ReactSelectField";
import { useAppSelector } from "../../hooks/useDispatch";

const HrAssistedAttendanceModal = (props: any) => {
  const [isLoading, setLoading] = React.useState(false);
  const token = Cookies.get("token");

  const [lgShow, setLgShow] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log("values", values);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/attendances/${values.employee}/clock-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const title = "Clocked-in employee successfully";
        const html = `Employee clocked-in`;
        const icon = "success";
        // fireAlert(title, html, icon);
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
      const title = "Clocked-in employee failed";
      // fireAlert(title, html, icon);
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
        className="subone-header-flex-btn"
        onClick={() => setLgShow(true)}
      >
        <BsPlusLg size={10} color="#fff" className="Create-plue-account" />{" "}
        Clock-in Employee
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <span></span>
          <span className="span-center-title">Clock-in Employee</span>
          <Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
            <MdOutlineClose size={28} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              employee: "",
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
                          label="Employee Name"
                          name="employee"
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue("employee", event?.value);
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
                        {isLoading ? (
                          <Spinner animation="border" />
                        ) : (
                          "Clock-in Employee"
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
    </div>
  );
};

export default HrAssistedAttendanceModal;
