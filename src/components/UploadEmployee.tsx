import React, { useEffect, useState } from "react";
import { Modal, Toast, ProgressBar, Spinner } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";
import { FiUpload, FiUploadCloud } from "react-icons/fi";
import { fireAlert } from "../utils/Alert";
import HttpService from "./HttpService";
import { useAppDispatch } from "../store/useStore";
import createHttpService from "./HttpService";
import { ModalHeader } from "./Modals/ModalOptions";


const UploadEmployee = () => {
  const dispatch = useAppDispatch();
  const [isSuccess, setisSuccess] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const url = `hr/employees/bulk-upload`


  const [progress, setProgress] = useState(0);
  const [show, setLgShow] = useState(false);
  const handleClose = () => {
    setLgShow(false);
  };
  const handleShow = () => setLgShow(true);
  const [file, setFile] = useState<any>()




  const submitHandler = async () => {
    const HttpService = createHttpService();
    setisLoading(true)
    await HttpService.uploadFile(url, {}, { employees: file })
      .then((response) => {
        setisLoading(false)
        setisSuccess(true)
      })
      .catch((error) => {
        // console.log('error', error);
        setisLoading(false)
      })

  };


  function handleChange(event: any) {
    setFile(event.target.files[0])
  }


  useEffect(() => {
    if (isSuccess) {
      fireAlert('Upload Employee', "Upload Employee base is successfull", "success");
      setTimeout(() => {
        setisSuccess(false)
      }, 5000);
    }
  }, [dispatch, isSuccess])



  return (
    <>

      <li className={"active"} onClick={handleShow}>  <FiUpload className="icon-space" /> Upload</li>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="logic-modal">
        <ModalHeader setLgShow={setLgShow} icon={<FiUploadCloud size={30} />} title={"Upload File"} subtitle={"Upload A File"} />
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
            {/* <ProgressBar
              animated
              className="upload-progress-bar"
              now={progress}
            // onClick={onClickReset}
            /> */}


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
                  {isLoading ? <Spinner animation="border" size="sm" /> : "Upload"}
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
