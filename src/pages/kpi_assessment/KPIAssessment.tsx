import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import { fireAlert } from "../../utils/Alert";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import storage from "../../utils/storage";
import { Spinner } from "react-bootstrap";

const KPIAssessment = ({ setIsCheck }: any) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  // @ts-ignore 
  const userInfo: any = JSON.parse(storage?.get("user"));

  // const [kpicheck, setkpicheck] = useState<any>();
  const [employees, setEmployees] = useState<any>();

  const [kpinputs, setKpInputs] = useState({
    month: 0,
    employee: "",
    reviewer: "",
    job_knowledge: 0,
    efficiency: 0,
    attendance: 0,
    communication: 0,
    reliability: 0,
    collaboration: 0,
    comment: "",
  });
  const [inputs, setInputs] = useState({
    month: 0,
    employee: "",
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
    IndicatorDescription5:
      "Collaborate with other team members and  communicates when something is blocking.",
    IndicatorDescription6:
      "Helps debug technical problems. Submits issues so that we can document and improve our service.",
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



  const totalScore1 = (kpiData3.Weight1 / 5) * kpinputs.job_knowledge;
  const totalScore2 = (kpiData3.Weight2 / 5) * kpinputs.efficiency;
  const totalScore3 = (kpiData3.Weight3 / 5) * kpinputs.attendance;
  const totalScore4 = (kpiData3.Weight4 / 5) * kpinputs.communication;
  const totalScore5 = (kpiData3.Weight5 / 5) * kpinputs.reliability;
  const totalScore6 = (kpiData3.Weight6 / 5) * kpinputs.collaboration;

  const [kpiscore, setkpiscore] = useState();
  useEffect(() => {
    const kpi: any =
      totalScore1 +
      totalScore2 +
      totalScore3 +
      totalScore4 +
      totalScore5 +
      totalScore6;
    setkpiscore(kpi);
  }, [
    totalScore1,
    totalScore2,
    totalScore3,
    totalScore4,
    totalScore5,
    totalScore6,
  ]);


  useEffect(() => {
    setInputs((prevState: any) => {
      return {
        ...prevState,
        job_knowledge: totalScore1,
        efficiency: totalScore2,
        attendance: totalScore3,
        communication: totalScore4,
        reliability: totalScore5,
        collaboration: totalScore6,
        employee: userInfo?.data?.employee?._id,
        month: kpinputs.month,
        reviewer: kpinputs.reviewer,
        comment: kpinputs.comment,
      };
    });
  }, [kpinputs.comment, kpinputs.job_knowledge, kpinputs.month, kpinputs.reviewer, setInputs, totalScore1, totalScore2, totalScore3, totalScore4, totalScore5, totalScore6, userInfo?.data?.employee?._id]);


  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setisError] = useState(false);

  const title = "Successful";
  const html = "KPI Created!";
  const icon = "success";
  const title1 = "KPI error";
  const html1 = message;
  const icon1 = "error";



  useEffect(() => {
    if (isSuccess) {
      fireAlert(title, html, icon);
      setTimeout(() => {
        setisSuccess(false);
      }, 5000);
    } else if (isError) {
      fireAlert(title1, html1, icon1);
      setTimeout(() => {
        setisError(false);
      }, 1000);
    }
  }, [html, title, icon, isSuccess, isError, html1, navigate]);

  const handelkpi = (e: any) => {
    e.preventDefault();
    setisLoading(true);
    fetch(`${process.env.REACT_APP_API}/hr/appraisals`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === false) {
          setMessage(data?.message);
          setisError(true);
        } else {
          setisSuccess(true);
          setTimeout(() => {
            navigate("/kpicontainer");
          }, 2000);
        }
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };



  React.useEffect(() => {
    // setisLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/hr/employees`)
      .then((res: AxiosResponse) => {
        setEmployees(res?.data?.data?.filter((obj: any) => obj?.role === "63d13339fb66838b39c75f02"));
        // console.log('res', res?.data?.data?.filter((obj: any) => obj?.role === "63d13339fb66838b39c75f02"));
        // setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setisLoading(false);
      });
  }, []);

  const year = new Date().getFullYear().toString();

  useEffect(() => {
    if (isSuccess) {
      fireAlert(title, html, icon);
      setKpInputs({
        month: 0,
        employee: "",
        reviewer: "",
        job_knowledge: 0,
        efficiency: 0,
        attendance: 0,
        communication: 0,
        reliability: 0,
        collaboration: 0,
        comment: "",
      });
      setTimeout(() => {
        setisSuccess(false);
        setIsCheck(false)
      }, 2000);
    } else if (message) {
      fireAlert(title1, html1, icon1);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }, [html, title, icon, isSuccess, message, html1, title1, setIsCheck]);

  return (
    <div>
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
                {userInfo?.data?.employee?.full_name}
              </p>
              <p>Employee Role</p>
              <p>{userInfo?.data?.role?.name}</p>
              <p>Employee ID</p>
              <p>{userInfo?.data?.employee?.employee_id} </p>
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
                  <div className="quarter" style={{ marginBottom: "0.5rem" }}>
                    <div className="entries-perpage">
                      Year:
                      <select name="year"  >
                        <option>{year}</option>
                      </select>
                    </div>
                    <div style={{ width: "30px" }} />
                    <div className="entries-perpage">
                      Month:
                      <select
                        name="month"
                        value={kpinputs.month}
                        required
                        onChange={(e) => handleOnChange("month", e.target.value)}
                      >
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

                  <div className="line-manager entries-perpage ">
                    <div>HOD :</div>
                    <select
                      name="line-manager"
                      value={kpinputs.reviewer}
                      onChange={(e) => handleOnChange("reviewer", e.target.value)}
                      required
                    >
                      <option> </option>
                      {employees?.map((employ: any) => (
                        <option key={employ?._id} value={employ?.id}>
                          {employ?.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="table-datacell-button-bottom">
                <div className="table-datacell-button-bottom-color1">KPI SCORE:</div>
                <div className="table-datacell-button-bottom-color2">{!kpiscore ? 0 : kpiscore}</div>
              </div>
            </div>
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
                    Employee Score
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
                        handleOnChange("IndicatorDescription1", e.target.value)
                      }
                      rows={4}
                    />
                  </td>

                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight1}

                    />
                  </td>

                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={kpinputs.job_knowledge}
                      onChange={(e) => handleOnChange("job_knowledge", e.target.value)}
                    >
                      <option></option>
                      {[1, 2, 3, 4, 5].map(item =>
                        <option key={item} value={item}>{item}</option>
                      )}
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={!totalScore1 ? "" : totalScore1}
                    />{" "}
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

                    />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={kpinputs.efficiency}
                      onChange={(e) => handleOnChange("efficiency", e.target.value)}
                    >
                      <option></option>
                      {[1, 2, 3, 4, 5].map(item =>
                        <option key={item} value={item}>{item}</option>
                      )}
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={!totalScore2 ? "" : totalScore2}
                    />{" "}
                  </td>
                </tr>

                {/* three */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance3}

                    />
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

                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={kpinputs.attendance}
                      onChange={(e) => handleOnChange("attendance", e.target.value)}
                    >
                      <option></option>
                      {[1, 2, 3, 4, 5].map(item =>
                        <option key={item} value={item}>{item}</option>
                      )}
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={!totalScore3 ? "" : totalScore3}
                    />{" "}
                  </td>
                </tr>

                {/* four */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance4}

                    />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription4}


                      rows={5}
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight4}

                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={kpinputs.communication}
                      onChange={(e) => handleOnChange("communication", e.target.value)}
                    >
                      <option></option>
                      {[1, 2, 3, 4, 5].map(item =>
                        <option key={item} value={item}>{item}</option>
                      )}
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={!totalScore4 ? "" : totalScore4}
                    />{" "}
                  </td>
                </tr>

                {/* five */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance5}

                    />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription5}

                      rows={5}
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight5}

                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={kpinputs.reliability}
                      onChange={(e) => handleOnChange("reliability", e.target.value)}
                    >
                      <option></option>
                      {[1, 2, 3, 4, 5].map(item =>
                        <option key={item} value={item}>{item}</option>
                      )}
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={!totalScore5 ? "" : totalScore5}
                    />{" "}
                  </td>
                </tr>

                {/* six */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance6}

                    />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription6}
                      rows={5}
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight6}

                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={kpinputs.collaboration}
                      onChange={(e) => handleOnChange("collaboration", e.target.value)}
                    >
                      <option></option>
                      {[1, 2, 3, 4, 5].map(item =>
                        <option key={item} value={item}>{item}</option>
                      )}
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={!totalScore6 ? "" : totalScore6}
                    />{" "}
                  </td>
                </tr>
              </tbody>
              {/* ))} */}
              <tr className="data-table-row">
                <td className="table-datacell datatype-string table-datacell-color">
                  {" "}
                </td>
                <td className="table-datacell datatype-numeric table-datacell-color">
                  {" "}
                </td>
                <td className="table-datacell datatype-numeric table-datacell-color2">
                  {Weight}
                </td>
                <td className="table-datacell datatype-numeric table-datacell-color">
                  {" "}
                </td>
                <td className="table-datacell datatype-numeric table-datacell-color2">
                  {kpiscore}
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
          ></textarea>
          <div className="con-btn-success">
            <Button variant="contained" className="Add-btn" onClick={handelkpi}>
              {isLoading ? <Spinner animation="border" /> : "	Create KPI"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIAssessment;
