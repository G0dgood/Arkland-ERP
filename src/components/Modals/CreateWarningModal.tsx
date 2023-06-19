import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Form, Formik } from "formik";
import { MdOutlineClose } from "react-icons/md";
import { fireAlert } from "../../utils/Alert";
import ReactSelectField from "../Inputs/ReactSelectField";

import SelectField from "../Inputs/SelectField";
import TextAreaField from "../Inputs/TextAreaField";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { allEmployee, createWarning, reset } from "../../features/Employee/employeeSlice";


const CreateWarningModal = ({ id }: any) => {
  const dispatch = useAppDispatch();
  const { data: employees } = useAppSelector((state: any) => state.employee)
  const { createwarningisLoading, createwarningisSuccess } = useAppSelector((state: any) => state.employee)
  const [lgShow, setLgShow] = useState(false);



  const handlewarning = () => {
    dispatch(allEmployee());
  }

  const subordinationOptions = ["Type of misconduct", "insubordination"];


  const handleSubmit = async (values: any, { resetForm }: any) => {

    const inputs = { ...values }

    // @ts-ignore
    dispatch(createWarning(inputs));
  };

  useEffect(() => {

    if (createwarningisSuccess) {
      fireAlert("Create warning success", "Warning created successfully", "success");
      setLgShow(false);
      dispatch(reset());
    }
  }, [createwarningisSuccess, dispatch])



  const availablleEmployees = [] as any;

  employees &&
    employees?.forEach((employee: any) =>
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
        onClick={() => { setLgShow(true); handlewarning() }}
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
              employee: id ? id : "",
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
                        {createwarningisLoading ? <Spinner animation="border" /> : "Create"}
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
