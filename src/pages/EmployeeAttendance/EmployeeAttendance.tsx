
import { useAppSelector } from "../../store/useStore";
import { Calendars } from "../../components/Calender/Calender";

// import { Calendars } from "../../components/Calender/Calender";

const EmployeeAttendance = () => {



  const { mydata } = useAppSelector((state: any) => state.attendance)




  // useEffect(() => {
  //   dispatch(myAttendance())
  // }, [dispatch])
  // useEffect(() => {
  //   getData()
  // }, [])

  // const getData = async () => {
  //   const HttpService = createHttpService();
  //   setisLoading(true)
  //   try {
  //     const attendanceUrl = "hr/attendances/list/self"
  //     const attendance: any = await HttpService.get(attendanceUrl)
  //     setAttendance(attendance?.data?.data)
  //     setisLoading(false)

  //   } catch (error) {
  //     setisLoading(false)
  //   }
  // }




  return (
    <div  >
      <div className="ProjectViewContainer">
        <div className="ProjectViewContainer-subone">
          <div className="subone-col-1 subtwo-content-one-sub1-content subone-header-flex">
            <h5>Employee Attendance</h5>
          </div>

          <div className="subone-col-12">
            {/* <Calendars mydata={mydata} /> */}
            <Calendars mydata={mydata} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
