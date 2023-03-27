import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { TfiAlignJustify } from "react-icons/tfi";
import logo from "../assets/images/ASLLOGO.svg";
import { AiOutlineLogout } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import storage from "../utils/storage";
import MobileSideBar from "./MobileSideBar";
import { useAppSelector } from "../hooks/useDispatch";

const Header = ({ toggleSideNav }: any) => {
  // @ts-ignore
  const userInfo: any = JSON.parse(storage?.get("user"));

  const [network, setnetwork] = useState<any>();
  const [dropDown, setDropDown] = useState(false);
  const handleLogoutUser = async () => {
    await axios
      .patch(`${process.env.REACT_APP_API}/me/logout`)
      .then(() => {
        delete axios?.defaults?.headers?.common["Authorization"];
      })
      .catch((err) => {
        console.log(err);
      });
    await Cookies.remove("token");
    await storage.remove("user");
    window.location.replace("/");
    window.location.reload();
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
  const [hideNav, setHideNav] = useState<any>(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  return (
    <div id="header" onMouseLeave={() => setDropDown(false)}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          // error: {
          //   duration: 20000,
          // }
        }}
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
                  to="/"
                  className="drop-logout"
                  onClick={handleLogoutUser}
                >
                  <AiOutlineLogout size={20} className="dropdown-icons-tools" />
                  Logout
                </NavLink>
              </Nav>
            </div>
          )}
        </div>
      </div>
      <MobileSideBar
        ToggleSidebar={ToggleSidebar}
        isOpen={isOpen}
        setHideNav={setHideNav}
      />
    </div>
  );
};

export default Header;
