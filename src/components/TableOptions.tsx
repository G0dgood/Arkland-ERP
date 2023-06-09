import { MdOutlineErrorOutline } from "react-icons/md";
import { VscCloudDownload } from "react-icons/vsc";
import Search from "./Search";

// EntriesPerPage
const EntriesPerPage = ({ data, entriesPerPage, setEntriesPerPage }: any) => (
  <div className="entries-perpage">
    {data?.length > 1 && (
      <>
        Show
        <select
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        entries
      </>
    )}
  </div>
);

// EntriesPerPage
const EmployeeStatus = ({
  status,
  setStatus,
  roles,
  setRole,
  departments,
  setDepartment,
  category,
  setCategory,
}: any) => (
  <div className="entries-perpage">
    <>
      Filter by
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="in review">in review</option>
        <option value="pending">pending</option>
        <option value="engaged">engaged</option>
      </select>
      Status
    </>
    <select value={roles} onChange={(e) => setRole(e.target.value)}>
      <option value="">All Roles</option>
      {roles &&
        roles?.map((role: any) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
    </select>
    Role
    {/* <select value={departments} onChange={(e) => setDepartment(e.target.value)}>
      <option value="">All Departments</option>
      {departments.map((department: any) => (
        <option key={department.id} value={department.id}>
          {department.name}
        </option>
      ))}
    </select>
    Department */}
    {/* )} */}
  </div>
);

// TableFetch
const TableFetch = ({ colSpan }: any) => (
  <tr>
    <td colSpan={colSpan} className="table-loader">
      <VscCloudDownload size={75} />
      <p className="mt-3">Fetching request...</p>
    </td>
  </tr>
);
// NoRecordFound
const NoRecordFound = ({ colSpan }: any) => (
  <tr>
    <td colSpan={colSpan} className="table-loader">
      <MdOutlineErrorOutline size={75} />
      <p className="mt-3">No record found</p>
    </td>
  </tr>
);

// Search
const MainSearch = ({ placeholder, result, onChange }: any) => {
  return (

    <div className="search-entries">
      <Search placeHolder={placeholder} value={result} onChange={onChange} />
    </div>
    // <div className="Search-input-bg">
    //   <GoSearch className="Search-input" />
    // </div>

    // <input className='GoSearch' style={{ border: "0px" }} placeholder={placeholder}
    //   value={result}
    //   onChange={onChange} />
    // </div>
  );
};

const InputField = ({ placeholder, style, label, value, type, onChange, max }: any) => {
  return (
    <div className={"input "}>
      <label className={"input__label"} >
        {label}
      </label>
      <input
        className={"input__field "}
        type={type}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        autoComplete="off"
        placeholder={placeholder}
        // inputMode={inputMode}
        // onChange={onChange}
        // defaultValue={defaultValue}
        style={style}
        // maxLength={maxLength}
        value={value}
        max={max}
        onChange={onChange}
      />
    </div>
  );
};
export {
  TableFetch,
  EntriesPerPage,
  EmployeeStatus,
  NoRecordFound,
  MainSearch,
  InputField
};
