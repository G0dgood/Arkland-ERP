import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import { BsPlusLg } from "react-icons/bs";
import { fireAlert } from "../../utils/Alert";
import InputField from "../Inputs/InputField";
import TextAreaField from "../Inputs/TextAreaField";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { createDepartments, editDepartments, reset } from "../../features/Department/departmentSlice";
import { useNavigate } from "react-router-dom";

const CreateDepartmentModal = ({ edit, id }: any) => {
 const navigate = useNavigate();
 const dispatch = useAppDispatch();
 const { createisLoading, createisSuccess } = useAppSelector((state: any) => state.department)
 const { editisLoading, editisSuccess } = useAppSelector((state: any) => state.department)
 const [lgShow, setLgShow] = useState(false);

 useEffect(() => {
  if (createisSuccess) {
   setLgShow(false)
   fireAlert("Success", "Department created successfully", "success");
   dispatch(reset());
  }
 }, [createisSuccess, dispatch,]);

 useEffect(() => {
  if (editisSuccess) {
   setLgShow(false)
   fireAlert("Success", "Department edited successfully", "success");
   dispatch(reset());
   navigate(-1)
  }
 }, [dispatch, editisSuccess, navigate]);

 const handleSubmit = async (values: any) => {
  const input = { ...values };
  const inputs = { id, input }
  if (edit) {

   // @ts-ignore
   dispatch(editDepartments(inputs));
  } else {
   // @ts-ignore
   dispatch(createDepartments(input));
  }

 };

 return (
  <div>
   <Button
    className="subone-header-flex-btn"
    onClick={() => setLgShow(true)}
   >
    <BsPlusLg size={10} color="#fff" className="Create-plue-account" />
    {edit ? "Edit Department" : "Create Department"}

   </Button>
   <Modal
    size="lg"
    show={lgShow}
    aria-labelledby="contained-modal-title-vcenter"
    centered
   >
    <Modal.Header>
     <span className="span-center-title">{edit ? "Edit Department" : "Create Department"}</span>
     <Button onClick={() => setLgShow(false)}>
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

          <div className="btn-modal-container" style={{ display: "flex", justifyContent: "flex-end" }}>
           <Button
            variant="contained"
            className="add-experience"
            type="submit"
           >
            {createisLoading || editisLoading ? <Spinner animation="border" /> : edit ? "Edit  " : "Create  "}
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
