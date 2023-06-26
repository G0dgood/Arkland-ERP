import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Nav, Spinner } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TfiAlignJustify } from "react-icons/tfi";
import logo from "../assets/images/ASLLOGO.svg";
import { AiOutlineLogout, AiOutlinePoweroff } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import MobileSideBar from "./MobileSideBar";
import Notification from "./Notification/Notification";
import DataService from "../utils/dataService";
import HttpService from "./HttpService";
import Socket from "./NotificationPopUp";
import { io } from "socket.io-client";




const dataService = new DataService()
const Header = ({ toggleSideNav }: any) => {

  const socket = io("https://arkland-erp-b4872258abbf.herokuapp.com/api/v1");
  // const socket = io("https://arkland-erp.herokuapp.com");

  const userInfo = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
  const [network, setnetwork] = useState<any>();
  const [dropDown, setDropDown] = useState(false);
  const [drop, setDrop] = useState(false);
  const [dropDownNoti, setDropDownNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [notification, setNotification] = useState<any>(userInfo.notifications);
  const url = "notifications"



  window.addEventListener("offline", (e) => setnetwork("offline"));
  window.addEventListener("online", (e) => setnetwork("online"));
  useEffect(() => {
    if (network === "online") {
      toast.success("You are back online!");
    } else if (network === "offline") {
      toast.error("You have lost internet connection!");
    }
  }, [network]);

  const [isOpen, setIsopen] = useState(false);
  // const [data, setData] = useState(false);



  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const handleClick = () => {
    if (!drop) {
      setDrop(true)
    } else {
      setDrop(false)
    }
  }


  const handleNext = async () => {
    setLoading(true)
    const page = notification.paginator.nextPage
    const size = 10
    await HttpService.search(url, { page, size })
      .then((response: any) => {
        setLoading(false)
        const newNotification = response?.data?.data
        userInfo.notifications = newNotification
        dataService.setData(`${process.env.REACT_APP_ERP_USER_INFO}`, userInfo)
        setNotification(newNotification)
      })
      .catch((error) => {
        setLoading(false)
      })
  }


  const handlePrev = async () => {
    setLoading(true)
    const page = notification.paginator.prevPage
    const size = 10
    await HttpService.search(url, { page, size })
      .then((response: any) => {
        setLoading(false)
        const newNotification = response?.data?.data
        userInfo.notifications = newNotification
        dataService.setData(`${process.env.REACT_APP_ERP_USER_INFO}`, userInfo)
        setNotification(newNotification)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  const handleLogout = async () => {
    setisLoading(true);
    socket.disconnect()
    try {
      await HttpService.patch("me/logout", {})
      dataService.clearData()
      setisLoading(false);
      window.location.replace("/");
    } catch (error) {
      setisLoading(false);
      dataService.clearData()
      window.location.replace("/");
    }
  };


  return (
    <div id="header" onMouseLeave={() => { setDropDownNoti(false); setDrop(false); setDropDown(false) }} >
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 15000,
          // error: {
          //   duration: 20000,
          // }
        }}
      />

      <div className="header-container">
        <div className="header-left" >
          <TfiAlignJustify
            className="mobileSidebarbtn"
            size={25}
            onClick={toggleSideNav}
          />
          <TfiAlignJustify
            className="mobileSidebarbtntwo"
            size={25}
            onClick={ToggleSidebar}
          />

          <div className="header-logo">
            <img src={logo} alt="ASL" />
          </div>
          <span className="header-logo-text">{/* Line Manager */}</span>
          <span className="header-logo-text1">
            {userInfo?.employee?.email}
          </span>
        </div>
        <div className="hand-noficational-place" >
          <Socket setNotification={setNotification} socket={socket} />
          {/* @ts-ignore */}
          <div className="hand-noficational-place-sup" >
            <div className="Messages-button" onMouseEnter={() => { setDropDownNoti(true) }} >
              <span className="content">
                <IoIosNotifications size={30} />
              </span>
              <span className="badge">{notification?.new_notification_count}</span>
            </div>
            {dropDownNoti &&
              (<div className="user-details-noti">
                <Notification handleNext={handleNext} handlePrev={handlePrev} notification={notification} loading={loading} />
              </div>)}
          </div>

          <div
            className="d-flex header-user-details"
            onClick={() => setDropDown(true)}
          // onClick={() => setDropDown(true)}
          >
            <span className="dropdown-names">
              {userInfo?.employee?.full_name}
            </span>
            <div className="preview-header img-container-header">
              <FaUserCircle size={22} />
            </div>

            {dropDown && (
              <div className="dropdown"  >
                <Nav className="flex-column">
                  <NavLink to="/profile" className="drop-user-settings">
                    <CgProfile size={20} className="dropdown-icons-tools" />
                    Profile
                  </NavLink>
                  <NavLink
                    to=""
                    onClick={handleClick}
                    className="drop-logout" >
                    <AiOutlineLogout size={20} className="dropdown-icons-tools" />
                    Logout
                  </NavLink>
                  {drop &&
                    <div className="drop-logout  drop-logout-container" >
                      <Button className="button-logout">NO</Button>
                      <Button className="button-logout" onClick={handleLogout}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : "YES"}
                      </Button>
                    </div>}
                </Nav>
              </div>
            )}
            {/* {dropDown && (
              <div className="dropdown">
                <div className="flex-column">
                  <div
                    id="i"
                    className="drop-user-settings" >
                    <CgProfile className="dropdown-icons-tools" size={20} />
                    Profile
                  </div>
                  <div id="i"
                    className="drop-logout"
                  // onClick={handleClick}
                  >
                    <AiOutlinePoweroff className="dropdown-icons-tools" size={20} />
                    Logout
                  </div>
                </div>
                {drop &&
                  <div className="drop-logout  drop-logout-container" >
                    <Button className="button-logout " onClick={() => setDrop(false)}>NO</Button>
                    <Button className="button-logout" onClick={handleLogout}>
                      {isLoading ? <Spinner animation="border" size="sm" /> : "YES"}
                    </Button>
                  </div>}
              </div>
            )} */}
          </div>
        </div>
      </div>

      <MobileSideBar
        ToggleSidebar={ToggleSidebar}
        isOpen={isOpen}
      // setHideNav={setHideNav}
      />
    </div>
  );
};

export default Header;
