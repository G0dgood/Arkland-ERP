import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { fireAlert } from "../../utils/Alert";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { createAssessment, reset } from "../../features/KPIAssessment/assessmentSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import DataService from "../../utils/dataService";
import HttpService from "../../components/HttpService";
import SelectInput from "../../components/SelectInput";
import { FaBeer } from 'react-icons/fa';
import { BsDashCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { myAttendance } from "../../features/Attendances/attendanceSlice";
import { blockFullStop } from "../../utils/KpiFunctions";


const dataService = new DataService()
const KPIAssessment = ({ setIsCheck, setShow, handleRemoveField, handleAddField, newKpiField, handleKPIChange, setInputs, inputs, allInput }: any) => {



  const dispatch = useAppDispatch();
  const { createisLoading, createisSuccess } = useAppSelector((state: any) => state.assessment)
  const year = new Date().getFullYear().toString();
  const navigate = useNavigate();
  const userInfo = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
  const [kpinputs, setKpInputs] = useState({
    month: 0,
    reviewer: "",
    job_knowledge: 0,
    efficiency: 0,
    attendance: 0,
    communication: 0,
    reliability: 0,
    collaboration: 0,
    comment: "",
  });




  // const handleOnChangeKpiData = (num: 'one' | 'two', input: string, value: string | number) => {
  // 	setKpiData((prevState) => ({ ...prevState, [num]: { ...prevState.[num], [input]: value } }))
  // }

  // @ts-ignore
  const kpiData1: any = ({
    Performance1: "Job Knowledge",
    Performance2: "Efficiency",
    Performance3: "Attendance",
    Performance4: "Communication",
    Performance5: "Reliability",
    Performance6: "Collaboration",
  });

  const kpiData2: any = ({
    IndicatorDescription1:
      "Measures employee's relevant knowledge and essential skills, such as work practices, policies and procedures needed to do a particular job",
    IndicatorDescription2:
      "Maintaining the same standards and behaviors that lead to producing a high quality of work",
    IndicatorDescription3: "Frequency of times at work",
    IndicatorDescription4:
      "Completes clearly defined tasks and works and also learn the relevant technologies to improve the company sales mobile application solutions.",


  });

  const kpiData3: any = ({
    Weight1: 20,
    Weight2: 15,
    Weight3: 15,
    Weight4: 15,
    Weight5: 15,
    Weight6: 20,
  });

  const Weight =
    kpiData3.Weight1 +
    kpiData3.Weight2 +
    kpiData3.Weight3 +
    kpiData3.Weight4 +
    kpiData3.Weight5 +
    kpiData3.Weight6;

  const handleOnChange = (input: string, value: any) => {
    setKpInputs((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };




  const totalScore1 = kpinputs.job_knowledge;
  const totalScore2 = kpinputs.efficiency;
  const totalScore3 = kpinputs.attendance;

  const [kpiscore, setkpiscore] = useState();
  useEffect(() => {
    const kpi: any = 0
    setkpiscore(kpi);
  }, [
    totalScore1,
    totalScore2,
    totalScore3,
  ]);



  useEffect(() => {
    setInputs((prevState: any) => {
      return {
        ...prevState,
        job_knowledge: totalScore1,
        efficiency: totalScore2,
        attendance: totalScore3,
        month: kpinputs.month,
        // @ts-ignore
        reviewer: kpinputs.reviewer?.value,
        comment: kpinputs.comment,
      };
    });
  }, [kpinputs.comment, kpinputs.job_knowledge, kpinputs.month, kpinputs.reviewer, setInputs, totalScore1, totalScore2, totalScore3, userInfo?.employee?._id]);


  useEffect(() => {
    if (createisSuccess) {
      fireAlert("KPI success", "KPI Created!", "success");
      setShow(false)
      dispatch(reset());
    }
  }, [navigate, createisSuccess, setShow, dispatch]);


  const handelkpi = (e: any) => {
    e.preventDefault()
    // @ts-ignore
    dispatch(createAssessment(allInput));
  };

  const [hods, setHOD] = useState([])



  useEffect(() => {
    getData()
  }, [])

  const [isLoading, setisLoading] = useState(false)

  const getData = async () => {
    setisLoading(true)
    try {
      const hodsUrl = `employees`
      const hods: any = await HttpService.get(hodsUrl)
      setHOD(hods?.data?.data)
      setisLoading(false)
    } catch (error) {
      setisLoading(false)
    }
  }


  const availablleHods = [] as any;
  hods &&
    hods?.forEach((hod: any) =>
      availablleHods.push({
        value: hod.id,
        label: hod.full_name,
      })
    );




  useEffect(() => {
    if (createisSuccess) {
      setKpInputs({
        month: 0,
        reviewer: "",
        job_knowledge: 0,
        efficiency: 0,
        attendance: 0,
        communication: 0,
        reliability: 0,
        collaboration: 0,
        comment: "",
      });
    }

  }, [setIsCheck, createisSuccess]);


  console.log('availablleHods', hods)

  return (
    <form onSubmit={handelkpi}>
      <div>
        <div className="grading-system-contain">
          <div> </div>
          <h4 className="grading-system-title">Grading System</h4>
        </div>
        <div className="kpi-top-container">
          <div className="kpi-top-container-card-1">
            <div className="kpi-top-card-1">Employee Appraisal </div>
            <div className="kpi-top-card-1-sub">
              <p>Employee Name</p>
              <p className="kpi-top-card-1-sub-second-child">
                {userInfo?.employee?.full_name}
              </p>
              <p>Employee Role</p>
              <p>{userInfo?.role?.name}</p>
              <p>Employee ID</p>
              <p>{userInfo?.employee?.employee_id} </p>
              <p>Date</p>
              <p> {new Date().toDateString()}</p>
            </div>
          </div>
          <div className="kpi-top-container-card-2">
            <div className="grading-system">
              <p>Rating Score</p>
              <p className="grading-system-second-child">Description</p>
              <p>5</p>
              <p>Outstanding</p>
              <p>4</p>
              <p>Very Good</p>
              <p>3</p>
              <p>Good</p>
              <p>3</p>
              <p>Average</p>
              <p>1</p>
              <p>Below Average/Poor</p>
            </div>
          </div>

          <div>
            <div className="datacell-button-bottom-select">
              <div className="table-datacell-button-bottom" style={{ marginRight: "20px" }}  >
                <div className="performance-intro-header">
                  <div className="quarter" style={{ marginBottom: "0.5rem", width: "100%" }}>
                    <div className="entries-perpage">
                      Year:
                      <select name="year"  >
                        <option>{year}</option>
                      </select>
                    </div>
                    <div className="entries-perpage">
                      Month:
                      <select
                        name="month"
                        value={kpinputs.month}
                        required
                        onChange={(e) => handleOnChange("month", e.target.value)}>
                        <option> </option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                  </div>

                  <div className="entries-perpage ">
                    <SelectInput
                      label="HOD :"
                      isDisabled={isLoading}
                      isLoading={isLoading}
                      options={availablleHods}
                      value={kpinputs?.reviewer}
                      onChange={(e: any) => handleOnChange("reviewer", e)}
                    />
                  </div>
                </div>
              </div>
              <div className="table-datacell-button-bottom">
                <div className="table-datacell-button-bottom-color1">KPI SCORE:</div>
                <div className="table-datacell-button-bottom-color2">{!kpiscore ? 0 : kpiscore}</div>
              </div>
            </div>
            {/* <div className="kpi-add-more">
       <h6>Add more field</h6>
       <Button onClick={handleAddField} >
        <BsPlusCircleFill size={30} color={'green'} />
       </Button>
       <Button onClick={() => handleRemoveField()}>
        <BsDashCircleFill size={30} color={'red'} />
       </Button>
      </div> */}
          </div>
        </div>
      </div>

      <div className="kpi-top-container-card-3">
        <section className="md-ui component-data-table">
          <div className="main-table-wrapper">
            <table className="main-table-content">
              <thead className="data-table-header">
                <tr className="data-table-row">
                  <td className="table-datacell datatype-numeric">
                    Key Performance Indicator
                  </td>
                  <td className="table-datacell datatype-numeric">
                    Indicator Description
                  </td>
                  <td className="table-datacell datatype-numeric">Weight</td>
                  <td className="table-datacell datatype-numeric">
                    Employee Grade
                  </td>
                  <td className="table-datacell datatype-numeric">
                    Add & Delete Field
                  </td>
                </tr>
              </thead>

              <tbody className="data-table-content">
                {/* one */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance1}
                      onChange={(e) =>
                        handleOnChange("Performance1", e.target.value)
                      }
                    />
                  </td>

                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription2}
                      onChange={(e) =>
                        handleOnChange("IndicatorDescription1", e.target.value)}
                      rows={4}
                    />
                  </td>

                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight1}
                      disabled
                    />
                  </td>

                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={kpinputs.job_knowledge}
                      onChange={(e) => handleOnChange("job_knowledge", parseInt(e.target.value))}
                    >
                      <option>
                      </option>
                      {[1, 2, 3, 4, 5].map(item =>
                        <option key={item} value={item}>{item}</option>
                      )}
                    </select>
                  </td>
                </tr>

                {/* two */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance2}
                    />

                  </td>
                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription2}
                      rows={5}
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight2}
                      disabled
                    />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="efficiency"
                      required
                      value={kpinputs.efficiency}
                      onChange={(e) => handleOnChange("efficiency", e.target.value)} >
                      <option></option>
                      {[1, 2, 3, 4, 5].map(item =>
                        <option key={item} value={item}>{item}</option>
                      )}
                    </select>
                  </td>
                </tr>

                {/* three */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input className="Performance-Indicator-input"
                      value={kpiData1.Performance3} />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription3}

                      rows={5}
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight3}
                      disabled
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={kpinputs.attendance}
                      onChange={(e) => handleOnChange("attendance", parseInt(e.target.value))} >
                      <option></option>
                      {[1, 2, 3, 4, 5].map(item =>
                        <option key={item} value={item}>{item}</option>
                      )}
                    </select>
                  </td>
                </tr>

                {/* four */}
                {newKpiField?.map((item: any, i: any) => (
                  <tr className="data-table-row" key={i}>
                    <td className="table-datacell datatype-string">
                      <input className="Performance-Indicator-input"
                        value={item.description}
                        required
                        onChange={(e) => handleKPIChange("description", e.target.value, item.id)}
                        onInput={blockFullStop} />

                    </td>
                    <td className="table-datacell datatype-numeric">
                      <textarea
                        id="kpi-textarea"
                        className="Performance-Indicator-input2"
                        value={item.name}
                        required
                        onChange={(e) => handleKPIChange("name", e.target.value, item.id)}
                        onInput={blockFullStop}
                        rows={5}
                      />{" "}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <input
                        className="Performance-Indicator-input1"
                        value={0}
                        disabled
                      />{" "}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <select
                        className="performance-field"
                        name="score"
                        required
                        value={item.score}
                        onChange={(e) => handleKPIChange("score", parseInt(e.target.value), item.id)}
                      >
                        <option></option>
                        {[1, 2, 3, 4, 5].map(item =>
                          <option key={item} value={item}>{item}</option>
                        )}
                      </select>
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <div className="kpi-add-more">
                        <Button onClick={handleAddField} >
                          <BsPlusCircleFill size={30} color={'green'} />
                        </Button>
                        <Button onClick={() => handleRemoveField(i)}>
                          <BsDashCircleFill size={30} color={'red'} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tr className="data-table-row">
                <td className="table-datacell datatype-string table-datacell-color">
                </td>
                <td className="table-datacell datatype-numeric table-datacell-color">
                </td>
                <td className="table-datacell datatype-numeric table-datacell-color2">
                  {Weight}
                </td>
                <td className="table-datacell datatype-numeric table-datacell-color">
                </td>
              </tr>
            </table>
          </div>
        </section>

      </div>
      <div className="board">
        <div className="shareCommentContainer">
          <textarea
            id="shareCommentText"
            placeholder="Write a comment.."
            required
            value={kpinputs.comment}
            onChange={(e) => handleOnChange("comment", e.target.value)}
            onInput={blockFullStop} >
          </textarea>
          <div className="con-btn-success">
            <Button variant="contained" className="Add-btn" disabled={createisLoading} type="submit">
              {createisLoading ? <Spinner animation="border" /> : "	Create KPI"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default KPIAssessment;
