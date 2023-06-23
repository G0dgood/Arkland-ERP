import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { ProgressBar } from "react-bootstrap";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { allProject } from "../../features/Project/projectSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { getUserPrivileges } from "../../functions/auth";
import CreateProjectModal from "../../components/Modals/CreateProjectModal";
import { BounceLoader } from "react-spinners";

const ProjectView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, isLoading, message } = useAppSelector((state: any) => state.project)




  useEffect(() => {
    // @ts-ignore
    dispatch(allProject());

  }, [dispatch, message]);

  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin, isTeamLead } = getUserPrivileges();







  const isPrime = (num: number) => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  };

  return (
    <div  >
      <div className="ProjectViewContainer">
        <div className="ProjectViewContainer-subone">
          <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
            <h5>Projects</h5>
            <div className="Request-btn-modal-container">
              {/* {(isHRHead ||
                isSuperAdmin ||
                isAdmin ||
                isHrAdmin ||
                isTeamLead) && ( */}
              <div className="Request-btn">
                <CreateProjectModal />
              </div>
              {/* )} */}
              {/* {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && ( */}
              {/* <div>
                <Button
                  className="subone-header-flex-btn"
                  onClick={() => navigate("/site-worker-request")}
                >
                  <BsPlusLg
                    size={10}
                    color="#fff"
                    className="Create-plue-account"
                  />{" "}
                  Request Worker List
                </Button>
              </div> */}
              {/* )} */}
            </div>
          </div>
          <div className="subone-col-2">
            <div className="subone-col-sup1">
              <span>Started</span>
              <span className="subone-col-sup1-circle">
                <BsPlusLg size={10} color="#5F5E68" />
              </span>
            </div>
            <div className="subone-col-sup2">
              <span>On Going</span>
              <span className="subone-col-sup1-circle">
                <BsPlusLg size={10} color="#5F5E68" />
              </span>
            </div>
            <div className="subone-col-sup3">
              <span>Completed</span>
              <span className="subone-col-sup1-circle">
                <BsPlusLg size={10} color="#5F5E68" />
              </span>
            </div>
          </div>
          {isLoading ? (
            <div className="isLoading-container">
              <BounceLoader
                color={"#990000"} loading={isLoading} />
            </div>
          ) : data?.length === 0 ? (
            <div className="table-loader-announcement">
              <div>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src="https://img.icons8.com/dotty/80/null/test-passed.png" />
                <p className="mt-3">No project found</p>
              </div>
            </div>
          ) : (
            <>
              <div className="subone-col-3">
                {data?.map((item: any, i: any) => (
                  <div
                    className="ProjectView-card"
                    key={i}
                    onClick={() => navigate(`/projects/projects/${item.id}`)}
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
                        {item.name}
                      </Button>
                      <BiDotsHorizontalRounded color="#97979B" />
                    </div>
                    <div className="iDotsRounded-text">
                      Location: {item.location}
                    </div>
                    <div className="iDotsRounded-percent">
                      {item.progress_percentage}%
                    </div>
                    <div className="legend-details">
                      <ProgressBar now={item.progress_percentage} />
                    </div>
                    <div className="iDotsRounded-percent-people">
                      <div className="iDotsRounded-percent-list">
                        <span className="profile-containers">BS</span>
                        <span className="profile-containers">BN</span>
                        <span className="profile-containers">JA</span>
                        <span className="profile-containers">AD</span>
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
            </>
          )}
        </div>
        <div className="ProjectViewContainer-subtwo">
          <div className="subtwo-content-one">
            {/* <div className="subtwo-content-one-sub1">
                <div className="subtwo-content-one-sub1-content">
                  <p>SELECTED</p>
                  <h5>Design Team</h5>
                </div>
                <div className="subtwo-content-one-sub1-content-two">
                  <HiOutlineUserGroup size={28} />
                </div>
              </div> */}
            {/* <div className="subtwo-content-two-sub2">
                <div
                >
                  <ChartDonut
                    ariaDesc="Progress"
                    ariaTitle="Progress"
                    constrainToVisibleArea={true}
                    data={[
                      { x: "Completed", y: 100 },
                      { x: "Pending", y: 100 - +10 },
                    ]}
                    title="35%"
                    colorScale={["#48AB62", "#116327"]}
                    height={200}
                    width={200}
                    padAngle={0}
                    innerRadius={50}
                  />
                </div>
              </div> */}
            <div className="subtwo-content-three-sub3">
              <p>Projects</p>
              <div className="ProjectView-projects">
                <div className="projects-total1">
                  <h6>TOTAL</h6>
                  <div className="projects-total-container">
                    <span className="projects-total1-span"></span>
                    <span className="projects-total1-span1">
                      {data?.length}
                    </span>
                  </div>
                </div>
                {/* <div className="projects-total2">
                  <h6>COMPLETED</h6>
                  <div className="projects-total-container">
                    <span className="projects-total2-span"></span>
                    <span className="projects-total1-span1">0</span>
                  </div>
                </div>
                <div className="projects-total3">
                  <h6>IN PROGRESS</h6>
                  <div className="projects-total-container">
                    <span className="projects-total3-span"></span>
                    <span className="projects-total1-span1">0</span>
                  </div>
                </div> */}
                {/* <div className="projects-total4">
                  <h6>WAITING</h6>
                  <div className="projects-total-container">
                    <span className="projects-total4-span"></span>
                    <span className="projects-total1-span1">0</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className="subtwo-content-two">
              <div className="subtwo-content-two-flex">
                <div className="subtwo-content-side">
                  <div className="content-side">
                    <BiTime color="#FFFFFF" size={25} />
                  </div>
                  <div>
                    <div className="content-side-day">Sunday,20 December</div>
                    <div className="content-side-time">08:00 - 11:00am</div>
                  </div>
                </div>
                <div subtwo-content-side1>
                  <BiEditAlt size={20} color="#787B88" />
                </div>
              </div>
               <div className="subtwo-content-two-flex1">
                <div className="subtwo-content-side">
                  <div className="content-side1">
                    <MdOutlineMarkEmailUnread color="#FFFFFF" size={25} />
                  </div>
                  <div>
                    <div className="content-side-day">Sunday,20 December</div>
                    <div className="content-side-time">08:00 - 11:00am</div>
                  </div>
                </div>
                <div subtwo-content-side1>
                  <BsChevronDown size={20} color="#787B88" />
                </div>
              </div>  
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
