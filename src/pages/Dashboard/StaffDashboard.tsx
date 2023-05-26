import React, { useEffect, useState } from "react";
import { MdOpenInFull } from "react-icons/md";
// @ts-ignore
import img from "../../assets/images/mann2.svg";
import TodoShowAll from "../../components/TodoShowAll";
import Todos from "./Todos";
import Announcement from "./Announcement";

const StaffDashboard = () => {
  const Quote = require('inspirational-quotes');


  const [showDrawer, setShowDrawer] = useState<any>(false);

  const locale = "en";
  // Save the current date to be able to trigger an update
  const [today, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  const objectDate = new Date();
  const month = objectDate.getMonth();
  const year = objectDate.getFullYear();
  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = ` ${today.toLocaleDateString(locale, { month: "long" })} `;
  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  React.useEffect(() => {
    // const timer = setInterval(() => { // Creates an interval which will update the current data every minute
    // This will trigger a rerender every component that uses the useDate hook.
    setDate(new Date());
    // }, 60 * 1000);
    // return () => {
    // 	clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    // }
  }, []);



  return (
    <div className="main-div">
      <TodoShowAll showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
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
                  {Quote.getQuote().text}<span className="main-min-text2-span"> - {Quote.getQuote().author}</span>
                </p>

              </div>
            </div>
          </div>
          <div className="main-div-col-2-sub-min">
            <span className="OpenInFull">
              <MdOpenInFull />
            </span>
            <h1 className="event-time">{time}</h1>
            <h1 className="event-days">{day}</h1>
            <p className="event-months">
              {date.toUpperCase()} {month} {year}
            </p>
            {/* <CreateEvent /> */}
          </div>
        </div>
        {/* Announcement */}
        <Announcement />
      </div>

      {/* Todos start */}
      <Todos showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      {/* Todos end */}
    </div>
  );
};

export default StaffDashboard;
