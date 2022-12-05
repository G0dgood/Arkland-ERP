import React, { useState, } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TfiAlignJustify } from "react-icons/tfi";
import logo from "../assets/images/ASLLOGO.svg";
import { AiOutlineLogout } from "react-icons/ai";

const Header = ({ toggleSideNav, }: any) => {




  const [dropDown, setDropDown] = useState(false);



  const handleLogoutUser = () => {

  };

  return (
    <div id="header" onMouseLeave={() => setDropDown(false)}>
      <div className="header-container">
        <div className="header-left">
          <TfiAlignJustify size={25} onClick={toggleSideNav} />
          <div className="header-logo">
            <img src={logo} alt="ASL" />
          </div>
          <span className="header-logo-text">Line Manager</span>
          <span className="header-logo-text1">jamesabiodun@arklandstructuresltd.com</span>
        </div>

        <div
          className="d-flex header-user-details"
          onClick={() => setDropDown(!dropDown)}
          onMouseEnter={() => setDropDown(true)}>
          <span className='dropdown-names'> Bito Unlimited </span>
          <div className="preview-header img-container-header">
            <FaUserCircle size={22} />
          </div>

          {dropDown && (
            <div className="dropdown">
              <Nav className="flex-column">
                <NavLink to=" " className="drop-user-settings">
                  <CgProfile size={20} className='dropdown-icons-tools' />
                  Profile
                </NavLink>
                <NavLink
                  to="/"
                  className="drop-logout"
                  onClick={handleLogoutUser}>
                  <AiOutlineLogout size={20} className='dropdown-icons-tools' />
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
