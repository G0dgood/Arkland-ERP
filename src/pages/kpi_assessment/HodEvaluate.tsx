import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { fireAlert } from '../../utils/Alert';
import Cookies from 'js-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { hodReviewAssessment } from '../../features/KPIAssessment/assessmentSlice';


const HodEvaluation = ({ data, hodscore, setHodscore }: any) => {
  const { id } = useParams()
  const dispatch = useAppDispatch();
  const { hodreviewdata, hodreviewisError, hodreviewisLoading, hodreviewmessage, hodreviewisSuccess } = useAppSelector((state: any) => state.assessment)





  const year = new Date().getFullYear().toString();

  const navigate = useNavigate();
  const location = useLocation();




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


  const Weight = kpiData3.Weight1 +
    kpiData3.Weight2 +
    kpiData3.Weight3 +
    kpiData3.Weight4 +
    kpiData3.Weight5 +
    kpiData3.Weight6


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




  const handleOnChange4 = (input: string, value: any) => {
    setemployeegrade((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };


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
  const title1 = "KPI error";
  const icon1 = "error";

  useEffect(() => {
    if (hodreviewisSuccess) {
      fireAlert(title, html, icon);

    } else if (hodreviewisError) {
      fireAlert(title1, hodreviewmessage, icon1);

    }

  }, [html, title, icon, hodreviewisSuccess, hodreviewisError, hodreviewmessage]);


  const handelHodkpi = (e: any) => {
    e.preventDefault();
    //  @ts-ignore  
    dispatch(hodReviewAssessment(id, input));

  }



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


  return (
    <form onSubmit={handelHodkpi}>
      <div className="top-fields">
        <p>{data?.month} | {year} </p>
      </div>
      <div className="evaluation-area_cont">
        <div>
          <div className="added-fields_cont">
            <div className="added-field">
              <div className="factor_area">
                <p> </p>
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
            <div className="added-field">
              <div className="factor_area">
                <p>Job Knowledge</p>
                <div>
                  <p>{kpiData3?.Weight1}</p>
                </div>
              </div>
              <div className="rate_area">
                <p>{data?.job_knowledge_employee}</p>
              </div>
              <div className="btn_area">
                {data?.status === 'active' ? data?.job_knowledge_reviewer :
                  <select value={employeegrade.employeegrade1}
                    onChange={(e) => handleOnChange4('employeegrade1', e.target.value)}>
                    <option></option>
                    {[1, 2, 3, 4, 5].map(item =>
                      <option key={item} value={item}>{item}</option>
                    )}
                  </select>
                }
              </div>
            </div>
            <div className="added-field">
              <div className="factor_area">
                <p>Efficiency</p>
                <div>
                  <p>{kpiData3?.Weight2}</p>
                </div>
              </div>
              <div className="rate_area">
                <p>{data?.efficiency_employee}</p>
              </div>
              <div className="btn_area">
                {data?.status === 'active' ? data?.efficiency_reviewer :
                  <select value={employeegrade.employeegrade2}
                    onChange={(e) => handleOnChange4('employeegrade2', e.target.value)}>
                    <option></option>
                    {[1, 2, 3, 4, 5].map(item =>
                      <option key={item} value={item}>{item}</option>
                    )}
                  </select>
                }
              </div>
            </div>
            <div className="added-field">
              <div className="factor_area">
                <p>Attendance</p>
                <div>
                  <p>{kpiData3?.Weight3}</p>
                </div>
              </div>
              <div className="rate_area">
                <p>{data?.attendance_employee}</p>
              </div>
              <div className="btn_area">
                {data?.status === 'active' ? data?.attendance_reviewer :
                  <select value={employeegrade.employeegrade3}
                    onChange={(e) => handleOnChange4('employeegrade3', e.target.value)}>
                    <option></option>
                    {[1, 2, 3, 4, 5].map(item =>
                      <option key={item} value={item}>{item}</option>
                    )}
                  </select>
                }
              </div>
            </div>
            <div className="added-field">
              <div className="factor_area">
                <p>Software Development</p>
                <div>
                  <p>{kpiData3.Weight4}</p>
                </div>
              </div>
              <div className="rate_area">
                <p>{data?.communication_employee}</p>
              </div>
              <div className="btn_area">
                {data?.status === 'active' ? data?.communication_reviewer :
                  <select value={employeegrade?.employeegrade4}
                    onChange={(e) => handleOnChange4('employeegrade4', e.target.value)}>
                    <option></option>
                    {[1, 2, 3, 4, 5].map(item =>
                      <option key={item} value={item}>{item}</option>
                    )}
                  </select>
                }
              </div>
            </div>
            <div className="added-field">
              <div className="factor_area">
                <p>Team work</p>
                <div>
                  <p>{kpiData3?.Weight5}</p>
                </div>
              </div>
              <div className="rate_area">
                <p>{data?.reliability_employee}</p>
              </div>
              <div className="btn_area">
                {data?.status === 'active' ? data?.reliability_reviewer :
                  <select value={employeegrade.employeegrade5}
                    onChange={(e) => handleOnChange4('employeegrade5', e.target.value)}>
                    <option></option>
                    {[1, 2, 3, 4, 5].map(item =>
                      <option key={item} value={item}>{item}</option>
                    )}
                  </select>
                }
              </div>
            </div>
            <div className="added-field">
              <div className="factor_area">
                <p>Debugging</p>
                <div>
                  <p>{kpiData3.Weight6}</p>
                </div>
              </div>
              <div className="rate_area">
                <p>{data?.collaboration_employee}</p>
              </div>
              <div className="btn_area">
                {data?.status === 'active' ? <p>{data?.collaboration_reviewer}</p> :
                  <select value={employeegrade?.employeegrade6}
                    onChange={(e) => handleOnChange4('employeegrade6', e.target.value)}>
                    <option></option>
                    {[1, 2, 3, 4, 5].map(item =>
                      <option key={item} value={item}>{item}</option>
                    )}
                  </select>
                }
              </div>
            </div>
            <div className="added-field">
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

            </div>
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
      </div>
    </form>
  )
}

export default HodEvaluation;