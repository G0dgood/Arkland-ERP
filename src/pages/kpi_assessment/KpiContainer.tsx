import React, { useEffect, useState } from "react";
// import RegisterNavTab from './KPINavTab';
import KPINavTab from "./KPINavTab";
import MyKPIAssessment from "./MyKPIAssessment";
import KPIAssessment from "./KPIAssessment";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { getAssessment } from "../../features/KPIAssessment/assessmentSlice";

const KpiContainer = () => {
  const dispatch = useAppDispatch();

  // const { data, isError, isLoading, message, isSuccess } = useAppSelector((state: any) => state.assessment)

  // useEffect(() => {
  //   // @ts-ignore
  //   dispatch(getAssessment());
  // }, [dispatch]);


  const [isCheck, setIsCheck] = useState(false);

  const [kpidata, setkpidata] = useState(0);



  return (
    <div  >
      <div>
        <KPINavTab
          setIsCheck={setIsCheck}
          isCheck={isCheck}
          data={''}
          infodata={kpidata}
          text1={"KPI Assessment"}
          text2={"Create KPI Assessment"}
        />
      </div>
      <div style={{ marginTop: "2rem" }}>
        {isCheck === false ? <MyKPIAssessment setkpidata={setkpidata} /> : ""}
        {isCheck === true ? <KPIAssessment setIsCheck={setIsCheck} /> : ""}
      </div>

    </div>
  );
};

export default KpiContainer;
