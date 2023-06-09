import { useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import SyncLoader from "react-spinners/SyncLoader";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CreateDepartmentModal from "../../components/Modals/CreateDepartmentModal";
import { getUserPrivileges } from "../../functions/auth";
import { allDepartments, reset } from "../../features/Department/departmentSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { fireAlert } from "../../utils/Alert";
import { BounceLoader } from "react-spinners";

const DepartmentsView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isError, isLoading, message } = useAppSelector((state: any) => state.department)
  const { createisSuccess } = useAppSelector((state: any) => state.department)

  useEffect(() => {
    if (message === "Request failed with status code 500" ? false : message) {
      fireAlert("Department error", message, "error");
      dispatch(reset());
    }
  }, [isError, message, dispatch])

  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();



  useEffect(() => {
    // @ts-ignore
    dispatch(allDepartments());
    if (createisSuccess) {
      dispatch(allDepartments());
    } else if (message === "Request failed with status code 500") {
      dispatch(allDepartments());
    }
  }, [createisSuccess, dispatch, message]);





  const isPrime = (num: number) => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  };




  return (
    <div  >

      <div className="ProjectViewContainer">
        <div className="ProjectViewContainer-subone">
          <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
            <h5>Department</h5>
            {/* {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && ( */}
            <div className="Request-btn-modal-container">
              <div className="Request-btn">
                <CreateDepartmentModal
                />
              </div>
            </div>
            {/* )} */}
          </div>
          {isLoading ? (
            <div className="isLoading-container">
              <BounceLoader
                color={"#990000"} loading={isLoading} />
            </div>
          ) : data?.length === 0 || data?.length === undefined ? (
            <div className="table-loader-announcement">
              <div>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src="https://img.icons8.com/wired/64/null/department.png" />
                <p className="mt-3">No department found</p>
              </div>
            </div>
          ) : (
            <div className="subone-col-3">
              {data?.map((item: any, i: any) => (
                <div
                  className="ProjectView-card"
                  key={i}
                  onClick={() => navigate(`/departments/departments/${item?.id}`)}
                >
                  <div className="iDotsHorizontalRounded">
                    <Button
                      className={
                        i % 2 === 0
                          ? `iDotsRounded1`
                          : isPrime(parseInt(i, 10))
                            ? "iDotsRounded2"
                            : "iDotsRounded3"
                      }
                    >
                      {item?.name}
                    </Button>
                    <BiDotsHorizontalRounded color="#97979B" />
                  </div>
                  <div className="iDotsRounded-text">{item?.name}</div>
                  <div className="iDotsRounded-text">{item?.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentsView;

