/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { Button } from "react-bootstrap";
import { RiMessage3Line } from "react-icons/ri";
import TableLoader from "../TableLoader";
import { FaUserPlus, FaUsersSlash } from "react-icons/fa";
import { ImBriefcase } from "react-icons/im";
import { HiSpeakerphone } from "react-icons/hi";
import { BsFillBriefcaseFill } from "react-icons/bs";
import HttpService from "../HttpService";



const Notification = ({ handleNext, handlePrev, notification, loading }: any) => {

  const { paginator } = notification

  const [opens, setOpens] = useState<number[]>([]);
  const [loadingd, setLoadingd] = useState<boolean>(false);
  const [view, setView] = useState<number[]>([]);

  const handleOpens = (index: number) => {
    if (opens.includes(index)) {
      setOpens(opens.filter(x => x !== index));
    }
    else {
      setOpens((prevState) => [...prevState, index]);
    }
  }

  // console.log("notification", notification)

  const handleView = async (id: string) => {
    console.log("handleView", id)
    const url = ""
    setLoadingd(true)
    await HttpService.get(url)
      .then((response: any) => {
        setLoadingd(false)
        setView(response?.data?.data)
      })
      .catch((error) => {
        setLoadingd(false)
      })
  }

  //     ; handleView(item?._id)
  // }

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
            <div key={i} className={opens?.includes(i) ? "faq active" : "faq"} onClick={() => { handleOpens(i) }}>
              <div className="faq-title-contain">
                <span className="icon-Plus">
                  {item?.type === "new employee" ? <FaUserPlus size={20} /> :
                    item?.type === "workers request rejection" ? <FaUsersSlash size={20} /> :
                      item?.type === "leave HR approval" ? <BsFillBriefcaseFill size={20} /> :
                        item?.type === "leave application" ? <ImBriefcase size={20} /> : <HiSpeakerphone size={20} />} </span>
                <h6 className="faq-title">{item?.type.charAt(0).toUpperCase() + item?.type.slice(1)}</h6>
              </div>
              <p className="faq-text">{item?.details}</p>
              <span className=" faq-text view-noti-drop">view</span>
              <button className="faq-toggle">
                <i className="fas fa-angle-down"></i>
              </button>
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

