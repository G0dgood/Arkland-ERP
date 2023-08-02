import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { fireAlert } from '../../utils/Alert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { hodReviewAssessment, reset } from '../../features/KPIAssessment/assessmentSlice';


const HodEvaluation = ({ data, hodscore, setHodscore }: any) => {
 const navigate = useNavigate();
 const { id } = useParams()
 const dispatch = useAppDispatch();
 const { hodreviewdata, hodreviewisLoading, hodreviewisSuccess } = useAppSelector((state: any) => state.assessment)
 const year = new Date().getFullYear().toString();
 const location = useLocation();


 console.log('hodreviewdata', hodreviewdata)


 const kpiData3 = ({
  Weight1: 20,
  Weight2: 15,
  Weight3: 15,
  Weight4: 15,
  Weight5: 15,
  Weight6: 20,
 });

 const [employeegrade, setemployeegrade] = useState<any>({
  employeegrade1: 0,
  employeegrade2: 0,
  employeegrade3: 0,
  employeegrade4: 0,
  employeegrade5: 0,
  employeegrade6: 0,
 })


 // const Weight = kpiData3.Weight1 +
 //  kpiData3.Weight2 +
 //  kpiData3.Weight3 +
 //  kpiData3.Weight4 +
 //  kpiData3.Weight5 +
 //  kpiData3.Weight6







 const kpiData: any = [
  {
   'Performance': 'Job Knowledge',
   'num': hodreviewdata?.data?.job_knowledge_employee,
   'employeegrade': 0
  },
  {
   'Performance': 'Efficiency',
   'num': hodreviewdata?.data?.efficiency_employee,
   'employeegrade': 0
  },
  {
   'Performance': ' Attendance',
   'num': hodreviewdata?.data?.attendance_employee,
   'employeegrade': 0
  },
  {
   'Performance': 'Software Development',
   'num': hodreviewdata?.data?.communication_employee
  },
  {
   'Performance': 'Team work',
   'num': hodreviewdata?.data?.reliability_employee
  },
  {
   'Performance': 'Debugging',
   'num': hodreviewdata?.data?.collaboration_employee
  },
 ];

 const totalScore1 = (kpiData3.Weight1 / 5) * employeegrade.employeegrade1
 const totalScore2 = (kpiData3.Weight2 / 5) * employeegrade.employeegrade2
 const totalScore3 = (kpiData3.Weight3 / 5) * employeegrade.employeegrade3
 const totalScore4 = (kpiData3.Weight4 / 5) * employeegrade.employeegrade4
 const totalScore5 = (kpiData3.Weight5 / 5) * employeegrade.employeegrade5
 const totalScore6 = (kpiData3.Weight6 / 5) * employeegrade.employeegrade6


 useEffect(() => {
  const kpi: any = totalScore1 + totalScore2 + totalScore3 + totalScore4 + totalScore5 + totalScore6
  setHodscore(kpi)
 }, [setHodscore, totalScore1, totalScore2, totalScore3, totalScore4, totalScore5, totalScore6])




 // calculates the total in a Columns
 //  @ts-ignore  
 const Amount: any = Object.values(kpiData).reduce((a, v) => (a = a + v?.num), 0);


 const [input, setinput] = useState<any>({
  "month": 0,
  "job_knowledge": 0,
  "efficiency": 0,
  "attendance": 0,
  "communication": 0,
  "reliability": 0,
  "collaboration": 0,
  "comment": ""
 })


 const handleOnChange = (input: string, value: any) => {
  setinput((prevState: any) => ({
   ...prevState,
   [input]: value,
  }));
 };



 const title = "Successful";
 const html = "KPI Updated!";
 const icon = "success";


 useEffect(() => {
  if (hodreviewisSuccess) {
   fireAlert(title, html, icon);
   navigate("/kpiassessment/kpiassessment/teamkpi")
  }
  dispatch(reset());

 }, [html, title, icon, hodreviewisSuccess, navigate, dispatch]);






 const reviews = [
  { 'reviewer': data?.job_knowledge_employee },
  { 'reviewer': data?.efficiency_reviewer },
  { 'reviewer': data?.attendance_reviewer },
  { 'reviewer': data?.communication_reviewer },
  { 'reviewer': data?.reliability_reviewer },
  { 'reviewer': data?.collaboration_reviewer },
 ];

 //  @ts-ignore  
 const hod: any = Object.values(reviews).reduce((a, v) => (a = a + v?.reviewer), 0);


 useEffect(() => {
  setinput((prevState: any) => {
   return ({
    ...prevState,
    month: data?.month
   });
  });
 }, [setinput, data?.month]);


 useEffect(() => {
  setinput((prevState: any) => {
   return ({
    ...prevState,
    job_knowledge: totalScore1,
    efficiency: totalScore2,
    attendance: totalScore3,
    communication: totalScore4,
    reliability: totalScore5,
    collaboration: totalScore6
   });
  });
 }, [setinput, totalScore1, totalScore2, totalScore3, totalScore4, totalScore5, totalScore6]);



 const mappedParameters: any = Object.keys(!data.parameters ? [] : data.parameters).map((key) => {
  const { self_score, score_weight } = data.parameters[key] || {};
  return {
   key,
   score: self_score || 0, // Provide a default value for score if it is missing
   score_weight: score_weight || 0, // Provide a default value for score_weight if it is missing
  };
 });


 const parameters: any = {};

 Object.keys(mappedParameters).forEach((key) => {
  if (mappedParameters[key].key !== '_id') {
   parameters[mappedParameters[key].key] = {
    score: mappedParameters[key].score,
    score_weight: mappedParameters[key].score_weight,
   };
  }
 });



 useEffect(() => {
  setData(parameters)
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [data])



 const [datas, setData] = useState<any>(parameters);

 const handleEditScoreWeight: any = (key: string, newScoreWeight: number) => {
  setData((prevData: any) => ({
   ...prevData,
   [key]: {
    ...prevData[key],
    score_weight: newScoreWeight,
   },
  }));
 };
 const [inputr, setinputr] = useState<any>({
  "parameters": {
   "Hi Guys Joel here from Uganda the Pearl Of Africa,…ited about this journey with you all": { "score": 0, "score_weight": 20 },
   "attendance": { "score": 5, "score_weight": 20 },
   "collaboration": { "score": 5, "score_weight": 20 },
   "communication": { "score": 5, "score_weight": 0 },
   "efficiency": { "score": 5, "score_weight": 15 },
   "job_knowledge": { "score": 5, "score_weight": 20 },
   "reliability": { "score": 5, "score_weight": 10 }
  },
  "comment": "You no try anything"
 })
 useEffect(() => {
  setinputr((prevState: any) => {
   return ({
    ...prevState,
    parameters: datas,
    comment: input.comment
   });
  });
 }, [setinputr, datas, input.comment]);

 const handelHodkpi = (e: any) => {
  e.preventDefault();
  const inputs = { id, inputr }
  //  @ts-ignore  
  dispatch(hodReviewAssessment(inputs));
 }

 console.log('inputr', inputr)




 return (
  <form onSubmit={handelHodkpi}>
   <div className="top-fields">
    <p>{data?.month} | {year} </p>
   </div>
   {!data ? "" : <div className="evaluation-area_cont">
    <div>
     <div className="added-fields_cont">
      <div className="added-field">
       <div className="factor_area">
        <div className="rate_area Grade-title">
         <p>Performance  Indicator</p>
        </div>
        <div className='Grade-title'>
         <p>Weight</p>
        </div>
       </div>
       <div className="rate_area Grade-title">
        <p>Staff Score</p>
       </div>
       <div className="btn_area Grade-title">
        <p>HOD Grade</p>
       </div>
      </div>

      {Object.keys(!datas ? [] : datas).map((key) => {
       if (key === '_id') return null;
       return (
        <div key={key}>
         <div className="added-field">
          <div className="factor_area">
           <p>{key}</p>
           <div>
            <p>
             <input
              style={{ width: "80px" }}
              type="number"
              value={datas[key].score_weight}
              onChange={(e) => handleEditScoreWeight(key, parseInt(e.target.value))}
             />
            </p>
           </div>
          </div>
          <div className="rate_area">
           {datas[key].score}
          </div>
          <div className="btn_area">
           {/* @ts-ignore */}
           {Object.keys(!hodreviewdata ? [] : hodreviewdata).map((key: any) => {
            <p>{hodreviewdata[key]?.reviewer_score}</p>
           })}
          </div>
         </div>

        </div>
       )
      })}

      {/* <div className="added-field">
       <div className="factor_area Grade-title">
        <p>Total</p>
        <div>
         <p>{Weight}</p>
        </div>
       </div>
       <div className="rate_area Grade-title">
        <p>{!Amount ? "0" : Amount}</p>
       </div>
       {location.state.name === "admin" ? "" : <div className="btn_area Grade-title">
        {data?.status === 'active' ? hod : <p> {hodscore}</p>}
       </div>}
       {location.state.name === "admin" && <div className="btn_area Grade-title">
        <p> {hodscore}</p>
       </div>} 
      </div> */}
     </div>
     {location.state.name === "admin" ? "" :
      <div>
       {data?.status === 'active' ? "" :
        <div>
         {/* @ts-ignore   */}
         <textarea rows="4" placeholder="Add an extended comment" required
          value={input.comment}
          onChange={(e) => handleOnChange('comment', e.target.value)} />
         <Button variant="contained"
          disabled={hodreviewisLoading}
          className="Add-btn-modal" type="submit">{hodreviewisLoading ? <Spinner animation="border" /> : 'Submit'}</Button>
        </div>
       }
      </div>}

    </div>
   </div>}

  </form>
 )
}

export default HodEvaluation;