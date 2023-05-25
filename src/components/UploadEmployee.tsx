import React, { useEffect, useState } from "react";
import CSVReader from "react-csv-reader";
import { Modal, Toast, ProgressBar, Spinner } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";
import { reset, uploadEmployee } from "../features/Employee/employeeSlice";
import { fireAlert } from "../utils/Alert";


const UploadEmployee = () => {
  const dispatch = useAppDispatch();
  const { uploaddata, uploadisError, uploadisLoading, uploadmessage, uploadisSuccess } = useAppSelector((state: any) => state.employee)

  // console.log('uploaddata', uploaddata)
  // console.log('uploadisError', uploadisError)
  // console.log('uploadmessage', uploadmessage.message)
  // console.log('uploadisSuccess', uploadisSuccess)






  // console.log('message', uploaddata)

  const title = "Upload Success";
  const title1 = "Upload Failed";

  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [jsonData, setJSONData] = useState([]);



  const submitHandler = () => {
    // @ts-ignore
    dispatch(uploadEmployee(jsonData, setProgress));
  };

  const onClickReset = () => {
    dispatch({
      type: reset(),
    });
    setProgress(0);
  };

  useEffect(() => {
    if (uploadisSuccess) {
      fireAlert(title, "Upload Employee  base is successfull", "success");
      // setTimeout(() => {
      //   setisSuccess(false)
      //   setMessage("")
      //   setReload(false)
      // }, 5000); 
    } else if (uploadisError) {
      fireAlert(title1, "Something went wrong", "error");
      dispatch({ type: reset() });
    }
  }, [dispatch, uploadisError, uploadisSuccess])

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
            {/* {uploadisError && (
              <Toast show={uploadisError}>
                <Toast.Body>
                  <span>
                    <i className="fas fa-exclamation-circle" />
                  </span>
                  <p>{uploadisError}!</p>
                  <span>
                    <i className="fas fa-times" onClick={onClickReset} />
                  </span>
                </Toast.Body>
              </Toast>
            )} */}
            {/* {uploadisSuccess && (
              <Toast
                show={uploadisSuccess}
                className="success-toast"
                delay={5000}
                autohide>
                <Toast.Body>
                  <span>
                    <i className="fas fa-exclamation-circle" />
                  </span>
                  <p>Upload customer base is successfull!</p>
                  <span>
                    <i className="fas fa-times" />
                  </span>
                </Toast.Body>
              </Toast>
            )} */}
            <div
              className={progress === 0 ? "upload-icon" : "upload-icon-active"}>
              <i className="fas fa-cloud-upload-alt fa-4x" />
              <p>
                {progress === 0
                  ? "Drag and Drop file or click below"
                  : `Uploading...`}
              </p>
            </div>
            <CSVReader
              onFileLoaded={(data: any) => setJSONData(data)}
              parserOptions={{ header: true }}
            />

            <ProgressBar
              animated
              className="upload-progress-bar"
              now={progress}
            // onClick={onClickReset}
            />
            {/* <div className="disposition-btn">
              <span>
                <input
                  type="reset"
                  style={{ padding: "7px 25px", marginRight: "10px" }}
                  // onClick={onClickReset}
                  value={"Reset"}
                />
                <input
                  type="submit"
                  style={{ padding: "8px 25px" }}
                // disabled={loading && true}
                // value={loading ? "Sending..." : "Upload"}
                // onClick={submitHandler}
                />
              </span>
            </div> */}
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
                  {uploadisLoading ? <Spinner animation="border" size="sm" /> : "Upload"}
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
