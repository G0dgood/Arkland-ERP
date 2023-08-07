
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import TableLoader from "../../components/TableLoader";
import {
  EntriesPerPage,
  MainSearch,
  NoRecordFound,
  TableFetch,
} from "../../components/TableOptions";
import { getUserPrivileges } from "../../functions/auth";
import EmployeesDownloader from "../../components/Downloader/EmployeesDownloader";
import { allEmployee } from "../../features/Employee/employeeSlice";
import ApproveEmployeeModal from "../../components/Modals/ApproveEmployeeModal";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import UploadEmployee from "../../components/UploadEmployee";

const AllEmployees = () => {
  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin, isMaster } = getUserPrivileges();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state: any) => state.employee)
  const { approveisSuccess } = useAppSelector((state: any) => state.employee)
  const [reset, setReset] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [sortedItem, setSortedItem] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    // @ts-ignore
    dispatch(allEmployee());
  }, [dispatch]);


  useEffect(() => {
    if (approveisSuccess || reset) {
      // @ts-ignore
      dispatch(allEmployee());
    }
  }, [approveisSuccess, dispatch, reset]);


  useEffect(() => {
    // Filter our suggestions that don't contain the user's input
    const unLinked = !data ? [] : data?.filter((suggestion: any) =>
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

  useEffect(() => {
    // Sort the data alphabetically by name
    const sorted = sortedItem?.slice().sort((a: any, b: any) => a.full_name.localeCompare(b.full_name));
    setSortedData(sorted);
  }, [sortedItem]);




  // --- Pagination --- //
  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("reportsPerPage") || "10";
  });

  useEffect(() => {
    localStorage.setItem("reportsPerPage", entriesPerPage);
  }, [entriesPerPage]);


  return (
    <div>

      <div>
        <div className="allemployees-container">
          <div className="allemployees-container-main">
            <div className="allemployees-container-sup">
              {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
                <div className="allemployees-sup-item1">
                  <Button
                    variant="contained"
                    className="add-experience"
                    onClick={() => navigate("/employees/employees/create")}
                  // onClick={handleCreateEmployeeClick}
                  >
                    <GoPlus className="icon-space" />
                    Create Employee
                  </Button>
                </div>
              )}

              <UploadEmployee />

            </div>
            <div className="allemployees-sup-item2">
              {/* <div>
                <EmployeeStatus
                  data={displayData}
                  status={status}
                  setStatus={setStatus}
                  // roles={rolesData}
                  setRoles={setRoles}
                />
              </div> */}
            </div>
            <div className="allemployees-sup-item2">
              <EntriesPerPage
                data={displayData}
                entriesPerPage={entriesPerPage}
                setEntriesPerPage={setEntriesPerPage}
              />
            </div>
            <div>
              <MainSearch
                setSearchItem={setSearchItem}
                searchItem={searchItem}
                placeholder={"Search...          All Employee"}
              />
            </div>
            <div>
              {sortedData && <EmployeesDownloader data={sortedData} />}

            </div>
          </div>
          <section className="md-ui component-data-table">
            {isLoading ? <TableLoader isLoading={isLoading} /> : ""}
            <div className="main-table-wrapper">
              <table className="main-table-content">
                <thead className="data-table-header">
                  <tr className="data-table-row">
                    <td className="table-datacell  "  > FULL NAME </td>
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
                        <td className="table-datacell  ">
                          {item?.full_name}
                        </td>
                        <td className="table-datacell  ">
                          {item?.email}
                        </td>
                        <td className="table-datacell">
                          {item?.role?.name}
                        </td>
                        <td className="table-datacell  ">
                          {item?.department?.name}
                        </td>
                        <td className="table-datacell datatype-numeric">
                          {item?.category}
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
                          <div className="table-active-items" key={i}>
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
            data={sortedData}
            entriesPerPage={entriesPerPage}
            Total={"Employee"}
          />
        </footer>
      </div>
    </div>
  );
};

export default AllEmployees;
