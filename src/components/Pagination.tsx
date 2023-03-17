import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ data, setDisplayData, entriesPerPage, Total }: any) => {

  // --- Pagination --- //
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = parseInt(entriesPerPage);
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data?.length / usersPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setDisplayData(data?.slice(pagesVisited, pagesVisited + usersPerPage));
    localStorage.setItem("rowsPerPage", entriesPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDisplayData, entriesPerPage, pageNumber, data]);

  return (
    <div id="tfoot-ReactPaginate">
      {data?.length === 0 ? (
        ""
      ) : (
        <div className="pageEntries">
          Total of {data?.length} {Total}
        </div>
      )}
      <div>
        {data?.length > usersPerPage && (
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination-container"}
            previousLinkClassName={"previous-btn"}
            nextLinkClassName={"next-btn"}
            disabledClassName={"pagination-disabled"}
            activeClassName={"pagination-active"}
          />
        )}
      </div>
    </div>
  );
};

export default Pagination;
