import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { TfiAlignJustify } from "react-icons/tfi";
import logo from "../assets/images/ASLLOGO.svg";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import storage from "../utils/storage";
import MobileSideBar from "./MobileSideBar";
import { removeData } from "../AppRoutes";
import LogoutOption from "./LogoutOption";
import Notification from "./Notification/Notification";
import Socket from "./Socket";

const Header = ({ toggleSideNav }: any) => {
  // const token = Cookies.get("token");
  // const navigate = useNavigate();
  // @ts-ignore
  const userInfo: any = JSON.parse(storage?.get("user"));

  const [network, setnetwork] = useState<any>();
  const [dropDown, setDropDown] = useState(false);
  const [dropDownNoti, setDropDownNoti] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const handleLogout = async () => {
    setisLoading1(true);
    await axios
      .patch(`${process.env.REACT_APP_API}/me/logout`)
      .then(() => {
        delete axios?.defaults?.headers?.common["Authorization"];
      })
      .catch((err) => {
        console.log(err);
        setisLoading1(false);
      });
    Cookies.remove("token");
    storage.remove("user");
    removeData();
    // navigate("/");
    setisLoading1(false)
    window.location.replace("/");
    // window.location.reload();
  };

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
  // const [hideNav, setHideNav] = useState<any>(false);
  const [showLogout, setShowLogout] = useState<any>(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const handleNoti = () => {
    if (!dropDownNoti) {
      setDropDownNoti(true)
    } else {
      setDropDownNoti(false)
    }
  }

  const [loading, setLoading] = useState<any>(false);
  const [info, setInfo] = useState<any>("");
  const [dataLength, setDataLength] = useState<number>(0);


  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://arkland-erp.herokuapp.com/api/v1/notifications`)
      .then((data) => {
        // console.log('real-error', data)
        if (data?.data.success === false) {
          console.log('ERROR', data)
        } else {
          setInfo(data?.data?.data?.data);
          setDataLength(data?.data?.data?.data?.length)
        }
        setLoading(false);

      })
      .catch((err) => {
        console.log('err', err);
        setLoading(false);
      });
  }, []);



  return (
    <div id="header" onMouseLeave={() => setDropDown(false)} >
      <Socket />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 15000,
          // error: {
          //   duration: 20000,
          // }
        }}
      />
      <LogoutOption
        setShowLogout={setShowLogout}
        showLogout={showLogout}
        handleLogout={handleLogout}
        isLoading1={isLoading1}
      />
      <div className="header-container">
        <div className="header-left">
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
            {userInfo?.data?.employee?.email}
          </span>
        </div>
        <div className="hand-noficational-place">

          <div className="hand-noficational-place-sup" >
            <div className="Messages-button" onClick={handleNoti}>
              <span className="content">
                <IoIosNotifications size={30} />
              </span>
              <span className="badge">{dataLength}</span>
            </div>
            {dropDownNoti &&
              (<div className="user-details-noti">
                <Notification info={info} />
              </div>)}
          </div>

          <div
            className="d-flex header-user-details"
            // onClick={() => setDropDown(!dropDown)}
            onClick={() => setDropDown(true)}
          >
            <span className="dropdown-names">
              {userInfo?.data?.employee?.full_name}
            </span>
            <div className="preview-header img-container-header">
              <FaUserCircle size={22} />
            </div>

            {dropDown && (
              <div className="dropdown">
                <Nav className="flex-column">
                  <NavLink to="/profile" className="drop-user-settings">
                    <CgProfile size={20} className="dropdown-icons-tools" />
                    Profile
                  </NavLink>
                  <NavLink
                    to=""
                    className="drop-logout"
                    onClick={() => setShowLogout(true)}
                  >
                    <AiOutlineLogout size={20} className="dropdown-icons-tools" />
                    Logout
                  </NavLink>
                </Nav>
              </div>
            )}
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
