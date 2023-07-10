import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import projectBack from "../../../assets/vectors/project-back.svg";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import TerminationModal from "../../../components/TerminationModal";
import { viewTerminations } from "../../../features/Employee/employeeSlice";




const ViewTerminations = () => {
  const dispatch = useAppDispatch();
  const { viewterminationsdata, viewterminationsisLoading }: any = useAppSelector((state: any) => state.employee)


  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();

  useEffect(() => {
    // @ts-ignore
    dispatch(viewTerminations(id));
  }, [dispatch, id]);





  return (
    <div  >
      {viewterminationsisLoading ? (
        <div className="isLoading-container-view" >
          <BounceLoader
            color={"#990000"}
            loading={viewterminationsisLoading}
          />
        </div>
      ) : (
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
                <TerminationModal item={viewterminationsdata?.data} id={id} />
              </div>
            </div>

            <h4 style={{ marginTop: "3rem" }}>
              Review Termination request
            </h4>

            <div
              className="viewprofile-container"
              style={{ marginTop: "2rem" }}
            >
              <div>
                <div className="getjob-application-details">
                  <p>Misconduct</p>
                  <p>{viewterminationsdata?.data?.reason}</p>
                  <p>Employee</p>
                  <p
                    onClick={() =>
                      navigate(`/employees/employees/${viewterminationsdata?.data?.employee?.id}`)
                    }
                    style={{ cursor: "pointer", color: "blue" }} >
                    {viewterminationsdata?.data?.employee?.full_name}
                  </p>
                  <p>Description</p>
                  <p> {viewterminationsdata?.data?.description} </p>
                  <p>Status</p>
                  <p> {viewterminationsdata?.data?.status} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTerminations;
