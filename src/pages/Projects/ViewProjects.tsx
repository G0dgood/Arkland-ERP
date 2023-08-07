import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectBack from "../../assets/vectors/project-back.svg";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { viewProject } from "../../features/Project/projectSlice";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import UpdateProjectModal from "./UpdateProjectModal";
import SuspendProjectModal from "./SuspendProjectModal";
import CompleteProjectModal from "./CompleteProjectModal";
import CommenceProjectModal from "./CommenceProjectModal";
import { GiCrane } from "react-icons/gi";
import { ProgressBar } from "react-bootstrap";
import CreateWarningModal from "../../components/Modals/CreateWarningModal";
import HttpService from "../../components/HttpService";
import { FaUserCircle } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { SVGLoader } from "../../components/SVGLoader";



const ViewProjects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { viewdata, viewisLoading } = useAppSelector((state: any) => state.project)
  const { commenceisSuccess } = useAppSelector((state: any) => state.project)
  const { updateisSuccess } = useAppSelector((state: any) => state.project)
  const { completeisSuccess } = useAppSelector((state: any) => state.project)
  const { suspendisSuccess } = useAppSelector((state: any) => state.project)
  const { id } = useParams();
  const [isLoading, setisLoading] = useState(false)
  const [teammenbers, setTeammenbers] = useState([])




  useEffect(() => {
    if (viewdata?.team?.id) {
      setTimeout(() => {
        getData()
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewdata, viewdata?.team?.id])

  const getData = async () => {
    setisLoading(true)
    try {
      const teamUrl = `hr/teams/${viewdata?.team?.id}/employees`
      const team: any = await HttpService.get(teamUrl)
      setTeammenbers(team?.data?.data)
      setisLoading(false)

    } catch (error) {
      setisLoading(false)
    }
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(viewProject(id));
    if (updateisSuccess || commenceisSuccess || completeisSuccess || suspendisSuccess) {
      // @ts-ignore
      dispatch(viewProject(id));
    }
  }, [commenceisSuccess, completeisSuccess, dispatch, id, suspendisSuccess, updateisSuccess]);

  return (
    <div>
      {viewisLoading ? (
        <div className="isLoading-container-view" >
          <SVGLoader width={"60px"} height={"60px"} />
        </div>
      ) : !viewdata || viewdata === undefined ? (
        <div className="table-loader-image">
          <div>
            <AiOutlineFundProjectionScreen size={80} color="grey" className="loader-image" />
            <p className="mt-3">No Project details</p>
          </div>
        </div>
      ) : (
        <div className="container-profile-view">
          <div className="user-profile-area">
            <div className="task-manager">task manager</div>
            <div className="side-wrapper">
              <div className="user-profile1">
                <GiCrane size={30} />
                <div className="user-name">{viewdata?.name} </div>
                <div className="user-mail">{viewdata?.location}</div>
              </div>
              <div className="user-notification">
              </div>
              {/* @ts-ignore */}
              <ProgressBar now={viewdata.progress_percentage} striped variant="danger" />
              {/* <div className="task-status">
                <div className="task-stat">
                  <div className="task-number">12</div>
                  <div className="task-condition">Completed</div>
                  <div className="task-tasks">tasks</div>
                </div>
                <div className="task-stat">
                  <div className="task-number">22</div>
                  <div className="task-condition">To do</div>
                  <div className="task-tasks">tasks</div>
                </div>
                <div className="task-stat">
                  <div className="task-number">243</div>
                  <div className="task-condition">All</div>
                  <div className="task-tasks">completed</div>
                </div>
              </div> */}
            </div>
            <div className="side-wrapper">
              <div className="project-title">Project Details </div>
              <div className="project-name">
                <div className="project-department">Country : {viewdata?.country}</div>
                <div className="project-department">LGA : {viewdata?.lga}</div>
                <div className="project-department">State : {viewdata?.state}</div>
                <div className="project-department">Status: {viewdata?.status}</div>
              </div>
            </div>

          </div>
          <div className="main-area">
            <div className="header">
              <div className="search-bar">
              </div>
              <img
                src={projectBack}
                alt="User"
                className="project-back-img"
                onClick={() => navigate(-1)}
                title="Return"
              />

            </div>
            <div className="main-container">
              <div className="inbox-container">
                <div className="inbox">
                  <div className="msg msg-department anim-y">
                    Project Members
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 492 492">
                      <path d="M484.13 124.99l-16.11-16.23a26.72 26.72 0 00-19.04-7.86c-7.2 0-13.96 2.79-19.03 7.86L246.1 292.6 62.06 108.55c-5.07-5.06-11.82-7.85-19.03-7.85s-13.97 2.79-19.04 7.85L7.87 124.68a26.94 26.94 0 000 38.06l219.14 219.93c5.06 5.06 11.81 8.63 19.08 8.63h.09c7.2 0 13.96-3.57 19.02-8.63l218.93-219.33A27.18 27.18 0 00492 144.1c0-7.2-2.8-14.06-7.87-19.12z"></path>
                    </svg>
                  </div>
                  {/* <div className="msg selected-bg anim-y">
                    <input type="checkbox" name="msg" id="mail1" className="mail-choice" checked />
                    <label htmlFor="mail1"></label>
                    <div className="msg-content">
                      <div className="msg-title">Write an articke about design</div>
                      <div className="msg-date">22 Feb, 2019</div>
                    </div>
                    <img id="img" src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="members mail-members" />
                  </div> */}
                  {isLoading ?
                    <div className=" " style={{ display: "flex", justifyContent: "center", marginTop: "10rem" }} >
                      <SVGLoader width={"60px"} height={"60px"} />
                    </div> :
                    !teammenbers || teammenbers === undefined || teammenbers.length === 0 ? (
                      <div style={{ display: "flex", justifyContent: "center", marginTop: "10rem", alignItems: "center", alignSelf: "center", textAlign: "center" }}>
                        <div>
                          <FaUserCircle size={50} color="grey" className="loader-image" />
                          <p className="mt-3">No Project Team member Found!</p>
                        </div>
                      </div>
                    ) :
                      teammenbers.map((team: any, i: any) => (

                        <div className="msg anim-y">
                          <input type="checkbox" name="msg" id="mail2" className="mail-choice" />
                          <label htmlFor="mail2"></label>
                          <div className="msg-content">
                            <div className="msg-title">{team?.employee?.full_name} </div><br />
                            {/* <div className="msg-date">{moment(team?.created_at).format("DD-MM-YYYY")}b</div> */}
                          </div>
                          <FaUserCircle size={20} className="members mail-members" />
                        </div>
                      ))}
                  {/* <div className="msg selected-bg anim-y">
                    <input type="checkbox" name="msg" id="mail3" className="mail-choice" checked />
                    <label htmlFor="mail3"></label>
                    <div className="msg-content">
                      <div className="msg-title">Chicharrones craft beer tattooed</div>
                      <div className="msg-date">22 Feb, 2019</div>
                    </div>
                    <img id="img" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=998&q=80" alt="" className="members mail-members" />
                  </div> */}

                </div>
                <div className="add-task">
                  {/* <CreateTaskModal view={"team"} id={id} /> */}
                  <CreateWarningModal />
                </div>
              </div>
              <div className="mail-detail">
                <div className="mail-detail-header">
                  <div className="mail-detail-profile">
                    <BiUser size={30} className="members inbox-detail" />
                    <div className="mail-detail-name">{viewdata?.name}</div>
                  </div>
                  <div className="mail-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash-2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                    </svg>

                  </div>
                </div>
                <div className="mail-contents">
                  <div className="mail-contents-subject">
                    <input type="checkbox" name="msg" id="mail20" className="mail-choice" checked />
                    <label htmlFor="mail20"></label>
                    <div className="mail-contents-title">{viewdata?.name} Project Description</div>
                  </div>
                  <div className="mail">
                    <div className="mail-inside">{viewdata?.description}</div>

                    <div className="mail-checklist">
                      <input type="checkbox" name="msg" id="mail30" className="mail-choice" checked />
                      <label htmlFor="mail30">Project Update.</label>
                    </div>
                    {(viewdata?.status === "pending") &&
                      <div className="mail-doc">
                        <div className="mail-doc-wrapper">
                          <BsDot size={20} />
                          <div className="mail-doc-detail">
                            <div className="mail-doc-name">Commence Project</div>
                          </div>
                        </div>
                        <div className="mail-doc-icons">
                          <div className="add-task">
                            <CommenceProjectModal id={id} title={viewdata?.name} />
                          </div>
                        </div>
                      </div>}
                    {(viewdata?.status === "commenced" || viewdata?.status === "reseted" || viewdata?.status === "suspended") &&
                      <div className="mail-doc">
                        <div className="mail-doc-wrapper">
                          <BsDot size={20} />
                          <div className="mail-doc-detail">
                            <div className="mail-doc-name">Complete Project</div>

                          </div>
                        </div>
                        <div className="mail-doc-icons">
                          <div className="add-task">
                            <CompleteProjectModal id={id} title={viewdata?.name} />
                          </div>
                        </div>
                      </div>
                    }
                    {viewdata?.status === "commenced" &&
                      <div className="mail-doc">
                        <div className="mail-doc-wrapper">
                          <BsDot size={20} />
                          <div className="mail-doc-detail">
                            <div className="mail-doc-name">Suspend Project</div>

                          </div>
                        </div>
                        <div className="mail-doc-icons">
                          <div className="add-task">
                            <SuspendProjectModal id={id} title={viewdata?.name} />
                          </div>
                        </div>
                      </div>
                    }
                    <div className="mail-doc">
                      <div className="mail-doc-wrapper">
                        <BsDot size={20} />
                        <div className="mail-doc-detail">
                          <div className="mail-doc-name">Update Project</div>

                        </div>
                      </div>
                      <div className="mail-doc-icons">
                        <div className="add-task">
                          <UpdateProjectModal id={id} title={viewdata?.name} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>)}
    </div>
  )
}

export default ViewProjects
