import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TfiAlignJustify } from "react-icons/tfi";
import logo from "../assets/images/ASLLOGO.svg";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import MobileSideBar from "./MobileSideBar";
import Notification from "./Notification/Notification";
import DataService from "../utils/dataService";
import Socket from "./NotificationPopUp";
import createHttpService from "./HttpService";
import { SocketContext } from "./SocketContext";
import LogoutModal from "./LogoutOption";
import profile from "../assets/images/new-profile.svg";



const dataService = new DataService()
const Header = ({ toggleSideNav, to, ignorePaths }: any) => {
  const socket = useContext(SocketContext);
  const userInfo = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
  const [network, setnetwork] = useState<any>();
  const [dropDown, setDropDown] = useState(false);
  const [showLogout, setShowLogout] = useState<any>(false);
  const [dropDownNoti, setDropDownNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [notification, setNotification] = useState<any>(userInfo?.notifications);
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



  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const handleClick = () => {
    if (!showLogout) {
      setShowLogout(true)
    } else {
      setShowLogout(false)
    }
  }


  const handleNext = async () => {
    const HttpService = createHttpService();
    setLoading(true)
    const page = notification?.paginator?.nextPage
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
    const HttpService = createHttpService();
    setLoading(true)
    const page = notification?.paginator?.prevPage
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

  useEffect(() => {
    if (refresh) {
      setTimeout(() => {
        handleRefresh()
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])


  const handleRefresh = async () => {
    const HttpService = createHttpService();
    setLoading(true)
    const page = 1
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




  const isActive: any = (match: any, location: { pathname: string | any[]; }) => {
    if (!match) {
      return false;
    }
    // Check if the current route's path is in the ignorePaths array
    return ignorePaths.some((ignorePath: string) => location.pathname.includes(ignorePath));
  };


  return (
    <div id="header" onMouseLeave={() => { setDropDownNoti(false); setDropDown(false) }} >
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
          {/* <span className="header-logo-text"> </span>
          <span className="header-logo-text1">
            {userInfo?.employee?.email}
          </span> */}
        </div>
        <div className="hand-noficational-place" >
          <Socket setNotification={setNotification} socket={socket} setRefresh={setRefresh} />
          {/* @ts-ignore */}
          <div className="hand-noficational-place-sup" >
            <div className="Messages-button" onClick={() => { setDropDownNoti(true) }} >
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

          <div>
            <div className="profile-click-img-container" onClick={() => setDropDown(true)}>
              <div className="profile-click-img">
                <img src={profile} alt="ASL" style={{ width: "45px", height: "45px" }} />
              </div>
              <div className="profile-click-img-text">
                <h4>{userInfo?.employee?.full_name}</h4>
                <p>{userInfo?.role?.name}</p>
              </div>
            </div>
            {/* <span className="dropdown-names">
              {userInfo?.employee?.full_name}
            </span>
            <div className="preview-header img-container-header">
              <FaUserCircle size={22} />
            </div> */}

            {dropDown && (
              <div className="dropdown"  >
                <Nav className="flex-column">
                  <NavLink to="/profile"
                    state={{ open: false }}
                    className="drop-user-settings">
                    <CgProfile size={20} className="dropdown-icons-tools" />
                    Profile
                  </NavLink>
                  <NavLink
                    to={to}
                    //  @ts-ignore  
                    activeClassName={isActive ? '' : 'inactive'}
                    onClick={handleClick}
                    className="drop-logout" >
                    <AiOutlineLogout size={20} className="dropdown-icons-tools" />
                    Logout
                  </NavLink>
                </Nav>

              </div>
            )}

          </div>
        </div>
      </div>
      <LogoutModal setShowLogout={setShowLogout} showLogout={showLogout} setDropDown={setDropDown} />
      <MobileSideBar
        ToggleSidebar={ToggleSidebar}
        isOpen={isOpen}
      // setHideNav={setHideNav}
      />
    </div >
  );
};

export default Header;
