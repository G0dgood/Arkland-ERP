import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { BsFillPinAngleFill, BsThreeDots } from "react-icons/bs";
import { MdOpenInFull } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import img from "../../assets/images/mann2.svg";
import Checkbox from "@material-ui/core/Checkbox";

const Dashboard = () => {
  // const [checked, setChecked] = React.useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const handleChange = (event: any) => {
  // 	setChecked(event.target.checked);
  // };
  // --- Get current state of collapseNav from localStorage --- //
  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });

  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };

  // const locale = 'en';
  // const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

  // React.useEffect(() => {
  // 	const timer = setInterval(() => { // Creates an interval which will update the current data every minute
  // 		// This will trigger a rerender every component that uses the useDate hook.
  // 		setDate(new Date());
  // 	}, 60 * 1000);
  // 	return () => {
  // 		clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
  // 	}
  // }, []);

  // const objectDate = new Date();

  // const month = objectDate.getMonth();
  // console.log(month + 1); // 8

  // const year = objectDate.getFullYear();
  // console.log(year); // 2022

  // const day = today.toLocaleDateString(locale, { weekday: 'long' });
  // const date = ` ${today.toLocaleDateString(locale, { month: 'long' })} `;
  // const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });


  // return (
  // 	<div id="screen-wrapper">
  // 		<Header toggleSideNav={toggleSideNav} />
  // 		<Sidebar collapseNav={collapseNav} />
  // 		<main>
  // 			<div className='main-div'>
  // 				<div className='main-div-col-1'>
  // 					<div className='main-div-col-1-sub'>
  // 						<div className='main-div-col-1-sub-min'>
  // 							<div className='main-div-col-1-sub-min-img'>
  // 								<img src={img} alt="User" className='main-sub-img' />
  // 							</div>
  // 							<div className='main-div-col-1-sub-min-text'>
  // 								<div className='main-min-text'>
  // 									<h4>Welcome to Your Dashboard!</h4>
  // 									<p className='main-min-text2'>Your Team have 4 Tasks to finish all task today. You already completed 50% today. Your team progress is very good.</p>
  // 								</div>
  // 							</div>
  // 						</div>
  // 						<div className='main-div-col-2-sub-min'>
  // 							<span className='OpenInFull'>
  // 								<MdOpenInFull />
  // 							</span>
  // 							<h1 className='event-time'>{time}</h1>
  // 							<h1 className='event-days'> {day}</h1>
  // 							<p className='event-months'> {date.toUpperCase()} {month + 1} {year}</p>
  // 							<Button variant="contained" className='Create-event'>Create Event</Button>
  // 						</div>
  // 					</div>
  // 					<div className='main-div-col-2-sub'>
  // 						<div className='Announcement-sub-1'>
  // 							<div className='Announcement-sub-text'>
  // 								<span className='sub-text-contained'>
  // 									<h4>Announcement</h4>
  // 								</span>
  // 								<span>
  // 									<p>Today, 21 Jun 2022</p>
  // 								</span>
  // 							</div>
  // 							<div> <Button variant="contained" className='Add-btn'>Create Announcement</Button></div>
  // 						</div>
  // 						{/* Announcement */}
  // 						<div className='Announcement-container'>
  // 							<div className='Announcement-sub-2'>
  // 								<div className='main-todo-Event' style={{ borderRadius: "4px" }}>
  // 									<div className='main-todo-container'>
  // 										<div className='main-todo-note'>
  // 											<div>Outing schedule for every departement</div>
  // 											<div>5 Minutes ago</div>
  // 										</div>
  // 									</div>
  // 									<div className='FiTrash2'>
  // 										<span className='BsFillPinAngleFill'> <BsFillPinAngleFill size={20} /></span>
  // 										<span><BsThreeDots size={25} /></span>
  // 									</div>
  // 								</div>
  // 							</div>
  // 							<div className='Announcement-sub-2'>
  // 								<div className='main-todo-Event' style={{ borderRadius: "4px" }}>
  // 									<div className='main-todo-container'>
  // 										<div className='main-todo-note'>
  // 											<div>Outing schedule for every departement</div>
  // 											<div>5 Minutes ago</div>
  // 										</div>
  // 									</div>
  // 									<div className='FiTrash2'>
  // 										<span className='BsFillPinAngleFill'> <BsFillPinAngleFill size={20} /></span>
  // 										<span><BsThreeDots size={25} /></span>
  // 									</div>
  // 								</div>
  // 							</div>
  // 							<div className='Announcement-sub-2'>
  // 								<div className='main-todo-Event' style={{ borderRadius: "4px" }}>
  // 									<div className='main-todo-container'>
  // 										<div className='main-todo-note'>
  // 											<div>Outing schedule for every departement</div>
  // 											<div>5 Minutes ago</div>
  // 										</div>
  // 									</div>
  // 									<div className='FiTrash2'>
  // 										<span className='BsFillPinAngleFill'> <BsFillPinAngleFill size={20} /></span>
  // 										<span><BsThreeDots size={25} /></span>
  // 									</div>
  // 								</div>
  // 							</div>

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div className="main-div">
          <div className="main-div-col-1">
            <div className="main-div-col-1-sub">
              <div className="main-div-col-1-sub-min">
                <div className="main-div-col-1-sub-min-img">
                  <img src={img} alt="User" className="main-sub-img" />
                </div>
                <div className="main-div-col-1-sub-min-text">
                  <div className="main-min-text">
                    <h4 className="main-min-text-header">
                      Welcome to Your Dashboard!
                    </h4>
                    <p className="main-min-text2">
                      Your Team have 4 Tasks to finish all task today. You
                      already completed 50% today. Your team progress is very
                      good.
                    </p>
                  </div>
                </div>
              </div>
              <div className="main-div-col-2-sub-min">
                <span className="OpenInFull">
                  <MdOpenInFull />
                </span>
                <h1 className="event-time">09:20AM</h1>
                <h1 className="event-days">MONDAY</h1>
                <p className="event-months">SEPTEMBER 2 2022</p>
                <Button variant="contained" className="Create-event">
                  Create Event
                </Button>
              </div>
            </div>
            <div className="main-div-col-2-sub">
              <div className="Announcement-sub-1">
                <div className="Announcement-sub-text">
                  <span className="sub-text-contained">
                    <h4>Announcement</h4>
                  </span>
                  <span>
                    <p>Today, 21 Jun 2022</p>
                  </span>
                </div>
                <div>
                  {" "}
                  <Button variant="contained" className="Add-btn">
                    Create Announcement
                  </Button>
                </div>
              </div>
              {/* Announcement */}
              <div className="Announcement-container">
                <div className="Announcement-sub-2">
                  <div
                    className="main-todo-Event"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="main-todo-container">
                      <div className="main-todo-note">
                        <div>Outing schedule for every departement</div>
                        <div>5 Minutes ago</div>
                      </div>
                    </div>
                    <div className="FiTrash2">
                      <span className="BsFillPinAngleFill">
                        {" "}
                        <BsFillPinAngleFill size={20} />
                      </span>
                      <span>
                        <BsThreeDots size={25} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="Announcement-sub-2">
                  <div
                    className="main-todo-Event"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="main-todo-container">
                      <div className="main-todo-note">
                        <div>Outing schedule for every departement</div>
                        <div>5 Minutes ago</div>
                      </div>
                    </div>
                    <div className="FiTrash2">
                      <span className="BsFillPinAngleFill">
                        {" "}
                        <BsFillPinAngleFill size={20} />
                      </span>
                      <span>
                        <BsThreeDots size={25} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="Announcement-sub-2">
                  <div
                    className="main-todo-Event"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="main-todo-container">
                      <div className="main-todo-note">
                        <div>Outing schedule for every departement</div>
                        <div>5 Minutes ago</div>
                      </div>
                    </div>
                    <div className="FiTrash2">
                      <span className="BsFillPinAngleFill">
                        {" "}
                        <BsFillPinAngleFill size={20} />
                      </span>
                      <span>
                        <BsThreeDots size={25} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="Announcement-sub-2">
                  <div
                    className="main-todo-Event"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="main-todo-container">
                      <div className="main-todo-note">
                        <div>Outing schedule for every departement</div>
                        <div>5 Minutes ago</div>
                      </div>
                    </div>
                    <div className="FiTrash2">
                      <span className="BsFillPinAngleFill">
                        {" "}
                        <BsFillPinAngleFill size={20} />
                      </span>
                      <span>
                        <BsThreeDots size={25} />
                      </span>
                    </div>
                  </div>
                </div> */}

                <div className="Announcement-sub-2">
                  <div
                    className="main-todo-Event"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="main-todo-container">
                      <div className="main-todo-note">
                        <div>Outing schedule for every departement</div>
                        <div>5 Minutes ago</div>
                      </div>
                    </div>
                    <div className="FiTrash2">
                      <span className="BsFillPinAngleFill">
                        {" "}
                        <BsFillPinAngleFill size={20} />
                      </span>
                      <span>
                        <BsThreeDots size={25} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="Announcement-sub-2">
                  <div
                    className="main-todo-Event"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="main-todo-container">
                      <div className="main-todo-note">
                        <div>Outing schedule for every departement</div>
                        <div>5 Minutes ago</div>
                      </div>
                    </div>
                    <div className="FiTrash2">
                      <span className="BsFillPinAngleFill">
                        <BsFillPinAngleFill size={20} />
                      </span>
                      <span>
                        <BsThreeDots size={25} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Todos start */}
          <div className="main-div-col-2">
            <div className="main-todo-1">
              <div className="main-todo-title">
                <h4>To Do</h4>
              </div>

              {/* Checkbox */}
              <div className="main-todo-Event" style={{ borderRadius: "4px" }}>
                <div className="main-todo-container">
                  <div className="main-todo-input">
                    {" "}
                    <Checkbox {...label} />
                  </div>
                  <div>
                    <div>Call</div>
                    <div>Today - 11:30 AM</div>
                  </div>
                </div>
                <div className="FiTrash2">
                  <FiTrash2 size={25} />
                </div>
              </div>
              <div className="main-todo-Event" style={{ borderRadius: "4px" }}>
                <div className="main-todo-container">
                  <div className="main-todo-input">
                    {" "}
                    <Checkbox {...label} />
                  </div>
                  <div>
                    <div>Short meeting with IT Dept</div>
                    <div>Today - 09:30 AM</div>
                  </div>
                </div>
                <div className="FiTrash2">
                  <FiTrash2 size={25} />
                </div>
              </div>
              <div className="main-todo-Event" style={{ borderRadius: "4px" }}>
                <div className="main-todo-container">
                  <div className="main-todo-input">
                    {" "}
                    <Checkbox {...label} />
                  </div>
                  <div>
                    <div>Sort Design screens</div>
                    <div>Today - 11:30 AM</div>
                  </div>
                </div>
                <div className="FiTrash2">
                  <FiTrash2 size={25} />
                </div>
              </div>
              <div className="main-todo-Event" style={{ borderRadius: "4px" }}>
                <div className="main-todo-container">
                  <div className="main-todo-input">
                    {" "}
                    <Checkbox {...label} />
                  </div>
                  <div>
                    <div>Follow up on design</div>
                    <div>Today - 11:30 AM</div>
                  </div>
                </div>
                <div className="FiTrash2">
                  <FiTrash2 size={25} />
                </div>
              </div>
              <div className="main-todo-Event" style={{ borderRadius: "4px" }}>
                <div className="main-todo-container">
                  <div className="main-todo-input">
                    {" "}
                    <Checkbox {...label} />
                  </div>
                  <div>
                    <div>Call</div>
                    <div>Today - 11:30 AM</div>
                  </div>
                </div>
                <div className="FiTrash2">
                  <FiTrash2 size={25} />
                </div>
              </div>
            </div>
            <div className="main-todo-2">
              <Button variant="outlined" className="show-btn">
                Show All
              </Button>
              <Button variant="contained" className="Add-btn">
                Add New
              </Button>
            </div>
          </div>
          {/* Todos end */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
