/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { Button } from "react-bootstrap";
import { RiMessage3Line, RiTeamLine } from "react-icons/ri";
import TableLoader from "../TableLoader";
import { FaRegMoneyBillAlt, FaUserPlus, FaUsersSlash } from "react-icons/fa";
import { ImBriefcase } from "react-icons/im";
import { HiSpeakerphone } from "react-icons/hi";
import { BsCalendar2Month, BsChatText, BsFillBriefcaseFill } from "react-icons/bs";
import { GrStatusWarning, GrUserWorker } from "react-icons/gr";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { GiAlarmClock, GiStahlhelm } from "react-icons/gi";
import { BiTask } from "react-icons/bi";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { AiOutlineException } from "react-icons/ai";
import { getUserPrivileges } from "../../functions/auth";



const Notification = ({ handleNext, handlePrev, notification, loading }: any) => {
  const navigate = useNavigate();
  const { paginator } = notification
  const [opens, setOpens] = useState<number[]>([]);
  const handleOpens = (index: number) => {
    if (opens.includes(index)) {
      setOpens(opens.filter(x => x !== index));
    }
    else {
      setOpens((prevState) => [...prevState, index]);
    }
  }
  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin, isTeamLead, isHeadOfDepartment } = getUserPrivileges();



  const Array = [
    {
      notification: "announcement",
      url: "",
      icon: "",
    },
    {
      notification: "new chat",
      url: "",
      icon: "",
    },
    {
      notification: "new event",
      url: "",
      icon: "",
    },
    {
      notification: "new warning",
      url: "",
      icon: "",
    },
    {
      notification: "salary increment",
      url: "",
      icon: "",
    },
    {
      notification: "salary decrement",
      url: "",
      icon: "",
    },
    {
      notification: "annual salary increment",
      url: "",
      icon: "",
    },
    {
      notification: "appraisal request",
      url: "",
      icon: "",
    },
    {
      notification: "appraisal response",
      url: "",
      icon: "",
    },
    {
      notification: "role assignment",
      url: "",
      icon: "",
    },
    {
      notification: "new HOD",
      url: "",
      icon: "",
    },
    {
      notification: "new employee",
      url: "",
      icon: <FaUserPlus size={20} />,
    },
    {
      notification: "employee approval",
      url: "",
      icon: <FaUserPlus size={20} />,
    },
    {
      notification: "team assignment",
      url: "",
      icon: "",
    },
    {
      notification: "task assignment",
      url: "",
      icon: "",
    },
    {
      notification: "team removal",
      url: "",
      icon: "",
    },
    {
      notification: "employment termination",
      url: "",
      icon: "",
    },
    {
      notification: "termination approval",
      url: "",
      icon: "",
    },
    {
      notification: "leave application",
      url: "",
      icon: <ImBriefcase size={20} />,
    },
    {
      notification: "leave approval",
      url: "",
      icon: <ImBriefcase size={20} />,
    },
    {
      notification: "leave rejection",
      url: "",
      icon: <ImBriefcase size={20} />,
    },
    {
      notification: "leave HOD approval",
      url: "",
      icon: <ImBriefcase size={20} />,
    },
    {
      notification: "leave HR approval",
      url: "",
      icon: <ImBriefcase size={20} />,
    },
    {
      notification: "project creation",
      url: "",
      icon: "",
    },
    {
      notification: "project commencement",
      url: "",
      icon: "",
    },
    {
      notification: "project completion",
      url: "",
      icon: "",
    },
    {
      notification: "warning decision",
      url: "",
      icon: "",
    },
    {
      notification: "warning response",
      url: "",
      icon: "",
    },
    {
      notification: "assisted clock in",
      url: "",
      icon: "",
    },
    {
      notification: "workers request application",
      url: "",
      icon: <FaUsersSlash size={20} />,
    },
    {
      notification: "workers request approval",
      url: "",
      icon: <FaUsersSlash size={20} />,
    },
    {
      notification: "workers request rejection",
      url: "",
      icon: <FaUsersSlash size={20} />,
    },
    {
      notification: "",
      url: "",
      icon: <HiSpeakerphone size={20} />,
    },
  ]


  // let finalArray: any = []
  // useEffect(() => {
  //   notification?.map((item: any) => {
  //     Array?.map((items) => {
  //       if (item?.type === items.notification) {
  //         finalArray?.push({ items: items?.notification, item: item?.type })
  //       }
  //     });
  //   });
  //   console.log(finalArray)
  // }, [])


  return (
    <div className="drop-down-notify">
      <ul className="drop-down animated">
        <li className="title">
          <div>Notifications</div>
        </li>
      </ul>
      <div id="faq-container-noti">

        {!notification ? <div className="noti-no-record">
          <h6> <RiMessage3Line size={40} color="#999999" style={{ marginRight: "5px" }} />  </h6>
          <span>No Notifications</span></div> :
          notification?.data?.map((item: any, i: number) => (
            <div key={i} className={opens?.includes(i) ? "faq active" : "faq"} >
              <div className="faq-title-contain">
                <span className="icon-Plus">
                  {item?.type === "new employee" ||
                    item?.type === "new HOD" ||
                    item?.type === "employee approval" ||
                    item?.type === "employment termination" ||
                    item?.type === "termination approval" ? <FaUserPlus size={20} /> :
                    item?.type === "leave HR approval" ||
                      item?.type === "leave application" ||
                      item?.type === "leave approval" ||
                      item?.type === "leave rejection" ||
                      item?.type === "leave HOD approval" ? <BsFillBriefcaseFill size={20} /> :
                      item?.type === "announcement" ? <HiSpeakerphone size={20} /> :
                        item?.type === "workers request application" ||
                          item?.type === "workers request approval" ||
                          item?.type === "workers request rejection" ? <GrUserWorker size={20} /> :
                          item?.type === "assisted clock in" ? <GiAlarmClock size={20} /> :
                            item?.type === "new warning" ||
                              item?.type === "warning response" ||
                              item?.type === "warning decision" ? <GrStatusWarning size={20} /> :
                              item?.type === "project creation" ||
                                item?.type === "project commencement" ||
                                item?.type === "project completion" ? <GiStahlhelm size={20} /> :
                                item?.type === "new chat" ? <BsChatText size={20} /> :
                                  item?.type === "team assignment" ||
                                    item?.type === "team removal" ? <RiTeamLine size={20} /> :
                                    item?.type === "task assignment" ? <BiTask size={20} /> :
                                      item?.type === "role assignment" ? <MdOutlineAssignmentInd size={20} /> :
                                        item?.type === "appraisal request" ||
                                          item?.type === "appraisal response" ? <AiOutlineException size={20} /> :
                                          item?.type === "salary increment" ||
                                            item?.type === "annual salary increment" ||
                                            item?.type === "salary decrement" ? <FaRegMoneyBillAlt size={20} /> :
                                            item?.type === "new event" ? <BsCalendar2Month size={20} /> :
                                              <HiSpeakerphone size={20} />} </span>
                <h6 className="faq-title">{item?.type.charAt(0).toUpperCase() + item?.type.slice(1)}</h6>
              </div>
              <p className="faq-text">{item?.details}</p>
              {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isHeadOfDepartment) && (
                <span className=" faq-text view-noti-drop"
                  // @ts-ignore
                  onClick={item?.type === "new employee" ||
                    item?.type === "employee approval" ||
                    item?.type === "employment termination" ? () => navigate("/employees") :
                    item?.type === "leave HR approval" ? () => navigate("/leave/leave/hr") :
                      item?.type === "leave application" ||
                        item?.type === "leave rejection" ||
                        item?.type === "leave approval" ? () => navigate("/leave") :
                        item?.type === "leave HOD approval" ? () => navigate("/leave/leave/team") :
                          item?.type === "announcement" ? () => navigate("/announcements") :
                            item?.type === "workers request application" ||
                              item?.type === "workers request approval" ||
                              item?.type === "workers request rejection" ? () => navigate("/workers_request") :
                              item?.type === "assisted clock in" ? () => navigate("/attendance/attendance/list/hr") :
                                item?.type === "new warning" ||
                                  item?.type === "warning response" ||
                                  item?.type === "warning decision" ? () => navigate("/warning") :
                                  item?.type === "new chat" ? () => navigate("/support") :
                                    item?.type === "team assignment" ||
                                      item?.type === "team removal" ? () => navigate("/team") :
                                      item?.type === "task assignment" ? () => navigate("/tasks") :
                                        item?.type === "role assignment" ? () => navigate("/createnewrole") :
                                          item?.type === "appraisal request" ||
                                            item?.type === "appraisal response" ? () => navigate("/kpiassessment") :
                                            item?.type === "salary increment" ? () => navigate("/salary") :
                                              ""}>view</span>)}
              <button className="faq-toggle" onClick={() => { handleOpens(i) }}>
                <i className="fas fa-angle-down"></i>
              </button>
              <p style={{ marginLeft: "12px", marginTop: "5px" }}>  {moment
                .duration(moment().diff(item.created_at))
                .humanize()}{" "}
                ago</p>
            </div>
          ))
        }
      </div>
      <div id={"notificationbtn"}>
        <Button id={"notibtn"} disabled={!paginator?.hasPrevPage} onClick={() => handlePrev()}>Previous</Button>
        <div id="notispan-container">  <span>page</span> <span>{paginator?.currentPage}</span> <span>of</span> <span>{paginator?.pageCount}</span></div>


        <Button id="notibtn" disabled={!paginator?.hasNextPage} onClick={() => handleNext()} >Next</Button>
      </div>
      {loading ? <TableLoader isLoading={loading} /> : ""}
    </div>
  );
};

export default Notification;

