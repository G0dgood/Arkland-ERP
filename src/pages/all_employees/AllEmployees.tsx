import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { FiEdit, FiLock } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import TableLoader from "../../components/TableLoader";
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from "../../components/TableOptions";

const AllEmployees = () => {
 const navigate = useNavigate();

 const [data, setData] = useState([]);
 const [sortData, setSortData] = useState([]);
 const [searchItem, setSearchItem] = useState("");
 const [isLoading, setisLoading] = useState(false);

 useEffect(() => {
  setisLoading(true)
  fetch("https://jsonplaceholder.typicode.com/users")
   .then((response) => response.json())
   .then((data) => {
    setData(data);
    setisLoading(false)
   })
   .catch((err) => {
    console.log(err);
    setisLoading(false)
   });
 }, []);

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

 useEffect(() => {
  if (data) {
   const result = data?.filter((object) => {
    return JSON?.stringify(object)?.toString()?.includes(searchItem);
   });
   setSortData(result);
  }

 }, [data, searchItem]);

 const [displayData, setDisplayData] = useState([]);

 return (
  <div id="screen-wrapper">
   <Header toggleSideNav={toggleSideNav} />
   <Sidebar collapseNav={collapseNav} />
   <main>
    <div>

     <div className='allemployees-container'>
      <div className='allemployees-container-main' >
       <div className='allemployees-container-sup'>
        <div className='allemployees-sup-item1'>
         <Button
          variant="contained"
          className="Add-btn"
          onClick={() => navigate('/createemployee')}>

          <GoPlus className="icon-space" />
          Create Employee
         </Button>
        </div>

        <div
         className='allemployees-sup-item2'
         onClick={() => navigate('/warninglist')}
        >
         <Button variant="contained" className="Add-btn">
          Warning List
         </Button>
        </div>

        <div>
         <EntriesPerPage
          data={data}
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
         />
        </div>

       </div>
       <div>
        <MainSearch
         setSearchItem={setSearchItem}
         searchItem={searchItem}
         placeholder={'Search...          Departments'} />
       </div>
      </div>
      <section className="md-ui component-data-table">
       {isLoading ? <TableLoader isLoading={isLoading} /> : ''}
       <div className="main-table-wrapper">
        <table className="main-table-content">
         <thead className="data-table-header">
          <tr className="data-table-row">
           <td className="table-datacell datatype-string">EMPLOYEE ID</td>
           <td className="table-datacell datatype-numeric">FIRST NAME</td>
           <td className="table-datacell datatype-numeric">MIDDLE NAME</td>
           <td className="table-datacell datatype-numeric">LAST NAME</td>
           <td className="table-datacell datatype-numeric">EMAIL</td>
           <td className="table-datacell datatype-numeric">ROLE</td>
           <td className="table-datacell datatype-numeric">DEPARTMENT</td>
           <td className="table-datacell datatype-numeric">ACTIVE USER</td>
          </tr>
         </thead>
         <tbody className="data-table-content">
          {isLoading ? (
           <TableFetch colSpan={8} />
          ) : displayData?.length === 0 || displayData == null ? (
           <NoRecordFound colSpan={8} />
          ) : (
           displayData.map((item: any, i: any) => (
            <tr className="data-table-row">
             <td className="table-datacell datatype-string">{item?.name}</td>
             <td className="table-datacell datatype-numeric">159</td>
             <td className="table-datacell datatype-numeric">6.0</td>
             <td className="table-datacell datatype-numeric">24</td>
             <td className="table-datacell datatype-numeric">4.0</td>
             <td className="table-datacell datatype-numeric">87</td>
             <td className="table-datacell datatype-numeric">14%</td>
             <td className="table-datacell datatype-numeric">
              <div className='table-active-items'>
               <span>
                <BsCheckCircle size={25} color={"green"} />
               </span>
               <span>
                <FiEdit size={25} /> {"  "} <FiLock size={25} />
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
       Total={"Employee"}
      />
     </footer>
    </div>
   </main>
  </div>
 )
}


export default AllEmployees;