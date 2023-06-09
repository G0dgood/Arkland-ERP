import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import projectBack from "../../../assets/vectors/project-back.svg";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import TerminationModal from "../../../components/TerminationModal";
import { reset, viewTerminations } from "../../../features/Employee/employeeSlice";
import { fireAlert } from "../../../utils/Alert";



const ViewTerminations = () => {
  const dispatch = useAppDispatch();
  const { viewterminationsdata, viewterminationsisError, viewterminationsisLoading, viewterminationsmessage }: any = useAppSelector((state: any) => state.employee)


  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();

  useEffect(() => {
    // @ts-ignore
    dispatch(viewTerminations(id));
  }, [dispatch, id]);


  useEffect(() => {
    if (viewterminationsisError) {
      fireAlert('Terminations ', viewterminationsmessage, "error");
      dispatch(reset());
    }
  }, [dispatch, id, viewterminationsisError, viewterminationsmessage])


  return (
    <div  >
      {viewterminationsisLoading ? (
        <div
          style={{
            margin: "auto",
            width: "20%",
          }}
        >
          <SyncLoader
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
                      navigate(`/employees/${viewterminationsdata?.data?.employee?.id}`)
                    }
                    style={{
                      cursor: "pointer",
                      color: "blue",
                    }}
                  >
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
