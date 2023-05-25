import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { BsCheckCircle, BsClock } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ApplyForLeave from '../../components/Modals/ApplyForLeave';
import { fireAlert } from '../../utils/Alert';
import Cookies from 'js-cookie';
import storage from '../../utils/storage';
import Pagination from '../../components/Pagination';
import { EntriesPerPage, NoRecordFound, TableFetch } from '../../components/TableOptions';
import TableLoader from '../../components/TableLoader';
import moment from 'moment';
import { SlClose } from 'react-icons/sl';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch';
import { getCreateLeave } from '../../features/Leave/leaveSlice';

const Leave = () => {
  const dispatch = useAppDispatch();
  const { allLeavedata, allLeaveisError, allLeaveisLoading, allLeavemessage, allLeaveisSuccess } = useAppSelector((state: any) => state.leave)

  console.log('allLeavedata', allLeavedata, allLeaveisError, allLeaveisLoading, allLeavemessage, allLeaveisSuccess)

  // @ts-ignore
  const userInfo: any = JSON.parse(storage?.get("user"));

  console.log('allLeavedata', allLeavedata)


  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  useEffect(() => {
    localStorage.setItem("reportsPerPage", entriesPerPage);
  }, [entriesPerPage]);



  const id = userInfo?.data?.employee?._id

  useEffect(() => {
    // @ts-ignore
    dispatch(getCreateLeave(id));
  }, [dispatch, id]);



  const token = Cookies.get("token");
  const [data, setData] = useState<any>([]);
  const [isError, setisError] = useState(false)
  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [sortData, setSortData] = useState([]);
  const [reload, setReload] = useState(false);
  const [showLogout, setShowLogout] = useState<any>(false);


  // const url = `${process.env.REACT_APP_API}/hr/leaves?employee=${id}`
  // console.log(url)


  // useEffect(() => {
  //   // @ts-ignore
  //   dispatch(handleRequestGet(setMessage, setisError, setisLoading, url, setData));
  // }, [dispatch, url, id])


  // useEffect(() => {
  //   setisLoading(true);
  //   fetch(`${process.env.REACT_APP_API}/hr/leaves?employee=${userInfo?.data?.employee?._id}`, {
  //     method: "GET", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data?.success === false) {
  //         setMessage(data?.message)
  //         setisError(true)
  //       } else {
  //         setData(data?.data)
  //         setSortData(data?.data?.data)
  //         console.log('data', data)

  //       }
  //       setisLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       setisLoading(false);
  //     });
  // }, [token, userInfo?.data?.employee?._id, reload])




  const title = "Successful";
  const html = allLeavemessage;
  const icon = "success";
  const title1 = "Leave error";
  const html1 = allLeavemessage;
  const icon1 = "error";


  useEffect(() => {
    if (isSuccess) {
      fireAlert(title, html, icon);
      setTimeout(() => {
        setisSuccess(false)
        setMessage("")
      }, 5000);
    } else if (allLeaveisError) {
      fireAlert(title1, html1, icon1);
      // setTimeout(() => {
      //   setallLeaveisError(false)
      //   setMessage("")
      // }, 5000);
    }
  }, [html, html1, allLeaveisError, isSuccess])

  const [displayData, setDisplayData] = useState([]);

  return (
    <div  >
      <div className='allemployees-container-main' >
        <div className='SiteWorkermaindivsub'>
          <span className='SupportmainTitleh3'>Create Leave</span>
        </div>
        <div>
          <EntriesPerPage
            data={allLeavedata}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
        </div>
        <div>

          <ApplyForLeave setReload={setReload} showLogout={showLogout} setShowLogout={setShowLogout} />

        </div>
      </div>

      <section className="md-ui component-data-table">
        {allLeaveisLoading ? <TableLoader isLoading={allLeaveisLoading} /> : ""}
        <div className="main-table-wrapper">
          <table className="main-table-content">
            <thead className="data-table-header  " >
              <tr className="data-table-row ">
                <td className="table-datacell datatype-string">Leave Type</td>
                <td className="table-datacell datatype-numeric">Start Date</td>
                <td className="table-datacell datatype-numeric">End Date</td>
                <td className="table-datacell datatype-numeric">HOD Approval</td>
                <td className="table-datacell datatype-numeric">HR Approval</td>
                <td className="table-datacell datatype-numeric">Final Approval</td>
                <td className="table-datacell datatype-numeric">Status</td>
                <td className="table-datacell datatype-numeric">View</td>
              </tr>
            </thead>
            <tbody className="data-table-content">
              {
                allLeaveisLoading ? (
                  <TableFetch colSpan={8} />
                ) : displayData?.length === 0 || displayData === undefined ? (
                  <NoRecordFound colSpan={8} />
                ) : (displayData?.map((item: any, i: any) => (
                  <tr className="data-table-row" key={i}>
                    <td className="table-datacell datatype-string">{item?.type}</td>
                    <td className="table-datacell datatype-numeric">{moment(item?.start_date).format("DD-MM-YYYY")}</td>
                    <td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>
                    <td className="table-datacell datatype-numeric">
                      {item?.hod_approved ?
                        <BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
                          <SlClose size={25} color={"red"} className="icon-bold" /> :
                          <BsClock size={25} color={"#bf8412"} className="icon-bold" />}

                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.hr_approved ?
                        <BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
                          <SlClose size={25} color={"red"} className="icon-bold" /> :
                          <BsClock size={25} color={"#bf8412"} className="icon-bold" />}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.finally_approved ?
                        <BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
                          <SlClose size={25} color={"red"} className="icon-bold" /> :
                          <BsClock size={25} color={"#bf8412"} className="icon-bold" />}
                    </td>
                    <td className="table-datacell datatype-numeric"  >

                      <Button className={item?.status === "HOD approved" ? "table-link" :
                        item?.status === "HR approved" ? "table-link-hr" :
                          item?.status === "approved" ? "table-link-active" :
                            item?.status === "rejected" ? "table-link-reject" : "table-link"}>{item?.status === "HOD approved" ? "HOD approved" :
                              item?.status === "HR approved" ? "HR approved" :
                                item?.status === "approved" ? "LEAVE approved" :
                                  item?.status === "rejected" ? "LEAVE Rejected" : "IN Progress"}</Button>
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <Link to={`/viewleave/${item?._id}`}  >
                        {item?.status === "rejected" ? "" :
                          <Button id="team-applicatiom-update">{item?.hod_approved === false ? "Update" : "View"}</Button>}
                      </Link>
                    </td>
                  </tr>
                )))}

            </tbody>
          </table>
        </div>

      </section>
      <footer className="main-table-footer">
        <Pagination
          setDisplayData={setDisplayData}
          data={allLeavedata}
          entriesPerPage={entriesPerPage}
          Total={"Leave"}
        />
      </footer>
    </div>
  )
}

export default Leave






