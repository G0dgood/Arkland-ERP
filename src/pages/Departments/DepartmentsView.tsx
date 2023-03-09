import React, { useEffect, useState, CSSProperties } from "react";
import { BiDotsHorizontalRounded, BiEditAlt, BiTime } from "react-icons/bi";
import SyncLoader from "react-spinners/SyncLoader";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CreateDepartmentModal from "../../components/Modals/CreateDepartmentModal";
import { getRequestOptions } from "../../utils/auth/header";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const DepartmentsView = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [departments, setDepartments] = useState([] as any);
  const [message, setMessage] = useState("");
  const [newDepartmentCreated, setNewDepartmentCreated] = React.useState(false);

  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API}/hr/departments`,
          getRequestOptions
        );
        const isJsonResponse = response.headers
          ?.get("content-type")
          ?.includes("application/json");
        const data = isJsonResponse && (await response.json());
        if (!response.ok) {
          throw new Error(data.message || response.status);
        }
        setDepartments([...data.data]);
        setisLoading(false);
        setError(false);
        setMessage("");
      } catch (error: any) {
        setisLoading(false);
        setError(true);
        setMessage(error.message || "Something went wrong");
        setTimeout(() => {
          fetchData();
        }, 3000);
      }
    };
    fetchData();
  }, [newDepartmentCreated]);
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
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: "99.8%",
    borderRadius: "50px",
  };

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
              <div
                style={{
                  margin: "auto",
                  width: "20%",
                }}
              >
                <SyncLoader
                  cssOverride={override}
                  color={"#990000"}
                  loading={isLoading}
                />
              </div>
            ) : (
              <div className="subone-col-3">
                {departments?.map((item: any, i: any) => (
                  <div
                    className="ProjectView-card"
                    key={i}
                    onClick={() => navigate(`${item.id}`)}
                  >
                    <div className="iDotsHorizontalRounded">
                      <Button className={`iDotsRounded1`}>{item.name}</Button>
                      <BiDotsHorizontalRounded color="#97979B" />
                    </div>
                    <div className="iDotsRounded-text">{item.name}</div>
                    <div className="iDotsRounded-text">{item.description}</div>

                    <div className="iDotsRounded-percent-people">
                      <div className="iDotsRounded-percent-list">
                        <span className="profile-containers">Status</span>
                        <span className="profile-containers">
                          {item.status}
                        </span>
                      </div>
                      {/* <div className="percent-people-grid">
						<div>
						  <HiOutlinePaperClip />6
						</div>
						<div>
						  <HiOutlineChatBubbleOvalLeftEllipsis />4
						</div>
					  </div> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="ProjectViewContainer-subtwo">
            <div className="subtwo-content-one">
              <div className="subtwo-content-three-sub3">
                <p>Departments</p>
                <div className="ProjectView-projects">
                  <div className="projects-total1">
                    <h6>TOTAL</h6>
                    <div className="projects-total-container">
                      <span className="projects-total1-span"></span>
                      <span className="projects-total1-span1">
                        {departments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DepartmentsView;
