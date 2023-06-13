import React, { useEffect, useState } from "react";
import { Modal, Toast, ProgressBar, Spinner } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { fireAlert } from "../utils/Alert";
import HttpService from "./HttpService";
import { useAppDispatch } from "../store/useStore";


const UploadEmployee = () => {
  const dispatch = useAppDispatch();


  const [message, setMessage] = useState("");
  const [isError, setisError] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const url = `hr/employees/bulk-upload`


  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [file, setFile] = useState<any>()




  const submitHandler = async () => {

    setisLoading(true)
    await HttpService.uploadFile(url, {}, { employees: file })
      .then((response) => {
        console.log('response', response);
        setisLoading(false)
      })
      .catch((error) => {
        console.log('error', error);
        setisLoading(false)
      })


    // @ts-ignore
    // dispatch(uploadEmployee(jsonData, setProgress));

  };


  function handleChange(event: any) {
    setFile(event.target.files[0])
  }


  useEffect(() => {
    if (isSuccess) {
      fireAlert('Upload Employee', "Upload Employee base is successfull", "success");
      setTimeout(() => {
        setisSuccess(false)
        setMessage("")
        // setReload(false)
      }, 5000);
    }
  }, [dispatch, isError, isSuccess, message])



  return (
    <>
      <Button
        variant="contained"
        className="Add-btn"
        onClick={handleShow}
      >
        <FiUpload className="icon-space" />
        Upload
      </Button>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        // onClick={onClickReset}
        backdrop="static"
        keyboard={false}
        centered
        className="logic-modal">
        <Modal.Header >
          <span></span>
          <span className="span-center-title">Upload File</span>
          <Button style={{ color: "#fff" }} onClick={() => setShow(false)}>
            <MdOutlineClose size={28} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <form className="upload-form">



            <div
              className={progress === 0 ? "upload-icon" : "upload-icon-active"}>
              <i className="fas fa-cloud-upload-alt fa-4x" />
              <p>
                {progress === 0
                  ? "Drag and Drop file or click below"
                  : `Uploading...`}
              </p>
            </div>

            <input
              type="file"
              id="fileupload"
              className="file-upload-input"
              // @ts-ignore 
              onChange={handleChange} />
            <ProgressBar
              animated
              className="upload-progress-bar"
              now={progress}
            // onClick={onClickReset}
            />


            <div className='deleteKPIHandler' style={{ marginTop: "40px" }}>
              <span className='deleteKPIHandler-mr'
              // onClick={onClickReset}
              >
                <Button className="table-link">
                  Reset
                </Button>
              </span>
              <span >
                <Button className=" table-link-active" onClick={submitHandler} >
                  {isLoading ? <Spinner animation="border" /> : "Upload"}
                </Button>
              </span>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default UploadEmployee;
