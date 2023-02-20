import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { GoPlus } from "react-icons/go";
import { BsCheckCircle } from "react-icons/bs";
import { FiEdit, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";
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

interface IData {
  name?: string;
  department?: string;
  teamlead?: string;
  role?: string;
  location?: string;
  lga?: string;
  country?: string;
  due_date?: string;
  children?: JSX.Element | JSX.Element[];
  // view?: () => null;
}

export const DATA: IData[] = [];

export function createRandomData(): IData {
  return {
    name: faker.name.fullName(),
    department: faker.commerce.department(),
    teamlead: faker.name.fullName(),
    role: faker.random.word(),
    location: faker.address.secondaryAddress(),
    lga: faker.address.streetAddress(),
    country: faker.address.country(),
    due_date: faker.commerce.price(),
  };
}

Array.from({ length: 50 }).forEach(() => {
  DATA.push(createRandomData());
});
// header for data table
const header = [
  { title: "NAME", prop: "NAME" },
  { title: "DEPARTMENT", prop: "DEPARTMENT" },
  { title: "TEAM LEAD", prop: "team_lead" },
  { title: "ROLE", prop: "role" },
  { title: "LOCATION", prop: "location" },
  { title: "LGA", prop: "lga" },
  { title: "COUNTRY", prop: "country" },
  { title: "DUE DATE", prop: "due_date" },
  { title: "VIEW", prop: "view" },
];

const Projects = () => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });
  const navigate = useNavigate();
  useEffect(() => {
    setisLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);
  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };
  const viewProject = () => {
    navigate("/viewproject");
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

  useEffect(() => {
    if (DATA) {
      const result: any = DATA?.filter((object) => {
        return JSON?.stringify(object)?.toString()?.includes(searchItem);
      });
      setSortData(result);
    }
  }, [searchItem]);

  const [displayData, setDisplayData] = useState([]);

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
                  <Button variant="contained" className="Add-btn">
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
                    data={DATA}
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
                    ) : displayData?.length === 0 || displayData == null ? (
                      <NoRecordFound colSpan={8} />
                    ) : (
                      displayData.map((item: any, i: any) => (
                        <tr className="data-table-row" onClick={viewProject}>
                          <td className="table-datacell datatype-string">
                            {item?.name}
                          </td>
                          <td className="table-datacell datatype-numeric">
                            159
                          </td>
                          <td className="table-datacell datatype-numeric">
                            6.0
                          </td>
                          <td className="table-datacell datatype-numeric">
                            24
                          </td>
                          <td className="table-datacell datatype-numeric">
                            24
                          </td>
                          <td className="table-datacell datatype-numeric">
                            4.0
                          </td>
                          <td className="table-datacell datatype-numeric">
                            87
                          </td>
                          <td className="table-datacell datatype-numeric">
                            14%
                          </td>
                          <td className="table-datacell datatype-numeric">
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
                          </td>
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
