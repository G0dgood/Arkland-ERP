import React, { useEffect, useState } from "react";
import { MdOpenInFull } from "react-icons/md";
import img from "../../assets/images/mann2.svg";
import TodoShowAll from "../../components/TodoShowAll";
import Todos from "./Todos";
import Announcement from "./Announcement";
import DataService from "../../utils/dataService";
import createHttpService from "../../components/HttpService";
import Header from "../../components/Header";

const dataService = new DataService()
const StaffDashboard = () => {
  const Quote = require('inspirational-quotes');
  // @ts-ignore
  const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)

  const [showDrawer, setShowDrawer] = useState<any>(false);
  const [announcement, setAnnouncement] = useState<any>([]);
  const [tasks, setTask] = useState<any>([]);
  const [isLoading, setisLoading] = useState<any>([]);
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
    setDate(new Date());
  }, []);

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const getData = async () => {
    const HttpService = createHttpService();
    setisLoading(true)
    try {
      const tasksUrl = `tasks`
      const tasks: any = await HttpService.get(tasksUrl)
      setTask(tasks?.data?.data)

      const announcementsUrl = "me/announcements"
      const announcement: any = await HttpService.get(announcementsUrl)
      setAnnouncement(announcement?.data?.data)
      setisLoading(false)
      const warningUrl = `me/warnings`
      const warning: any = await HttpService.get(warningUrl)
      localStorage.setItem(userInfo?.employee?.email, !warning?.data?.data.length ? 0 : warning?.data?.data.length);
    } catch (error) {
      setisLoading(false)
    }
  }


  return (
    <div className="main-div">
      <TodoShowAll showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      <div className="main-div-col-1">
        <div>
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
                    {Quote?.getQuote()?.text}<span className="main-min-text2-span"> - {Quote?.getQuote()?.author}</span>
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
        </div>
        <div style={{ marginTop: "2rem" }}  >
          <Announcement announcement={announcement} isLoading={isLoading} />
        </div>
      </div>
      <div >
        <Todos showDrawer={showDrawer} setShowDrawer={setShowDrawer} tasks={tasks} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default StaffDashboard;
