import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import { fireAlert } from "../../utils/Alert";
import Cookies from "js-cookie";

const KPIAssessment = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  // @ts-ignore
  const userInfo: any = JSON.parse(localStorage.getItem("userinfo"));

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
  const [employees, setEmployees] = useState<any>();

  // console.log('employees', employees)

  const [employeegrade, setemployeegrade] = useState<any>({
    employeegrade1: 0,
    employeegrade2: 0,
    employeegrade3: 0,
    employeegrade4: 0,
    employeegrade5: 0,
    employeegrade6: 0,
  });

  const [inputs, setInputs] = useState({
    job_knowledge: 15,
    efficiency: 15,
    attendance: 15,
    communication: 15,
    reliability: 15,
    collaboration: 20,
  });

  // const [_kpiData, setKpiData] = useState<Record<'one' | 'two', any>>({
  // 	one: {
  // 		performance: 'Job Knowledge',
  // 		description: "Measures employee's relevant knowledge and essential skills, such as work practices, policies and procedures needed to do a particular job",
  // 		weight: 20,
  // 	},
  // 	two: {
  // 		performance: 'Efficiency',
  // 		description: "Maintaining the same standards and behaviors that lead to producing a high quality of work",
  // 		weight: 15,
  // 	},
  // });

  // const handleOnChangeKpiData = (num: 'one' | 'two', input: string, value: string | number) => {
  // 	setKpiData((prevState) => ({ ...prevState, [num]: { ...prevState.[num], [input]: value } }))
  // }

  // @ts-ignore
  const [kpiData1, setkpiData1] = useState<any>({
    Performance1: "Job Knowledge",
    Performance2: "Efficiency",
    Performance3: " Attendance",
    Performance4: "Software Development",
    Performance5: "Team work",
    Performance6: "Debugging",
  });

  const [kpiData2, setkpiData2] = useState<any>({
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

  const [kpiData3, setkpiData3] = useState<any>({
    Weight1: 20,
    Weight2: 15,
    Weight3: 20,
    Weight4: 20,
    Weight5: 15,
    Weight6: 10,
  });

  const Weight =
    kpiData3.Weight1 +
    kpiData3.Weight2 +
    kpiData3.Weight3 +
    kpiData3.Weight4 +
    kpiData3.Weight5 +
    kpiData3.Weight6;

  const handleOnChange1 = (input: string, value: any) => {
    setkpiData1((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const handleOnChange2 = (input: string, value: any) => {
    setkpiData2((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const handleOnChange3 = (input: string, value: any) => {
    setkpiData3((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };
  const handleOnChange4 = (input: string, value: any) => {
    setemployeegrade((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };
  const handleOnKPI = (input: string, value: any) => {
    setKpInputs((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const totalScore1 = (kpiData3.Weight1 / 5) * employeegrade.employeegrade1;
  const totalScore2 = (kpiData3.Weight2 / 5) * employeegrade.employeegrade2;
  const totalScore3 = (kpiData3.Weight3 / 5) * employeegrade.employeegrade3;
  const totalScore4 = (kpiData3.Weight4 / 5) * employeegrade.employeegrade4;
  const totalScore5 = (kpiData3.Weight5 / 5) * employeegrade.employeegrade5;
  const totalScore6 = (kpiData3.Weight6 / 5) * employeegrade.employeegrade6;

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

  useEffect(() => {
    setKpInputs((prevState: any) => {
      return {
        ...prevState,
        job_knowledge: totalScore1,
      };
    });
  }, [kpinputs.job_knowledge, setKpInputs, totalScore1]);
  useEffect(() => {
    setKpInputs((prevState: any) => {
      return {
        ...prevState,
        efficiency: totalScore2,
      };
    });
  }, [kpinputs.efficiency, setKpInputs, totalScore2]);
  useEffect(() => {
    setKpInputs((prevState: any) => {
      return {
        ...prevState,
        attendance: totalScore3,
      };
    });
  }, [kpinputs.attendance, setKpInputs, totalScore3]);
  useEffect(() => {
    setKpInputs((prevState: any) => {
      return {
        ...prevState,
        communication: totalScore4,
      };
    });
  }, [kpinputs.communication, setKpInputs, totalScore4]);

  useEffect(() => {
    setKpInputs((prevState: any) => {
      return {
        ...prevState,
        reliability: totalScore5,
      };
    });
  }, [kpinputs.reliability, setKpInputs, totalScore5]);

  useEffect(() => {
    setKpInputs((prevState: any) => {
      return {
        ...prevState,
        collaboration: totalScore6,
      };
    });
  }, [kpinputs.collaboration, setKpInputs, totalScore6]);

  useEffect(() => {
    setKpInputs((prevState: any) => {
      return {
        ...prevState,
        employee: userInfo?.data?.employee?.id,
      };
    });
  }, [
    kpinputs.employee,
    setKpInputs,
    totalScore6,
    userInfo?.data?.employee?.id,
  ]);

  const [data, setData] = useState([]);
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

  // const handelkpi = () => {
  // 	setisLoading(true);
  // 	axios
  // 		.post(`${process.env.REACT_APP_API}/hr/appraisals`, kpinputs)
  // 		.then((res: AxiosResponse) => {
  // 			// setRequestWorkersList([...res.data.data]);
  // 			setisLoading(false);
  // 			setisSuccess(true)

  // 		})
  // 		.catch((err) => {
  // 			console.log('res-res-res', err);
  // 			setMessage(err.data.message)
  // 			setisLoading(false);
  // 		});
  // }

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
      body: JSON.stringify(kpinputs),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === false) {
          setMessage(data?.message);
          setisError(true);
        } else {
          setData(data);
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
    setisLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/hr/employees`)
      .then((res: AxiosResponse) => {
        setEmployees([...res?.data?.data]);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);

  const year = new Date().getFullYear().toString();

  useEffect(() => {
    if (isSuccess) {
      fireAlert(title, html, icon);
      // @ts-ignore
      setemployeegrade({
        employeegrade1: 0,
        employeegrade2: 0,
        employeegrade3: 0,
        employeegrade4: 0,
        employeegrade5: 0,
        employeegrade6: 0,
      });
      // @ts-ignore
      setKpInputs({
        comment: "",
      });
      setTimeout(() => {
        setisSuccess(false);
      }, 5000);
    } else if (message) {
      fireAlert(title1, html1, icon1);
    }
  }, [html, title, icon, isSuccess, message, html1, title1]);

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
              <p>Review Date</p>
              <p> </p>
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
        </div>
      </div>
      <div className="datacell-button-bottom-select">
        <div
          className="table-datacell-button-bottom"
          style={{ marginRight: "20px" }}
        >
          <div className="performance-intro-header">
            <div className="quarter" style={{ marginBottom: "0.5rem" }}>
              <div className="entries-perpage">
                Year:
                <select
                  name="year"
                  // value={year}
                >
                  <option>{year}</option>
                </select>
              </div>
              <div style={{ width: "30px" }} />
              <div className="entries-perpage">
                Month:
                <select
                  name="month"
                  value={kpinputs.month}
                  onChange={(e) => handleOnKPI("month", e.target.value)}
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
              <div>Line Manager:</div>
              <select
                name="line-manager"
                value={kpinputs.reviewer}
                onChange={(e) => handleOnKPI("reviewer", e.target.value)}
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
          <div className="table-datacell-button-bottom-color2">{kpiscore}</div>
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
                  {/* <td className="table-datacell datatype-numeric">Supervisor Grade</td>
										<td className="table-datacell datatype-numeric">Supervisor Score</td> */}
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
                        handleOnChange1("Performance1", e.target.value)
                      }
                    />
                  </td>

                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription2}
                      onChange={(e) =>
                        handleOnChange2("IndicatorDescription1", e.target.value)
                      }
                      rows={4}
                    />
                  </td>

                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      type="number"
                      value={kpiData3.Weight1}
                      onChange={(e) =>
                        handleOnChange3("Weight1", e.target.value)
                      }
                    />
                  </td>

                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={employeegrade.employeegrade1}
                      onChange={(e) =>
                        handleOnChange4("employeegrade1", e.target.value)
                      }
                    >
                      <option></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={totalScore1}
                    />{" "}
                  </td>
                </tr>

                {/* two */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance2}
                      onChange={(e) =>
                        handleOnChange1("Performance2", e.target.value)
                      }
                    />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription2}
                      onChange={(e) =>
                        handleOnChange2("IndicatorDescription2", e.target.value)
                      }
                      rows={5}
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight2}
                      onChange={(e) =>
                        handleOnChange3("userId", e.target.value)
                      }
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={employeegrade.employeegrade2}
                      onChange={(e) =>
                        handleOnChange4("employeegrade2", e.target.value)
                      }
                    >
                      <option></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={totalScore2}
                    />{" "}
                  </td>
                </tr>

                {/* three */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance3}
                      onChange={(e) =>
                        handleOnChange1("Performance3", e.target.value)
                      }
                    />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription3}
                      onChange={(e) =>
                        handleOnChange2("IndicatorDescription3", e.target.value)
                      }
                      rows={5}
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight3}
                      onChange={(e) =>
                        handleOnChange3("Weight3", e.target.value)
                      }
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={employeegrade.employeegrade3}
                      onChange={(e) =>
                        handleOnChange4("employeegrade3", e.target.value)
                      }
                    >
                      <option></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={totalScore3}
                    />{" "}
                  </td>
                </tr>

                {/* four */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance4}
                      onChange={(e) =>
                        handleOnChange1("Performance4", e.target.value)
                      }
                    />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription4}
                      onChange={(e) =>
                        handleOnChange2(
                          "kpiData2.IndicatorDescription4",
                          e.target.value
                        )
                      }
                      rows={5}
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight4}
                      onChange={(e) =>
                        handleOnChange3("Weight3", e.target.value)
                      }
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={employeegrade.employeegrade4}
                      onChange={(e) =>
                        handleOnChange4("employeegrade4", e.target.value)
                      }
                    >
                      <option></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={totalScore4}
                    />{" "}
                  </td>
                </tr>

                {/* five */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance5}
                      onChange={(e) =>
                        handleOnChange1("Performance5", e.target.value)
                      }
                    />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription5}
                      onChange={(e) =>
                        handleOnChange2("IndicatorDescription5", e.target.value)
                      }
                      rows={5}
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight5}
                      onChange={(e) =>
                        handleOnChange3("Weight5", e.target.value)
                      }
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={employeegrade.employeegrade5}
                      onChange={(e) =>
                        handleOnChange4("employeegrade5", e.target.value)
                      }
                    >
                      <option></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={totalScore5}
                    />{" "}
                  </td>
                </tr>

                {/* six */}
                <tr className="data-table-row">
                  <td className="table-datacell datatype-string">
                    <input
                      className="Performance-Indicator-input"
                      value={kpiData1.Performance6}
                      onChange={(e) =>
                        handleOnChange1("Performance6", e.target.value)
                      }
                    />
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <textarea
                      id="kpi-textarea"
                      className="Performance-Indicator-input2"
                      value={kpiData2.IndicatorDescription6}
                      onChange={(e) =>
                        handleOnChange2("IndicatorDescription6", e.target.value)
                      }
                      rows={5}
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={kpiData3.Weight6}
                      onChange={(e) =>
                        handleOnChange4("Weight6", e.target.value)
                      }
                    />{" "}
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <select
                      className="performance-field"
                      name="score"
                      required
                      value={employeegrade.employeegrade6}
                      onChange={(e) =>
                        handleOnChange4("employeegrade6", e.target.value)
                      }
                    >
                      <option></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td className="table-datacell datatype-numeric">
                    <input
                      className="Performance-Indicator-input1"
                      value={totalScore6}
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
                {/* <td className="table-datacell datatype-numeric table-datacell-color">  </td>
								<td className="table-datacell datatype-numeric table-datacell-color2"> </td> */}
              </tr>
            </table>
          </div>
        </section>

        {/* <div className='emp-reconmentdetion'>
						<div className='emp-reconmentdetion-sub'>
							<div className='reconmentdetion-sub-title'>
								Comments & Recommandations - Employee
							</div>
							<textarea rows={12} />
						</div>
						<div className='emp-reconmentdetion-sub-space' />
						<div className='emp-reconmentdetion-sub'>
							<div className='reconmentdetion-sub-title'>
								Comments & Recommandations - Appraradir
							</div>
							<textarea rows={12} />
						</div>
					</div> */}
      </div>
      <div className="board">
        <div className="shareCommentContainer">
          <textarea
            id="shareCommentText"
            placeholder="Write a comment.."
            required
            value={kpinputs.comment}
            onChange={(e) => handleOnKPI("comment", e.target.value)}
          ></textarea>
          {/* <button className="btn btn-success"> Share</button> */}
          <div className="con-btn-success">
            {/* <Button variant="contained" className="show-btn btn-success"  >
							Show All
						</Button> */}
            <Button variant="contained" className="Add-btn" onClick={handelkpi}>
              {isLoading ? "loading..." : "	Create KPI"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIAssessment;
