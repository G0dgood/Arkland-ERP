import { MdOutlineErrorOutline } from "react-icons/md";
import { VscCloudDownload } from "react-icons/vsc";
import Search from "./Search";
import { Button } from "@material-ui/core";
import { IoIosSearch } from "react-icons/io";
import { RiDownloadLine } from "react-icons/ri";
import Select from "react-select";
import WeeklyReportDownloader from "./Downloader/WeeklyReportDownloader";
import EmployeesDownloader from "./Downloader/EmployeesDownloader";
import { SetStateAction, useState } from "react";
import { customStyles, options, options2 } from "../utils/ShareData";
import filter from "../assets/images/Filter.svg"
import { useNavigate } from "react-router-dom";
import PayrollEmployeeDownloader from "./Downloader/PayrollEmployeeDownloader";
import { allEmployee } from "../features/Employee/employeeSlice";
import { useAppDispatch } from "../store/useStore";


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
      // disabled={true}
      />
    </div>
  );
};
const InputField2 = ({ placeholder, style, label, value, type, onChange, max, disable, bold, showError, errors, values, errorsholder }: any) => {
  return (
    <div className={"input-payroll"}>
      <label className={"input__label"} style={bold}>
        {label}
        <input
          id="input2"
          className={"input__field-view"}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          style={style}
          value={values}
          max={max}
          onChange={onChange}
          disabled={disable ? true : false}

        />
        {showError ? errors && <p className="formik-errors">{errors}</p> : ""}
      </label>
    </div>
  );
};


const SearchComponent = ({ sortData, entriesPerPage, setEntriesPerPage, parameter, addemployee, WeeklyReport, placeholder, employeesDownloader, EmployeesCSV, HODWeeklyReport, handleParameter, setSelectedOption, parameterdeduct, emailpayslip, CSV, ApprovalRequests, SalaryHistory, PayrollEmployee, handleQuery, }: any) => {
  const navigate = useNavigate();





  const handleChange = (selectedOption: SetStateAction<null>) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div className='half-background-input'>
      <div style={{ display: "flex", alignItems: "center" }}>
        {parameter && <Select
          className="item"
          styles={customStyles} // Use the custom styles
          value={options.label} // Update this to the desired option from 'options'
          options={options} // Update this to the full list of options
          onChange={handleChange}

        />}
        {parameterdeduct && <Select
          className="item"
          styles={customStyles} // Use the custom styles
          value={options2.label} // Update this to the desired option from 'options'
          options={options2} // Update this to the full list of options
          onChange={handleChange}

        />}
        {(parameter || parameterdeduct) && <Button className='parameter-btn' onClick={handleParameter}>
          Create Parameter
        </Button>}
        {emailpayslip && <Button className='parameter-btn' onClick={() => navigate('/payroll/payroll/emailpayslip')}>
          Email Pay Slip
        </Button>}


        {ApprovalRequests &&
          <div className="custom-select">
            <select className="approval-filter"  >
              <option value=" ">Filter by</option>
              <option value="in review">in review</option>
              <option value="pending">pending</option>
              <option value="engaged">engaged</option>
            </select>
          </div>}

        {SalaryHistory && <h3>Salary History</h3>}
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
        {PayrollEmployee && < PayrollEmployeeDownloader />}

        {CSV && <Button className='CSV-button'   >
          <RiDownloadLine size={15} /> CSV
        </Button>}

        {/* <Button className='CSV-button'>
          <RiArrowUpDownFill size={15} /> Sort
        </Button> */}
        <Button className='CSV-button' onClick={handleQuery}>
          <img src={filter} alt="ASL" className="filter-icon" /> Filter</Button>
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



const InputOne = ({ handleOnChange, input }: any) => {

  const options = ["Employees", "Role", "Category", "Department", "Expatriate", "Location"];



  return (
    <div className="input  mt-3">
      <label className={"input__label"} >
        {"Select Employee By "}
      </label>
      <select id="Modal-textarea-input-sub" className="input-perameter-color" value={input?.employee} onChange={(e: any) => handleOnChange("employee", e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};



const InputLocation = ({ handleOnChange, input }: any) => {

  const options = ["A&A", "Lapazs", "Phoenix"];


  return (
    <div className="input  mt-3">
      <label className={"input__label"} >
        Select Location
      </label>
      <select id="Modal-textarea-input-sub" className="input-perameter-color" value={input?.location} onChange={(e: any) => handleOnChange("location", e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
const InputRole = ({ handleOnChange, input }: any) => {

  const options = ["Admin", "Employee", "Head of department", "HR admin", "Team lead", "Super admin", "Master"];



  return (
    <div className="input  mt-3">
      <label className={"input__label"} >
        Select Role
      </label>
      <select id="Modal-textarea-input-sub" value={input?.role} onChange={(e: any) => handleOnChange("role", e.target.value)} className="input-perameter-color">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
const InputCategory = ({ handleOnChange, input }: any) => {

  const options = ["Admin", "Employee", "Head of department", "HR admin", "Team lead", "Super admin", "Master"];


  return (
    <div className="input  mt-3">
      <label className={"input__label"} >
        Select Category
      </label>
      <select id="Modal-textarea-input-sub" className="input-perameter-color" value={input?.category} onChange={(e: any) => handleOnChange("category", e.target.value)} >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
const InputDepartment = ({ handleOnChange, input }: any) => {

  const options = ["Admin", "Employee", "Head of department", "HR admin", "Team lead", "Super admin", "Master"];


  return (
    <div className="input  mt-3">
      <label className={"input__label"} >
        Select Department
      </label>
      <select id="Modal-textarea-input-sub" className="input-perameter-color" value={input?.department} onChange={(e: any) => handleOnChange("department", e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
const InputExpatriate = ({ handleOnChange, input }: any) => {

  const options = ["Admin", "Employee", "Head of department", "HR admin", "Team lead", "Super admin", "Master"];


  return (
    <div className="input  mt-3">
      <label className={"input__label"} >
        Select Expatriate
      </label>
      <select id="Modal-textarea-input-sub" className="input-perameter-color" value={input?.expatriate} onChange={(e: any) => handleOnChange("expatriate", e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};




export {
  TableFetch,
  EntriesPerPage,
  EmployeeStatus,
  NoRecordFound,
  MainSearch,
  InputField,
  SearchComponent,
  monthNames,
  InputField2,
  InputOne,
  InputLocation,
  InputRole,
  InputCategory,
  InputDepartment,
  InputExpatriate,
};
