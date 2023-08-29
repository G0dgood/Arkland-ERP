/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { reset, viewDepartments } from "../../features/Department/departmentSlice";
import DeleteDepartment from "../../components/Modals/DeleteDepartment";
import projectBack from "../../assets/vectors/project-back.svg";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";
import { SVGLoader } from "../../components/SVGLoader";
import CreateDepartmentModal from "../../components/Modals/CreateDepartmentModal";



const ViewDepartments = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { viewdata, viewisError, viewisLoading, viewmessage, viewisSuccess } = useAppSelector((state: any) => state.department)



  useEffect(() => {
    if (viewisSuccess) {
      dispatch(reset());
    }
  }, [viewisError, viewmessage, dispatch, viewisSuccess])


  useEffect(() => {
    // @ts-ignore
    dispatch(viewDepartments(id));
    if (viewmessage === "Request failed with status code 500") {
      // @ts-ignore
      dispatch(viewDepartments(id));
    }
  }, [dispatch, id, viewmessage]);






  return (
    <div>
      {
        viewisLoading ? (
          <div className="isLoading-container-view" >
            <SVGLoader width={"60px"} height={"60px"} />
          </div>
        ) : !viewdata || viewdata === undefined ? (
          <div className="table-loader-announcement">
            <div>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src="https://img.icons8.com/wired/64/null/department.png" />
              <p className="mt-3">No department details</p>
            </div>
          </div>
        ) : (
          <div  >

            <div className="EssentialsContainer">
              <div className="employee-main-div-col">
                <div className="employee-main-div-col-header">
                  <div>
                    <img
                      src={projectBack}
                      alt="User"
                      className="project-back-img"
                      onClick={() => navigate(-1)}
                      title="Return"
                    />
                  </div>
                  <div className="employee-main-div-col-header-buttons">
                    <CreateDepartmentModal edit={"Edit Department"} id={viewdata?.department?.id} />
                    <DeleteDepartment id={viewdata?.department?.id} />
                  </div>
                </div>

                <h4 style={{ marginTop: "3rem" }}>
                  Department details
                </h4>

                <div
                  className="viewprofile-container"
                  style={{ marginTop: "2rem" }}
                >
                  <div>
                    <div className="getjob-application-details">
                      <p>Department Name</p>
                      <p style={{ cursor: "pointer", color: "blue", }}  >
                        {viewdata?.department?.name}
                      </p>
                      <p>Description</p>
                      <p> {viewdata?.department?.description} </p>

                      <p>Status</p>
                      <p> {viewdata?.department?.status} </p>

                      <p >Department ID</p>
                      <div style={{ display: "flex" }}>
                        <p> {viewdata?.department?.id} </p>
                        <CopyToClipboardButton url={viewdata?.department?.id} padding={"6px"} size={20} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )
      }
    </div>
  );
};

export default ViewDepartments;
