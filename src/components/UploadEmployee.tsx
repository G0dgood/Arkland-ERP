import React, { useEffect, useState } from "react";
import CSVReader from "react-csv-reader";
import { Modal, Toast, ProgressBar, Spinner } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";
import { reset, uploadEmployee } from "../features/Employee/employeeSlice";
import { fireAlert } from "../utils/Alert";
import { handleRequestPost } from "./handleRequest/handleRequest";



import axios from "axios";
import HttpService from "./HttpService";


const UploadEmployee = () => {
  const dispatch = useAppDispatch();
  // const { uploaddata, uploadisError, uploadisLoading, uploadmessage, uploadisSuccess } = useAppSelector((state: any) => state.employee)



  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setisError] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const url = `hr/employees/bulk-upload`


  const title = "Upload Success";
  const title1 = "Upload Failed";

  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [file, setFile] = useState<any>()




  const submitHandler = async () => {
    // console.log('url', url)
    // console.log('file', file)
    // setisLoading(true)
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('fileName', file?.name);


    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // };
    // axios.post(url, formData, config)
    //   .then((response) => {
    //     console.log('response', response);

    // if (response.data.message === "success") {
    //   setData(response.data.data);
    //   fireAlert(title, "Upload Employee base is successfull", "success");
    //   setisLoading(false)
    // } else if (response.data.message === "error") {
    //   fireAlert(title1, message, "error");
    //   setisLoading(false)
    // }
    // })
    // .catch((error) => {
    //   console.log('error', error);
    //   setisLoading(false)
    // });

    await HttpService.uploadFile(url, {}, { employees: file })
      .then((response) => {
        console.log('response', response);
        setisLoading(false)
      })
      .catch((error) => {
        console.log('error', error);
        setisLoading(false)
      })



    // handleRequestPost(setData, setMessage, setisError, setisSuccess, setisLoading, url, file, setProgress)
    // @ts-ignore
    // dispatch(uploadEmployee(jsonData, setProgress));

  };

  // const onClickReset = () => { 
  //   setProgress(0);
  // };

  function handleChange(event: any) {
    setFile(event.target.files[0])
    // handleSubmit(file)
  }


  useEffect(() => {
    if (isSuccess) {
      fireAlert("Upload Employee base is successfull", "success");
      setTimeout(() => {
        setisSuccess(false)
        setMessage("")
        // setReload(false)
      }, 5000);
    } else if (isError) {
      fireAlert(message, "error");
      setTimeout(() => {
        setisError(false)
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
            {/* <CSVReader
              onFileLoaded={(data: any) => setJSONData(data)}
              parserOptions={{ header: true }}
            /> */}
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
