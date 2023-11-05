import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { fireAlert } from '../../utils/Alert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { hodReviewAssessment, reset } from '../../features/KPIAssessment/assessmentSlice';
import { getTotalScore, getTotalScoreWeight, hodTotalScore } from '../../utils/KpiFunctions';


const HodEvaluation = ({ data }: any) => {
  const navigate = useNavigate();
  const { id } = useParams()
  const dispatch = useAppDispatch();
  const { hodreviewisLoading, hodreviewisSuccess } = useAppSelector((state: any) => state.assessment)
  const year = new Date().getFullYear().toString();
  const location = useLocation();


  useEffect(() => {
    if (hodreviewisSuccess) {
      fireAlert("Successful", "KPI Updated!", "success");
      navigate("/kpiassessment/kpiassessment/teamkpi")
    }
    dispatch(reset());

  }, [hodreviewisSuccess, navigate, dispatch]);



  const mappedParameters: any = Object.keys(!data.parameters ? [] : data.parameters).map((key) => {
    const { self_score, score_weight, reviewer_score } = data.parameters[key] || {};
    return {
      key,
      score: self_score || 0, // Provide a default value for score if it is missing
      score_weight: score_weight || 0, // Provide a default value for reviewer_score if it is missing
      reviewer_score: reviewer_score || 0
    };
  });


  const parameters: any = {};

  Object.keys(mappedParameters).forEach((key) => {
    if (mappedParameters[key].key !== '_id') {
      parameters[mappedParameters[key].key] = {
        score: mappedParameters[key].score,
        score_weight: mappedParameters[key].score_weight,
        hod_score: 0,
        reviewer_score: mappedParameters[key].reviewer_score
      };
    }
  });




  useEffect(() => {
    setData(parameters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])



  const [datas, setData] = useState<any>(parameters);


  const hod: any = Object.keys(!datas ? [] : datas).map((key) => {
    const { hod_score, score_weight, reviewer_score } = datas[key] || {};
    return {
      key,
      score: hod_score || 0, // Provide a default value for score if it is missing
      score_weight: score_weight || 0, // Provide a default value for score_weight if it is missing 
      reviewer_score: reviewer_score || 0
    };
  });

  const handleEditScoreWeight: any = (key: string, newScoreWeight: number) => {
    setData((prevData: any) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        score_weight: newScoreWeight,
      },
    }));
  };

  const handleEditHodScore: any = (key: string, newScoreWeight: number) => {
    setData((prevData: any) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        hod_score: newScoreWeight <= 5 ? newScoreWeight : '',
      },
    }));
  };

  const [input, setinput] = useState<any>({
    parameters: {
    },
    comment: " "
  })



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newData: any = {};

  hod?.forEach((item: { key: any; score: any; score_weight: any; }) => {
    const { key, score, score_weight } = item;
    newData[key] = { score, score_weight };
  });


  useEffect(() => {
    setinput((prevState: any) => {
      return ({
        ...prevState,
        parameters: newData,
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datas, setinput]);

  const handelHodkpi = (e: any) => {
    e.preventDefault();
    const inputs = { id, input }
    //  @ts-ignore  
    dispatch(hodReviewAssessment(inputs));
  }
  const handleOnChange = (input: string, value: any) => {
    setinput((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };




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
                      {data?.status === "in review" ? <input
                        style={{ width: "80px" }}
                        type="number"
                        value={datas[key].hod_score}
                        onChange={(e) => handleEditHodScore(key, parseInt(e.target.value))}
                      /> : datas[key].reviewer_score}

                    </div>
                  </div>

                </div>
              )
            })}

            <div className="added-field">
              <div className="factor_area Grade-title">
                <p>Total</p>
                <div>
                  <p>{getTotalScoreWeight(parameters)}</p>
                </div>
              </div>
              <div className="rate_area Grade-title">
                <p>{getTotalScore(parameters)}</p>
              </div>
              {data?.status === "in review" ? "" :
                <div className="btn_area Grade-title">
                  <p> {hodTotalScore(parameters)}</p>
                </div>}
            </div>
          </div>
          {location?.state?.name === "admin" ? "" :
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