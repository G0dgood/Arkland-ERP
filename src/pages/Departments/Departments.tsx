import { useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CreateDepartmentModal from "../../components/Modals/CreateDepartmentModal";
import { allDepartments } from "../../features/Department/departmentSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { SVGLoader } from "../../components/SVGLoader";

const DepartmentsView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading, } = useAppSelector((state: any) => state.department)
  const { createisSuccess } = useAppSelector((state: any) => state.department)

  useEffect(() => {
    // @ts-ignore
    dispatch(allDepartments());
    if (createisSuccess) {
      dispatch(allDepartments());
    }
  }, [createisSuccess, dispatch]);


  const isPrime = (num: number) => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  };


  return (
    <div >
      <div className="ProjectViewContainer">
        <div className="ProjectViewContainer-subone">
          <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
            <h5>Department</h5>
            <div className="Request-btn-modal-container">
              <div className="Request-btn">
                <CreateDepartmentModal />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="isLoading-container">
              <SVGLoader width={"60px"} height={"60px"} />
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
                      }>
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

