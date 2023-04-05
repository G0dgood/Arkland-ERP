import React, { useEffect, useState, CSSProperties } from "react";
import { BiDotsHorizontalRounded, BiEditAlt, BiTime } from "react-icons/bi";
import SyncLoader from "react-spinners/SyncLoader";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CreateDepartmentModal from "../../components/Modals/CreateDepartmentModal";
import { getRequestOptions } from "../../utils/auth/header";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useDepartments } from "../../hooks/useDepartments";
import { MdOutlineMapsHomeWork } from "react-icons/md";

const DepartmentsView = () => {
  const navigate = useNavigate();
  const [newDepartmentCreated, setNewDepartmentCreated] = React.useState(
    {} as any
  );
  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  const { departments, isLoading, error, message } =
    useDepartments(newDepartmentCreated);

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
  const randColor = () => {
    const realColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase();
    console.log("realColor", realColor);
    return realColor;
  };

  // console.log(randColor());

  const numbers = [1, 2, 3, 4, 5];

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div className="ProjectViewContainer">
          <div className="ProjectViewContainer-subone">
            <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
              <h5>Department</h5>
              <div className="Request-btn-modal-container">
                <div className="Request-btn">
                  <CreateDepartmentModal
                    onNewDepartmentCreated={handleNewDepartmentCreated}
                  />
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="isLoading-container">
                <SyncLoader color={"#990000"} loading={isLoading} />
              </div>
            ) : departments?.length === 0 ? (
              <div className="table-loader-announcement">
                <div>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <img src="https://img.icons8.com/wired/64/null/department.png" />
                  <p className="mt-3">No department found</p>
                </div>
              </div>
            ) : (
              <div className="subone-col-3">
                {departments?.map((item: any, i: any) => (
                  <div
                    className="ProjectView-card"
                    key={i}
                    onClick={() => navigate(`/departments/${item?.id}`)}
                  >
                    <div className="iDotsHorizontalRounded">
                      <Button
                        className={
                          i % 2 === 0 ? `iDotsRounded1` : `iDotsRounded2`
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
      </main>
    </div>
  );
};

export default DepartmentsView;
