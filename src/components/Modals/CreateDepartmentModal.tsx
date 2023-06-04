import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import { BsPlusLg } from "react-icons/bs";
import { fireAlert } from "../../utils/Alert";
import InputField from "../Inputs/InputField";
import TextAreaField from "../Inputs/TextAreaField";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { createDepartments, reset } from "../../features/Department/departmentSlice";

const CreateDepartmentModal = () => {
 const dispatch = useAppDispatch();
 const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.department)
 const [lgShow, setLgShow] = useState(false);

 useEffect(() => {
  if (createisError) {
   fireAlert("error", createmessage, "error");
   dispatch(reset());
  } else if (createisSuccess) {
   setLgShow(false)
   fireAlert("Success", "Department created successfully", "success");
   dispatch(reset());
  }
 }, [createisError, createisSuccess, createmessage, dispatch]);

 const handleSubmit = async (values: any) => {
  const input = { ...values };
  // @ts-ignore
  dispatch(createDepartments(input));

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
            {createisLoading ? <Spinner animation="border" /> : "Create"}
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
