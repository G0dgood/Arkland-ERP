
import moment from "moment";
import {
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import TableLoader from "../../components/TableLoader";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { useEffect } from "react";
import { getRequest } from "../../features/workerRequest/workerRequestSlice";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import RequestForWorkersModal from "./RequestForWorkersModal";

const SiteWorkerRequest = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: requestWorkers, isLoading } = useAppSelector((state: any) => state.worker)




  useEffect(() => {
    // @ts-ignore
    dispatch(getRequest());
  }, [dispatch]);




  const header = [
    { title: "PROJECT", prop: "project" },
    { title: "TEAM", prop: "team" },
    { title: "TEAM LEAD", prop: "team_lead" },
    { title: "REQUESTED ROLE", prop: "role_name" },
    { title: "REQUESTED NUMBER", prop: "requested_quantity" },
    { title: "DATE SENT", prop: "created_at" },
    { title: "IS URGENT", prop: "is_urgent" },
    { title: "STATUS", prop: "status" },
    { title: "VIEW", prop: "view" },
  ];

  return (
    <div  >
      <div className="SiteWorkermaindiv">
        <div className="SiteWorkermaindivsub">
          <span className="SupportmainTitleh3">SITE WORKER REQUEST</span>
        </div>
        <div style={{ display: "flex" }}>
          <MainSearch placeholder={"Search...          Site Workers"} /> <span style={{ marginLeft: "1rem" }}> <RequestForWorkersModal id={requestWorkers} /></span>

        </div>
      </div>
      <section className="md-ui component-data-table">
        {isLoading ? <TableLoader isLoading={isLoading} /> : ""}
        <div className="main-table-wrapper">
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
                        {i.title}
                      </td>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody className="data-table-content">
              {isLoading ? (
                <TableFetch colSpan={9} />
              ) : requestWorkers?.length === 0 ||
                requestWorkers == null ? (
                <NoRecordFound colSpan={9} />
              ) : (
                requestWorkers.map((item: any, i: any) => (
                  <tr className="data-table-row">
                    <td className="table-datacell datatype-numeric">
                      {/* {checkForName(item.project, projects)} */}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {/* {checkForName(item.team, team)} */}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {/* {checkForName(item.team_lead, teamLeads)} */}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.requests?.[0].role_name}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item?.requests?.[0].requested_quantity}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {moment(item?.created_at).format("DD-MMMM-YYYY")}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item.is_urgent === false ? "No" : "Yes"}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      {item.status}
                    </td>
                    <td className="table-datacell datatype-numeric">
                      <Button id="team-applicatiom-update" onClick={() => navigate(`/workers_request/workers_request/view/${item?.id}`)}>View</Button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default SiteWorkerRequest;
