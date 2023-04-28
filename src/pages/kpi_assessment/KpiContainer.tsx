import React, { useEffect, useState } from "react";
// import RegisterNavTab from './KPINavTab';
import KPINavTab from "./KPINavTab";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MyKPIAssessment from "./MyKPIAssessment";
import KPIAssessment from "./KPIAssessment";

const KpiContainer = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [data, setData] = useState(0);
  const [kpidata, setkpidata] = useState(0);

  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON?.parse(localStorage.getItem("collapse")) || false;
  });

  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };
  //

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div>
          <KPINavTab
            setIsCheck={setIsCheck}
            isCheck={isCheck}
            data={data}
            infodata={kpidata}
            text1={"KPI Assessment"}
            text2={"Create KPI Assessment"}
          />
        </div>
        <div style={{ marginTop: "2rem" }}>
          {isCheck === false ? <MyKPIAssessment setkpidata={setkpidata} /> : ""}
          {isCheck === true ? <KPIAssessment setIsCheck={setIsCheck} /> : ""}
        </div>
      </main>
    </div>
  );
};

export default KpiContainer;
