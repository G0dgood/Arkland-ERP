import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "../assets/images/ASLLOGO.svg";
import { FiFolder, FiLogOut, FiPieChart, FiUser } from "react-icons/fi";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { GoFile } from "react-icons/go";
import { AiOutlineBank } from "react-icons/ai";
import { BsBriefcase, BsShield } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
const Navbar = ({ ToggleSidebar, isOpen, setHideNav }: any) => {


  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHideNav(window.innerWidth)
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);



  return (
    <>
      {width <= 799 && (
        <div className="container-fluid mt-3">
          <div className={`sidebar ${isOpen === true ? "active" : ""}`}>
            <div className="sd-header">
              <img
                className="login-body-img-nav"
                src={logo}
                alt="outcess-logo"
              />

              <div onClick={ToggleSidebar}>
                <FaTimes />
              </div>
            </div>
            <div className="sd-body">
              <div className="ul">

                <Nav className=" li mb-4">
                  <NavLink
                    className={
                      window.location.pathname === "/home"
                        ? "on-link "
                        : "sd-link"
                    }
                    to="/home" >
                    <span className="me-3">
                      <TfiLayoutGrid2 size={20} />
                    </span>
                    <span className="icon-text"> Dashborad </span>
                  </NavLink>
                </Nav>
                <Nav className=" li mb-4">
                  <NavLink
                    className={
                      window.location.pathname === "/kpiassessment"
                        ? "on-link "
                        : "sd-link"
                    }
                    to="/kpiassessment" >
                    <span className="me-3">
                      <FiPieChart size={20} />
                    </span>
                    <span className="icon-text"> KPI Assessment </span>
                  </NavLink>
                </Nav>
                <Nav className=" li mb-4">
                  <NavLink
                    className={
                      window.location.pathname === "/weeklyreport"
                        ? "on-link "
                        : "sd-link"
                    }
                    to="/weeklyreport" >
                    <span className="me-3">
                      <GoFile size={23} />
                    </span>
                    <span className="icon-text"> Weekly Report</span>
                  </NavLink>
                </Nav>

                <Nav className=" li mb-4">
                  <NavLink
                    className={
                      window.location.pathname === "/allemployees"
                        ? "on-link "
                        : "sd-link"
                    }
                    to="/allemployees" >
                    <span className="me-3">
                      <FiUser size={24} />
                    </span>
                    <span className="icon-text"> All Employees </span>
                  </NavLink>
                </Nav>
                <Nav className=" li mb-4">
                  <NavLink
                    className={
                      window.location.pathname === "/departmentsview"
                        ? "on-link "
                        : "sd-link"
                    }
                    to="/departmentsview" >
                    <span className="me-3">
                      <FiFolder size={20} />
                    </span>
                    <span className="icon-text"> Departments </span>
                  </NavLink>
                </Nav>

                <Nav className=" li mb-4">
                  <NavLink
                    className={
                      window.location.pathname === "/projectview"
                        ? "on-link "
                        : "sd-link"
                    }
                    to="/projectview" >
                    <span className="me-3">
                      < AiOutlineBank size={25} />
                    </span>
                    <span className="icon-text"> Projects </span>
                  </NavLink>
                </Nav>



                <Nav className=" li mb-4">
                  <NavLink
                    className={
                      window.location.pathname === "/leave"
                        ? "on-link "
                        : "sd-link"
                    }
                    to="/leave"
                  >
                    <span className="me-3">
                      <BsBriefcase size={22} />
                    </span>
                    <span className="icon-text"> Leave </span>
                  </NavLink>
                </Nav>
                <Nav className=" li mb-4">
                  <NavLink
                    className={
                      window.location.pathname === "/support"
                        ? "on-link "
                        : "sd-link"
                    }
                    to="/support"
                  >
                    <span className="me-3">
                      <BiSupport size={22} />
                    </span>
                    <span className="icon-text"> Support </span>
                  </NavLink>
                </Nav>
                <Nav className=" li mb-4">
                  <NavLink
                    className={
                      window.location.pathname === "/policy"
                        ? "on-link "
                        : "sd-link"
                    }
                    to="/policy"
                  >
                    <span className="me-3">
                      <BsShield size={22} />
                    </span>
                    <span className="icon-text"> Policy </span>
                  </NavLink>
                </Nav>
                <Nav className=" li mb-4">
                  <NavLink
                    className={
                      window.location.pathname === "/logout"
                        ? "on-link "
                        : "sd-link"
                    }
                    to="/home"
                  >
                    <span className="me-3">
                      <FiLogOut size={22} />
                    </span>
                    <span className="icon-text"> Log out </span>
                  </NavLink>
                </Nav>

              </div>
            </div>
          </div>
          <div
            className={`sidebar-overlay ${isOpen === true ? "active" : ""}`}
            onClick={ToggleSidebar}></div>
        </div>
      )}
    </>
  );
};

export default Navbar;
