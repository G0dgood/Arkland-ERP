import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import TableLoader from "../../components/TableLoader";
import {
 NoRecordFound,
 SearchComponent,
 TableFetch,
} from "../../components/TableOptions";
import { getUserPrivileges } from "../../functions/auth";
import { allEmployee } from "../../features/Employee/employeeSlice";
import ApproveEmployeeModal from "../../components/Modals/ApproveEmployeeModal";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import UploadEmployee from "../../components/UploadEmployee";
import DrawerComponent from '../../components/DrawerComponent';




const AllEmployees = () => {
 const { isSuperAdmin, isAdmin, isMaster } = getUserPrivileges();
 const dispatch = useAppDispatch();
 const { data, isLoading } = useAppSelector((state: any) => state.employee)
 const { approveisSuccess } = useAppSelector((state: any) => state.employee)
 const [reset, setReset] = useState(false);
 const [displayData, setDisplayData] = useState([]);
 const [searchItem, setSearchItem] = useState("");
 const [sortedItem, setSortedItem] = useState([]);
 const navigate = useNavigate();


 console.log('data', data)

 useEffect(() => {
  dispatch(allEmployee());
 }, [dispatch]);


 useEffect(() => {
  if (approveisSuccess || reset) {
   dispatch(allEmployee());
  }
 }, [approveisSuccess, dispatch, reset]);



 // Function to sort data by status, with "In Review" first, and then alphabetically by name
 const sortDataByReview = (data: any[]) => {
  const inReviewData = data?.filter((item) => item?.status === 'in review');
  const otherData = data?.filter((item) => item?.status !== 'in review');
  const sortedInReview = inReviewData?.sort((a, b) => a?.full_name?.localeCompare(b?.full_name));
  const sortedOther = otherData?.sort((a, b) => a?.full_name?.localeCompare(b?.full_name));
  return [...sortedInReview, ...sortedOther];
 };




 useEffect(() => {
  // Sort the data by "In Review" first
  const sorted = sortDataByReview(data?.data);
  const unLinked: any = !sorted ? [] : sorted?.filter((suggestion: any) =>
   // @ts-ignore  
   suggestion?.full_name?.toLowerCase()?.startsWith(searchItem?.toLowerCase()) ||
   // @ts-ignore  
   suggestion?.email?.toLowerCase()?.startsWith(searchItem?.toLowerCase()) ||
   // @ts-ignore  
   suggestion?.role?.name?.toLowerCase()?.startsWith(searchItem?.toLowerCase()) ||
   // @ts-ignore  
   suggestion?.department?.name?.toLowerCase()?.startsWith(searchItem?.toLowerCase())
  );
  setSortedItem(unLinked)

 }, [data, searchItem]);


 // --- Pagination --- //
 const [entriesPerPage, setEntriesPerPage] = useState(() => {
  return localStorage.getItem("reportsPerPage") || "8";
 });

 useEffect(() => {
  localStorage.setItem("reportsPerPage", entriesPerPage);
 }, [entriesPerPage]);
 const [selectedIds, setSelectedIds] = useState<string[]>([]); // State to hold selected IDs





 const handleCheckboxChange = (itemId: string) => {
  setIsDrawerOpen(true);
  // Check if the item's ID is already selected
  if (selectedIds.includes(itemId)) {
   // Remove the ID from the selectedIds array
   setSelectedIds(selectedIds.filter((id) => id !== itemId));
  } else {
   // Add the ID to the selectedIds array
   setSelectedIds([...selectedIds, itemId]);
  }
 };

 const [isDrawerOpen, setIsDrawerOpen] = useState(false);

 const toggleDrawer = () => {
  setIsDrawerOpen(!isDrawerOpen);
 };

 return (

  <div id="reports">
   <DrawerComponent isOpen={isDrawerOpen} onClose={toggleDrawer} />
   <h5 className="page-title">Warning List</h5>
   <ul className="nav-tabs-btn mb-3">
    <li className={"active"} onClick={() => navigate("/employees/employees/create")}>Create Employee</li>
    <UploadEmployee />
   </ul>
   <div className='half-background'>
    <SearchComponent sortData={displayData} entriesPerPage={entriesPerPage} setEntriesPerPage={setEntriesPerPage} parameter={false} addemployee={false} placeholder={"Warnings"} employeesDownloader={sortedItem} EmployeesCSV={true} />
    <section className="md-ui component-data-table">
     {isLoading ? <TableLoader isLoading={isLoading} /> : ""}
     <div className="main-table-wrapper">
      <table className="main-table-content">
       <thead className="data-table-header">
        <tr className="data-table-row">
         <td className="table-datacell"  >  </td>
         <td className="table-datacell"  > FULL NAME </td>
         <td className="table-datacell datatype-numeric"  > EMAIL </td>
         <td className="table-datacell datatype-numeric"  > ROLE </td>
         <td className="table-datacell datatype-numeric"  > DEPARTMENT </td>
         <td className="table-datacell datatype-numeric"  > CATEGORY </td>
         <td className="table-datacell datatype-numeric"  > STATUS</td>
         {(isSuperAdmin || isAdmin || isMaster) && (
          <td className="table-datacell datatype-numeric"  > Employee</td>
         )}
         <td className="table-datacell datatype-numeric"  > ACTION</td>
        </tr>
       </thead>
       <tbody className="data-table-content">
        {isLoading ? (
         <TableFetch colSpan={9} />
        ) : displayData?.length === 0 || displayData === undefined ? (
         <NoRecordFound colSpan={9} />
        ) : (
         displayData?.map((item: any, i: any) => (
          <tr className="data-table-row" key={i}>
           <td>
            <div className="md-checkbox">
             <input id={i}
              type="checkbox"
              checked={selectedIds?.includes(item?.id)}
              onChange={() => handleCheckboxChange(item?.id)} />
             <label htmlFor={i}> </label>
            </div>
           </td>
           <td className="table-datacell  ">
            {item?.full_name}
           </td>
           <td className="table-datacell  ">
            {item?.email}
           </td>
           <td className="table-datacell">
            {/* {item?.role?.name} */}
           </td>
           <td className="table-datacell  ">
            {/* {item?.department?.name} */}
           </td>
           <td className="table-datacell datatype-numeric">
            {/* {item?.category} */}
           </td>
           <td className="table-datacell datatype-numeric">
            {item?.status}
           </td>
           {(isSuperAdmin || isAdmin || isMaster) && (
            <td className="table-datacell datatype-numeric">
             {item?.status === "in review" ? (
              <ApproveEmployeeModal id={item?.id} data={item} setReset={setReset} key={i} />
             ) : (
              <ApproveEmployeeModal id={item?.id} data={item} setReset={setReset} key={i} />
             )}
            </td>)}
           <td className="table-datacell datatype-numeric">
            <Button id="view-status" onClick={() => navigate(`/employees/employees/${data?.id}`)} >
             View More
            </Button>
            {/* <div className="table-active-items" key={i}>
             <span
              className="lock-icon-color"
              title="View employee "
              style={{ marginLeft: "10px" }}
              onClick={() => navigate(`/employees/employees/${item?.id}`)} >
              <FiEye
               size={25}
               title="View Employee"
               color="green"
              />
             </span>
            </div> */}
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
     data={sortedItem}
     entriesPerPage={entriesPerPage}
     Total={"Employee"}
    />
   </footer>
  </div>
 );
};

export default AllEmployees;
