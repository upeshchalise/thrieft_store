import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  next: number;
  prev: number;
  total: number;
  perPage: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  next,
  prev,
  total,
  perPage,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const MAX_PAGES_DISPLAYED = 3;
    const OFFSET = Math.floor(MAX_PAGES_DISPLAYED / 2);
    let start = currentPage - OFFSET;
    let end = currentPage + OFFSET;

    if (start < 1) {
      start = 1;
      end = MAX_PAGES_DISPLAYED;
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - MAX_PAGES_DISPLAYED + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
      {total !== 0 && (
        <div className="flex items-center justify-between w-full mt-8 ">
          <div className="flex items-center gap-1 ">
            <span className="">Page</span>
            <span className="font-MontserratMedium">{currentPage}</span>
            of
            <span className="font-MontserratMedium"> {totalPages}</span>
          </div>
          <div className="flex">
            <button
              className={`mx-1 p-2 rounded-lg  border-black border ${
                !prev
                  ? " border border-gray-200 cursor-not-allowed"
                  : "border-gray-400 hover:bg-gray-300 text-black "
              }`}
              disabled={!prev}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <FaChevronLeft />
              {/* <img alt="left" className="text-white" src={left} /> */}
            </button>
            <div className="flex">
              {getPageNumbers().map((pageNumber, index) => (
                <button
                  className={`py-1 px-3 mx-1 rounded-lg ${
                    currentPage === pageNumber
                      ? "bg-Summer-Sky text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-Summer-Sky hover:text-white"
                  }`}
                  key={index}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
              {/* {totalPages > 3 && currentPage + Math.floor(3 / 2) < totalPages && (
          <span className="flex flex-col justify-end mx-2">...</span>
        )} */}
            </div>
            <button
              className={`p-2 mx-1 rounded-lg ${
                !next
                  ? " border border-gray-300 cursor-not-allowed"
                  : "border-gray-400 hover:bg-gray-300 text-black border"
              }`}
              disabled={!next}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaginationComponent;
