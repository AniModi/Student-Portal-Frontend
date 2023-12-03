// Pagination.jsx

import React from "react";
import "./Pagination.scss";

const Pagination = ({ currentPage, setCurrentPage, totalPages, totalData }) => {
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 6;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
      const startPage = currentPage - halfMaxPagesToShow;
      const endPage = currentPage + halfMaxPagesToShow;

      if (startPage <= 0) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pageNumbers.push(i);
        }
      } else if (endPage > totalPages) {
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination_container">
      <div className="pagination_container__rows_selected">
        {/* Omitted the "selected of total pages" part */}
      </div>
      <div className="pagination_container__pagination">
        <div
          className="pagination_container__pagination__first_page first-page"
          onClick={() => handlePageClick(1)}
        >
          {"<<"}
        </div>
        <div
          className="pagination_container__pagination__previous_button previous-page"
          onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
        >
          {"<"}
        </div>
        {generatePageNumbers().map((page) => (
          <div
            key={page}
            className={`pagination_container__pagination__page_number ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </div>
        ))}
        <div
          className="pagination_container__pagination__next_button next-page"
          onClick={() =>
            currentPage < totalPages && handlePageClick(currentPage + 1)
          }
        >
          {">"}
        </div>
        <div
          className="pagination_container__pagination__last_page last-page"
          onClick={() => handlePageClick(totalPages)}
        >
          {">>"}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
