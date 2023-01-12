import React, { useEffect, useState } from "react";
import { MdOpenInFull } from "react-icons/md";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
// @ts-ignore
import img from "../../assets/images/mann2.svg";
import Checkbox from "@material-ui/core/Checkbox";
import CreateAnnouncementModal from "../../components/Modals/CreateAnnouncementModal";
import { useNavigate } from "react-router-dom";
import TodoShowAll from "../../components/TodoShowAll";
import CreateEvent from "../../components/Modals/CreateEvent";
import Announcement from "./Announcement";
import Todos from "./Todos";

const Dashboard = ({ setShowDrawer, showDrawer }: any) => {
 const navigate = useNavigate();
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

 const locale = 'en';
 // Save the current date to be able to trigger an update
 const [today, setDate] = React.useState(new Date());

 React.useEffect(() => {
  const timer = setInterval(() => { // Creates an interval which will update the current data every minute
   // This will trigger a rerender every component that uses the useDate hook.
   setDate(new Date());
  }, 60 * 1000);
  return () => {
   clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
  }
 }, []);

 const objectDate = new Date();
 const month = objectDate.getMonth();
 const year = objectDate.getFullYear();
 const day = today.toLocaleDateString(locale, { weekday: 'long' });
 const date = ` ${today.toLocaleDateString(locale, { month: 'long' })} `;
 const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });


 // window.onload = function () {
 //  const nav: any = document.getElementById('nav');
 //  const burger: any = document.getElementById('burger');
 //  const overlay: any = document.getElementById('overlay1');

 //  burger.addEventListener('click', () => {
 //   burger.classList.toggle('active');
 //   nav.classList.toggle('active');
 //   overlay.classList.toggle('active');
 //  });
 // }





 return (
  <div id="screen-wrapper">
   <Header toggleSideNav={toggleSideNav} />
   <Sidebar collapseNav={collapseNav} />
   <main>
    <TodoShowAll showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
    <div className="main-div" >
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
         <MdOpenInFull onClick={() => navigate('/dashboardcalender')} />
        </span>
        <h1 className="event-time">{time}</h1>
        <h1 className="event-days">{day}</h1>
        <p className="event-months">{date.toUpperCase()} {month} {year}</p>
        <CreateEvent />
       </div>
      </div>
      {/* Announcement */}
      <Announcement />
     </div>

     {/* Todos start */}
     <Todos showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
     {/* Todos end */}
    </div>
   </main>
  </div>
 );
};

export default Dashboard;
