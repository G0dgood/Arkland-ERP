import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { fireAlert } from "../../utils/Alert";
import { useAppSelector } from "../../hooks/useDispatch";

const RequestWorkerModal = (props: any) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [request, setRequest] = React.useState([] as any);

  const handleSubmit = async (values?: any) => {
    setLoading(true);
    const createWorkerRequest = { ...request, ...values };
    console.log("createWorkerRequest", createWorkerRequest);
    await axios
      .post(
        `${process.env.REACT_APP_API}/hr/workers-requests`,
        createWorkerRequest
      )
      .then((res: AxiosResponse) => {
        setLoading(false);
        if (res?.data?.success === true || res?.status === 200) {
          const title = "Request for worker submitted";
          const html = `Request submitted`;
          const icon = "success";
          fireAlert(title, html, icon);
          setLgShow(false);
          // navigate(`/site-worker-request`);
        }
      })
      .catch((err) => {
        setLoading(false);
        const html = err?.response?.data?.message;
        const icon = "error";
        const title = "Request submission failed";
        fireAlert(title, html, icon);
      });
  };

  let increaseQuantity = (role: string, role_name: string) => {
    let updatedValues = {
      role: role,
      role_name: role_name,
      requested_quantity: 1,
    };
    if (request?.requests?.length > 0) {
      setRequest((prevState: any) => {
        if (prevState) {
          const existingRequestIndex = prevState?.requests.findIndex(
            (request: any) => request?.role === role
          );
          if (existingRequestIndex > -1) {
            const updatedRequest = [
              ...prevState?.requests.slice(0, existingRequestIndex),
              {
                ...prevState?.requests[existingRequestIndex],
                requested_quantity:
                  prevState?.requests[existingRequestIndex].requested_quantity +
                  1,
              },
              ...prevState?.requests?.slice(existingRequestIndex + 1),
            ];

            return {
              requests: updatedRequest,
            };
          } else {
            const updatedValues = {
              role: role,
              role_name: role_name,
              requested_quantity: 1,
            };
            const updatedRequests = [...prevState?.requests, updatedValues];

            return {
              requests: updatedRequests,
            };
          }
        }
      });
    } else {
      setRequest({
        requests: [
          ...request,
          {
            ...updatedValues,
          },
        ],
      });
    }
  };
  let decreaseQuantity = (role: string) => {
    setRequest((prevState: any) => {
      if (prevState) {
        const existingRequestIndex = prevState.requests.findIndex(
          (request: any) => request.role === role
        );

        if (existingRequestIndex > -1) {
          const updatedRequests = [
            ...prevState.requests.slice(0, existingRequestIndex),
            {
              ...prevState.requests[existingRequestIndex],
              requested_quantity:
                prevState.requests[existingRequestIndex].requested_quantity - 1,
            },
            ...prevState.requests.slice(existingRequestIndex + 1),
          ];

          return {
            requests: updatedRequests,
          };
        }
      }
    });
  };
  const getRequestedQuantity = (role?: any) => {
    const requests = request?.requests?.find((r: any) => r.role === role);
    const quantity = requests ? requests.requested_quantity : 0;

    return <div>{quantity}</div>;
  };
  const roles: any = useAppSelector((state) => state?.roles?.roles);
  const availablleRoles = [] as any;

  roles &&
    roles.forEach((role: any) =>
      availablleRoles.push({
        value: role.id,
        label: role.name,
      })
    );

  return (
    <div id="request-modal">
      <Button
        className="subone-header-flex-btn"
        onClick={() => setLgShow(true)}
      >
        <BsPlusLg size={10} color="#fff" className="Create-plue-account" />{" "}
        Request Worker
      </Button>

      <Modal
        size="lg"
        show={lgShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="request-modal-center"
        style={{
          width: "135%",
        }}
      >
        <Modal.Header id="request-modal-header">
          <span className="request-center-title"> Request Site Worker</span>
          <Button style={{ color: "#252a32" }} onClick={() => setLgShow(false)}>
            <MdOutlineClose size={18} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              reason: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => {
              return (
                <div className="request-modal-body">
                  {/* <div className="Modal-textarea-middle">
                    <div className="col">
                      <div className="form-group">
                        <TextAreaField
                          style={{
                            height: "6rem",
                            lineHeight: "1",
                          }}
                          label="Reason"
                          name="reason"
                          placeholder="Valid reason for request"
                          onChange={(event: any) => {
                            setFieldValue("team", event?.value);
                          }}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="Modal-textarea-middle">
                    {roles?.length > 0 ? (
                      <div className="col">
                        {roles?.map((item: any, i: any) => {
                          return (
                            <div className="form-group request-form-group">
                              <div>
                                <p>{item?.name}</p>
                              </div>
                              <div className="request-button-group">
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  onClick={(e) => decreaseQuantity(item?.id)}
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  style={{
                                    margin: "5px",
                                  }}
                                >
                                  {getRequestedQuantity(item.id)}
                                </button>
                                <div className="input-group-prepend">
                                  <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={(e) =>
                                      increaseQuantity(item.id, item.name)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="btn-modal-container">
                    <Button
                      variant="contained"
                      className="Add-btn-modal"
                      type="submit"
                      onClick={(e) => handleSubmit()}
                    >
                      {isLoading ? (
                        <Spinner animation="border" />
                      ) : (
                        "          Request Worker"
                      )}
                    </Button>
                  </div>
                </div>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default RequestWorkerModal;
