import { MdOutlineErrorOutline } from "react-icons/md";
import { VscCloudDownload } from "react-icons/vsc";
import Search from "./Search";
import { Button } from "@material-ui/core";
import { IoIosSearch } from "react-icons/io";
import { RiArrowUpDownFill } from "react-icons/ri";
import Select from "react-select";
import WeeklyReportDownloader from "./Downloader/WeeklyReportDownloader";
import EmployeesDownloader from "./Downloader/EmployeesDownloader";


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
          <option value="8">8</option>
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
const MainSearch = ({ placeholder, setSearchItem, searchItem }: any) => {
  return (

    <div className="search-entries">
      <Search placeHolder={placeholder} value={searchItem} onChange={(e: any) => setSearchItem(e.target.value)} />
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
        autoComplete="off"
        placeholder={placeholder}
        style={style}
        value={value}
        max={max}
        onChange={onChange}
      />
    </div>
  );
};


const SearchComponent = ({ sortData, entriesPerPage, setEntriesPerPage, parameter, addemployee, WeeklyReport, placeholder, employeesDownloader, EmployeesCSV, HODWeeklyReport }: any) => {

  const options = [
    { value: " Special Allowances", label: " Special Allowances" },
    { value: "Daily Transport Allowance ", label: "Daily Transport Allowance " },
    { value: "Salary Advance ", label: "Salary Advance " },
    { value: "Pay Suspension", label: "Pay Suspension" },
    { value: "Fixed Overtime", label: "Fixed Overtime" },
    { value: "Salary Arrears", label: "Salary Arrears" },
    { value: "Refund", label: "Refund" },
    { value: "End Of Year Bonus ", label: "End Of Year Bonus " },
  ];


  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: "240px", // Set the width to 240px
      border: "1px solid #990000",
      "&:focus": {
        borderColor: "#990000", // Change the border color to #990000 when focused
        boxShadow: "0 0 5px rgba(153, 0, 0, 0.5)", //
      },
    }),
  };

  return (
    <div className='half-background-input'>
      <div style={{ display: "flex", alignItems: "center" }}>
        {parameter && <Select
          className="item"
          styles={customStyles} // Use the custom styles
          value={options[0]} // Update this to the desired option from 'options'
          options={options} // Update this to the full list of options
        />}


      </div>

      <div>
        <EntriesPerPage
          data={sortData}
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
        />
      </div>

      <div className='pay_parameter' style={{ display: "flex", alignItems: "center" }}>
        {WeeklyReport && <WeeklyReportDownloader />}
        {EmployeesCSV && <EmployeesDownloader data={employeesDownloader} />}
        {HODWeeklyReport && < WeeklyReportDownloader data={HODWeeklyReport} />}
        {/* <Button className='CSV-button' data={managerdata} >
          <RiDownloadLine size={15} /> CSV
        </Button> */}
        <Button className='CSV-button'>
          <RiArrowUpDownFill size={15} /> Sort
        </Button>
        <Button className='CSV-button'>Filter</Button>
        <div className='mix-input-icon'>
          <input className='mix-input-icon-Button-input' placeholder={placeholder} />
          <Button className='mix-input-icon-Button'>
            <IoIosSearch size={20} />
          </Button>
        </div>
      </div>
    </div >
  )
}
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export {
  TableFetch,
  EntriesPerPage,
  EmployeeStatus,
  NoRecordFound,
  MainSearch,
  InputField,
  SearchComponent,
  monthNames
};
