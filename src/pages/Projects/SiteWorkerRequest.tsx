import { Button } from "@material-ui/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { BsCheckCircle, BsExclamationLg } from "react-icons/bs";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import { useAppSelector } from "../../hooks/useDispatch";
import { useWorkersRequest } from "../../hooks/useWorkersRequest";
import { checkForName } from "../../utils/checkForName";

const SiteWorkerRequest = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });

  const { requestWorkersList, isLoading, error, message } = useWorkersRequest();
  const teamLeads: any = useAppSelector((state) => state.teamLeads.teamLeads);
  const team: any = useAppSelector((state) => state.team.team);
  const projects: any = useAppSelector((state) => state.projects.projects);

  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };

  const header = [
    { title: "PROJECT", prop: "project" },
    { title: "TEAM", prop: "team" },
    { title: "TEAM LEAD", prop: "team_lead" },
    { title: "DATE SENT", prop: "created_at" },
    { title: "IS URGENT", prop: "is_urgent" },
    { title: "STATUS", prop: "status" },
    { title: "VIEW", prop: "view" },
  ];

  return (
    <div id="screen-wrapper">
      {error && (
        <Toast
          onClose={() => setShowToast(false)}
          show={true}
          delay={4000}
          autohide
        >
          <Toast.Body>
            <span>
              <BsExclamationLg />
            </span>
            <p>{message}</p>
            <span onClick={() => setShowToast(false)}>
              <FaTimes />
            </span>
          </Toast.Body>
        </Toast>
      )}
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div className="SiteWorkermaindiv">
          <div className="SiteWorkermaindivsub">
            <Button variant="contained" className="Add-btn" id="Add-btn-sub">
              <NavLink
                to="/projects"
                className="drop-logout"
                id="white-btn-color"
              >
                <FaArrowLeft size={30} />
              </NavLink>
            </Button>
            <span className="SupportmainTitleh3">SITE WORKER REQUEST</span>
          </div>
          <div>
            <MainSearch placeholder={"Search...          Site Workers"} />
          </div>
        </div>
        <section className="md-ui component-data-table">
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
                  <TableFetch colSpan={8} />
                ) : requestWorkersList?.length === 0 ||
                  requestWorkersList == null ? (
                  <NoRecordFound colSpan={8} />
                ) : (
                  requestWorkersList.map((item: any, i: any) => (
                    <tr className="data-table-row">
                      <td className="table-datacell datatype-numeric">
                        {checkForName(item.project, projects)}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {checkForName(item.team, team)}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {checkForName(item.team_lead, teamLeads)}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {moment(item?.created_at).format("DD-MM-YYYY")}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item.is_urgent === false ? "No" : "Yes"}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        {item.status}
                      </td>
                      <td className="table-datacell datatype-numeric">
                        <span>
                          <BsCheckCircle
                            size={25}
                            color={"green"}
                            onClick={() =>
                              navigate(`/site-worker-request/${item._id}`)
                            }
                            title="View request"
                          />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SiteWorkerRequest;
