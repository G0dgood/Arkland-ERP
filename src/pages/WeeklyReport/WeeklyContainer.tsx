import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import KPINavTab from "../kpi_assessment/KPINavTab";
import WeeklyReport from "./WeeklyReport";
import MyWeekReport from "./MyWeekReport";

const WeeklyContainer = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [kpidata, setkpidata] = useState(0);
  const [collapseNav, setCollapseNav] = useState<any>(() => {
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

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div>
          <KPINavTab
            setIsCheck={setIsCheck}
            isCheck={isCheck}
            infodata={kpidata}
            text1={"Weekly Report"}
            text2={"Create Weekly Report"}
          />
        </div>
        <div style={{ marginTop: "2rem" }}>
          {isCheck === false ? <MyWeekReport setkpidata={setkpidata} /> : ""}
          {isCheck === true ? <WeeklyReport setIsCheck={setIsCheck} /> : ""}
        </div>
      </main>
    </div>
  );
};

export default WeeklyContainer;
