import React, { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CreateDepartmentModal from "../../components/Modals/CreateDepartmentModal";
import { getRequestOptions } from "../../utils/auth/header";

import { NoRecordFound, TableFetch } from "../../components/TableOptions";


const DepartmentsView = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [departments, setDepartments] = useState([] as any);
  const [message, setMessage] = useState("");
  const [newDepartmentCreated, setNewDepartmentCreated] = React.useState(false);








  return (
    <div  >
      <div className="ProjectViewContainer">
        <div className="ProjectViewContainer-subone">
          <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
            <h5>Department</h5>
            <div className="Request-btn-modal-container">
              <div className="Request-btn">
                {/* <CreateDepartmentModal onNewDepartmentCreated={handleNewDepartmentCreated} /> */}
              </div>
            </div>
          </div>
          {isLoading ? (
            // <div
            //   style={{
            //     margin: "auto",
            //     width: "20%",
            //   }}
            // >
            //   <SyncLoader
            //     cssOverride={override}
            //     color={"#990000"}
            //     loading={isLoading}
            //   />
            // </div>
            <TableFetch colSpan={9} />
          ) : departments?.length === 0 || departments === undefined ? (
            <NoRecordFound colSpan={9} />
          ) : (
            <div className="subone-col-3">
              {departments?.map((item: any, i: any) => (
                <div className="ProjectView-card" key={i}
                  onClick={() => navigate(`/departments/${item?.id}`)}
                >
                  <div className="iDotsHorizontalRounded">
                    <Button className={`iDotsRounded1`}>{item?.name}</Button>
                    <BiDotsHorizontalRounded color="#97979B" />
                  </div>
                  <div className="iDotsRounded-text">{item?.name}</div>
                  <div className="iDotsRounded-text">{item?.description}</div>

                  <div className="iDotsRounded-percent-people">
                    <div className="iDotsRounded-percent-list">
                      <span className="profile-containers">Status</span>
                      <span className="profile-containers">
                        {item?.status}
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
                      {departments?.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsView;
