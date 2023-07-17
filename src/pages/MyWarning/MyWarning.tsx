import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import Pagination from "../../components/Pagination";
import TableLoader from "../../components/TableLoader";
// import { Button } from "@material-ui/core";
import HttpService from "../../components/HttpService";
// import RespondToWarning from "../all_employees/warnings/RespondToWarning";


const MyWarning = () => {





  const [warningdata, setData] = useState([])
  const [warningisLoading, setisLoading] = useState(false)




  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setisLoading(true)
    try {
      const warningsUrl = "me/warnings"
      const warnings: any = await HttpService.get(warningsUrl)
      setData(warnings?.data?.data)
      setisLoading(false)

    } catch (error) {
      setisLoading(false)
    }
  }




  const header = [
    { title: "MESSAGE", prop: "message" },
    { title: "MISCONDUCT", prop: "misconduct" },
    { title: "NUMBER OF WARNINGS", prop: "count" },
    { title: "STATUS", prop: "status" },
    // { title: "RESPOND", prop: "respond" },
    // { title: "VIEW", prop: "view" }
  ];


  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  useEffect(() => {
    localStorage.setItem("reportsPerPage", entriesPerPage);
  }, [entriesPerPage]);



  const [displayData, setDisplayData] = useState<any>([]);





  return (
    <div  >

      <div className="SiteWorkermaindiv">
        <div className="SiteWorkermaindivsub">
          My Warnings
        </div>
        <div>
          <EntriesPerPage
            data={warningdata}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
        </div>
        <div>
          <MainSearch placeholder={"Search...          Warnings"} />
        </div>
      </div>
      <section className="md-ui component-data-table">
        <div className="main-table-wrapper">
          {warningisLoading ? <TableLoader isLoading={warningisLoading} /> : ""}
          <table className="main-table-content">
            <thead className="data-table-header">
              <tr className="data-table-row">
                {header.map((i, index) => {
                  return (
                    <>
                      <td
                        className="table-datacell datatype-numeric"
                        key={index}
                      >
                        {i?.title}
                      </td>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody className="data-table-content">
              {warningisLoading ? (
                <TableFetch colSpan={8} />
              ) : displayData?.length === 0 || displayData == null ? (
                <NoRecordFound colSpan={8} />
              ) : (
                displayData.map((item: any, i: any) => (
                  <tr className="data-table-row" key={i}>

                    <td className="table-datacell datatype-numeric">
                      {item?.message}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.misconduct}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.count}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.status}
                    </td>
                    {/* <td className="table-datacell datatype-numeric">
                      <RespondToWarning id={item?.id} className={"team-applicatiom-update"} />
                    </td> */}
                    {/* <td className="table-datacell datatype-numeric" key={i}>
                      <Link to={`/warning/warning/${item?._id}`}  >
                        <Button id="team-applicatiom-update">  View</Button>
                      </Link>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      <footer className="main-table-footer">
        <Pagination
          setDisplayData={setDisplayData}
          data={warningdata}
          entriesPerPage={entriesPerPage}
          Total={"Employee"}
        />
      </footer>
    </div>
  );
};

export default MyWarning;
