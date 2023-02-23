import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { GoPlus } from "react-icons/go";
import { BsCheckCircle } from "react-icons/bs";
import { FiEdit, FiLock } from "react-icons/fi";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import Pagination from "../../components/Pagination";
import TableLoader from "../../components/TableLoader";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { getTeam } from "../../store/reducers/team";
import { getTeamLeads } from "../../store/reducers/teamLeads";
import { checkForTeams } from "../../utils/checkForName";

// header for data table
const header = [
  { title: "NAME", prop: "NAME" },
  { title: "DEPARTMENT", prop: "department" },
  { title: "TEAM LEAD", prop: "lead" },
  { title: "LOCATION", prop: "location" },
  { title: "COUNTRY", prop: "country" },
  { title: "LGA", prop: "lga" },
  { title: "DUE DATE", prop: "proposed_completion_date" },
  { title: "STATUS", prop: "status" },
];

const Projects = () => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([] as any);

  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTeam());
    dispatch(getTeamLeads());
  }, [dispatch]);

  const navigate = useNavigate();
  React.useEffect(() => {
    const source = axios.CancelToken.source();
    setisLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/hr/projects`)
      .then((res: AxiosResponse) => {
        setProjects([...res.data.data]);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };
  const viewProject = (id: number) => {
    navigate(`/viewproject/${id}`);
  };

  const [sortData, setSortData] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  useEffect(() => {
    localStorage.setItem("reportsPerPage", entriesPerPage);
  }, [entriesPerPage]);

  // useEffect(() => {
  //   if (DATA) {
  //     const result: any = DATA?.filter((object) => {
  //       return JSON?.stringify(object)?.toString()?.includes(searchItem);
  //     });
  //     setSortData(result);
  //   }
  // }, [searchItem]);

  const [displayData, setDisplayData] = useState([]);
  const teamLeads: any = useAppSelector((state) => state.teamLeads.teamLeads);

  const department: any = useAppSelector(
    (state) => state.department.department
  );

  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main>
        <div>
          <div className="allemployees-container">
            <div className="allemployees-container-main">
              <div className="allemployees-container-sup">
                <div className="allemployees-sup-item1">
                  <Button
                    variant="contained"
                    className="Add-btn"
                    onClick={() => navigate("/createprojects")}
                  >
                    <GoPlus className="icon-space" /> Create Project
                  </Button>
                </div>
                <div className="allemployees-sup-item2">
                  <Button variant="contained" className="Add-btn">
                    Request Worker List
                  </Button>
                </div>
                <div className="allemployees-sup-item2">
                  <EntriesPerPage
                    // data={DATA}
                    entriesPerPage={entriesPerPage}
                    setEntriesPerPage={setEntriesPerPage}
                  />
                </div>
              </div>

              <div>
                <MainSearch
                  setSearchItem={setSearchItem}
                  searchItem={searchItem}
                  placeholder={"Search...          Projects"}
                />
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
                      <TableFetch colSpan={8} />
                    ) : projects?.length === 0 || projects == null ? (
                      <NoRecordFound colSpan={8} />
                    ) : (
                      projects.map((item: any, i: any) => (
                        <tr
                          className="data-table-row"
                          onClick={() => viewProject(item?.id)}
                        >
                          <td className="table-datacell datatype-string">
                            {item?.name}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {checkForTeams(item?.department, department)}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {checkForTeams(item?.lead, teamLeads)}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {item?.location}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {item?.country}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {item?.lga}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {moment(item?.proposed_completion_date).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            {item?.status}
                          </td>
                          {/* <td className="table-datacell datatype-numeric">
                            <div className="table-active-items">
                              <span>
                                <BsCheckCircle size={25} color={"green"} />
                              </span>
                              <span>
                                <span
                                  className="edit-icon-color"
                                  onClick={() => navigate("/admineditUser")}
                                >
                                  <FiEdit size={25} />
                                </span>
                                {"  "}
                                <span className="lock-icon-color">
                                  <FiLock size={25} />
                                </span>
                              </span>
                            </div>
                          </td> */}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          <footer className="main-table-footer">
            <Pagination
              setDisplayData={setDisplayData}
              data={sortData}
              entriesPerPage={entriesPerPage}
              Total={"Project"}
            />
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Projects;
