import React, { useEffect, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import SyncLoader from "react-spinners/SyncLoader";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CreateDepartmentModal from "../../components/Modals/CreateDepartmentModal";

import { getUserPrivileges } from "../../functions/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { allDepartments } from "../../features/Department/departmentSlice";

const DepartmentsView = () => {
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, message } = useAppSelector((state: any) => state.department)




  const navigate = useNavigate();
  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();
  const [newDepartmentCreated, setNewDepartmentCreated] = React.useState({} as any);
  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });

  useEffect(() => {
    // @ts-ignore
    dispatch(allDepartments());
  }, [dispatch]);
  // const { departments, isLoading, error, message } =
  //   useDepartments(newDepartmentCreated);

  const handleNewDepartmentCreated = () => {
    setNewDepartmentCreated(!newDepartmentCreated);
  };
  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };

  // const randColor = () => {
  //   const realColor =
  //     "#" +
  //     Math.floor(Math.random() * 16777215)
  //       .toString(16)
  //       .padStart(6, "0")
  //       .toUpperCase();
  //   console.log("realColor", realColor);
  //   return realColor;
  // };

  const isPrime = (num: number) => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  };

  const [subnav, setSubnav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("Provider")) || false;
  });

  useEffect(() => {
    localStorage.setItem("Provider", JSON.stringify(subnav));
  }, [subnav]);


  return (
    <div  >

      <div className="ProjectViewContainer">
        <div className="ProjectViewContainer-subone">
          <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
            <h5>Department</h5>
            {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
              <div className="Request-btn-modal-container">
                <div className="Request-btn">
                  <CreateDepartmentModal
                    onNewDepartmentCreated={handleNewDepartmentCreated}
                  />
                </div>
              </div>
            )}
          </div>
          {isLoading ? (
            <div className="isLoading-container">
              <SyncLoader color={"#990000"} loading={isLoading} />
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
                  onClick={() => navigate(`/departments/${item?.id}`)}
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
