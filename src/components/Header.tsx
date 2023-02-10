import React, { useEffect, useState, } from "react";
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

const Header = ({ toggleSideNav, }: any) => {
  const [network, setnetwork] = useState<any>()
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const handleLogoutUser = async () => {
    await axios
      .patch(`${process.env.REACT_APP_API}/me/logout`)
      .then(() => {
        delete axios.defaults.headers.common["Authorization"];
      })
      .catch((err) => {
        console.log(err);
      });
    await Cookies.remove("token");
    await storage.remove("user");
    navigate("/");
    window.location.reload();
  };

  window.addEventListener('offline', (e) => setnetwork('offline'));
  window.addEventListener('online', (e) => setnetwork('online'));
  useEffect(() => {
    if (network === 'online') {
      toast.success("You are back online!")
    } else if (network === 'offline') {
      toast.error("You have lost internet connection!")

    }
  }, [network])

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
          <TfiAlignJustify size={25} onClick={toggleSideNav} />
          <div className="header-logo">
            <img src={logo} alt="ASL" />
          </div>
          <span className="header-logo-text">Line Manager</span>
          <span className="header-logo-text1">
            jamesabiodun@arklandstructuresltd.com
          </span>
        </div>

        <div
          className="d-flex header-user-details"
          onClick={() => setDropDown(!dropDown)}
          onMouseEnter={() => setDropDown(true)}
        >
          <span className="dropdown-names"> Bito Unlimited </span>
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
    </div>
  );
};

export default Header;
