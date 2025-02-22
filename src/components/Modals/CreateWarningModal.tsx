import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Form, Formik } from "formik";
import { fireAlert } from "../../utils/Alert";
import ReactSelectField from "../Inputs/ReactSelectField";
import SelectField from "../Inputs/SelectField";
import TextAreaField from "../Inputs/TextAreaField";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { createWarning, reset } from "../../features/Employee/employeeSlice";
import { ModalHeader } from "./ModalOptions";
import { RiErrorWarningLine } from "react-icons/ri";
import createHttpService from "../HttpService";


const CreateWarningModal = ({ id }: any) => {
  const dispatch = useAppDispatch();
  const { createwarningisLoading, createwarningisSuccess } = useAppSelector((state: any) => state.employee)
  const [lgShow, setLgShow] = useState(false);
  const [employees, setEmployees] = useState([]);


  const handlewarning = () => {
    getData()
  }

  const subordinationOptions = ["Type of misconduct", "insubordination", "absenteeism", "lateness", "negligence", "disbedience", "inefficiency", "incompetence", "leaving duty post without permission", "gross misconduct", "others"];


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
  const getData = async () => {
    const HttpService = createHttpService();
    // setisLoading(true)
    try {
      const employeeUrl = `employees`
      const employee: any = await HttpService.get(employeeUrl)
      setEmployees(employee?.data?.data?.data)

      // setisLoading(false)

    } catch (error) {
      // setisLoading(false)
    }
  }



  const availablleEmployees = employees?.map((employee: any) => ({
    value: employee?.id,
    label: employee?.full_name,
  })) || [];




  return (
    <div>
      <li className={"active"} onClick={() => { setLgShow(true); handlewarning() }}> Create Warning</li>
      <Modal
        size="lg"
        show={lgShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader setLgShow={setLgShow} icon={<RiErrorWarningLine size={30} />} title={"Create Warning"} subtitle={"Create a Warning"} />

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
                        className="add-experience"
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
