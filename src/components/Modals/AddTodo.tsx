import React, { useState } from "react";
import { Button } from "@mui/material";
import { Modal, Spinner } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Cookies from "js-cookie";
import { Form, Formik } from "formik";
import InputField from "../../components/Inputs/InputField";
import ReactSelectField from "../../components/Inputs/ReactSelectField";
import CustomInputField from "../../components/Inputs/CustomInputField";
import { difficultyOptions, priorityOptions } from "../../functions/helpers";
import { formatDate } from "../../utils/formatDate";
import { useAppSelector } from "../../hooks/useDispatch";
import { fireAlert } from "../../utils/Alert";
import storage from "../../utils/storage";

const AddTodo = (props: any) => {
  const token = Cookies.get("token");
  // @ts-ignore
  const userInfo: any = JSON.parse(storage?.get("user"));
  const privileges = userInfo?.data?.privileges;
  const isTeamLead = privileges.some((p: any) => p.role === "team lead");
  const isSuperAdmin = privileges.some((p: any) => p.role === "super admin");
  const isEmployee = privileges.some((p: any) => p.role === "employee");

  const [lgShow, setLgShow] = useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);

    const createTaskValues = { ...values };
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/tasks`, {
        method: "POST",
        body: JSON.stringify(createTaskValues),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const title = "Task created successfully.";
        const html = `Task created`;
        const icon = "success";
        fireAlert(title, html, icon);
        resetForm(values);
        setLgShow(false);
        props.onNewTodoCreated();
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Task creation failed";
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
      {(userInfo?.data?.department?.name === "HR" ||
        isSuperAdmin ||
        isTeamLead) && (
          <Button
            variant="contained"
            className="Add-btn"
            onClick={() => setLgShow(true)}
          >
            Add New
          </Button>
        )}

      <Modal
        size="lg"
        show={lgShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <span>{/*  */}</span>
          <span className="span-center-title">Add Todo</span>
          <Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
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
                          <ReactSelectField
                            options={availablleEmployees}
                            label="Who is this task assigned to?"
                            name="assigned_to"
                            className="form-group__gender"
                            onChange={(event: any) => {
                              setFieldValue("assigned_to", event?.value);
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
                                formatDate(event.target.value)
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
                        {isLoading ? <Spinner animation="border" /> : "Create"}
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

export default AddTodo;