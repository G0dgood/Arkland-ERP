import { useState } from "react";

import KPINavTab from "../kpi_assessment/KPINavTab";
import WeeklyReport from "./WeeklyReport";
import MyWeekReport from "./MyWeekReport";

const WeeklyContainer = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [kpidata, setkpidata] = useState(0);


  return (
    <div  >
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
        {isCheck === false ? <MyWeekReport setkpidata={setkpidata} /> : <WeeklyReport setIsCheck={setIsCheck} />}
        {/* {isCheck === true ? <WeeklyReport setIsCheck={setIsCheck} /> : ""} */}
      </div>
    </div>
  );
};

export default WeeklyContainer;
