import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ApplyForLeave from "../../components/Modals/ApplyForLeave";
import Sidebar from "../../components/Sidebar";
import ViewLeave from "./ViewLeave";
import { fireAlert } from "../../utils/Alert";
import Cookies from "js-cookie";
import storage from "../../utils/storage";
import Pagination from "../../components/Pagination";
import { NoRecordFound, TableFetch } from "../../components/TableOptions";
import TableLoader from "../../components/TableLoader";
import moment from "moment";

const Leave = () => {
  const navigate = useNavigate();

  // @ts-ignore
  const userInfo: any = JSON.parse(storage?.get("user"));
  const privileges = userInfo?.data?.privileges;
  const isTeamLead = privileges.some((p: any) => p.role === "team lead");
  const isSuperAdmin = privileges.some((p: any) => p.role === "super admin");
  const isEmployee = privileges.some((p: any) => p.role === "employee");

  // useEffect(() => {
  // 	if (isSuccess) {
  // 		fireAlert(title, html, icon);
  // 		setTimeout(() => {
  // 			dispatch(reset());
  // 		}, 2000);
  // 	}

  // }, [dispatch, html, title, icon, isSuccess]);

  // @ts-ignore
  // React.useEffect(async () => {
  // 	const Info: any = await AsyncStorage.getItem('user')
  // 	const Infos = JSON.parse(Info)
  // 	const config = {
  // 		headers: {
  // 			"Content-Type": "application/json",
  // 			Authorization: `Bearer ${Infos?.idToken}`,
  // 		},
  // 	};

  // 	setLoading(true);
  // 	axios
  // 		.get(baseUrl + `/requests/details/${Id}`, config)
  // 		.then((res) => {
  // 			setdata(res?.data);
  // 			// console.log("DetailsPage", res.data);
  // 			setLoading(false);
  // 		})
  // 		.catch((err) => {
  // 			// console.log('err', err);
  // 			setMessages(
  // 				err?.message);
  // 			setLoading(false);
  // 			setisError(true);
  // 		});
  // }, [user?.idToken,]);

  const [collapseNav, setCollapseNav] = useState(() => {
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
  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  useEffect(() => {
    localStorage.setItem("reportsPerPage", entriesPerPage);
  }, [entriesPerPage]);

  const [showLeave, setShowLeaver] = useState(false);

  const token = Cookies.get("token");
  const [data, setData] = useState<any>([]);
  const [isError, setisError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [sortData, setSortData] = useState([]);

  // const handleLeave = () => {
  // 	setisLoading(true);
  // 	fetch(`${process.env.REACT_APP_API}/hr/leaves`, {
  // 		method: "POST", // or 'PUT'
  // 		headers: {
  // 			"Content-Type": "application/json",
  // 			Authorization: `Bearer ${token}`
  // 		},
  // 	})
  // 		.then((response) => response.json())
  // 		.then((data) => {
  // 			if (data?.success === false) {
  // 				setMessage(data?.message)
  // 				setisError(true)
  // 			} else {
  // 				setData(data?.data)
  // 				setisSuccess(true)
  // 			}
  // 			setisLoading(false);
  // 		})
  // 		.catch((error) => {
  // 			console.error("Error:", error);
  // 			setisLoading(false);
  // 		});
  // }

  useEffect(() => {
    setisLoading(true);
    fetch(
      `${process.env.REACT_APP_API}/hr/leaves?employee=${userInfo?.data?.employee?._id}`,
      {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === false) {
          setMessage(data?.message);
          setisError(true);
        } else {
          setData(data?.data);
          setSortData(data?.data?.data);
          console.log("data-data", data);
        }
        setisLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setisLoading(false);
      });
  }, [token, userInfo?.data?.employee?._id]);

  const title = "Successful";
  const html = message;
  const icon = "success";
  const title1 = "Leave error";
  const html1 = message;
  const icon1 = "error";

  useEffect(() => {
    if (isSuccess) {
      fireAlert(title, html, icon);
      setTimeout(() => {
        setisSuccess(false);
        setMessage("");
      }, 5000);
    } else if (isError) {
      fireAlert(title1, html1, icon1);
      setTimeout(() => {
        setisError(false);
        setMessage("");
      }, 5000);
    }
  }, [html, html1, isError, isSuccess]);

  const [displayData, setDisplayData] = useState([]);

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div className="allemployees-container-main">
          <div className="allemployees-container-sup">
            {(userInfo?.data?.department?.name === "HR" ||
              isSuperAdmin ||
              isTeamLead) && (
                <div className="allemployees-sup-item1">
                  <Button
                    variant="contained"
                    className="Add-btn"
                    onClick={() => navigate("/teamleaveapplications")}
                  >
                    <GoPlus className="icon-space" />
                    Team Leave Applications
                  </Button>
                </div>
              )}

            {(userInfo?.data?.department?.name === "HR" || isSuperAdmin) && (
              <div className="allemployees-sup-item2">
                <Button
                  variant="contained"
                  className="Add-btn"
                  onClick={() => navigate("/allleaveapplications")}
                >
                  All Leave Applications
                </Button>
              </div>
            )}
          </div>

          <div>
            <ApplyForLeave />
          </div>
        </div>

        <section className="md-ui component-data-table">
          {isLoading ? <TableLoader isLoading={isLoading} /> : ""}
          <div className="main-table-wrapper">
            <table className="main-table-content">
              <thead className="data-table-header  ">
                <tr className="data-table-row ">
                  <td className="table-datacell datatype-string">Leave Type</td>
                  <td className="table-datacell datatype-numeric">
                    Start Date
                  </td>
                  <td className="table-datacell datatype-numeric">End Date</td>
                  <td className="table-datacell datatype-numeric">
                    HOD Approval
                  </td>
                  <td className="table-datacell datatype-numeric">
                    HR Approval
                  </td>
                  <td className="table-datacell datatype-numeric">
                    Final Approval
                  </td>
                  <td className="table-datacell datatype-numeric">Status</td>
                  <td className="table-datacell datatype-numeric">View</td>
                </tr>
              </thead>
              <tbody className="data-table-content">
                {isLoading ? (
                  <TableFetch colSpan={8} />
                ) : displayData?.length === 0 || displayData == null ? (
                  <NoRecordFound colSpan={8} />
                ) : (
                  displayData?.map((item: any, i: any) => (
                    <tr className="data-table-row" key={i}>
                      <td className="table-datacell datatype-string">
                        {item?.type}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {moment(item?.start_date).format("DD-MM-YYYY")}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {moment(item?.created_at).format("DD-MM-YYYY")}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item?.hod_approved ? (
                          <BsCheckCircle size={25} color={"green"} />
                        ) : (
                          <BsCheckCircle
                            size={25}
                            color={"red"}
                            className="icon-bold"
                          />
                        )}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item?.hr_approved ? (
                          <BsCheckCircle size={25} color={"green"} />
                        ) : (
                          <BsCheckCircle
                            size={25}
                            color={"red"}
                            className="icon-bold"
                          />
                        )}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item?.finally_approved ? (
                          <BsCheckCircle size={25} color={"green"} />
                        ) : (
                          <BsCheckCircle
                            size={25}
                            color={"red"}
                            className="icon-bold"
                          />
                        )}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        <Button variant="outlined" id="leave-status-btn-error">
                          Not Approved
                        </Button>
                      </td>
                      <td className="table-datacell datatype-numeric">
                        <Button
                          id="team-applicatiom-update"
                          onClick={() => setShowLeaver(true)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        <ViewLeave showLeave={showLeave} setShowLeaver={setShowLeaver} />
        <footer className="main-table-footer">
          <Pagination
            setDisplayData={setDisplayData}
            data={sortData}
            entriesPerPage={entriesPerPage}
            Total={"Leave"}
          />
        </footer>
      </main>
    </div>
  );
};

export default Leave;
