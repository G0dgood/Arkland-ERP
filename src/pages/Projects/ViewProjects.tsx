import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectBack from "../../assets/vectors/project-back.svg";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { reset, viewProject } from "../../features/Project/projectSlice";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import UpdateProjectModal from "./UpdateProjectModal";
import SuspendProjectModal from "./SuspendProjectModal";
import CompleteProjectModal from "./CompleteProjectModal";
import CommenceProjectModal from "./CommenceProjectModal";
import { fireAlert } from "../../utils/Alert";
import CreateTaskModal from "../Tasks/CreateTaskModal";
import { BounceLoader } from "react-spinners";
import { getTeammembers } from "../../features/Team/teamSlice";



const ViewProjects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { viewdata, viewisError, viewisLoading, viewmessage, viewisSuccess } = useAppSelector((state: any) => state.project)
  const { commenceisSuccess } = useAppSelector((state: any) => state.project)
  const { updateisSuccess } = useAppSelector((state: any) => state.project)
  const { completeisSuccess } = useAppSelector((state: any) => state.project)
  const { suspendisSuccess } = useAppSelector((state: any) => state.project)
  const { id } = useParams<{ id: string }>();




  // useEffect(() => {
  //   if (viewmessage === "Request failed with status code 500" ? false : viewmessage) {
  //     fireAlert("View Project  failed", viewmessage, "error");
  //     dispatch(reset());
  //   } else if (viewmessage === "Request failed with status code 500") {
  //     // @ts-ignore
  //     // dispatch(getTeammembers(id));
  //     // @ts-ignore
  //     dispatch(viewProject(id));
  //   }
  // }, [updateisSuccess, viewmessage, dispatch, viewisError, id]);

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
          <BounceLoader color={"#990000"} loading={viewisLoading} />
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
                <img id="img" src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="user-photo" />
                <div className="user-name">{viewdata?.name}</div>
                <div className="user-mail">{viewdata?.location}</div>
              </div>
              <div className="user-notification">
                <div className="notify">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M13.533 5.6h-.961a.894.894 0 01-.834-.57.906.906 0 01.197-.985l.675-.675a.466.466 0 000-.66l-1.32-1.32a.466.466 0 00-.66 0l-.676.677a.9.9 0 01-.994.191.906.906 0 01-.56-.837V.467A.467.467 0 007.933 0H6.067A.467.467 0 005.6.467v.961c0 .35-.199.68-.57.834a.902.902 0 01-.983-.195L3.37 1.39a.466.466 0 00-.66 0L1.39 2.71a.466.466 0 000 .66l.675.675c.25.25.343.63.193.995a.902.902 0 01-.834.56H.467A.467.467 0 000 6.067v1.866c0 .258.21.467.467.467h.961c.35 0 .683.202.834.57a.904.904 0 01-.197.984l-.675.676a.466.466 0 000 .66l1.32 1.32a.466.466 0 00.66 0l.68-.68a.894.894 0 01.994-.187.897.897 0 01.556.829v.961c0 .258.21.467.467.467h1.866c.258 0 .467-.21.467-.467v-.961c0-.35.202-.683.57-.834a.904.904 0 01.984.197l.676.675a.466.466 0 00.66 0l1.32-1.32a.466.466 0 000-.66l-.68-.68a.894.894 0 01-.187-.994.897.897 0 01.829-.556h.961c.258 0 .467-.21.467-.467V6.067a.467.467 0 00-.467-.467zM7 9.333C5.713 9.333 4.667 8.287 4.667 7S5.713 4.667 7 4.667 9.333 5.713 9.333 7 8.287 9.333 7 9.333z" />
                  </svg>
                </div>
                <div className="notify alert">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M10.688 95.156C80.958 154.667 204.26 259.365 240.5 292.01c4.865 4.406 10.083 6.646 15.5 6.646 5.406 0 10.615-2.219 15.469-6.604 36.271-32.677 159.573-137.385 229.844-196.896 4.375-3.698 5.042-10.198 1.5-14.719C494.625 69.99 482.417 64 469.333 64H42.667c-13.083 0-25.292 5.99-33.479 16.438-3.542 4.52-2.875 11.02 1.5 14.718z" />
                    <path d="M505.813 127.406a10.618 10.618 0 00-11.375 1.542C416.51 195.01 317.052 279.688 285.76 307.885c-17.563 15.854-41.938 15.854-59.542-.021-33.354-30.052-145.042-125-208.656-178.917a10.674 10.674 0 00-11.375-1.542A10.674 10.674 0 000 137.083v268.25C0 428.865 19.135 448 42.667 448h426.667C492.865 448 512 428.865 512 405.333v-268.25a10.66 10.66 0 00-6.187-9.677z" />
                  </svg>
                </div>
                <div className="notify alert">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M467.812 431.851l-36.629-61.056a181.363 181.363 0 01-25.856-93.312V224c0-67.52-45.056-124.629-106.667-143.04V42.667C298.66 19.136 279.524 0 255.993 0s-42.667 19.136-42.667 42.667V80.96C151.716 99.371 106.66 156.48 106.66 224v53.483c0 32.853-8.939 65.109-25.835 93.291L44.196 431.83a10.653 10.653 0 00-.128 10.752c1.899 3.349 5.419 5.419 9.259 5.419H458.66c3.84 0 7.381-2.069 9.28-5.397 1.899-3.329 1.835-7.468-.128-10.753zM188.815 469.333C200.847 494.464 226.319 512 255.993 512s55.147-17.536 67.179-42.667H188.815z" />
                  </svg>
                </div>
              </div>
              {/* <div className="progress-status">12/34</div> */}
              <div className="progress">
                <div className="progress-bar"></div>
              </div>
              <div className="task-status">
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
              </div>
            </div>
            <div className="side-wrapper">
              <div className="project-title">Project</div>
              <div className="project-name">
                <div className="project-department">Country : {viewdata?.country}</div>
                <div className="project-department">LGA : {viewdata?.lga}</div>
                <div className="project-department">State : {viewdata?.state}</div>
                <div className="project-department">Status: {viewdata?.status}</div>
              </div>
            </div>
            <div className="side-wrapper">
              <div className="project-title">Team</div>
              <div className="team-member">
                <img id="img" src="https://images.unsplash.com/flagged/photo-1574282893982-ff1675ba4900?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="" className="members" />
                <img id="img" src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="members" />
                <img id="img" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" className="members" />
                <img id="img" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=998&q=80" alt="" className="members" />
                <img id="img" src="https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80" alt="" className="members" />
              </div>
            </div>
          </div>
          <div className="main-area">
            <div className="header">
              <div className="search-bar">
                {/* <input type="text" placeholder="Search..." /> */}
              </div>
              {/* <div className="inbox-calendar">
      <input type="checkbox" className="inbox-calendar-checkbox" />
      <div className="toggle-page">
       <span>Inbox</span>
      </div>
      <div className="layer"></div>
     </div> */}

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
                  <div className="msg anim-y">
                    <input type="checkbox" name="msg" id="mail2" className="mail-choice" />
                    <label htmlFor="mail2"></label>
                    <div className="msg-content">
                      <div className="msg-title">Disrupt next level aesthetic raw</div>
                      <div className="msg-date">22 Feb, 2019</div>
                    </div>
                    <img id="img" src="https://images.unsplash.com/flagged/photo-1574282893982-ff1675ba4900?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="" className="members mail-members" />
                  </div>
                  {/* <div className="msg selected-bg anim-y">
                    <input type="checkbox" name="msg" id="mail3" className="mail-choice" checked />
                    <label htmlFor="mail3"></label>
                    <div className="msg-content">
                      <div className="msg-title">Chicharrones craft beer tattooed</div>
                      <div className="msg-date">22 Feb, 2019</div>
                    </div>
                    <img id="img" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=998&q=80" alt="" className="members mail-members" />
                  </div> */}
                  {/* <div className="msg anim-y">
                    <input type="checkbox" name="msg" id="mail4" className="mail-choice" />
                    <label htmlFor="mail4"></label>
                    <div className="msg-content">
                      <div className="msg-title">Vaporware readymade shabby</div>
                      <div className="msg-date">22 Feb, 2019</div>
                    </div>
                    <img id="img" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" className="members mail-members" />
                  </div>
                  <div className="msg anim-y">
                    <input type="checkbox" name="msg" id="mail5" className="mail-choice" />
                    <label htmlFor="mail5"></label>
                    <div className="msg-content">
                      <div className="msg-title"> Four dollar toast taxidermy</div>
                      <div className="msg-date">22 Feb, 2019</div>
                    </div>
                    <img id="img" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" alt="" className="members mail-members" />
                  </div>
                  <div className="msg anim-y">
                    <input type="checkbox" name="msg" id="mail6" className="mail-choice" />
                    <label htmlFor="mail6"></label>
                    <div className="msg-content">
                      <div className="msg-title">Slow-carb disrupt kogi tote bag</div>
                      <div className="msg-date">22 Feb, 2019</div>
                    </div>
                    <img id="img" src="https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80" alt="" className="members mail-members" />
                  </div> */}
                  {/* <div className="msg anim-y">
                    <input type="checkbox" name="msg" id="mail7" className="mail-choice" />
                    <label htmlFor="mail7"></label>
                    <div className="msg-content">
                      <div className="msg-title">Pour-over subway tile twee</div>
                      <div className="msg-date">22 Feb, 2019</div>
                    </div>
                    <img id="img" src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="members mail-members" />
                  </div> */}
                  {/* <div className="msg anim-y">
                    <input type="checkbox" name="msg" id="mail8" className="mail-choice" />
                    <label htmlFor="mail8"></label>
                    <div className="msg-content">
                      <div className="msg-title">Create AdWords campaign</div>
                      <div className="msg-date">22 Feb, 2019</div>
                    </div>
                    <img id="img" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" className="members mail-members" />
                  </div> */}
                </div>
                <div className="add-task">
                  {/* <Button className="add-button">Add task</Button> */}
                  <CreateTaskModal view={"team"} id={id} />
                </div>
              </div>
              <div className="mail-detail">
                <div className="mail-detail-header">
                  <div className="mail-detail-profile">
                    <img id="img" src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="members inbox-detail" />
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
                    <div className="mail-time">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-clock">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      12 Mar, 2019
                    </div>
                    <div className="mail-inside">{viewdata?.description}</div>

                    <div className="mail-checklist">
                      <input type="checkbox" name="msg" id="mail30" className="mail-choice" checked />
                      <label htmlFor="mail30">Project Update.</label>
                      <div className="mail-checklist-date">{viewdata?.name}</div>
                    </div>
                    <div className="mail-doc">
                      <div className="mail-doc-wrapper">
                        <RiDeleteBin6Line size={20} />
                        <div className="mail-doc-detail">
                          <div className="mail-doc-name">Commence Project</div>
                        </div>
                      </div>
                      <div className="mail-doc-icons">
                        <div className="add-task">
                          <CommenceProjectModal id={id} title={viewdata?.name} />
                        </div>
                      </div>
                    </div>
                    <div className="mail-doc">
                      <div className="mail-doc-wrapper">
                        <RiDeleteBin6Line size={20} />
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
                    <div className="mail-doc">
                      <div className="mail-doc-wrapper">
                        <RiDeleteBin6Line size={20} />
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
                    <div className="mail-doc">
                      <div className="mail-doc-wrapper">
                        <RiDeleteBin6Line size={20} />
                        <div className="mail-doc-detail">
                          <div className="mail-doc-name">Suspend Project</div>

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
