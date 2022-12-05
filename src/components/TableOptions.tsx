import React from "react";
import { GoSearch } from "react-icons/go";
import { MdOutlineErrorOutline } from "react-icons/md";
import { VscCloudDownload } from 'react-icons/vsc';



// EntriesPerPage
const EntriesPerPage = ({ data, entriesPerPage, setEntriesPerPage }: any) => (
  <div className="entries-perpage">
    {data?.length > 1 && (
      <>
        Show
        <select
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(e.target.value)}>
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
    <div className='GoSearch-container'>
      <GoSearch className="Search-input" />
      <input className='GoSearch' placeholder={placeholder}
        value={result}
        onChange={onChange} />
    </div>

  )
};


export { TableFetch, EntriesPerPage, NoRecordFound, MainSearch };




